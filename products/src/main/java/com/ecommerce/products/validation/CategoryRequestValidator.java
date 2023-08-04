package com.ecommerce.products.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.ecommerce.products.request.CategoryRequest;
import com.ecommerce.products.service.CategoryService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class CategoryRequestValidator implements Validator {

    private final CategoryService categoryService;

    @Override
    public boolean supports(Class<?> clazz) {
        return CategoryRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CategoryRequest categoryRequest = (CategoryRequest) target;

        // Validate name field
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "field.required", "Name is required");
        if (categoryRequest.getName() != null) {
            if(categoryRequest.getName().length() > 100){
                errors.rejectValue("name", "field.length.max", "Name cannot exceed 100 characters");
            }
        }

        // Validate description field
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "description", "field.required", "Description is required");
        if (categoryRequest.getDescription() != null) {
            if(categoryRequest.getDescription().length() < 10){
                errors.rejectValue("name", "field.length.min", "Name must have at least 10 characters");
            }
        }

        // Validate data type for name field
        if (!(categoryRequest.getName() instanceof String)) {
            errors.rejectValue("name", "field.typeMismatch", "Invalid data type for name");
        }

        // Validate data type for description field
        if (!(categoryRequest.getDescription() instanceof String)) {
            errors.rejectValue("description", "field.typeMismatch", "Invalid data type for description");
        }

        // Exisiting category validation
        if (categoryService.getCategoriesByName(categoryRequest.getName()) != null) {
            errors.rejectValue("name", "field.alreadyExists", "Category already exists");
        }

    }
}
