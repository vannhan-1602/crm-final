package com.crm.version1.Service;

import com.crm.version1.entity.Ticket;
import com.crm.version1.entity.TicketPhanHoi;
import com.crm.version1.entity.User;
import com.crm.version1.entity.enums.LoaiPhanHoi;
import com.crm.version1.entity.enums.MucDoUuTien;
import com.crm.version1.entity.enums.TrangThaiTicket;
import com.crm.version1.repository.TicketPhanHoiRepository;
import com.crm.version1.repository.TicketRepository;
import com.crm.version1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository        ticketRepository;
    private final TicketPhanHoiRepository phanHoiRepository;
    private final UserRepository          userRepository;

    // ── Lấy danh sách có lọc + phân trang ────────────────────────────
    public Page<Ticket> getAll(TrangThaiTicket trangThai, MucDoUuTien mucDoUuTien,
                               Long khachHangId, Integer nhanVienXuLyId,
                               int page, int size) {
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, "createdAt"));
        return ticketRepository.findByFilters(
                trangThai, mucDoUuTien, khachHangId, nhanVienXuLyId, pageable);
    }

    // ── Lấy theo ID ───────────────────────────────────────────────────
    public Ticket getById(Long id) {
        Ticket t = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy ticket id=" + id));
        if (Boolean.TRUE.equals(t.getIsDeleted()))
            throw new ResponseStatusException(HttpStatus.GONE, "Ticket đã bị xoá");
        return t;
    }

    // ── Tạo mới ───────────────────────────────────────────────────────
    @Transactional
    public Ticket create(Ticket req) {
        if (req.getMaTicket() == null || req.getMaTicket().isBlank())
            req.setMaTicket(generateMaTicket());
        else if (ticketRepository.existsByMaTicket(req.getMaTicket()))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Mã ticket '" + req.getMaTicket() + "' đã tồn tại");

        req.setTrangThai(TrangThaiTicket.Moi);
        req.setIsDeleted(false);
        return ticketRepository.save(req);
    }

    // ── Cập nhật ──────────────────────────────────────────────────────
    @Transactional
    public Ticket update(Long id, Ticket req) {
        Ticket entity = getById(id);
        entity.setTieuDe(req.getTieuDe());
        entity.setMoTa(req.getMoTa());
        entity.setFileDinhKem(req.getFileDinhKem());
        entity.setLoaiTicket(req.getLoaiTicket());
        entity.setKhachHang(req.getKhachHang());
        entity.setHopDong(req.getHopDong());
        entity.setSanPham(req.getSanPham());
        entity.setMucDoUuTien(req.getMucDoUuTien());
        entity.setNguonTiepNhan(req.getNguonTiepNhan());
        entity.setNhanVienTiepNhan(req.getNhanVienTiepNhan());
        entity.setNhanVienXuLy(req.getNhanVienXuLy());
        entity.setNgayHenXuLy(req.getNgayHenXuLy());
        return ticketRepository.save(entity);
    }

    // ── Đổi trạng thái ────────────────────────────────────────────────
    @Transactional
    public Ticket updateTrangThai(Long id, Map<String, String> body) {
        Ticket entity = getById(id);
        TrangThaiTicket trangThaiMoi = parseTrangThai(body.get("trangThai"));
        TrangThaiTicket trangThaiCu  = entity.getTrangThai();

        entity.setTrangThai(trangThaiMoi);
        if (trangThaiMoi == TrangThaiTicket.Dong) {
            entity.setNgayDong(LocalDateTime.now());
            entity.setLyDoDong(body.getOrDefault("lyDo", ""));
        }
        Ticket saved = ticketRepository.save(entity);

        // Ghi log phản hồi tự động
        User nguoiThucHien = resolveUser(body.get("nguoiThucHienId"));
        TicketPhanHoi log = TicketPhanHoi.builder()
                .ticket(saved)
                .nguoiPhanHoi(nguoiThucHien)
                .loaiPhanHoi(trangThaiMoi == TrangThaiTicket.Dong
                        ? LoaiPhanHoi.DongTicket : LoaiPhanHoi.NoiBoXuLy)
                .noiDung("Chuyển trạng thái: " + trangThaiCu + " → " + trangThaiMoi
                        + (body.containsKey("lyDo") ? ". Lý do: " + body.get("lyDo") : ""))
                .trangThaiTruoc(trangThaiCu)
                .trangThaiSau(trangThaiMoi)
                .build();
        phanHoiRepository.save(log);

        return saved;
    }

    // ── Xoá mềm ──────────────────────────────────────────────────────
    @Transactional
    public void delete(Long id) {
        Ticket entity = getById(id);
        entity.setIsDeleted(true);
        ticketRepository.save(entity);
    }

    // ── Phản hồi ─────────────────────────────────────────────────────
    public List<TicketPhanHoi> getPhanHoi(Long id) {
        getById(id); // validate
        return phanHoiRepository.findByTicketIdOrderByCreatedAtAsc(id);
    }

    @Transactional
    public TicketPhanHoi addPhanHoi(Long id, TicketPhanHoi req) {
        Ticket entity = getById(id);
        req.setTrangThaiTruoc(entity.getTrangThai());
        req.setTicket(entity);

        if (req.getLoaiPhanHoi() == LoaiPhanHoi.DongTicket) {
            entity.setTrangThai(TrangThaiTicket.Dong);
            entity.setNgayDong(LocalDateTime.now());
            ticketRepository.save(entity);
            req.setTrangThaiSau(TrangThaiTicket.Dong);
        } else {
            TrangThaiTicket sau = req.getTrangThaiSau();
            if (sau != null && sau != entity.getTrangThai()) {
                entity.setTrangThai(sau);
                ticketRepository.save(entity);
            } else {
                req.setTrangThaiSau(entity.getTrangThai());
            }
        }
        return phanHoiRepository.save(req);
    }

    // ── Helpers ───────────────────────────────────────────────────────
    private TrangThaiTicket parseTrangThai(String value) {
        try { return TrangThaiTicket.valueOf(value); }
        catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Trạng thái không hợp lệ: Moi | DangXuLy | ChoPhanHoi | Dong");
        }
    }

    private User resolveUser(String idStr) {
        if (idStr == null) return null;
        try { return userRepository.findById(Integer.parseInt(idStr)).orElse(null); }
        catch (NumberFormatException e) { return null; }
    }

    private String generateMaTicket() {
        LocalDate today = LocalDate.now();
        String prefix = String.format("TK-%02d%02d-", today.getDayOfMonth(), today.getMonthValue());
        return prefix + String.format("%04d", ticketRepository.count() + 1);
    }
}