package com.ecommerce.users.controller;

import com.ecommerce.users.request.AuthenticationRequest;
import com.ecommerce.users.request.RegisterRequest;
import com.ecommerce.users.response.AuthenticationResponse;
import com.ecommerce.users.response.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ) {
        AuthenticationResponse response = service.register(request);

        // Create HttpHeaders and add custom information to the headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-token", response.getAccessToken());
        headers.add("Refresh-token", response.getRefreshToken());

        // Return the ResponseEntity with the response body and custom headers
        return ResponseEntity.ok()
                .headers(headers)
                .body("New User Create Successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        AuthenticationResponse response = service.authenticate(request);

        // Create HttpHeaders and add custom information to the headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-token", response.getAccessToken());
        headers.add("Refresh-token", response.getRefreshToken());

        // Return the ResponseEntity with the response body and custom headers
        return ResponseEntity.ok()
                .headers(headers)
                 .body(response.getRefreshToken());
//               .body("User Login Successful");
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request,HttpServletResponse response ) throws IOException {
        service.refreshToken(request, response);
    }

}
