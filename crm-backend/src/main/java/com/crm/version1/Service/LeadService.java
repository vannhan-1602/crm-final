package com.crm.version1.Service;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.entity.Lead;
import com.crm.version1.repository.KhachHangRepository;
import com.crm.version1.repository.LeadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LeadService {
    private final LeadRepository leadRepository;
    private final KhachHangRepository khachHangRepository;

    public Iterable<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    public Lead createLead(Lead lead) {
        lead.setTinhTrang("Mới");
        return leadRepository.save(lead);
    }

    public Lead updateLead(Long id, Lead leadDetails) {
        Lead existing = leadRepository.findById(id).orElseThrow(() -> new RuntimeException("Lead not found"));
        existing.setTenLead(leadDetails.getTenLead());
        existing.setTenCongTy(leadDetails.getTenCongTy());
        existing.setSoDienThoai(leadDetails.getSoDienThoai());
        existing.setEmail(leadDetails.getEmail());
        existing.setTinhTrang(leadDetails.getTinhTrang());
        existing.setNhanVienPhuTrachId(leadDetails.getNhanVienPhuTrachId());
        return leadRepository.save(existing);
    }

    public Lead assignLead(Long leadId, Integer nhanVienId) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();
        lead.setNhanVienPhuTrachId(nhanVienId);
        return leadRepository.save(lead);
    }

    @Transactional
    public KhachHang convertToKhachHang(Long leadId) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();

        KhachHang kh = new KhachHang();


        String nextMaKH = "KH001";

        KhachHang lastKH = khachHangRepository.findTopByOrderByIdDesc();

        if (lastKH != null && lastKH.getMaKhachHang() != null) {
            String lastMa = lastKH.getMaKhachHang();
            try {
                int number = Integer.parseInt(lastMa.substring(2)) + 1;
                nextMaKH = String.format("KH%03d", number);
            } catch (Exception e) {
                nextMaKH = "KH00" + (khachHangRepository.count() + 1);
            }
        }
        kh.setMaKhachHang(nextMaKH);


        kh.setTenKhachHang(lead.getTenLead() + (lead.getTenCongTy() != null ? " - " + lead.getTenCongTy() : ""));
        kh.setEmail(lead.getEmail());
        kh.setSoDienThoai(lead.getSoDienThoai());
        kh.setNhanVienPhuTrachId(lead.getNhanVienPhuTrachId());
        kh.setIsDeleted(false);
        lead.setTinhTrang("Đã chuyển đổi");
        leadRepository.save(lead);

        return khachHangRepository.save(kh);
    }

    public void deleteLeadById(Long id) {
        if (!leadRepository.existsById(id)) {
            throw new RuntimeException("Lead không tồn tại với ID: " + id);
        }
        leadRepository.deleteById(id);
    }
}