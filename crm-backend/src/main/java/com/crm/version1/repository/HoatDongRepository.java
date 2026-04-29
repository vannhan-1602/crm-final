package com.crm.version1.repository;

import com.crm.version1.entity.HoatDong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface HoatDongRepository extends JpaRepository<HoatDong, Long> {
    Iterable<HoatDong> findByLeadIdOrderByThoiGianThucHienDesc(Long leadId);
    Iterable<HoatDong> findByKhachHangIdOrderByThoiGianThucHienDesc(Long khachHangId);

    @Query("SELECT h FROM HoatDong h WHERE h.thoiGianThucHien >= :now AND h.thoiGianThucHien <= :endOfDay")
    Iterable<HoatDong> findHoatDongDenHan(LocalDateTime now, LocalDateTime endOfDay);
}