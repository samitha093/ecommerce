package com.ecommerce.products.entity.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.ecommerce.products.entity.Image;
import com.ecommerce.products.entity.Product;
import com.ecommerce.products.request.ProductCreateRequest;
import com.ecommerce.products.service.CategoryService;
import com.ecommerce.products.service.ImageService;
import com.ecommerce.products.util.ProductStatus;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ProductMapper {

    private final CategoryService categoryService;
    private final ImageService imageService;

    public Product toEntityCreate(ProductCreateRequest productCreateRequest, Long userId) {
        Product product = new Product();
        product.setStatus(ProductStatus.APPROVED);
        product.setProductName(productCreateRequest.getName());
        product.setDescription(productCreateRequest.getDescription());
        product.setPrice(productCreateRequest.getPrice());
        product.setStockQTY(productCreateRequest.getStockQTY());
        product.setSoldQTY(0);
        product.setCreatedById(userId);
        product.setUpdatedById(userId);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        product.setCategory(categoryService.getCategoryentityById(productCreateRequest.getCategoryId()));
        for (Long imageId : productCreateRequest.getImageIDList()) {
          Image image = imageService.getImageentityById(imageId);
          product.addImage(image);
        }
        return product;
    }
    
}
