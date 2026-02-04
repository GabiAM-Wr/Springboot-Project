package com.example.springbootcrud.repository;

import com.example.springbootcrud.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Custom query methods
    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    
    List<Product> findByQuantityGreaterThan(Integer quantity);
}
