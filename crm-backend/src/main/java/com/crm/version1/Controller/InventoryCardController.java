package com.crm.version1.Controller;
import com.crm.version1.common.ApiResponse;
import com.crm.version1.entity.InventoryCard;
import com.crm.version1.repository.InventoryCardRepository;
import com.crm.version1.Service.impl.InventoryCardServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/inventory-cards")
@RequiredArgsConstructor
public class InventoryCardController {
    private final InventoryCardServiceImpl service;
    private final InventoryCardRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<InventoryCard>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", repository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<InventoryCard>> create(@RequestBody InventoryCard card) {
        return ResponseEntity.ok(ApiResponse.success("Created", service.createTransaction(card)));
    }
}