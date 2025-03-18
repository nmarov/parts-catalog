package com.example.catalog.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "basket_items")
public class BasketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "part_id", nullable = false)
    private Part part;
    
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "basket_id")
    private Basket basket;

    @Column(nullable = false)
    private Integer quantity;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Part getPart() {
        return part;
    }

    public void setPart(Part part) {
        this.part = part;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    
    public Basket getBasket() {
        return basket;
    }
    
    public void setBasket(Basket basket) {
        this.basket = basket;
    }
}
