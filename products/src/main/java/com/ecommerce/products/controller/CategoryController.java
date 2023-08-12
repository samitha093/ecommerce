package com.ecommerce.products.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.products.dto.CategoryDto;
import com.ecommerce.products.dto.mapper.CategoryDTOMapper;
import com.ecommerce.products.entity.Category;
import com.ecommerce.products.request.CategoryRequest;
import com.ecommerce.products.response.ApiResponse;
import com.ecommerce.products.security.TokenValidate;
import com.ecommerce.products.service.CategoryService;
import com.ecommerce.products.validation.CategoryRequestValidator;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/categories")
public class CategoryController {

    private final CategoryRequestValidator categoryRequestValidator;
    private final CategoryService categoryService;
    private final TokenValidate tokenValidate;
    private final CategoryDTOMapper categoryDTOMapper;

    String token = "";
    
    //ADD NEW CATEGORY
    @PostMapping("/addnewcategory")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> addCategory(
        @RequestBody CategoryRequest categoryRequest,
        @RequestHeader("Authorization") String tokenHeader,
        BindingResult bindingResult
    ) throws Exception {
        Long UserId;
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                UserId = Long.valueOf(idString);
            } catch (NumberFormatException e) {
                String errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        //Request Validation
        categoryRequestValidator.validate(categoryRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
            return ApiResponse.success("Success", errorMessages);
        }
        // Send to the service layer
        try {
            Category category = categoryService.CreateCategory(categoryRequest, UserId);
            CategoryDto categoryDto = categoryDTOMapper.toDTO(category);
            return ApiResponse.success("Success", categoryDto);
        } catch (Exception e) {
            String errorMessage = "Error occurred while creating the category.";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //UPDATE CATEGORY
    @PutMapping("/updatecategory/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> updateCategory(
        @PathVariable("categoryId") Long categoryId,
        @RequestBody CategoryRequest categoryRequest,
        @RequestHeader("Authorization") String tokenHeader,
        BindingResult bindingResult
    )throws Exception {
        Long UserId;
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                UserId = Long.valueOf(idString);
            } catch (NumberFormatException e) {
                String errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        //Request Validation
        categoryRequestValidator.validate(categoryRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
            return ApiResponse.success("Success", errorMessages);
        }
        // Send to the service layer
        try {
            categoryService.updateCategory(categoryId, categoryRequest, UserId);
        } catch (Exception e) {
            String errorMessage = "Error occurred while updating the category.";
            return ApiResponse.success("Success", errorMessage);
        }
        // Return the response
        List<CategoryDto> categoryList = categoryService.getAllCategories();
        return ApiResponse.success("Success", categoryList);
    }
    
    //DELETE CATEGORY
    @DeleteMapping("/deletecategory/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> deleteCategory(
        @PathVariable("categoryId") Long categoryId,
        @RequestHeader("Authorization") String tokenHeader
    )throws Exception {
        String errorMessage;
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                Long.valueOf(idString);
            } catch (NumberFormatException e) {
                errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        }else{
            errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try {
            errorMessage = categoryService.deleteCategory(categoryId);
            if (errorMessage != null){
                return ApiResponse.success("Success", errorMessage);
            }else{
                // Return the response
                List<CategoryDto> categoryList = categoryService.getAllCategories();
                return ApiResponse.success("Success", categoryList);
            }
        } catch (Exception e) {
            errorMessage = "Error occurred while deleting the category."; 
            return ApiResponse.success("Success", errorMessage);
        }

    }
    

    //GET CATEGORY BY ID
    @GetMapping("/getcategorybyid/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getCategoryById(
        @PathVariable("categoryId") Long categoryId,
        @RequestHeader("Authorization") String tokenHeader
    )throws Exception {
        String errorMessage;
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                Long.valueOf(idString);
            } catch (NumberFormatException e) {
                errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        }else{
            errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try {
            CategoryDto category = categoryService.getCategoryById(categoryId);
            if (category == null) {
                errorMessage = "Category not found.";
                return ApiResponse.success("Success", errorMessage);
            }
            return ApiResponse.success("Success", category);

        } catch (Exception e) {
            errorMessage = "Error occurred while finding the category.";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //GET ALL CATEGORIES
    @GetMapping("/getallategories")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getCategories(
        @RequestHeader("Authorization") String tokenHeader
    )throws Exception {
        String errorMessage;
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                Long.valueOf(idString);
            } catch (NumberFormatException e) {
                errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        }else{
            errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try {
            List<CategoryDto> categoryList =  categoryService.getAllCategories();
            return ApiResponse.success("Success", categoryList);

        } catch (Exception e) {
            errorMessage = "Error occurred while creating the category.";
            return ApiResponse.success("Success", errorMessage);
        }
    }
}
