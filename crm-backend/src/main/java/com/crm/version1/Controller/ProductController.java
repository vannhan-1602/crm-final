package com.crm.version1.Controller;
import com.crm.version1.common.ApiResponse;
import com.crm.version1.entity.Product;
import com.crm.version1.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAll() {
        return ResponseEntity.ok(ApiResponse.success("Success", productRepository.findAll()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Product>> create(@RequestBody Product product) {
        return ResponseEntity.ok(ApiResponse.success("Created", productRepository.save(product)));
    }
}
