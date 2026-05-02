package com.crm.version1.Controller;

import com.crm.version1.entity.Invoice;
import com.crm.version1.repository.InvoiceRepository;
import com.crm.version1.Service.InvoiceService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;
    private final InvoiceRepository invoiceRepository;

    @Data
    public static class InvoiceRequest {
        private String maHoaDon;
        @NotNull private Long hopDongId;
        @NotNull private Long khachHangId;
        @Positive private BigDecimal tongTien;
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAll() {
        return ResponseEntity.ok(invoiceRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Invoice> create(@Validated @RequestBody InvoiceRequest req) {

        Invoice invoice = invoiceService.createInvoice(
                req.getMaHoaDon(),
                req.getHopDongId(),
                req.getKhachHangId(),
                req.getTongTien()
        );
        return ResponseEntity.ok(invoice);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getDetail(@PathVariable Long id) {
        Invoice inv = invoiceRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        return ResponseEntity.ok(inv);
    }
}