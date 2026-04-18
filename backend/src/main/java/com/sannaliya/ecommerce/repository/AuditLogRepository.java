package com.sannaliya.ecommerce.repository;

import com.sannaliya.ecommerce.model.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AuditLogRepository extends MongoRepository<AuditLog, String> {
}
