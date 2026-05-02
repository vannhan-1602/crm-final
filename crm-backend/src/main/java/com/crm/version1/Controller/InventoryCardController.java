package com.crm.version1.Controller;

import com.crm.version1.entity.InventoryCard;
import com.crm.version1.repository.InventoryCardRepository;
import com.crm.version1.Service.InventoryCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/inventory-cards")
@RequiredArgsConstructor
public class InventoryCardController {
    private final InventoryCardService service;
    private final InventoryCardRepository repository;

    @GetMapping
    public ResponseEntity<List<InventoryCard>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<InventoryCard> create(@RequestBody InventoryCard card) {
        return ResponseEntity.ok(service.createTransaction(card));
    }
}