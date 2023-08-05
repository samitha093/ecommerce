package com.ecommerce.products.entity.mapper;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.ecommerce.products.entity.Image;
import com.ecommerce.products.request.ImageRequest;
import com.ecommerce.products.util.ProductStatus;

@Component
public class ImageMapper {

    public Image toEntityCreate(ImageRequest imageRequest, Long userId) {
        Image image = new Image();
        image.setImageName(imageRequest.getImageName());
        image.setContentType(imageRequest.getContentType());
        image.setImageData(imageRequest.getImageData());
        image.setCreatedById(userId);
        image.setUpdatedById(userId);
        image.setCreatedAt(LocalDateTime.now());
        image.setUpdatedAt(LocalDateTime.now());
        image.setStatus(ProductStatus.APPROVED);
        return image;
    }
    
}
