package com.sannaliya.ecommerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String district;
    private String city;
    private Set<Role> roles;

    public enum Role {
        ROLE_USER,
        ROLE_ADMIN
    }
}
