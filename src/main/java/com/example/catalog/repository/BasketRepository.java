package com.example.catalog.repository;

import com.example.catalog.model.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket, Long> {
    @Query("SELECT b FROM Basket b LEFT JOIN FETCH b.items i LEFT JOIN FETCH i.part WHERE b.id = :id")
    Optional<Basket> findByIdWithItems(@Param("id") Long id);
}
