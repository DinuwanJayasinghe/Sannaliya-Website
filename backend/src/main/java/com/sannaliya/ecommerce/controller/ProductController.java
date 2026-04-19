package com.sannaliya.ecommerce.controller;

import com.sannaliya.ecommerce.model.Product;
import com.sannaliya.ecommerce.repository.ProductRepository;
import com.sannaliya.ecommerce.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository repository;
    private final AuditLogService auditLogService;

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
        Product saved = repository.save(product);
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        auditLogService.log("PRODUCT_CREATE", adminEmail, "Product created: " + saved.getName());
        return saved;
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product productDetails) {
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
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
                    Product updated = repository.save(product);
                    auditLogService.log("PRODUCT_UPDATE", adminEmail, "Product updated: " + id);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        return repository.findById(id)
                .map(product -> {
                    repository.delete(product);
                    auditLogService.log("PRODUCT_DELETE", adminEmail, "Product deleted: " + id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
