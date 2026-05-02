package com.crm.version1.Controller;

import com.crm.version1.entity.Product;
import com.crm.version1.entity.ProductImage;
import com.crm.version1.repository.ProductImageRepository;
import com.crm.version1.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductRepository productRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Product> create(@RequestBody Product product) {
        return ResponseEntity.ok(productRepository.save(product));
    }
    @PutMapping("/{sanPhamId}/images/{imageId}/set-main")
    public ResponseEntity<?> setMainImage(@PathVariable Integer sanPhamId, @PathVariable Long imageId) {

        productImageRepository.resetMainImage(sanPhamId);


        ProductImage img = productImageRepository.findById(imageId)
                .orElseThrow(() -> new RuntimeException("Image not found"));
        img.setIsMain(true);
        productImageRepository.save(img);

        return ResponseEntity.ok("Đã cập nhật hình chính thành công!");
    }
}