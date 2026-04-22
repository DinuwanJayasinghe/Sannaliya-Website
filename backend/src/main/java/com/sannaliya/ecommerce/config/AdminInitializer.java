package com.sannaliya.ecommerce.config;

import com.sannaliya.ecommerce.model.Product;
import com.sannaliya.ecommerce.model.User;
import com.sannaliya.ecommerce.repository.ProductRepository;
import com.sannaliya.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Configuration
@RequiredArgsConstructor
public class AdminInitializer {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            initAdmin();
            if (productRepository.count() == 0) {
                initProducts();
            }
        };
    }

    private void initAdmin() {
        String adminEmail = "sannaliya98@gmail.com";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("Sannaliya");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("Admin@sannaliya.lk"));
            admin.setRoles(Collections.singleton(User.Role.ROLE_ADMIN));
            userRepository.save(admin);
            System.out.println("Admin user created: " + adminEmail);
        }
    }

    private void initProducts() {
        String[] categories = {
            "Casual wear (women/men)", "Office wear", "footwear",
            "accessories for women", "kids wear", "Gift items", "New arrivals"
        };

        String[] sizes = {"Xs", "S", "M", "L", "xL", "2xl", "3xl", "4xl", "5xl"};
        Random random = new Random();

        for (String category : categories) {
            for (int i = 1; i <= 10; i++) {
                Product product = new Product();
                product.setName(category + " Item " + i);
                product.setDescription("High-quality " + category.toLowerCase() + " from Sannaliya Boutique. Comfortable and stylish.");
                product.setCategory(category);
                product.setPrice(1500 + random.nextInt(5000));
                product.setWeight(0.5 + random.nextDouble());
                product.setStockQuantity(50 + random.nextInt(100));
                product.setNewArrival(category.equals("New arrivals") || random.nextBoolean());

                // Set default main image
                product.setMainImageUrl("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop");

                // Add size variations with specific images
                List<Product.ProductSize> productSizes = new ArrayList<>();
                for (String size : sizes) {
                    Product.ProductSize ps = new Product.ProductSize();
                    ps.setSize(size);
                    ps.setStock(10 + random.nextInt(20));
                    // Placeholder images that vary slightly by size to demonstrate effect
                    ps.setImageUrl(product.getMainImageUrl() + "&sig=" + size.hashCode());
                    productSizes.add(ps);
                }
                product.setSizes(productSizes);

                // Add sample reviews
                List<Product.Review> reviews = new ArrayList<>();
                int numReviews = 2 + random.nextInt(5);
                double totalRating = 0;
                for (int j = 0; j < numReviews; j++) {
                    Product.Review review = new Product.Review();
                    review.setUserId("user" + j);
                    review.setUserName("Customer " + (j + 1));
                    review.setComment("Excellent quality and perfect fit! Highly recommend Sannaliya.");
                    int rating = 4 + random.nextInt(2); // 4 or 5 stars
                    review.setRating(rating);
                    review.setTimestamp(System.currentTimeMillis() - random.nextInt(1000000));
                    reviews.add(review);
                    totalRating += rating;
                }
                product.setReviews(reviews);
                product.setAverageRating(totalRating / numReviews);

                productRepository.save(product);
            }
        }
        System.out.println("Seeded 70 sample products.");
    }
}
