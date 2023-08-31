package com.ecommerce.notification.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OTPRequest {
    @NotNull
    private String email;
}
