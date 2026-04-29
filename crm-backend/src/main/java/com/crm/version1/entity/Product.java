package com.crm.version1.entity;
import lombok.Data;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@Entity
@CrossOrigin(origins = "*")
@Table(name = "BH_SanPham")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String maSP;
    private String tenSP;
    private Integer soLuongTon = 0;
}