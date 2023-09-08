package com.ecommerce.transactions.service;

import com.ecommerce.transactions.entity.Order;
import com.ecommerce.transactions.request.OrderRequest;
import org.springframework.stereotype.Service;

import com.ecommerce.transactions.entity.Transaction;
import com.ecommerce.transactions.repository.TransactionRepository;
import com.ecommerce.transactions.request.TransactionRequest;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final NotifyService notifyService;


    public Transaction addTransaction(TransactionRequest transactionRequest, String emailString, String nameString) {

        Transaction transaction = new Transaction();
        transaction.setUserId(transactionRequest.getUserId());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setStreet(transactionRequest.getStreet());
        transaction.setCity(transactionRequest.getCity());
        transaction.setState(transactionRequest.getState());
        transaction.setPostalCode(transactionRequest.getPostalCode());
        transaction.setCountry(transactionRequest.getCountry());

        List<Order> orders = new ArrayList<>();

        if (transactionRequest.getOrders() != null) {
            for (OrderRequest orderRequest : transactionRequest.getOrders()) {
                Order orderEntity = new Order();
                orderEntity.setProductId(orderRequest.getProductId());
                orderEntity.setQuantity(orderRequest.getQuantity());
                orderEntity.setPrice(orderRequest.getPrice());
                orderEntity.setTransaction(transaction);
                orders.add(orderEntity);
            }
        }

        transaction.setOrders(orders);

        Transaction trs = transactionRepository.save(transaction);
        notifyService.sendNotification(trs, emailString, nameString);
        return trs;
    }

    public List<Transaction> getTransaction() {
        return transactionRepository.findAll();
    }

    public List<Transaction> getTransactionByUserId(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
    
}
