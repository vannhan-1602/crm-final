package com.crm.version1.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "HT_User")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Username", nullable = false, unique = true)
    private String username;


    @Column(name = "Password", nullable = false)
    private String password;

    @Column(name = "NhanSu_Id")
    private Integer nhanSuId;

    @Column(name = "Role_Id")
    private Integer roleId;

    @Column(name = "TrangThai")
    private String trangThai;
}