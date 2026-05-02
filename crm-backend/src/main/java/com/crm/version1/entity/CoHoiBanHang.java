package com.crm.version1.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "BH_CoHoiBanHang")
public class CoHoiBanHang {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tenThuongVu;
    private String giaiDoan = "KhaoSat";

    private Long khachHangId;
    private Long leadId;

    private Integer tyLeThanhCong = 0;
    private BigDecimal doanhThuKyVong;
    private String ghiChu;
    private LocalDate ngayDuKien;
    private Integer nhanVienPhuTrachId;
    private Boolean isDeleted = false;
}