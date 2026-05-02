package com.crm.version1.Controller;

import com.crm.version1.Service.FileStorageService;
import com.crm.version1.entity.Product;
import com.crm.version1.entity.ProductImage;
import com.crm.version1.repository.ProductImageRepository;
import com.crm.version1.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // Thêm import này

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
@RequiredArgsConstructor // Sẽ tự động tiêm các bean có modifier 'final'
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final FileStorageService fileStorageService;

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


    @PostMapping("/{sanPhamId}/images/upload")
    public ResponseEntity<?> uploadImage(@PathVariable Integer sanPhamId, @RequestParam("file") MultipartFile file) {
        try {
            // 1. Lưu file vào thư mục vật lý thông qua Service
            String fileName = fileStorageService.save(file);

            // 2. Tạo bản ghi mới trong bảng hình ảnh
            ProductImage image = new ProductImage();
            image.setSanPhamId(sanPhamId);

            // Đường dẫn này sẽ được khớp với cấu hình trong WebConfig để xem được ảnh
            image.setUrlHinhAnh("/uploads/products/" + fileName);
            image.setIsMain(false);

            return ResponseEntity.ok(productImageRepository.save(image));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không thể tải ảnh lên: " + e.getMessage());
        }
    }

    @DeleteMapping("/{sanPhamId}/images/{imageId}")
    public ResponseEntity<?> deleteImage(@PathVariable Integer sanPhamId, @PathVariable Long imageId) {
        productImageRepository.deleteById(imageId);
        return ResponseEntity.ok("Đã xóa ảnh!");
    }
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + id));
        
        existingProduct.setMaSP(productDetails.getMaSP());
        existingProduct.setTenSP(productDetails.getTenSP());
        existingProduct.setGiaBan(productDetails.getGiaBan());
        existingProduct.setSoLuongTon(productDetails.getSoLuongTon());
        existingProduct.setDonVi(productDetails.getDonVi());
        existingProduct.setTrangThai(productDetails.getTrangThai());
        existingProduct.setLoaiSanPhamId(productDetails.getLoaiSanPhamId());

        return ResponseEntity.ok(productRepository.save(existingProduct));
    }
}