package com.crm.version1.Controller;

import com.crm.version1.entity.Ticket;
import com.crm.version1.entity.TicketPhanHoi;
import com.crm.version1.entity.enums.MucDoUuTien;
import com.crm.version1.entity.enums.TrangThaiTicket;
import com.crm.version1.Service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    @GetMapping
    public ResponseEntity<Page<Ticket>> getAll(
            @RequestParam(required = false) TrangThaiTicket trangThai,
            @RequestParam(required = false) MucDoUuTien     mucDoUuTien,
            @RequestParam(required = false) Long            khachHangId,
            @RequestParam(required = false) Integer         nhanVienXuLyId,
            @RequestParam(defaultValue = "0")  int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(
                ticketService.getAll(trangThai, mucDoUuTien, khachHangId, nhanVienXuLyId, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getById(id));
    }

    @PostMapping
    public ResponseEntity<Ticket> create(@RequestBody Ticket req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.create(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> update(@PathVariable Long id, @RequestBody Ticket req) {
        return ResponseEntity.ok(ticketService.update(id, req));
    }

    @PatchMapping("/{id}/trang-thai")
    public ResponseEntity<Ticket> updateTrangThai(@PathVariable Long id,
                                                  @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(ticketService.updateTrangThai(id, body));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ticketService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/phan-hoi")
    public ResponseEntity<List<TicketPhanHoi>> getPhanHoi(@PathVariable Long id) {
        return ResponseEntity.ok(ticketService.getPhanHoi(id));
    }

    @PostMapping("/{id}/phan-hoi")
    public ResponseEntity<TicketPhanHoi> addPhanHoi(@PathVariable Long id,
                                                    @RequestBody TicketPhanHoi req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ticketService.addPhanHoi(id, req));
    }
}