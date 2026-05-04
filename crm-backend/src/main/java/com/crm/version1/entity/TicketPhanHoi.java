package com.crm.version1.entity;

import com.crm.version1.entity.enums.LoaiPhanHoi;
import com.crm.version1.entity.enums.TrangThaiTicket;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "TK_Ticket_PhanHoi")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TicketPhanHoi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Long id;

    /** FK → tk_ticket */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Ticket_Id", nullable = false)
    @JsonIgnore
    private Ticket ticket;

    /** FK → ht_user – người ghi phản hồi */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NguoiPhanHoi_Id")
    private User nguoiPhanHoi;

    @Enumerated(EnumType.STRING)
    @Column(name = "LoaiPhanHoi", nullable = false, length = 30)
    private LoaiPhanHoi loaiPhanHoi;

    @Column(name = "NoiDung", nullable = false, columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "FileDinhKem", length = 500)
    private String fileDinhKem;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiTruoc", length = 20)
    private TrangThaiTicket trangThaiTruoc;

    @Enumerated(EnumType.STRING)
    @Column(name = "TrangThaiSau", length = 20)
    private TrangThaiTicket trangThaiSau;

    @CreationTimestamp
    @Column(name = "CreatedAt", updatable = false)
    private LocalDateTime createdAt;
}
