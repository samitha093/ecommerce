package com.ecommerce.products.controller;

import java.util.List;
import java.util.stream.Collectors;

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

import com.ecommerce.products.dto.ImageDTO;
import com.ecommerce.products.dto.mapper.ImageDTOMapper;
import com.ecommerce.products.entity.Image;
import com.ecommerce.products.request.ImageRequest;
import com.ecommerce.products.response.ApiResponse;
import com.ecommerce.products.security.TokenValidate;
import com.ecommerce.products.service.ImageService;
import com.ecommerce.products.validation.ImageRequestValidator;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/images")
public class ImageController {

    private final TokenValidate tokenValidate;
    private final ImageService imageService;
    private final ImageDTOMapper imageMapper;
    private final ImageRequestValidator ImageRequestValidator;
    
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
        ImageRequestValidator.validate(imageRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .collect(Collectors.toList());
            return ApiResponse.success("Success", errors);
        }
        // Send to the service layer
        try {
            Image image = imageService.addImage(imageRequest, UserId);
            ImageDTO imageDTO = imageMapper.toDTO(image);
            return ApiResponse.success("Success", imageDTO);
        } catch (Exception e) {
            String errorMessage = "Error in Saving image on databse";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //UPDATE IMAGE
    @PutMapping("/updateimage/{ImageId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> updateImage(
        @PathVariable("ImageId") Long ImageId,
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
        ImageRequestValidator.validate(imageRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .collect(Collectors.toList());
            return ApiResponse.success("Success", errors);
        }
        // Send to the service layer
        try {
            Image image = imageService.updateImage(ImageId, imageRequest, UserId);
            ImageDTO imageDTO = imageMapper.toDTO(image);
            return ApiResponse.success("Success", imageDTO);
        } catch (Exception e) {
            String errorMessage = "Error in updating image on databse";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //DELETE IMAGE
    @DeleteMapping("/deleteimage/{ImageId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> deleteImage(
        @PathVariable("ImageId") Long ImageId,
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
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try {
            String dataReturn = imageService.deleteImage(ImageId);
            if (dataReturn != null) {
                return ApiResponse.success("Success", dataReturn);
            }
            String successMessage = "Image deleted successfully";
            return ApiResponse.success("Success", successMessage);
        } catch (Exception e) {
            String errorMessage = "Error in deleting image from databse";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //GET IMAGE BY ID
    @GetMapping("/getimagebyid/{ImageId}")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getImageById(
        @PathVariable("ImageId") Long ImageId,
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
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        ImageDTO imageDTO = imageService.getImageById(ImageId);
        if (imageDTO != null) {
            return ApiResponse.success("Success", imageDTO);
        } else {
            String errorMessage = "Image not found";
            return ApiResponse.success("Success", errorMessage);
        }
    }

    //GET ALL IMAGES
    @GetMapping("/gealltimages")
    @ResponseBody
    public ResponseEntity<ApiResponse<Object>> getImages(
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
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.success("Success", errorMessage);
        }
        // Send to the service layer
        try{
            List<ImageDTO> imageList = imageService.getAllImages();
            return ApiResponse.success("Success", imageList);
        }catch(Exception e){
            String errorMessage = "Error in getting images from database";
            return ApiResponse.success("Success", errorMessage);
        }
    }

}
