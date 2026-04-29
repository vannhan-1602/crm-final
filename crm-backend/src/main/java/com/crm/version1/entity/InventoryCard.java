package com.crm.version1.entity;
import com.crm.version1.enums.TransactionType;
import lombok.Data;
import jakarta.persistence.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@Entity
@CrossOrigin(origins = "*")
@Table(name = "Kho_TheKho")
public class InventoryCard {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "sanPham_id")
    private Product product;
    
    @Enumerated(EnumType.STRING)
    private TransactionType loaiGiaoDich;
    
    private Integer soLuongThayDoi;
    private Integer tonCuoi;
}