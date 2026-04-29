package com.crm.version1.Controller;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.Service.KhachHangService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/khach-hang")
@RequiredArgsConstructor
public class KhachHangController {
    private final KhachHangService khachHangService;

    @GetMapping
    public ResponseEntity<Iterable<KhachHang>> getAll() {
        return ResponseEntity.ok(khachHangService.getAllKhachHang());
    }

    @PostMapping
    public ResponseEntity<KhachHang> create(@RequestBody KhachHang kh) {
        return ResponseEntity.ok(khachHangService.createKhachHang(kh));
    }

    @PutMapping("/{id}")
    public ResponseEntity<KhachHang> update(@PathVariable Long id, @RequestBody KhachHang kh) {
        return ResponseEntity.ok(khachHangService.updateKhachHang(id, kh));
    }
}