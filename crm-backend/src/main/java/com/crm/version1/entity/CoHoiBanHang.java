package com.crm.version1.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "BH_CoHoiBanHang")
public class CoHoiBanHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "TenThuongVu", nullable = false)
    private String tenThuongVu;

    @Column(name = "GiaiDoan")
    private String giaiDoan = "KhaoSat";

    @Column(name = "KhachHang_Id")
    private Long khachHangId;

    @Column(name = "Lead_Id")
    private Long leadId;

    @Column(name = "TyLeThanhCong")
    private Integer tyLeThanhCong = 0;

    @Column(name = "DoanhThuKyVong")
    private BigDecimal doanhThuKyVong;

    @Column(name = "GhiChu")
    private String ghiChu;

    @Column(name = "NgayDuKien")
    private LocalDate ngayDuKien;

    @Column(name = "NhanVienPhuTrach_Id") // Sửa ở đây
    private Integer nhanVienPhuTrachId;

    @Column(name = "IsDeleted")
    private Boolean isDeleted = false;
}