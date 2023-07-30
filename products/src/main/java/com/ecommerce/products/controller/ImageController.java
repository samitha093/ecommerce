package com.ecommerce.products.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/images")
public class ImageController {
    
    //ADD NEW IMAGE
    @PostMapping("/addnewimage")
    @ResponseBody
    public String addImage() {
        return "Hello, GET request!";
    }

    //DELETE IMAGE
    @DeleteMapping("/deleteimage")
    @ResponseBody
    public String deleteImage() {
        return "Hello, GET request!";
    }

    //UPDATE IMAGE
    @PutMapping("/updateimage")
    @ResponseBody
    public String updateImage() {
        return "Hello, GET request!";
    }

    //GET ALL IMAGES
    @GetMapping("/gealltimages")
    @ResponseBody
    public String getImages() {
        return "Hello, GET request!";
    }

    //GET IMAGE BY ID
    @GetMapping("/getimagebyid")
    @ResponseBody
    public String getImageById() {
        return "Hello, GET request!";
    }

}
