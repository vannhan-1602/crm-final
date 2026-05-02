package com.crm.version1.repository;

import com.crm.version1.entity.Lead;
import com.crm.version1.entity.LoaiSanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LoaiSanPhamRepository extends JpaRepository<LoaiSanPham,Integer> {
    List<LoaiSanPham> findByTenLoaiContainingIgnoreCase(String tenLoai); // ❌ vẫn sai

}
