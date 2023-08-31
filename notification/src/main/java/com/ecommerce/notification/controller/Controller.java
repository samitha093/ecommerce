package com.ecommerce.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.notification.request.Commonrequest;
import com.ecommerce.notification.request.OTPRequest;
import com.ecommerce.notification.response.ApiResponse;
import com.ecommerce.notification.service.NotificationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/notification")
public class Controller {

    private final NotificationService notificationService;

    @PostMapping("/sendemail")
    public ResponseEntity<ApiResponse<Object>> sendNotification(
        @RequestBody Commonrequest request
    ) throws Exception {
        String Status = notificationService.sendEmail(request.getEmail(), request.getSubject(), request.getBody());
        return ApiResponse.success("success",Status );
    }

    @PostMapping("/otpsend")
    public ResponseEntity<ApiResponse<Object>> sendOTP(
        @RequestBody OTPRequest request
    ) throws Exception {
        String OTP = notificationService.sendotp(request.getEmail());
        return ApiResponse.success("success",OTP );
    }
}
