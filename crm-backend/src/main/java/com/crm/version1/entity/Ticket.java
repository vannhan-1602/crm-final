package com.crm.version1.entity;

import com.crm.version1.entity.enums.MucDoUuTien;
import com.crm.version1.entity.enums.NguonTiepNhan;
import com.crm.version1.entity.enums.TrangThaiTicket;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tk_ticket")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    /** Mã Ticket tự sinh – vd: TK-2605-0001 */
    @Column(name = "MaTicket", nullable = false, unique = true, length = 30)
    private String maTicket;

    @Column(name = "TieuDe", nullable = false, length = 255)
    private String tieuDe;

    @Column(name = "MoTa", columnDefinition = "TEXT")
    private String moTa;

    @Column(name = "FileDinhKem", length = 500)
    private String fileDinhKem;

    // ── Quan hệ ───────────────────────────────────────────────────────

    /** FK → tk_loaiticket */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LoaiTicket_Id")
    private LoaiTicket loaiTicket;

    /** FK → kh_khachhang */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "KhachHang_Id", nullable = false)
    private KhachHang khachHang;

    /** FK → hd_hopdong */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HopDong_Id")
    private Contract hopDong;

    /** FK → bh_sanpham */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SanPham_Id")
    private Product sanPham;

    /** FK → ht_user – người tiếp nhận */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NhanVienTiepNhan_Id")
    private User nhanVienTiepNhan;

    /** FK → ht_user – người được giao xử lý */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NhanVienXuLy_Id")
    private User nhanVienXuLy;

    // ── Phân loại ─────────────────────────────────────────────────────

    @Enumerated(EnumType.STRING)
    @Column(name = "MucDoUuTien", length = 20)
    private MucDoUuTien mucDoUuTien = MucDoUuTien.TrungBinh;

    @Enumerated(EnumType.STRING)
    @Column(name = "NguonTiepNhan", length = 20)
    private NguonTiepNhan nguonTiepNhan = NguonTiepNhan.Phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThai", length = 20)
    private TrangThaiTicket trangThai = TrangThaiTicket.Moi;

    // ── Thời gian xử lý ───────────────────────────────────────────────

    @Column(name = "NgayHenXuLy")
    private LocalDateTime ngayHenXuLy;

    @Column(name = "NgayDong")
    private LocalDateTime ngayDong;

    @Column(name = "LyDoDong", length = 500)
    private String lyDoDong;

    // ── Audit ─────────────────────────────────────────────────────────

    @Column(name = "IsDeleted")
    private Boolean isDeleted = false;

    @CreationTimestamp
    @Column(name = "CreatedAt", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    // ── Quan hệ ngược ─────────────────────────────────────────────────

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TicketPhanHoi> danhSachPhanHoi = new ArrayList<>();
}
