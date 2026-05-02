package com.crm.version1.Controller;

import com.crm.version1.Service.LoaiSanPhamService;
import com.crm.version1.entity.LoaiSanPham;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/product-categories")
@RequiredArgsConstructor
public class LoaiSanPhamController {

    private final LoaiSanPhamService loaiSanPhamService;

    @GetMapping
    public ResponseEntity<Iterable<LoaiSanPham>> getAll() {
        return ResponseEntity.ok(loaiSanPhamService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoaiSanPham> getById(@PathVariable Integer id) {
        return loaiSanPhamService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<LoaiSanPham> create(@RequestBody LoaiSanPham loaiSanPham) {
        return ResponseEntity.ok(loaiSanPhamService.create(loaiSanPham));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LoaiSanPham> update(@PathVariable Integer id, @RequestBody LoaiSanPham loaiSanPham) {
        return ResponseEntity.ok(loaiSanPhamService.update(id, loaiSanPham));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        loaiSanPhamService.delete(id);
        return ResponseEntity.ok("Xóa LoaiSanPham thành công");
    }
}