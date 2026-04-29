package com.crm.version1.Controller;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.entity.Lead;
import com.crm.version1.Service.LeadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*") // Hỗ trợ gọi từ React frontend
@RestController
@RequestMapping("/api/leads")
@RequiredArgsConstructor
public class LeadController {
    private final LeadService leadService;

    @GetMapping
    public ResponseEntity<Iterable<Lead>> getAll() {
        return ResponseEntity.ok(leadService.getAllLeads());
    }

    @PostMapping
    public ResponseEntity<Lead> create(@RequestBody Lead lead) {
        return ResponseEntity.ok(leadService.createLead(lead));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lead> update(@PathVariable Long id, @RequestBody Lead lead) {
        return ResponseEntity.ok(leadService.updateLead(id, lead));
    }

    // API Phân công Lead
    @PutMapping("/{id}/assign/{nhanVienId}")
    public ResponseEntity<Lead> assignLead(@PathVariable Long id, @PathVariable Integer nhanVienId) {
        return ResponseEntity.ok(leadService.assignLead(id, nhanVienId));
    }

    // API Convert Lead sang Khách Hàng
    @PostMapping("/{id}/convert")
    public ResponseEntity<KhachHang> convertToKhachHang(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.convertToKhachHang(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLead(@PathVariable Long id) {
        leadService.deleteLeadById(id);
        return ResponseEntity.ok("Xóa Lead thành công");
    }

}