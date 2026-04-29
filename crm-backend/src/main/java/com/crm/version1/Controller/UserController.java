package com.crm.version1.Controller;

import com.crm.version1.entity.User;
import com.crm.version1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    // API: http://localhost:8081/crm-ver1/api/users/staff
    @GetMapping("/staff")
    public ResponseEntity<Iterable<User>> getStaffList() {
        // Lấy danh sách toàn bộ user để Frontend làm dropdown chọn nhân viên
        return ResponseEntity.ok(userRepository.findAll());
    }
}