package com.ecommerce.products.dto.mapper;

import org.springframework.stereotype.Component;

import com.ecommerce.products.dto.ImageDTO;
import com.ecommerce.products.entity.Image;

@Component
public class ImageDTOMapper {
    
    public ImageDTO toDTO(Image image) {
        ImageDTO imageDTO = new ImageDTO();
        imageDTO.setId(image.getId());
        imageDTO.setImageName(image.getImageName());
        imageDTO.setContentType(image.getContentType());
        imageDTO.setImageData(image.getImageData());
        return imageDTO;
    }

}
