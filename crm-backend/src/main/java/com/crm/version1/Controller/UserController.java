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


    @GetMapping("/staff")
    public ResponseEntity<Iterable<User>> getStaffList() {

        return ResponseEntity.ok(userRepository.findAll());
    }
}