package com.crm.version1.Controller;

import com.crm.version1.entity.BaoGia;
import com.crm.version1.Service.BaoGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bao-gia")
@CrossOrigin("*")
public class BaoGiaControllers {
    @Autowired
    private BaoGiaService baoGiaService;

    @GetMapping
    public List<BaoGia> getAll() {
        return baoGiaService.getAllBaoGia();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaoGia> getById(@PathVariable Long id) { // Sửa BigInteger -> Long
        Optional<BaoGia> baoGia = baoGiaService.getBaoGiaById(id);
        return baoGia.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public BaoGia create(@RequestBody BaoGia baoGia) {
        return baoGiaService.saveBaoGia(baoGia);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        baoGiaService.deleteBaoGia(id);
        return ResponseEntity.ok().build();
    }
}