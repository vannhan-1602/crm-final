package com.crm.version1.repository;

import com.crm.version1.entity.BaoGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BaoGiaRepository extends JpaRepository<BaoGia, Long> {
    BaoGia findByMaBaoGia(String maBaoGia);
    List<BaoGia> findByKhachHangId(Long khachHangId);
}