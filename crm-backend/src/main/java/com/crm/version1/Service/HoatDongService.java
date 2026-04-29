package com.crm.version1.Service;

import com.crm.version1.entity.HoatDong;
import com.crm.version1.repository.HoatDongRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class HoatDongService {
    private final HoatDongRepository hoatDongRepository;

    // Ghi nhận tương tác cho Lead hoặc Khách hàng
    public HoatDong logActivity(HoatDong hoatDong) {
        if(hoatDong.getThoiGianThucHien() == null) {
            hoatDong.setThoiGianThucHien(LocalDateTime.now());
        }
        return hoatDongRepository.save(hoatDong);
    }

    public Iterable<HoatDong> getHistoryByLead(Long leadId) {
        return hoatDongRepository.findByLeadIdOrderByThoiGianThucHienDesc(leadId);
    }

    public Iterable<HoatDong> getHistoryByKhachHang(Long khachHangId) {
        return hoatDongRepository.findByKhachHangIdOrderByThoiGianThucHienDesc(khachHangId);
    }
    public Iterable<HoatDong> getAllHoatDong() {
        return hoatDongRepository.findAll();
    }
}