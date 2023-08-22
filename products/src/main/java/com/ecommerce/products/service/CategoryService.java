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

    @Transactional
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
    
    @Transactional
    public CategoryDto getCategoriesByName(String name){
        Category category = categoryRepository.findByName(name);
        if (category != null) {
            return new CategoryDto(category.getId(), category.getName(), category.getDescription());
        }else {
            return null;
        }
    }

    @Transactional
    public Category getCategoryentityById(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            return category;
        }else {
            return null;
        }
    }

    @Transactional
    public CategoryDto getCategoryById(Long categoryId) {
        Category category = getCategoryentityById(categoryId);
        if (category != null) {
            return new CategoryDto(category.getId(), category.getName(), category.getDescription());
        }else {
            return null;
        }
    }

    @Transactional
    public String deleteCategory(Long categoryId) {
        CategoryDto data = getCategoryById(categoryId);
        if (data == null) {
            String ErrorMessage = "Category:"+categoryId+" => not found";
            return ErrorMessage; // Category not found
        }
        try {
            categoryRepository.deleteById(categoryId);
            String ErrorMessage = null;
            return ErrorMessage; // Deletion successful
        }catch (Exception e) {
            String ErrorMessage = "Crical exceptions that may occur during deletion";
            return ErrorMessage; // Deletion failed
        }
    }

    @Transactional
    public void updateCategory(Long categoryId, CategoryRequest categoryRequest, Long userId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (category != null) {
            categoryMapper.toEntityUpdate(category, categoryRequest, userId);
            categoryRepository.save(category);
        }
    }
}
