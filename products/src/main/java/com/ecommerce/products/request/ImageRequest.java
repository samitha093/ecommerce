package com.ecommerce.products.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageRequest {
            
        @NotNull
        private String imageName;
    
        @NotNull
        private String contentType;
    
        @NotNull
        private String imageData;
    
}
