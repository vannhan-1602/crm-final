package com.crm.version1.Controller;

import com.crm.version1.repository.ContractRepository;
import com.crm.version1.repository.CustomerRepository;
import com.crm.version1.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
    private final CustomerRepository customerRepository;
    private final ContractRepository contractRepository;
    private final InvoiceRepository invoiceRepository;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary() {
        Map<String, Object> stats = new HashMap<>();

        // Sử dụng hàm count() của Database (nhanh hơn rất nhiều so với get List)
        long totalCustomers = customerRepository.count();
        long totalContracts = contractRepository.count();
        long totalInvoices = invoiceRepository.count();

        // Gọi SUM, nếu database trống (null) thì gán bằng 0
        BigDecimal revenue = invoiceRepository.sumTotalRevenue();
        if (revenue == null) {
            revenue = BigDecimal.ZERO;
        }

        stats.put("totalCustomers", totalCustomers);
        stats.put("totalContracts", totalContracts);
        stats.put("totalInvoices", totalInvoices);
        stats.put("revenue", revenue);

        return ResponseEntity.ok(stats);
    }
}