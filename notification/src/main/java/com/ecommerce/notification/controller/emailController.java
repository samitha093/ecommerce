package com.ecommerce.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.notification.request.commonrequest;
import com.ecommerce.notification.response.ApiResponse;
import com.ecommerce.notification.service.notificationService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/notification")
public class emailController {

    private final notificationService notificationservice;

    @PostMapping("/sendemail")
    public ResponseEntity<ApiResponse<Object>> sendNotification(
        @RequestBody String request
    ) throws Exception {
         System.out.println(request);
        return ApiResponse.success("success", null);
    }

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public ResponseEntity<String> sayHello(
        @RequestBody String request 
    ) {
         System.out.println(request);
        return ResponseEntity.ok("Hello from secured endpoint");
    }
    
    
}
