package com.example.catalog.controller;

import com.example.catalog.model.Basket;
import com.example.catalog.model.BasketItem;
import com.example.catalog.repository.BasketRepository;
import com.example.catalog.repository.PartRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/basket")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BasketController {
    private final BasketRepository basketRepository;
    private final PartRepository partRepository;

    public BasketController(BasketRepository basketRepository, PartRepository partRepository) {
        this.basketRepository = basketRepository;
        this.partRepository = partRepository;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Basket> getBasket(@PathVariable Long id) {
        return basketRepository.findByIdWithItems(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Basket createBasket() {
        return basketRepository.save(new Basket());
    }

    @PostMapping("/{basketId}/items")
    public ResponseEntity<Basket> addItemToBasket(
            @PathVariable Long basketId,
            @RequestParam Long partId,
            @RequestParam Integer quantity) {
        
        return basketRepository.findById(basketId)
                .flatMap(basket -> partRepository.findById(partId)
                        .map(part -> {
                            BasketItem item = new BasketItem();
                            item.setPart(part);
                            item.setQuantity(quantity);
                            item.setBasket(basket);
                            basket.getItems().add(item);
                            return ResponseEntity.ok(basketRepository.save(basket));
                        }))
                .orElse(ResponseEntity.notFound().build());
    }
}
