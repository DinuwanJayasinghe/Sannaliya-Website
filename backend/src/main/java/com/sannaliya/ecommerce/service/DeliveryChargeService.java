package com.sannaliya.ecommerce.service;

import com.sannaliya.ecommerce.model.Order;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class DeliveryChargeService {

    private static final List<String> ZONE_1_DISTRICTS = Arrays.asList(
            "Kaluthara", "Colombo", "Gampaha", "Galle", "Mathara", "Kegalle"
    );

    public double calculateDeliveryCharge(String district, double totalWeight) {
        double firstKgCharge;
        double additionalKgCharge = 100.00;

        if (ZONE_1_DISTRICTS.contains(district)) {
            firstKgCharge = 450.00;
        } else {
            // Assume all other districts belong to Zone 2
            firstKgCharge = 500.00;
        }

        if (totalWeight <= 1.0) {
            return firstKgCharge;
        } else {
            double additionalWeight = Math.ceil(totalWeight - 1.0);
            return firstKgCharge + (additionalWeight * additionalKgCharge);
        }
    }
}
