package com.ecommerce.products.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecommerce.products.dto.CategoryDto;
import com.ecommerce.products.entity.Category;
import com.ecommerce.products.entity.mapper.CategoryMapper;
import com.ecommerce.products.repository.CategoryRepository;
import com.ecommerce.products.request.CategoryRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Transactional
    public Category CreateCategory(CategoryRequest categoryRequest, Long userId) {
        Category category = categoryMapper.toEntityCreate(categoryRequest, userId);
        return categoryRepository.save(category);
    }

    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        if (categories != null) {
        return categories.stream()
                .map(category -> new CategoryDto(category.getId(), category.getName(), category.getDescription()))
                .collect(Collectors.toList());
        }else {
            return null;
        }
    }
    
    public CategoryDto getCategoriesByName(String name){
        Category category = categoryRepository.findByName(name);
        if (category != null) {
            return new CategoryDto(category.getId(), category.getName(), category.getDescription());
        }else {
            return null;
        }
    }
}
