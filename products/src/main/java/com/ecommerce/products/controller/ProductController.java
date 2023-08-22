package com.ecommerce.products.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.products.entity.Product;
import com.ecommerce.products.entity.mapper.ProductMapper;
import com.ecommerce.products.request.ProductCreateRequest;
import com.ecommerce.products.response.ApiResponse;
import com.ecommerce.products.security.TokenValidate;
import com.ecommerce.products.service.ProductService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/products")
public class ProductController {

    private final TokenValidate tokenValidate;
    private final ProductService productService;
    
    //ADD NEW IMAGE
    @PostMapping("/addnewproduct")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> addImage(
        @RequestBody ProductCreateRequest productRequest,
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
        // Send to the service layer
        try {
            Product product = productService.addProduct(productRequest,UserId);
            return ApiResponse.success("Success", product);
        } catch (Exception e) {
            String errorMessage = "Error in Saving product on database";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //GET IMAGE BY ID
    @GetMapping("/getproductbyid/{ProductId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getImageById(
            @PathVariable("ProductId") Long ProductId,
            @RequestHeader("Authorization") String tokenHeader
    ) throws Exception {
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                Long.valueOf(idString);
            } catch (NumberFormatException e) {
                String errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        } else {
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try{
            Product product = productService.getbyProductId(ProductId);
            return ApiResponse.success("Success", product);
        }catch(Exception e){
            String errorMessage = "Error in getting images from database";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //GET ALL PRODUCTS
    @GetMapping("/getallProducts")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getAllProducts(
            @RequestHeader("Authorization") String tokenHeader
    )throws Exception{
        // Autherization
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String idString = claims.get("id", String.class);
            try {
                Long.valueOf(idString);
            } catch (NumberFormatException e) {
                String errorMessage = "Invalid user ID in the token.";
                return ApiResponse.success("Success", errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try{
            List<Product> ProductList = productService.getAllProduct();
            return ApiResponse.success("Success", ProductList);
        }catch(Exception e) {
            String errorMessage = "Error in getting product from database";
            return ApiResponse.success("Success", errorMessage);
        }
    }
}
