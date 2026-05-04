package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "TK_LoaiTicket")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class LoaiTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "TenLoai", nullable = false, unique = true, length = 100)
    private String tenLoai;

    @Column(name = "MoTa", length = 255)
    private String moTa;

    @Column(name = "IsActive")
    private Boolean isActive = true;
}
