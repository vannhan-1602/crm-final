package com.crm.version1.entity;

import lombok.Data;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDate;

@Data
@Entity
@CrossOrigin(origins = "*")
@Table(name = "HD_HopDong")
public class Contract {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maHopDong;

    @ManyToOne
    @JoinColumn(name = "khachHang_id")
    private KhachHang customer;

    private LocalDate ngayKy;
    private Integer thoiHan;

    @Enumerated(EnumType.STRING)
    private ContractStatus trangThai = ContractStatus.DangThucHien;
}