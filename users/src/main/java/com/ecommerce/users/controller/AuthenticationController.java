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

        if(response.getStatus() =="User registered successfully"){
            // Set the tokens as cookies in the response
            Cookie accessTokenCookie = new Cookie("Access-token", response.getAccessToken());
            accessTokenCookie.setHttpOnly(true); // This prevents JavaScript access to the cookie
            accessTokenCookie.setMaxAge((int) (accessTokenExpiration / 1000)); // Convert to seconds
            httpResponse.addCookie(accessTokenCookie);

            Cookie refreshTokenCookie = new Cookie("Refresh-token", response.getRefreshToken());
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setMaxAge((int) (refreshTokenExpiration / 1000)); // Convert to seconds
            httpResponse.addCookie(refreshTokenCookie);

            // Return the ResponseEntity with the access token in the response body
            return ResponseEntity.ok()
//                    .body(response.getAccessToken());
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

        if(response.getStatus() =="User login Success"){
            // Set the tokens as cookies in the response
            Cookie accessTokenCookie = new Cookie("Access-token", response.getAccessToken());
            accessTokenCookie.setHttpOnly(true); // This prevents JavaScript access to the cookie
            accessTokenCookie.setMaxAge((int) (accessTokenExpiration / 1000)); // Convert to seconds
            httpResponse.addCookie(accessTokenCookie);

            Cookie refreshTokenCookie = new Cookie("Refresh-token", response.getRefreshToken());
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setMaxAge((int) (refreshTokenExpiration / 1000)); // Convert to seconds
            httpResponse.addCookie(refreshTokenCookie);

            // Return the ResponseEntity with the response body
            return ResponseEntity.ok()
//                    .body(response.getAccessToken());
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
