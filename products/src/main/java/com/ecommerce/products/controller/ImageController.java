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

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/images")
public class ImageController {
    
    //ADD NEW IMAGE
    @PostMapping("/addnewimage")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> addImage(
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
