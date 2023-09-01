package com.ecommerce.products.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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


import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/images")
public class ImageController {

    private final TokenValidate tokenValidate;
    private final ImageService imageService;
    private final ImageDTOMapper imageMapper;
    private final ImageRequestValidator ImageRequestValidator;

    @Value("${upload.directory}")
    private String uploadDirectory;

    @GetMapping("/images/{imageName:.+}")
    public ResponseEntity<Resource> viewImage(@PathVariable String imageName) throws IOException {
        Path imagePath = Paths.get(uploadDirectory, imageName);
        Resource imageResource = new FileSystemResource(imagePath);

        System.out.println(imageResource);

        if (imageResource.exists() && imageResource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageResource);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }

        try {
            String originalFileName = file.getOriginalFilename();
            String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
            
            // Generate a random filename using UUID
            String randomFileName = UUID.randomUUID().toString() + extension;

            Path imagePath = Paths.get(uploadDirectory, randomFileName);
            File destFile = imagePath.toFile();

            // Save the uploaded file to the specified directory
            file.transferTo(destFile);

            return ResponseEntity.ok("http://localhost:8082/v1/images/images/" + randomFileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }
    
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
                return ApiResponse.error(errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.error(errorMessage);
        }
        //Request Validation
        ImageRequestValidator.validate(imageRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .collect(Collectors.toList());
            return ApiResponse.error(errors.toString());
        }
        // Send to the service layer
        try {
            Image image = imageService.addImage(imageRequest, UserId);
            ImageDTO imageDTO = imageMapper.toDTO(image);
            return ApiResponse.success("Success", imageDTO);
        } catch (Exception e) {
            String errorMessage = "Error in Saving image on databse";
            return ApiResponse.error(errorMessage);
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
                return ApiResponse.error(errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.error( errorMessage);
        }
        //Request Validation
        ImageRequestValidator.validate(imageRequest, bindingResult);
        if (bindingResult.hasErrors()) {
            List<String> errors = bindingResult.getAllErrors().stream()
                    .map(objectError -> objectError.getDefaultMessage())
                    .collect(Collectors.toList());
            return ApiResponse.error(errors.toString());
        }
        // Send to the service layer
        try {
            imageService.updateImage(ImageId, imageRequest, UserId);
        } catch (Exception e) {
            String errorMessage = "Error in updating image on databse";
            return ApiResponse.error(errorMessage);
        }
        //send all data to api ;ayer
        try{
            List<ImageDTO> imageList = imageService.getAllImages();
            return ApiResponse.success("Success", imageList);
        }catch(Exception e){
            String errorMessage = "Error in getting images from database";
            return ApiResponse.error(errorMessage);
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
                return ApiResponse.error(errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.error(errorMessage);
        }
        // Send to the service layer
        try {
            String dataReturn = imageService.deleteImage(ImageId);
            if (dataReturn != null) {
                return ApiResponse.error(dataReturn);
            }
                    //send all data to api ;ayer
            try{
                List<ImageDTO> imageList = imageService.getAllImages();
                return ApiResponse.success("Success", imageList);
            }catch(Exception e){
                String errorMessage = "Error in getting images from database";
                return ApiResponse.error(errorMessage);
            }
        } catch (Exception e) {
            String errorMessage = "Error in deleting image from database";
            return ApiResponse.error(errorMessage);
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
                return ApiResponse.error(errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.error(errorMessage);
        }
        // Send to the service layer
        ImageDTO imageDTO = imageService.getImageById(ImageId);
        if (imageDTO != null) {
            return ApiResponse.success("Success", imageDTO);
        } else {
            String errorMessage = "Image not found";
            return ApiResponse.error(errorMessage);
        }
    }

    //GET ALL IMAGES
    @GetMapping("/getallimages")
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
                return ApiResponse.error(errorMessage);
            }
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.error(errorMessage);
        }
        // Send to the service layer
        try{
            List<ImageDTO> imageList = imageService.getAllImages();
            return ApiResponse.success("Success", imageList);
        }catch(Exception e){
            String errorMessage = "Error in getting images from database";
            return ApiResponse.error(errorMessage);
        }
    }

}
