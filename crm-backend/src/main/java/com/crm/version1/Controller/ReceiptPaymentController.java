package com.crm.version1.Controller;

import com.crm.version1.entity.ReceiptPayment;
import com.crm.version1.repository.ReceiptPaymentRepository;
import com.crm.version1.Service.ReceiptPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/receipts-payments")
@RequiredArgsConstructor
public class ReceiptPaymentController {
    private final ReceiptPaymentService service;
    private final ReceiptPaymentRepository repository;

    @GetMapping
    public ResponseEntity<List<ReceiptPayment>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<ReceiptPayment> create(@RequestBody ReceiptPayment rp) {
        return ResponseEntity.ok(service.createReceipt(rp));
    }
}