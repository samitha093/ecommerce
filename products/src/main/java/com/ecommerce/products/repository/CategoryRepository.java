package com.ecommerce.products.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.products.entity.Category;


public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String name);
    // custom query methods
}
