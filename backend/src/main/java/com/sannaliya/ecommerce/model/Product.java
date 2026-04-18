package com.sannaliya.ecommerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private String category;
    private String subCategory;
    private double price;
    private double weight; // in kg
    private List<ProductSize> sizes;
    private List<Review> reviews;
    private double averageRating;
    private boolean isNewArrival;
    private int stockQuantity;

    @Data
    public static class ProductSize {
        private String size; // Xs, S, M, L, XL, 2xl, 3xl, 4xl, 5xl
        private String imageUrl;
        private int stock;
    }

    @Data
    public static class Review {
        private String userId;
        private String userName;
        private String comment;
        private int rating;
        private long timestamp;
    }
}
