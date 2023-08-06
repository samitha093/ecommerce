package com.ecommerce.products.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import com.ecommerce.products.request.CategoryRequest;
import com.ecommerce.products.request.ImageRequest;


@Component
public class ImageRequestValidator implements Validator {

    
    @Override
    public boolean supports(Class<?> clazz) {
        return CategoryRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ImageRequest imageRequest = (ImageRequest) target;

         ValidationUtils.rejectIfEmptyOrWhitespace(errors, "imageName", "field.required", "imageName is required");
         if (imageRequest.getImageName() != null) {
             if(imageRequest.getImageName().length() > 50){
                 errors.rejectValue("imageName", "field.length.max", "imageName cannot exceed 50 characters");
             }
             if(imageRequest.getImageName().length() < 10){
                 errors.rejectValue("imageName", "field.length.min", "imageName should include more than 10 characters");
             }
         }
         
         ValidationUtils.rejectIfEmptyOrWhitespace(errors, "contentType", "field.required", "contentType is required");
         ValidationUtils.rejectIfEmptyOrWhitespace(errors, "imageData", "field.required", "imageData is required");

    }
    
}
