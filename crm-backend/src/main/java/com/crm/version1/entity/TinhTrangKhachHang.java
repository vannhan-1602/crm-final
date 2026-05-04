package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "KH_TinhTrangKhachHang")
public class TinhTrangKhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "TenTinhTrang", nullable = false, length = 100)
    private String tenTinhTrang;
    @Column(name = "IsActive")
    private Boolean isActive = true;
}
