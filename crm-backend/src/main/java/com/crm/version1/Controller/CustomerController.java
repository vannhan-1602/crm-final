package com.crm.version1.Controller;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<KhachHang>> getAll() {
        return ResponseEntity.ok(customerRepository.findByIsDeletedFalse());
    }

    @PostMapping
    public ResponseEntity<KhachHang> create(@RequestBody KhachHang customer) {
        return ResponseEntity.ok(customerRepository.save(customer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> softDelete(@PathVariable Long id) {
        KhachHang c = customerRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        c.setIsDeleted(true);
        customerRepository.save(c);
        return ResponseEntity.ok("Deleted");
    }
}