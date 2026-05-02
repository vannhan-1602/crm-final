package com.crm.version1.Service;

import com.crm.version1.entity.*;
import com.crm.version1.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class InventoryCardService {
    private final InventoryCardRepository cardRepo;
    private final ProductRepository productRepo;

    @Transactional
    public InventoryCard createTransaction(InventoryCard card) {
        Product product = productRepo.findById(card.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (card.getLoaiGiaoDich() == TransactionType.XuatBan) {
            if (product.getSoLuongTon() < card.getSoLuongThayDoi()) {
                throw new RuntimeException("Không đủ hàng trong kho!");
            }
            product.setSoLuongTon(product.getSoLuongTon() - card.getSoLuongThayDoi());
        }
        else if (card.getLoaiGiaoDich() == TransactionType.NhapMua) {
            product.setSoLuongTon(product.getSoLuongTon() + card.getSoLuongThayDoi());
        }

        productRepo.save(product);
        card.setTonCuoi(product.getSoLuongTon());
        return cardRepo.save(card);
    }
}