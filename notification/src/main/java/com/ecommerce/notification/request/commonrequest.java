package com.ecommerce.notification.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class commonrequest {

    @NotNull
    private String body;

    @NotNull
    private String subject;

    @NotNull
    private String email;
    
}
