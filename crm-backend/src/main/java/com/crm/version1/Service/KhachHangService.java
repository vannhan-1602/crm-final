package com.crm.version1.Service;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.repository.KhachHangRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KhachHangService {
    private final KhachHangRepository khachHangRepository;

    public Iterable<KhachHang> getAllKhachHang() {
        return khachHangRepository.findAll();
    }

    public KhachHang createKhachHang(KhachHang kh) {
        return khachHangRepository.save(kh);
    }

    public KhachHang updateKhachHang(Long id, KhachHang details) {
        KhachHang kh = khachHangRepository.findById(id).orElseThrow();
        kh.setTenKhachHang(details.getTenKhachHang());
        kh.setMaSoThue(details.getMaSoThue());
        kh.setLoaiKhachHangId(details.getLoaiKhachHangId());
        kh.setEmail(details.getEmail());
        kh.setSoDienThoai(details.getSoDienThoai());
        kh.setNhanVienPhuTrachId(details.getNhanVienPhuTrachId());
        kh.setTinhTrangId(details.getTinhTrangId());
        return khachHangRepository.save(kh);
    }
}