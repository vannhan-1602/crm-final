package com.crm.version1.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {
    // Thư mục lưu trữ sẽ nằm ngay tại gốc của project
    private final Path root = Paths.get("uploads/products");

    public FileStorageService() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage folder!");
        }
    }

    public String save(MultipartFile file) {
        try {
            // Tạo tên file ngẫu nhiên để không bị trùng
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), this.root.resolve(fileName));
            return fileName; // Trả về tên file để lưu vào DB
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }
}