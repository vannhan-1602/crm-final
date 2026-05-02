package com.crm.version1.Service;

import com.crm.version1.entity.*;
import com.crm.version1.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final ContractRepository contractRepository;
    private final CustomerRepository customerRepository;

    public Invoice createInvoice(String maHoaDon, Long hopDongId, Long khachHangId, BigDecimal tongTien) {
        Contract contract = contractRepository.findById(hopDongId)
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        KhachHang customer = customerRepository.findById(khachHangId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Invoice invoice = new Invoice();
        invoice.setMaHoaDon(maHoaDon);
        invoice.setContract(contract);
        invoice.setCustomer(customer);
        invoice.setTongTien(tongTien);
        invoice.setSoTienDaThu(BigDecimal.ZERO);
        invoice.setTrangThaiThanhToan(InvoiceStatus.ChuaThanhToan);

        return invoiceRepository.save(invoice);
    }
}