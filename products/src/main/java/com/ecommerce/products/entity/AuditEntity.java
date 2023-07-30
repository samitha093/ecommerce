package com.ecommerce.products.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.ecommerce.products.util.ProductStatus;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class AuditEntity {
    
    private ProductStatus status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "created_by_id")
    private Long createdById;

    @Column(name = "updated_by_id")
    private Long updatedById;

    @Column(name = "deleted_by_id")
    private Long deletedById;
}