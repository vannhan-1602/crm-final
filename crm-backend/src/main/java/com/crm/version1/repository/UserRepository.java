package com.crm.version1.repository;

import com.crm.version1.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Spring Data JPA sẽ tự động hỗ trợ các hàm findAll(), findById()...
}