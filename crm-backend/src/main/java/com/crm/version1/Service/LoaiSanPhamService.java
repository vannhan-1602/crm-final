package com.crm.version1.Service;

import com.crm.version1.entity.LoaiSanPham;
import com.crm.version1.entity.Product;
import com.crm.version1.repository.LoaiSanPhamRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoaiSanPhamService {

    @Autowired
    private LoaiSanPhamRepository repository;

    public List<LoaiSanPham> getAll() {
        return repository.findAll();
    }

    public Optional<LoaiSanPham> getById(Integer id) {
        return repository.findById(id);
    }

    public LoaiSanPham create(LoaiSanPham loaiSanPham) {
        return repository.save(loaiSanPham);
    }

    public LoaiSanPham update(Integer id, LoaiSanPham sanPham) {
        LoaiSanPham existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy LoaiSanPham với id: " + id));

        existing.setTenLoai(sanPham.getTenLoai()); // ✅ set tên
        existing.setMoTa(sanPham.getMoTa());       // ✅ set mô tả

        return repository.save(existing);          // ✅ dùng repository (chữ thường)
    }

    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy LoaiSanPham với id: " + id);
        }
        repository.deleteById(id);
    }

    public List<LoaiSanPham> searchByTenLoai(String tenLoai) {
        return repository.findByTenLoaiContainingIgnoreCase(tenLoai);
    }
}