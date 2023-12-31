package com.ecommerce.transactions.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.transactions.entity.Transaction;
import com.ecommerce.transactions.request.TransactionRequest;
import com.ecommerce.transactions.response.ApiResponse;
import com.ecommerce.transactions.security.TokenValidate;
import com.ecommerce.transactions.service.TransactionService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    private final TokenValidate tokenValidate;
    
    @PostMapping("/addtransaction")
    public ResponseEntity<ApiResponse<Object>> addTransaction(
        @RequestBody TransactionRequest transactionRequest,
        @RequestHeader("Authorization") String tokenHeader
    ) throws Exception{
        String token = tokenHeader.substring(7);
        Claims claims = tokenValidate.parseToken(token);
        if (claims != null) {
            String emailString = claims.get("sub", String.class);
            String nameString = claims.get("UserName", String.class);
            Transaction trs = transactionService.addTransaction(transactionRequest, emailString, nameString);
            return ApiResponse.success("Sucess", trs);
        }else{
            String errorMessage = "Token is not valid";
            return ApiResponse.error(errorMessage);
        }
    }

    @GetMapping("/gettransaction/{userId}")
    public ResponseEntity<ApiResponse<Object>> getTransaction(
         @PathVariable("userId") Long UserId
    ) throws Exception{
        return ApiResponse.success("Sucess", transactionService.getTransactionByUserId(UserId));
    }

    @GetMapping("/test")
    public String test(){
        return "test ok";
    }
}

