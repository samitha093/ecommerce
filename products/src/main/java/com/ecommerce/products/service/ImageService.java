package com.ecommerce.products.service;

import org.springframework.stereotype.Service;

import com.ecommerce.products.entity.Image;
import com.ecommerce.products.entity.mapper.ImageMapper;
import com.ecommerce.products.repository.ProductImageRepository;
import com.ecommerce.products.request.ImageRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageMapper imageMapper;
    private final ProductImageRepository productImageRepository;

    @Transactional
    public Image addImage(ImageRequest imageRequest, Long userId) {
        Image image = imageMapper.toEntityCreate(imageRequest, userId);
        return productImageRepository.save(image);
    }
    
}
