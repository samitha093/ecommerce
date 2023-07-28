package com.ecommerce.users.controller;
import com.ecommerce.users.request.RequestLogin;
import com.ecommerce.users.response.ResponseLogin;
import com.ecommerce.users.entity.User;
import com.ecommerce.users.services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;

@RestController
public class UserController {

    private final UserServices userServices;

    @Autowired
    public UserController(UserServices userServices) {
        this.userServices = userServices;
    }

    @CrossOrigin(origins = "http://localhost:5173") // Add this annotation to enable CORS for loginUser
    @PostMapping("/addUser")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        boolean userAddedResponse = userServices.addNewUser(user);
        if(userAddedResponse == true){
            return ResponseEntity.ok("User added successfully");
        }
        else {
            return ResponseEntity.ok("User already exist");
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser(@RequestParam Long id) {
        User user = userServices.getUserId(id);
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "http://localhost:5173") // Add this annotation to enable CORS for loginUser
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
