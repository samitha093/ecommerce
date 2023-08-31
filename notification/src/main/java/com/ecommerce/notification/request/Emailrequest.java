package com.ecommerce.notification.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emailrequest {
    @NotNull
    private String body;

    @NotNull
    private String subject;

    @NotNull
    private String email;
}
