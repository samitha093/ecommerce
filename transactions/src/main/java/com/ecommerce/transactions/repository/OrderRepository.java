package com.ecommerce.transactions.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.transactions.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    
}
