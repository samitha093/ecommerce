package com.example.demo.controller;

import com.example.demo.request.RequestLogin;
import com.example.demo.response.ResponseLogin;
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
    public void addUser(@RequestBody User user){
        userServices.addNewUser(user);
    }
    @GetMapping("/getUser")
    public User getUser(@RequestParam Long id){
        User user = userServices.getUserId(id);
        return user;

    }
    @PostMapping("/loginUser")
    public ResponseEntity<String> loginUser(@RequestBody RequestLogin user) {

        try {
            // Call the service to attempt login
            ResponseLogin login = userServices.loginUser(user);

            if (login.isLogin()) {
                return ResponseEntity.ok(login.toJson());
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } catch (Exception e) {
            // Handle any unexpected errors during login
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during login");
        }
    }
}
