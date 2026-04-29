package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "KH_KhachHang")
@Data
public class KhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MaKhachHang", nullable = false, unique = true)
    private String maKhachHang;

    @Column(name = "TenKhachHang", nullable = false)
    private String tenKhachHang;

    @Column(name = "LoaiKhachHang_Id")
    private Short loaiKhachHangId;

    @Column(name = "TinhTrang_Id")
    private Short tinhTrangId;

    @Column(name = "Email")
    private String email;

    @Column(name = "SoDienThoai")
    private String soDienThoai;

    @Column(name = "NhanVienPhuTrach_Id")
    private Integer nhanVienPhuTrachId;

    @Column(name = "MaSoThue")
    private String maSoThue;

    @Column(name = "IsDeleted")
    private Boolean isDeleted = false;
}