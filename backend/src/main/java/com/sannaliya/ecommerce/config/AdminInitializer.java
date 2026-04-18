package com.sannaliya.ecommerce.config;

import com.sannaliya.ecommerce.model.User;
import com.sannaliya.ecommerce.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@Configuration
@RequiredArgsConstructor
public class AdminInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner initAdmin() {
        return args -> {
            String adminEmail = "sannaliya98@gmail.com";
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setFirstName("Admin");
                admin.setLastName("Sannaliya");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("Admin@sannaliya.lk"));
                admin.setRoles(Collections.singleton(User.Role.ROLE_ADMIN));
                userRepository.save(admin);
                System.out.println("Admin user created: " + adminEmail + " / Admin@sannaliya.lk");
            }
        };
    }
}
