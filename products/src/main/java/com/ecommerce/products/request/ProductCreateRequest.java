package com.ecommerce.products.request;

import java.util.List;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ProductCreateRequest {
    
    @NotNull
    private String name;

    @NotNull
    private String description;

    @NotNull
    @Min(0)
    private int price;

    @NotNull
    @Min(0)
    private int stockQTY;

    private long categoryId;

    private List<Long> ImageIDList;

}
