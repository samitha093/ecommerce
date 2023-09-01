package com.ecommerce.transactions.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.ecommerce.transactions.entity.Transaction;

@Service
public class NotifyService {

    @Value("${notification.url}")
    private String notificationUrl;

    public void sendNotification(Transaction transaction) {
        // Create an instance of RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Set up the request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create the request body as a JSON object
        String requestBody = "{\"body\": \"string\", \"subject\": \"Tank you for your order.\", \"email\": \"slakshanpathiraja@gmail.com\"}";

        // Create the HTTP entity with headers and body
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            // Send the POST request and capture the response
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(notificationUrl, requestEntity, String.class);

            String response = responseEntity.getBody();
            System.out.println("Received response from notification server: " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
