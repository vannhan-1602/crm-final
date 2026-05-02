package com.crm.version1.repository;

import com.crm.version1.entity.Ticket;
import com.crm.version1.entity.enums.MucDoUuTien;
import com.crm.version1.entity.enums.TrangThaiTicket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query("""
            SELECT t FROM Ticket t
            WHERE t.isDeleted = false
              AND (:trangThai      IS NULL OR t.trangThai       = :trangThai)
              AND (:mucDoUuTien    IS NULL OR t.mucDoUuTien     = :mucDoUuTien)
              AND (:khachHangId    IS NULL OR t.khachHang.id    = :khachHangId)
              AND (:nhanVienXuLyId IS NULL OR t.nhanVienXuLy.id = :nhanVienXuLyId)
            """)
    Page<Ticket> findByFilters(
            @Param("trangThai")       TrangThaiTicket trangThai,
            @Param("mucDoUuTien")     MucDoUuTien     mucDoUuTien,
            @Param("khachHangId")     Long            khachHangId,
            @Param("nhanVienXuLyId")  Integer         nhanVienXuLyId,
            Pageable pageable
    );

    boolean existsByMaTicket(String maTicket);
}
