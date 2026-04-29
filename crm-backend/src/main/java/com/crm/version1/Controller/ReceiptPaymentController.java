package com.crm.version1.Controller;

import com.crm.version1.common.ApiResponse;
import com.crm.version1.entity.ReceiptPayment;
import com.crm.version1.repository.ReceiptPaymentRepository;
import com.crm.version1.Service.impl.ReceiptPaymentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/receipts-payments")
@RequiredArgsConstructor
public class ReceiptPaymentController {
    private final ReceiptPaymentServiceImpl service;
    private final ReceiptPaymentRepository repository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ReceiptPayment>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", repository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReceiptPayment>> create(@RequestBody ReceiptPayment rp) {
        return ResponseEntity.ok(ApiResponse.success("Created", service.createReceipt(rp)));
    }
}