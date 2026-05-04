package com.crm.version1.repository;
import com.crm.version1.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    @Query("SELECT SUM(i.tongTien) FROM Invoice i")
    BigDecimal sumTotalRevenue();
}