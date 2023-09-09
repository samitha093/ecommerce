package com.ecommerce.users.controller;

import com.ecommerce.users.request.AuthenticationRequest;
import com.ecommerce.users.request.OptAddRequest;
import com.ecommerce.users.request.RegisterRequest;
import com.ecommerce.users.request.VerifyUserRequest;
import com.ecommerce.users.response.AuthenticationResponse;
import com.ecommerce.users.services.AuthenticationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;
    // Inject the value from application.yml
    @Value("${otp.url}")
    private String otpUrl;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request,
            HttpServletResponse httpResponse // Inject HttpServletResponse
    ) {
        System.out.println("register request: " + request);
        AuthenticationResponse response = service.register(request);

        if (response.getStatus().equals("User registered successfully")) {
            System.out.println("user registered successfully");


                // Send a POST request to the notification service
                String userEmail = request.getEmail();
                System.out.println("userEmail: " + userEmail);
                //get url from application properties in opt : url

                String host = otpUrl;

                // Create an instance of RestTemplate
                RestTemplate restTemplate = new RestTemplate();

                // Set the request body (user email) as JSON
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON); // Set the content type to JSON
                String jsonRequest = "{\"email\": \"" + userEmail + "\"}"; // JSON format
            try {
                HttpEntity<String> requestEntity = new HttpEntity<>(jsonRequest, headers);

                // Send a POST request to the notification service
                ResponseEntity<String> responseEntity = restTemplate.exchange(host, HttpMethod.POST, requestEntity, String.class);

                // Print the response body
                System.out.println("Response Body: " + responseEntity.getBody());

                String responseBody = responseEntity.getBody();

                // Parse the JSON response to extract the "data" field's value
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(responseBody);
                String dataValue = rootNode.path("data").asText();

                System.out.println("data: " + dataValue);
                OptAddRequest otpRequest = new OptAddRequest();
                otpRequest.setEmail(userEmail);
                otpRequest.setOtp(Integer.parseInt(dataValue));
                AuthenticationResponse otpResponse = service.otpAdd(otpRequest);

                if (otpResponse.getStatus().equals("User otp added successfully")) {
                    // Set the tokens as HTTP headers in the response
                    httpResponse.setHeader("Refresh-Token", response.getRefreshToken());
                    // Return the ResponseEntity with the response body
                    return ResponseEntity.ok()
                            .body(response.getStatus());
                }
                else {
                    return ResponseEntity.badRequest()
                            .body(response.getStatus());
                }

            } catch (RestClientException e) {
                // Handle exceptions, e.g., connection errors, here
                System.err.println("Error sending the email: " + e.getMessage());
                return ResponseEntity.badRequest()
                        .body("Error sending the email: " + e.getMessage());
            } catch (JsonMappingException e) {
                throw new RuntimeException(e);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

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
    public ResponseEntity<String> login(
            @RequestBody AuthenticationRequest request,
            HttpServletResponse httpResponse // Inject HttpServletResponse
    ) {
        System.out.println("login request: " + request);
        AuthenticationResponse response = service.authenticate(request);

        if (response.getStatus().equals("User login Success")) {
            // Set the tokens as HTTP headers in the response
//            httpResponse.setHeader("Access-Token", response.getAccessToken());
            httpResponse.setHeader("Refresh-Token", response.getRefreshToken());

            // Return the ResponseEntity with the response body
            return ResponseEntity.ok()
//                    .body(response.getRefreshToken()+","+response.getAccessToken());
             .body(response.getAccessToken());
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

    //user verification using email endpoint
    @GetMapping("/verify-user/{email}/{otp}")
    public ResponseEntity<String> verifyUser(
            @PathVariable("email") String email,
            @PathVariable("otp") int otp
    ) {
        System.out.println("verifyUser request: " + email + " " + otp);
        // Create a VerifyUserRequest object if needed
        VerifyUserRequest request = new VerifyUserRequest();
        request.setEmail(email);
        request.setOtp(otp);

        AuthenticationResponse response = service.verifyUser(request);

        if (response.getStatus().equals("User verified successfully")) {
            return ResponseEntity.ok()
                    .body(response.getStatus());
        } else {
            return ResponseEntity.badRequest()
                    .body(response.getStatus());
        }
    }

    //otp add
    @PostMapping("/otp-add")
    public ResponseEntity<String> otpAdd(
            @RequestBody OptAddRequest request,
            HttpServletResponse httpResponse // Inject HttpServletResponse
    ) {
        AuthenticationResponse response = service.otpAdd(request);
        if (response.getStatus().equals("User otp added successfully")) {
            return ResponseEntity.ok()
                    .body(response.getStatus());
        }
        else {
            return ResponseEntity.badRequest()
                    .body(response.getStatus());
        }
    }

}
