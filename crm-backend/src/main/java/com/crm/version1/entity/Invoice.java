package com.crm.version1.entity;

import lombok.Data;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;

@Data
@Entity
@CrossOrigin(origins = "*")
@Table(name = "KT_HoaDon")
public class Invoice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maHoaDon;

    @ManyToOne
    @JoinColumn(name = "hopDong_id")
    private Contract contract;

    @ManyToOne
    @JoinColumn(name = "khachHang_id")
    private KhachHang customer;

    private BigDecimal tongTien;
    private BigDecimal soTienDaThu = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    private InvoiceStatus trangThaiThanhToan = InvoiceStatus.ChuaThanhToan;
}