package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "bh_loaisanpham")
public class LoaiSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "TenLoai")
    private String tenLoai;  // ✅ đổi "ten" → "tenLoai"

    @Column(name = "Mota")
    private String moTa;     // ✅ đổi "mota" → "moTa"
}