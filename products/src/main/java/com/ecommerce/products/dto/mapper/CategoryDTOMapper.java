package com.ecommerce.products.dto.mapper;

import org.springframework.stereotype.Component;

import com.ecommerce.products.dto.CategoryDto;
import com.ecommerce.products.entity.Category;

@Component
public class CategoryDTOMapper {

    public CategoryDto toDTO(Category category) {
        CategoryDto categoryDTO = new CategoryDto();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setDescription(category.getDescription());
        return categoryDTO;
    }
    
}
