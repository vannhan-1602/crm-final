package com.crm.version1.Service;


import com.crm.version1.entity.Product;
import com.crm.version1.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository sanPhamRePo;

    public List<Product> getALL(){return sanPhamRePo.findAll();}

    public Product getByid(int id){return sanPhamRePo.findById((long) id).
    orElseThrow(() -> new RuntimeException("Khong Tim Thay San Pham"));}

    public Product create(Product sanPham){
        Product sp=new Product();
        sp.setId(sanPham.getId());
        sp.setLoaiSanPhamId(sanPham.getLoaiSanPhamId());
        sp.setMaSP(sanPham.getMaSP());
        sp.setTenSP(sanPham.getTenSP());
        sp.setDonVi(sanPham.getDonVi());
        sp.setGiaBan(sanPham.getGiaBan());
        sp.setSoLuongTon(sanPham.getSoLuongTon());
        sp.setTrangThai(sanPham.getTrangThai());
        sp.setCreatedAt(sanPham.getCreatedAt());
        sp.setUpdatedAt(sanPham.getUpdatedAt());
       return sanPhamRePo.save(sp);
    }
    public Product update(Integer id, Product sanPham) {
        Product sp = getByid(id);
        sp.setLoaiSanPhamId(sanPham.getLoaiSanPhamId());
        sp.setMaSP(sanPham.getMaSP());
        sp.setTenSP(sanPham.getTenSP());
        sp.setDonVi(sanPham.getDonVi());
        sp.setGiaBan(sanPham.getGiaBan());
        sp.setSoLuongTon(sanPham.getSoLuongTon());
        sp.setTrangThai(sanPham.getTrangThai());
        sp.setCreatedAt(sanPham.getCreatedAt());
        sp.setUpdatedAt(sanPham.getUpdatedAt());
        return sanPhamRePo.save(sp);
    }
    public void delete(Integer id) { sanPhamRePo.deleteById(Long.valueOf(id)); }



}
