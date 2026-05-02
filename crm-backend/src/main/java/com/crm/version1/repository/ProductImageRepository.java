package com.crm.version1.repository;

import com.crm.version1.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE ProductImage p SET p.isMain = false WHERE p.sanPhamId = :sanPhamId")
    void resetMainImage(Integer sanPhamId);
}