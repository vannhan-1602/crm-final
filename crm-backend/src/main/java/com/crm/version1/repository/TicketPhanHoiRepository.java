package com.crm.version1.repository;

import com.crm.version1.entity.TicketPhanHoi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketPhanHoiRepository extends JpaRepository<TicketPhanHoi, Long> {

    List<TicketPhanHoi> findByTicketIdOrderByCreatedAtAsc(Long ticketId);
}
