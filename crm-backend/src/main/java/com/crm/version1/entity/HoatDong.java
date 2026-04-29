package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "KH_HoatDong")
@Data
public class HoatDong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "KhachHang_Id")
    private Long khachHangId;

    @Column(name = "Lead_Id")
    private Long leadId;

    @Column(name = "LoaiHoatDong")
    private String loaiHoatDong; // Call, Meeting, Email, Zalo

    @Column(name = "NoiDung")
    private String noiDung;

    @Column(name = "ThoiGianThucHien")
    private LocalDateTime thoiGianThucHien;

    @Column(name = "NhanVien_Id")
    private Integer nhanVienId;
}