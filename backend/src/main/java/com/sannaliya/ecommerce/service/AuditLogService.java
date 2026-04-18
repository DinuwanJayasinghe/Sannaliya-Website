package com.sannaliya.ecommerce.service;

import com.sannaliya.ecommerce.model.AuditLog;
import com.sannaliya.ecommerce.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditLogService {
    private final AuditLogRepository repository;

    public void log(String action, String performedBy, String details) {
        repository.save(new AuditLog(action, performedBy, details));
    }
}
