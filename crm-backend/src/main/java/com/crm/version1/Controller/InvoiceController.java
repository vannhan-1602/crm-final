package com.crm.version1.Controller;
import com.crm.version1.common.ApiResponse;
import com.crm.version1.dto.InvoiceRequest;
import com.crm.version1.entity.Invoice;
import com.crm.version1.repository.InvoiceRepository;
import com.crm.version1.Service.impl.InvoiceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceServiceImpl invoiceService;
    private final InvoiceRepository invoiceRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Invoice>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", invoiceRepository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Invoice>> create(@Validated @RequestBody InvoiceRequest req) {
        return ResponseEntity.ok(ApiResponse.success("Created", invoiceService.createInvoice(req)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Invoice>> getDetail(@PathVariable Long id) {
        Invoice inv = invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        return ResponseEntity.ok(ApiResponse.success("Success", inv));
    }
}