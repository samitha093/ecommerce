package com.ecommerce.transactions.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
    
        private Long userId;

        private Integer amount;

        private String street;

        private String city;

        private String state;

        private String postalCode;

        private String country;

        private OrderRequest[] orders;
    
}
