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

    @Transactional
    public Image getImageentityById(Long ImageId) {
        Image image = productImageRepository.findById(ImageId).orElse(null);
        if (image != null) {
            return image;     
        }else {
            return null;
        }
    }

    @Transactional
    public ImageDTO getImageById(Long ImageId) {
        Image image =  getImageentityById(ImageId);
        if (image != null) {
            return new ImageDTO(image.getId(), image.getImageName(), image.getContentType(), image.getImageData());     
        }else {
            return null;
        }
    }

    @Transactional
    public String deleteImage(Long ImageId) {
        ImageDTO data = getImageById(ImageId);
        if (data == null){
            String ErrorMessage = "Image with id " + ImageId + " not found";
            return ErrorMessage;
        }
        productImageRepository.deleteById(ImageId);
        return null;
    }

    @Transactional
    public Image updateImage(Long imageId, ImageRequest imageRequest, Long userId) {
        Image image = productImageRepository.findById(imageId).orElse(null);
        if (image != null) {
            image.setImageName(imageRequest.getImageName());
            image.setContentType(imageRequest.getContentType());
            image.setImageData(imageRequest.getImageData());
            return productImageRepository.save(image);
        }
        return null;
    }   
}
