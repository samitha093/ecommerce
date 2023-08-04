package com.ecommerce.products.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/products")
public class ProductController {

    //ADD NEW PRODUCT 
    @PostMapping("/addnewproduct")
    @ResponseBody
    public String addProduct() {
        return "Hello, GET request!";
    }

    //DELETE PRODUCT
    @DeleteMapping("/deleteproduct")
    @ResponseBody
    public String deleteProduct() {
        return "Hello, GET request!";
    }

    //UPDATE PRODUCT
    @PutMapping("/updateproduct")
    @ResponseBody
    public String updateProduct() {
        return "Hello, GET request!";
    }

    //GET PRODUCT BY ID
    @GetMapping("/getproductbyid/{id}")
    @ResponseBody
    public String getProductById(
        @PathVariable("id") String id
    ) {
        return "Hello, GET request!";
    }

    //GET ALL PRODUCTS
    @GetMapping("/getallproducts")
    @ResponseBody
    public String getAllProducts() {
        return "Hello, GET request!";
    }
    
    //GET PRODUCTS BY CATEGORY
    @GetMapping("/getproductsbycategory/{categoryId}")
    @ResponseBody
    public String getProductsByCategory(
        @PathVariable("categoryId") String categoryId
    ) {
        return "Hello, GET request!";
    }

    //GET PRODUCTS BY NAME
    @GetMapping("/getproductsbyname")
    @ResponseBody
    public String getProductsByName(
        @RequestParam("name") String name
    ) {
        return "Hello, GET request!";
    }
    
}
