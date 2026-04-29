package com.crm.version1.Controller;

import com.crm.version1.entity.HoatDong;
import com.crm.version1.Service.HoatDongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/hoat-dong")
@RequiredArgsConstructor
public class HoatDongController {
    private final HoatDongService hoatDongService;

    // API Ghi nhận tương tác
    @PostMapping("/log")
    public ResponseEntity<HoatDong> logActivity(@RequestBody HoatDong hoatDong) {
        return ResponseEntity.ok(hoatDongService.logActivity(hoatDong));
    }

    // API Lấy lịch sử tương tác của 1 Lead
    @GetMapping("/lead/{leadId}")
    public ResponseEntity<Iterable<HoatDong>> getByLead(@PathVariable Long leadId) {
        return ResponseEntity.ok(hoatDongService.getHistoryByLead(leadId));
    }

    // API Lấy lịch sử tương tác của 1 Khách hàng (B2B/B2C)
    @GetMapping("/khach-hang/{khachHangId}")
    public ResponseEntity<Iterable<HoatDong>> getByKhachHang(@PathVariable Long khachHangId) {
        return ResponseEntity.ok(hoatDongService.getHistoryByKhachHang(khachHangId));
    }
    @GetMapping
    public ResponseEntity<Iterable<HoatDong>> getAll() {
        return ResponseEntity.ok(hoatDongService.getAllHoatDong());
    }
}