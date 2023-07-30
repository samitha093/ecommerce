package com.ecommerce.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.products.entity.Image;

public interface ProductImageRepository extends JpaRepository<Image, Long>{

    // custom query methods
    
}
