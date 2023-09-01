package com.ecommerce.transactions.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.transactions.entity.Transaction;
import com.ecommerce.transactions.request.TransactionRequest;
import com.ecommerce.transactions.response.ApiResponse;
import com.ecommerce.transactions.service.TransactionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/transactions")
public class TransactionController {

    private final TransactionService transactionService;
    
    @PostMapping("/addtransaction")
    public ResponseEntity<ApiResponse<Object>> addTransaction(
        @RequestBody TransactionRequest transactionRequest
    ) throws Exception{
        Transaction trs = transactionService.addTransaction(transactionRequest);
        return ApiResponse.success("Sucess", trs);
    }

    @GetMapping("/gettransaction/{userId}")
    public ResponseEntity<ApiResponse<Object>> getTransaction(
         @PathVariable("userId") Long UserId
    ) throws Exception{
        return ApiResponse.success("Sucess", transactionService.getTransactionByUserId(UserId));
    }
}
