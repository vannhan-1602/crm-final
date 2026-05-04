package com.crm.version1.Service;

import com.crm.version1.entity.BaoGia;
import com.crm.version1.entity.BaoGiaChiTiet;
import com.crm.version1.repository.BaoGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BaoGiaService {
    @Autowired
    private BaoGiaRepository baoGiaRepository;

    public List<BaoGia> getAllBaoGia() {
        return baoGiaRepository.findAll();
    }

    public Optional<BaoGia> getBaoGiaById(Long id) { 
        return baoGiaRepository.findById(id);
    }

    public BaoGia saveBaoGia(BaoGia baoGia) {
        BigDecimal tongTien = BigDecimal.ZERO;
        if (baoGia.getChiTietList() != null && !baoGia.getChiTietList().isEmpty()) {
            for (BaoGiaChiTiet chiTiet : baoGia.getChiTietList()) {
                chiTiet.setBaoGia(baoGia);
                BigDecimal soLuong = new BigDecimal(chiTiet.getSoLuong());
                BigDecimal thanhTien = chiTiet.getDonGia().multiply(soLuong);
                tongTien = tongTien.add(thanhTien);
            }
        }
        baoGia.setTongTien(tongTien);
        return baoGiaRepository.save(baoGia);
    }

    public void deleteBaoGia(Long id) { // Sửa BigInteger -> Long
        baoGiaRepository.deleteById(id);
    }
}