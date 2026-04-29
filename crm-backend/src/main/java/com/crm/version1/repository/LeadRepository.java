package com.crm.version1.repository;

import com.crm.version1.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    Iterable<Lead> findByTenLeadContainingOrSoDienThoaiContaining(String ten, String sdt);
}
