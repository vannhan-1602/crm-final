package com.crm.version1.repository;
import com.crm.version1.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {}