package com.sannaliya.ecommerce.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "audit_logs")
public class AuditLog {
    @Id
    private String id;
    private String action;
    private String performedBy;
    private String details;
    private long timestamp;

    public AuditLog() {}

    public AuditLog(String action, String performedBy, String details) {
        this.action = action;
        this.performedBy = performedBy;
        this.details = details;
        this.timestamp = System.currentTimeMillis();
    }
}
