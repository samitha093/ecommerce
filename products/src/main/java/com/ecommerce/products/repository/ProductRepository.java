package com.ecommerce.products.repository;

import com.ecommerce.products.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // custom query methods

}