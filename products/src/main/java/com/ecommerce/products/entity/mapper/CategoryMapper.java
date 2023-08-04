package com.ecommerce.products.entity.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.ecommerce.products.entity.Category;
import com.ecommerce.products.request.CategoryRequest;
import com.ecommerce.products.util.ProductStatus;


@Component
public class CategoryMapper {
    
    public Category toEntityCreate(CategoryRequest categoryRequest, Long userId) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        category.setDescription(categoryRequest.getDescription());
        category.setCreatedById(userId);
        category.setUpdatedById(userId);
        category.setCreatedAt(LocalDateTime.now());
        category.setUpdatedAt(LocalDateTime.now());
        category.setStatus(ProductStatus.APPROVED);
        return category;
    }
}
