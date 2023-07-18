package com.example.demo.controller;

import com.example.demo.entity.Login;
import com.example.demo.entity.LoginResponse;
import com.example.demo.entity.User;
import com.example.demo.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

public class UserController {

    private final UserServices userServices;
    @Autowired
    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }
    @PostMapping("/addUser")
    public void addProduct(@RequestBody User user){
        userServices.addNewUser(user);
    }
    @GetMapping("/getUser")
    public User getProduct(@RequestParam Long id){
        User product = userServices.getUserId(id);
        return product;

    }
    @PostMapping("/loginUser")
    public ResponseEntity<String> loginUser(@RequestBody Login user) {
        System.out.println("Login attempt for user: " + user.getEmail());
        System.out.println("Password hash: " + user.getPassword());
        try {
            // Call the service to attempt login
            LoginResponse loginResponse = userServices.loginUser(user.getEmail(), user.getPassword());

            if (loginResponse.isLogin()) {
                return ResponseEntity.ok(loginResponse.toJson());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            // Handle any unexpected errors during login
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
        }
    }
}
