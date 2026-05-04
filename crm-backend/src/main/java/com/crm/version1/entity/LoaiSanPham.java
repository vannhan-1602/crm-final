package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.Data;
@Entity
@Data
@Table(name = "BH_LoaiSanPham")
public class LoaiSanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "TenLoai")
    private String tenLoai;

    @Column(name = "Mota")
    private String moTa;
}