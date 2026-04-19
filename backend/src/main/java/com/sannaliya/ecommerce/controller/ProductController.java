package com.sannaliya.ecommerce.controller;

import com.sannaliya.ecommerce.model.Product;
import com.sannaliya.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository repository;
    private final com.sannaliya.ecommerce.repository.OrderRepository orderRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Product createProduct(@RequestBody Product product) {
        return repository.save(product);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        return repository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setDescription(productDetails.getDescription());
                    product.setCategory(productDetails.getCategory());
                    product.setSubCategory(productDetails.getSubCategory());
                    product.setPrice(productDetails.getPrice());
                    product.setWeight(productDetails.getWeight());
                    product.setMainImageUrl(productDetails.getMainImageUrl());
                    product.setSizes(productDetails.getSizes());
                    product.setNewArrival(productDetails.isNewArrival());
                    product.setStockQuantity(productDetails.getStockQuantity());
                    return ResponseEntity.ok(repository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/reviews")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addReview(@PathVariable String id, @RequestBody Product.Review review) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Check if user has purchased this product
        List<com.sannaliya.ecommerce.model.Order> userOrders = orderRepository.findByEmail(userEmail);
        boolean hasPurchased = userOrders.stream()
                .filter(o -> o.getStatus() == com.sannaliya.ecommerce.model.Order.OrderStatus.DELIVERED)
                .flatMap(o -> o.getItems().stream())
                .anyMatch(item -> item.getProductId().equals(id));

        if (!hasPurchased) {
            return ResponseEntity.status(403).body("Only customers who have purchased and received the product can leave a review.");
        }

        return repository.findById(id)
                .map(product -> {
                    if (product.getReviews() == null) {
                        product.setReviews(new java.util.ArrayList<>());
                    }
                    review.setTimestamp(System.currentTimeMillis());
                    product.getReviews().add(review);

                    double avg = product.getReviews().stream()
                            .mapToInt(Product.Review::getRating)
                            .average()
                            .orElse(0.0);
                    product.setAverageRating(avg);

                    return ResponseEntity.ok(repository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        return repository.findById(id)
                .map(product -> {
                    repository.delete(product);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
