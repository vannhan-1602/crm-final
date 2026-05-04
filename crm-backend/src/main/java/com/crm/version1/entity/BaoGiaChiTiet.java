package com.crm.version1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "HD_BaoGia_ChiTiet") // Đổi thành chữ hoa
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BaoGiaChiTiet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Đổi BigInteger thành Long

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BaoGia_Id", nullable = false)
    @JsonIgnore 
    private BaoGia baoGia;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SanPham_Id", nullable = false)
    private Product sanPham;

    @Column(name = "SoLuong", nullable = false)
    private Integer soLuong;

    @Column(name = "DonGia", nullable = false)
    private BigDecimal donGia;
}