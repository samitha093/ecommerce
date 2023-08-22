package com.ecommerce.products.service;

import org.springframework.stereotype.Service;

import com.ecommerce.products.entity.Product;
import com.ecommerce.products.entity.mapper.ProductMapper;
import com.ecommerce.products.repository.ProductRepository;
import com.ecommerce.products.request.ProductCreateRequest;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;
    private final ProductRepository productRepository;
    
    @Transactional
    public Product addProduct(ProductCreateRequest productCreateRequest, Long userId) {
        Product product = productMapper.toEntityCreate(productCreateRequest,userId);
        return productRepository.save(product);
    }
    @Transactional
    public List<Product> getAllProduct() {
        List<Product> products = productRepository.findAll();
        return products;
    }

    @Transactional
    public Product getbyProductId(Long productId) {
        System.out.println(productId);
        Product product = productRepository.findById(productId).orElse(null);
        return product;
    }

    public String deleteProduct(Long productId) {
        Product product = getbyProductId(productId);
        if(product == null){
            String ErrorMessage = "Image with id " + productId + " not found";
            return ErrorMessage;
        }

        productRepository.deleteById(productId);
        return null;
    }
}
