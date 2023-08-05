package com.ecommerce.products.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ecommerce.products.dto.ImageDTO;
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

    public List<ImageDTO> getAllImages() {
        List<Image> images = productImageRepository.findAll();
        if (images != null) {
        return images.stream()
                .map(image -> new ImageDTO(image.getId(), image.getImageName(), image.getContentType(), image.getImageData()))
                .collect(Collectors.toList());
        }else {
            return null;
        }
    }

    public ImageDTO getImageById(Long categoryId) {
        Image image = productImageRepository.findById(categoryId).orElse(null);
        if (image != null) {
            return new ImageDTO(image.getId(), image.getImageName(), image.getContentType(), image.getImageData());     
        }else {
            return null;
        }
    }   
    
}
