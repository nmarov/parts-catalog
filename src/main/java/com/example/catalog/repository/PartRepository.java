package com.example.catalog.repository;

import com.example.catalog.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartRepository extends JpaRepository<Part, Long> {
    List<Part> findByCategoryId(Long categoryId);
}
