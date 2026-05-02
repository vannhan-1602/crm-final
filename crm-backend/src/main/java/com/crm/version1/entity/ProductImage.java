package com.crm.version1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import jakarta.persistence.*;

@Data
@Entity
@Table(name = "BH_SanPham_HinhAnh")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "SanPham_Id")
    private Integer sanPhamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SanPham_Id", insertable = false, updatable = false)
    @JsonIgnore  // <-- thêm dòng này
    private Product product;

    @Column(name = "UrlHinhAnh", nullable = false)
    private String urlHinhAnh;

    @Column(name = "IsMain")
    private Boolean isMain = false;
}