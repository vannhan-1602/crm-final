package com.crm.version1.Controller;

import com.crm.version1.entity.LoaiTicket;
import com.crm.version1.repository.LoaiTicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/loai-ticket")
@RequiredArgsConstructor
public class LoaiTicketController {

    private final LoaiTicketRepository loaiTicketRepository;

    // GET /api/loai-ticket
    @GetMapping
    public ResponseEntity<List<LoaiTicket>> getAll() {
        return ResponseEntity.ok(loaiTicketRepository.findByIsActiveTrue());
    }

    // GET /api/loai-ticket/{id}
    @GetMapping("/{id}")
    public ResponseEntity<LoaiTicket> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(findOrThrow(id));
    }

    // POST /api/loai-ticket
    @PostMapping
    public ResponseEntity<LoaiTicket> create(@RequestBody LoaiTicket req) {
        if (loaiTicketRepository.existsByTenLoaiIgnoreCase(req.getTenLoai()))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Tên loại ticket '" + req.getTenLoai() + "' đã tồn tại");
        req.setIsActive(true);
        return ResponseEntity.status(HttpStatus.CREATED).body(loaiTicketRepository.save(req));
    }

    // PUT /api/loai-ticket/{id}
    @PutMapping("/{id}")
    public ResponseEntity<LoaiTicket> update(@PathVariable Integer id,
                                              @RequestBody LoaiTicket req) {
        LoaiTicket entity = findOrThrow(id);
        entity.setTenLoai(req.getTenLoai());
        entity.setMoTa(req.getMoTa());
        if (req.getIsActive() != null) entity.setIsActive(req.getIsActive());
        return ResponseEntity.ok(loaiTicketRepository.save(entity));
    }

    // DELETE /api/loai-ticket/{id}  → soft deactivate
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivate(@PathVariable Integer id) {
        LoaiTicket entity = findOrThrow(id);
        entity.setIsActive(false);
        loaiTicketRepository.save(entity);
        return ResponseEntity.noContent().build();
    }

    // ── helper ──────────────────────────────────────────────────────
    private LoaiTicket findOrThrow(Integer id) {
        return loaiTicketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Không tìm thấy loại ticket id=" + id));
    }
}
