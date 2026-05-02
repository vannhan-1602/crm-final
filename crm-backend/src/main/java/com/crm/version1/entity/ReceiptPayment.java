package com.crm.version1.entity;

import lombok.Data;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Entity
@CrossOrigin(origins = "*")
@Table(name = "KT_PhieuThuChi")
public class ReceiptPayment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maPhieu;

    @Enumerated(EnumType.STRING)
    private ReceiptType loaiPhieu;

    @ManyToOne
    @JoinColumn(name = "khachHang_id")
    private KhachHang customer;

    @ManyToOne
    @JoinColumn(name = "hoaDon_id")
    private Invoice invoice;

    private BigDecimal soTien;
    private LocalDate ngayTao = LocalDate.now();
}