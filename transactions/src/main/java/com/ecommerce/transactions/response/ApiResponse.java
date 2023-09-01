package com.ecommerce.transactions.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
public class ApiResponse<T> {

    private boolean status;
    private String message;
    private T data;

    public static <T> ResponseEntity<ApiResponse<T>> success(String message, T data) {
        ApiResponse<T> apiResponse = new ApiResponse<>(true, message, data);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    public static <T> ResponseEntity<ApiResponse<T>> error(String message) {
        ApiResponse<T> apiResponse = new ApiResponse<>(false, message, null);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}

