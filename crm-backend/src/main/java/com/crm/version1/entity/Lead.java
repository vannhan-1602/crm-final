package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "KH_Lead")
@Data
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TenLead", nullable = false)
    private String tenLead;

    @Column(name = "TenCongTy")
    private String tenCongTy;

    @Column(name = "SoDienThoai")
    private String soDienThoai;

    @Column(name = "Email")
    private String email;

    @Column(name = "TinhTrang")
    private String tinhTrang;

    @Column(name = "NhanVienPhuTrach_Id")
    private Integer nhanVienPhuTrachId;

    @Column(name = "CreatedAt", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}