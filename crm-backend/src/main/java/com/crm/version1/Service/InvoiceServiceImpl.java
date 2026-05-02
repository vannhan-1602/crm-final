package com.crm.version1.Service.impl;
import com.crm.version1.dto.InvoiceRequest;
import com.crm.version1.entity.*;
import com.crm.version1.enums.InvoiceStatus;
import com.crm.version1.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl {
    private final InvoiceRepository invoiceRepository;
    private final ContractRepository contractRepository;
    private final CustomerRepository customerRepository;

    public Invoice createInvoice(InvoiceRequest req) {
        Contract contract = contractRepository.findById(req.getHopDongId())
                .orElseThrow(() -> new RuntimeException("Contract not found"));
        KhachHang customer = customerRepository.findById(req.getKhachHangId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Invoice invoice = new Invoice();
        invoice.setMaHoaDon(req.getMaHoaDon());
        invoice.setContract(contract);
        invoice.setCustomer(customer);
        invoice.setTongTien(req.getTongTien());
        invoice.setSoTienDaThu(java.math.BigDecimal.ZERO);
        invoice.setTrangThaiThanhToan(InvoiceStatus.ChuaThanhToan);

        return invoiceRepository.save(invoice);
    }
}