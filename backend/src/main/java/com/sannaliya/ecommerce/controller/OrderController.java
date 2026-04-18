package com.sannaliya.ecommerce.controller;

import com.sannaliya.ecommerce.model.Order;
import com.sannaliya.ecommerce.repository.OrderRepository;
import com.sannaliya.ecommerce.service.DeliveryChargeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository repository;
    private final DeliveryChargeService deliveryChargeService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        // Calculate total weight and delivery charge
        double totalWeight = order.getItems().stream()
                .mapToDouble(item -> 0.5) // Placeholder: in real case, fetch weight from ProductRepository
                .sum();

        double deliveryCharge = deliveryChargeService.calculateDeliveryCharge(order.getDistrict(), totalWeight);
        order.setDeliveryCharge(deliveryCharge);
        order.setGrandTotal(order.getTotalPrice() + deliveryCharge);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setCreatedAt(System.currentTimeMillis());

        Order savedOrder = repository.save(order);

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
        return repository.findById(id)
                .map(order -> {
                    order.setStatus(status);
                    return ResponseEntity.ok(repository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
