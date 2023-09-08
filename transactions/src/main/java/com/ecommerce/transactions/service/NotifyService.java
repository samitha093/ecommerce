package com.ecommerce.transactions.service;

import java.text.SimpleDateFormat;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.ecommerce.transactions.entity.Order;
import com.ecommerce.transactions.entity.Transaction;

import java.util.Date;

@Service
public class NotifyService {

    @Value("${notification.url}")
    private String notificationUrl;

    public void sendNotification(Transaction transaction, String emailString, String nameString) {
        // Create an instance of RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Set up the request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

                // Get the current date
        Date currentDate = new Date();

        // Define the desired date format
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM dd, yyyy");

        // Format the current date as a string
        String formattedDate = dateFormat.format(currentDate);

        String Address = "<h2>Billing address</h2>" +
                "<p>"+nameString+"<br>" +
                transaction.getStreet() + "<br>" +
                transaction.getCity() + ", " + "<br>" + transaction.getState() + " " + "<br>" + transaction.getPostalCode() + "<br>"+
                transaction.getCountry() + "</p>";

        String order = "<h2>order #" + transaction.getId() + " (" + formattedDate + ")</h2>"+
        "<table>"+
            "<thead>"+
                "<tr>"+
                "<th style=\\\"text-align: left;\\\">Product</th>"+
                "<th style=\\\"text-align: left;\\\">Quantity</th>"+
                "<th style=\\\"text-align: left;\\\">Price</th>"+
                "</tr>"+
            "</thead>"+
            "<tbody>";
            
        java.util.List<Order> orders = transaction.getOrders();
        for (Order temporder : orders) {
                order += "<tr>" +
                "<td>" + temporder.getProductId() + "</td>" +
                "<td>" + temporder.getQuantity() + "</td>" +
                "<td>LKR. " + temporder.getPrice() + "</td>" +
                "</tr>";
        }

        order += "</tbody>"+
            "<tfoot>"+
                "<tr>"+
                    "<td colspan=\\\"2\\\">Total</td>"+
                    "<td>LKR. "+transaction.getAmount()+".00</td>"+
                "</tr>"+
                "<tr>"+
                    "<td colspan=\\\"2\\\">Payment method</td>"+
                    "<td>COD</td>"+
                "</tr>"+
            "</tfoot>"+
        "</table>";

        String htmlBody = "<p>Your order has been received and is now being processed. Your order details are:</p>"+order+ Address;


        String requestBody = "{\"body\": \"" + htmlBody + "\", \"subject\": \"Thank you for your order.\", \"email\": \"" + emailString + "\"}";

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
