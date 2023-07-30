package com.ecommerce.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.products.entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long>{

    // custom query methods
    
}
