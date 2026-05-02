package com.crm.version1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Data
@Entity
@CrossOrigin(origins = "*")
@Table(name = "BH_SanPham")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    @Column(name = "MaSP")
    private String maSP;

    @Column(name = "TenSP")
    private String tenSP;

    @Column(name = "SoLuongTon")
    private Integer soLuongTon = 0;


    @Column(name = "LoaiSanPham_Id")
    private Integer loaiSanPhamId;

    @Column(name = "DonVi")
    private String donVi;

    @Column(name = "GiaBan")
    private BigDecimal giaBan;

    @Column(name = "TrangThai")
    private Boolean trangThai = true;
    @OneToMany(mappedBy = "sanPhamId", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> hinhAnhs=new ArrayList<>();
    @Column(name="CreatedAt")
    private Date createdAt;
    @Column(name="UpdatedAt")
    private Date updatedAt;
}