package com.crm.version1.Controller;

import com.crm.version1.entity.CoHoiBanHang;
import com.crm.version1.repository.CoHoiBanHangRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/co-hoi")
@RequiredArgsConstructor
public class CoHoiBanHangController {

    private final CoHoiBanHangRepository repository;

    @GetMapping
    public ResponseEntity<List<CoHoiBanHang>> getAll() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping
    public ResponseEntity<CoHoiBanHang> create(@RequestBody CoHoiBanHang coHoi) {
        return ResponseEntity.ok(repository.save(coHoi));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CoHoiBanHang> update(@PathVariable Long id, @RequestBody CoHoiBanHang coHoi) {
        CoHoiBanHang existing = repository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        coHoi.setId(existing.getId());
        return ResponseEntity.ok(repository.save(coHoi));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}