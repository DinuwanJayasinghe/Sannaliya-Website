package com.sannaliya.ecommerce.controller;

import com.sannaliya.ecommerce.model.Order;
import com.sannaliya.ecommerce.model.Product;
import com.sannaliya.ecommerce.repository.OrderRepository;
import com.sannaliya.ecommerce.repository.ProductRepository;
import com.sannaliya.ecommerce.service.AuditLogService;
import com.sannaliya.ecommerce.service.DeliveryChargeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository repository;
    private final ProductRepository productRepository;
    private final DeliveryChargeService deliveryChargeService;
    private final SimpMessagingTemplate messagingTemplate;
    private final AuditLogService auditLogService;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        // Recalculate total price and weight on the server to prevent fraud
        double calculatedTotalPrice = 0.0;
        double totalWeight = 0.0;

        for (Order.OrderItem item : order.getItems()) {
            Optional<Product> productOpt = productRepository.findById(item.getProductId());
            if (productOpt.isPresent()) {
                Product product = productOpt.get();
                item.setProductName(product.getName());
                item.setPrice(product.getPrice()); // Always use server-side price
                calculatedTotalPrice += product.getPrice() * item.getQuantity();
                totalWeight += product.getWeight() * item.getQuantity();
            } else {
                // Handle missing product - in real app, might throw error
                auditLogService.log("ORDER_ITEM_NOT_FOUND", "SYSTEM", "Product ID: " + item.getProductId());
            }
        }

        double deliveryCharge = deliveryChargeService.calculateDeliveryCharge(order.getDistrict(), totalWeight);

        order.setTotalPrice(calculatedTotalPrice);
        order.setDeliveryCharge(deliveryCharge);
        order.setGrandTotal(calculatedTotalPrice + deliveryCharge);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setCreatedAt(System.currentTimeMillis());

        Order savedOrder = repository.save(order);

        auditLogService.log("ORDER_PLACED", order.getEmail() != null ? order.getEmail() : "GUEST", "Order ID: " + savedOrder.getId());

        // Notify admin in real-time
        messagingTemplate.convertAndSend("/topic/orders", savedOrder);

        return savedOrder;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String id, @RequestParam Order.OrderStatus status) {
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return repository.findById(id)
                .map(order -> {
                    order.setStatus(status);
                    Order updated = repository.save(order);
                    auditLogService.log("ORDER_STATUS_UPDATE", adminEmail, "Order ID: " + id + " to " + status);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
