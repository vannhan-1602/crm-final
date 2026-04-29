package com.crm.version1.repository;

import com.crm.version1.entity.KhachHang;
import com.crm.version1.entity.HoatDong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Long> {
    Iterable<KhachHang> findByIsDeletedFalse();
    KhachHang findTopByOrderByIdDesc();
}

