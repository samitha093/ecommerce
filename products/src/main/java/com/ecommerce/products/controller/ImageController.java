package com.ecommerce.products.controller;

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

import com.ecommerce.products.request.ImageRequest;
import com.ecommerce.products.response.ApiResponse;
import com.ecommerce.products.security.TokenValidate;
import com.ecommerce.products.service.ImageService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/images")
public class ImageController {

    private final TokenValidate tokenValidate;
    private final ImageService imageService;
    
    //ADD NEW IMAGE
    @PostMapping("/addnewimage")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> addImage(
        @RequestBody ImageRequest imageRequest,
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
            imageService.addImage(imageRequest, UserId);
        } catch (Exception e) {
            String errorMessage = "Error in Saving image on databse";
            return ApiResponse.success("Success", errorMessage);
        }
        // Return the response
        return null;
    }

    //UPDATE IMAGE
    @PutMapping("/updateimage/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> updateImage(
        @PathVariable("categoryId") Long categoryId,
        @RequestBody ImageRequest imageRequest,
        @RequestHeader("Authorization") String tokenHeader,
        BindingResult bindingResult
    ) throws Exception {
        // Autherization
        //Request Validation
        // Send to the service layer
        // Return the response
        return null;
    }

    //DELETE IMAGE
    @DeleteMapping("/deleteimage/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> deleteImage(
        @PathVariable("categoryId") Long categoryId,
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception {
        // Autherization
        // Send to the service layer
        // Return the response
        return null;
    }

    //GET IMAGE BY ID
    @GetMapping("/getimagebyid/{categoryId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getImageById(
        @PathVariable("categoryId") Long categoryId,
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception {
        // Autherization
        // Send to the service layer
        // Return the response
        return null;
    }

    //GET ALL IMAGES
    @GetMapping("/gealltimages")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getImages(
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception {
        // Autherization
        // Send to the service layer
        // Return the response
        return null;
    }

}
