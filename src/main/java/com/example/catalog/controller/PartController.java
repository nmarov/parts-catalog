package com.example.catalog.controller;

import com.example.catalog.model.Part;
import com.example.catalog.repository.PartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PartController {
    private final PartRepository partRepository;

    public PartController(PartRepository partRepository) {
        this.partRepository = partRepository;
    }

    @GetMapping
    public List<Part> getAllParts() {
        return partRepository.findAll();
    }

    @PostMapping
    public Part createPart(@RequestBody Part part) {
        return partRepository.save(part);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Part> getPartById(@PathVariable Long id) {
        return partRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{categoryId}")
    public List<Part> getPartsByCategory(@PathVariable Long categoryId) {
        return partRepository.findByCategoryId(categoryId);
    }
}
