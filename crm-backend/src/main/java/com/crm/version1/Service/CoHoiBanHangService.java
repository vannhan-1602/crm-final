//package com.crm.version1.Service;
//
//import com.example.crm_456.Entity.CoHoiBanHang;
//import com.example.crm_456.Reposiroty.CoHoiBanHangRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CoHoiBanHangService {
//    @Autowired
//    private CoHoiBanHangRepo coHoiBanHangRepo;
//
//    public List<CoHoiBanHang> getALL(){return coHoiBanHangRepo.findAll();}
//
//    public CoHoiBanHang getByid(int id){return coHoiBanHangRepo.findById(id).
//            orElseThrow(() -> new RuntimeException("Khong Tim Thay San Pham"));}
//
//    public CoHoiBanHang create(CoHoiBanHang cohoi){
//        CoHoiBanHang sp=new CoHoiBanHang();
//        sp.setId(cohoi.getId());
//        sp.setTenThuongVu(cohoi.getTenThuongVu());
//        sp.setGiaiDoan(cohoi.getGiaiDoan());
//        sp.setNhanVienPhuTrach(cohoi.getNhanVienPhuTrach());
//        sp.setKhachHang(cohoi.getKhachHang());
//        sp.setLead(cohoi.getLead());
//        sp.setTyLeThanhCong(cohoi.getTyLeThanhCong());
//        sp.setDoanhThuKyVong(cohoi.getDoanhThuKyVong());
//        sp.setGhiChu(cohoi.getGhiChu());
//        sp.setNgayDuKien(cohoi.getNgayDuKien());
//        sp.setDeleted(cohoi.isDeleted());
//        sp.setCreatedAt(cohoi.getCreatedAt());
//        sp.setUpdatedAt(cohoi.getUpdatedAt());
//        return coHoiBanHangRepo.save(sp);
//    }
//    public CoHoiBanHang update(Integer id, CoHoiBanHang cohoi) {
//        CoHoiBanHang sp = getByid(id);
//        sp.setTenThuongVu(cohoi.getTenThuongVu());
//        sp.setGiaiDoan(cohoi.getGiaiDoan());
//        sp.setNhanVienPhuTrach(cohoi.getNhanVienPhuTrach());
//        sp.setKhachHang(cohoi.getKhachHang());
//        sp.setLead(cohoi.getLead());
//        sp.setTyLeThanhCong(cohoi.getTyLeThanhCong());
//        sp.setDoanhThuKyVong(cohoi.getDoanhThuKyVong());
//        sp.setGhiChu(cohoi.getGhiChu());
//        sp.setNgayDuKien(cohoi.getNgayDuKien());
//        sp.setDeleted(cohoi.isDeleted());
//        sp.setCreatedAt(cohoi.getCreatedAt());
//        sp.setUpdatedAt(cohoi.getUpdatedAt());
//        return coHoiBanHangRepo.save(sp);
//    }
//    public void delete(Integer id) { coHoiBanHangRepo.deleteById(id); }
//
//
//}
