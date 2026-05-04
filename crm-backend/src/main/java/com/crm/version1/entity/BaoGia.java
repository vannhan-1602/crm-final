package com.crm.version1.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name= "HD_BaoGia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BaoGia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "MaBaoGia", unique = true)
    private String maBaoGia;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "KhachHang_Id") // Sửa ID thành Id cho khớp Database
    private KhachHang khachHang;

    @Column(name = "TongTien")
    private BigDecimal tongTien;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai")
    private TrangThaiBaoGia trangThai = TrangThaiBaoGia.Nhap;

    @OneToMany(mappedBy = "baoGia", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BaoGiaChiTiet> chiTietList = new ArrayList<>();

    @Column(name = "CreatedAt", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
