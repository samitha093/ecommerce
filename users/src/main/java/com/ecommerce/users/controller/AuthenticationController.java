package com.ecommerce.users.controller;

import com.ecommerce.users.request.AuthenticationRequest;
import com.ecommerce.users.request.RegisterRequest;
import com.ecommerce.users.response.AuthenticationResponse;
import com.ecommerce.users.services.AuthenticationService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse httpResponse // Inject HttpServletResponse
    ) {
        AuthenticationResponse response = service.register(request);

        if (response.getStatus().equals("User login Success")) {
            // Set the tokens as HTTP headers in the response
//            httpResponse.setHeader("Access-Token", response.getAccessToken());
            httpResponse.setHeader("Refresh-Token", response.getRefreshToken());

            // Return the ResponseEntity with the response body
            return ResponseEntity.ok()
                    .body(response.getStatus());
        }
        else {
            return ResponseEntity.badRequest()
                    .body(response.getStatus());
        }
    }

    @Value("${application.security.jwt.expiration}")
    private long accessTokenExpiration;

    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;

    @PostMapping("/login")
    public ResponseEntity<String> authenticate(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse httpResponse // Inject HttpServletResponse
    ) {
        AuthenticationResponse response = service.authenticate(request);

        if (response.getStatus().equals("User login Success")) {
            // Set the tokens as HTTP headers in the response
//            httpResponse.setHeader("Access-Token", response.getAccessToken());
            httpResponse.setHeader("Refresh-Token", response.getRefreshToken());

            // Return the ResponseEntity with the response body
            return ResponseEntity.ok()
                    .body(response.getStatus());
        }
        else {
            return ResponseEntity.badRequest()
                    .body(response.getStatus());
        }
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request,HttpServletResponse response ) throws IOException {
        service.refreshToken(request, response);
    }

}
