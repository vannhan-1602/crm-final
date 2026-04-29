package com.crm.version1.dto;
import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

@Data
public class InvoiceRequest {
    private String maHoaDon;
    @NotNull private Long hopDongId;
    @NotNull private Long khachHangId;
    @Positive private BigDecimal tongTien;
}