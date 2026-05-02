package com.crm.version1.repository;

import com.crm.version1.entity.LoaiTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoaiTicketRepository extends JpaRepository<LoaiTicket, Integer> {

    List<LoaiTicket> findByIsActiveTrue();

    boolean existsByTenLoaiIgnoreCase(String tenLoai);
}
