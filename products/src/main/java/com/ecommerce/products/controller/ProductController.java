package com.ecommerce.products.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.products.request.ProductCreateRequest;
import com.ecommerce.products.response.ApiResponse;
import com.ecommerce.products.security.TokenValidate;
import com.ecommerce.products.service.ProductService;

import io.jsonwebtoken.Claims;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/products")
public class ProductController {

    private final TokenValidate tokenValidate;
    private final ProductService productService;

    //ADD NEW PRODUCT 
    @PostMapping("/addnewproduct")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> addProduct(
        @RequestBody ProductCreateRequest productCreateRequest,
        @RequestHeader("Authorization") String tokenHeader,
        BindingResult bindingResult
    ) throws Exception{
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
        return null;
    }

    //UPDATE PRODUCT
    @PutMapping("/updateproduct/{id}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> updateProduct(
         @PathVariable("id") String id,
         @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        return null;
    }

    //DELETE PRODUCT
    @DeleteMapping("/deleteproduct/{id}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> deleteProduct(
         @PathVariable("id") String id,
         @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        return null;
    }

    //GET PRODUCT BY ID
    @GetMapping("/getproductbyid/{id}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getProductById(
        @PathVariable("id") String id,
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        return null;
    }

    //GET ALL PRODUCTS
    @GetMapping("/getallproducts")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getAllProducts(
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        return null;
    }
    
    //GET PRODUCTS BY CATEGORY
    @GetMapping("/getproductsbycategory/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getProductsByCategory(
        @PathVariable("categoryId") String categoryId,
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        return null;
    }

    //GET PRODUCTS BY NAME
    @GetMapping("/getproductsbyname/{name}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getProductsByName(
        @RequestParam("name") String name,
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        return null;
    }
    
}
