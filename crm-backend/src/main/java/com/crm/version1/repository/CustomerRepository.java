package com.crm.version1.repository;
import com.crm.version1.entity.KhachHang;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CustomerRepository extends JpaRepository<KhachHang, Long> {
    List<KhachHang> findByIsDeletedFalse();
}