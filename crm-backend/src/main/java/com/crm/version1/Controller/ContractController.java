package com.crm.version1.Controller;
import com.crm.version1.common.ApiResponse;
import com.crm.version1.entity.Contract;
import com.crm.version1.entity.KhachHang;
import com.crm.version1.repository.ContractRepository;
import com.crm.version1.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/contracts")
@RequiredArgsConstructor
public class ContractController {
    private final ContractRepository contractRepository;
    private final CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Contract>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", contractRepository.findAll()));
    }

    @PostMapping("/{customerId}")
    public ResponseEntity<ApiResponse<Contract>> create(@PathVariable Long customerId, @RequestBody Contract contract) {
        KhachHang c = customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer not found"));
        contract.setCustomer(c);
        return ResponseEntity.ok(ApiResponse.success("Created", contractRepository.save(contract)));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<List<Contract>>> getByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(ApiResponse.success("Success", contractRepository.findByCustomerId(customerId)));
    }
}