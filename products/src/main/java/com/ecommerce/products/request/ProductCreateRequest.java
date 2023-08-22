package com.ecommerce.products.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateRequest {

    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    private int price;

    @NotNull
    private int stockQTY;

    @NotNull
    private long categoryId;

    @NotNull
    private List<Long> ImageIDList;

}
