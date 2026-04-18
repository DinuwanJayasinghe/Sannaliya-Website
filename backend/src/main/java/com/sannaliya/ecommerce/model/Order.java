package com.sannaliya.ecommerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private String userId;

    // Customer Info for COD
    private String firstName;
    private String lastName;
    private String email; // Added email field
    private String address;
    private String district;
    private String nearestCity;
    private String phone1;
    private String phone2;

    private List<OrderItem> items;
    private double totalPrice;
    private double deliveryCharge;
    private double grandTotal;
    private OrderStatus status;
    private String paymentMethod = "Cash on Delivery";
    private long createdAt;

    @Data
    public static class OrderItem {
        private String productId;
        private String productName;
        private String size;
        private int quantity;
        private double price;
    }

    public enum OrderStatus {
        PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    }
}
