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

    String token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJpZCI6IjU0NDRmMjIxLWVkYTYtNGRhZi05MTMwLTAxMThiNWM5ZWRiMyIsInN1YiI6IklzdXJ1bGFrc2hhbkBleGFtcGxlLmNvbSIsImlhdCI6MTY5MDcyOTI5MiwiZXhwIjoxNjkzMzIxMjkyfQ.HOb9Nal8OXm4erYoFHR8bmJgjNrPxq2tW3cwqMK27nA";
    
    //ADD NEW CATEGORY
    @PostMapping("/addnewcategory")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> addCategory(
        @RequestBody CategoryRequest categoryRequest,
        @RequestHeader("Authorization") String tokenHeader,
        BindingResult bindingResult
    ) throws Exception {
        //Request Validation
        categoryRequestValidator.validate(categoryRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
            return ApiResponse.success("Success", errorMessages);
        }
        // Autherization
        String token = tokenHeader.substring(7);
        System.out.println(token);
        Claims claims = tokenValidate.parseToken("");
        if (claims != null) {
            System.out.println(claims);
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        Long UserId = 884L;
        // Send to the service layer
        try {
            categoryService.CreateCategory(categoryRequest, UserId);
        } catch (Exception e) {
            String errorMessage = "Error occurred while creating the category.";
            return ApiResponse.success("Success", errorMessage);
        }
        // Return the response
        List<CategoryDto> categoryList = categoryService.getAllCategories();
        return ApiResponse.success("Success", categoryList);
    }

    //UPDATE CATEGORY
    @PutMapping("/updatecategory")
    @ResponseBody
    public String updateCategory() {
        return "Hello, GET request!";
    }
    
    //DELETE CATEGORY
    @DeleteMapping("/deletecategory/{categoryId}")
    @ResponseBody
    public String deleteCategory(
        @PathVariable("categoryId") String categoryId
    ) {
        return "Hello, GET request!";
    }
    

    //GET CATEGORY BY ID
    @GetMapping("/getcategorybyid/{categoryId}")
    @ResponseBody
    public String getCategoryById(
        @PathVariable("categoryId") String categoryId
    ) {
        return "Hello, GET request!";
    }

    //GET ALL CATEGORIES
    @GetMapping("/getallategories")
    @ResponseBody
    public String getCategories() {
        return "Hello, GET request!";
    }
}
