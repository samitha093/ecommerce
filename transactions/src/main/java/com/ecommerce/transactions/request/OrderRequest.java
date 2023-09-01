package com.ecommerce.transactions.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
        
            private Long productId;
    
            private Integer price; 
    
            private Integer quantity;
}
