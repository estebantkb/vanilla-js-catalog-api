package com.example.catalog_backend.service;

import com.example.catalog_backend.model.Product;
import com.example.catalog_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(String search) {
        if (search == null || search.isBlank()) {
            return productRepository.findAll();
        }

        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search);
    }
}