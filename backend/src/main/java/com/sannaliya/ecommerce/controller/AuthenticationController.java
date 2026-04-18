package com.sannaliya.ecommerce.controller;

import com.sannaliya.ecommerce.dto.AuthenticationRequest;
import com.sannaliya.ecommerce.dto.AuthenticationResponse;
import com.sannaliya.ecommerce.dto.RegisterRequest;
import com.sannaliya.ecommerce.service.AuthenticationService;
import com.sannaliya.ecommerce.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    private final AuditLogService auditLogService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse response = service.register(request);
        auditLogService.log("USER_REGISTER", request.getEmail(), "New user registered");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse response = service.authenticate(request);
        auditLogService.log("USER_LOGIN", request.getEmail(), "User logged in");
        return ResponseEntity.ok(response);
    }
}
