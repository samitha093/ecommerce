package com.ecommerce.products.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.products.request.CategoryRequest;
import com.ecommerce.products.validation.CategoryRequestValidator;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/categories")
public class CategoryController {

    private final CategoryRequestValidator categoryRequestValidator;
    
    //ADD NEW CATEGORY
    @PostMapping("/addnewcategory")
    @ResponseBody
    public String addCategory(
        @RequestBody CategoryRequest categoryRequest,
        BindingResult bindingResult
    ) throws Exception {
        //Request Validation
        categoryRequestValidator.validate(categoryRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errorMessages = bindingResult.getAllErrors().stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());
            return "Validation Error: " + String.join(", ", errorMessages);
        }
        // Autherization
        // Send to the service layer
        // Return the response
        return categoryRequest.getName();
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
