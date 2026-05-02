-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.36 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.15.0.7171
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for CRMOnline_Pro
CREATE DATABASE IF NOT EXISTS `CRMOnline_Pro` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `CRMOnline_Pro`;

-- Dumping structure for table CRMOnline_Pro.BH_CoHoiBanHang
CREATE TABLE IF NOT EXISTS `BH_CoHoiBanHang` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TenThuongVu` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `GiaiDoan` varchar(50) COLLATE utf8mb4_bin DEFAULT 'KhaoSat',
  `KhachHang_Id` bigint unsigned DEFAULT NULL,
  `Lead_Id` bigint unsigned DEFAULT NULL,
  `TyLeThanhCong` int DEFAULT '0',
  `DoanhThuKyVong` decimal(18,2) DEFAULT NULL,
  `GhiChu` text COLLATE utf8mb4_bin,
  `NgayDuKien` date DEFAULT NULL,
  `NhanVienPhuTrach_Id` int unsigned DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `fk_ch_kh` (`KhachHang_Id`),
  KEY `fk_ch_nv` (`NhanVienPhuTrach_Id`),
  KEY `fk_ch_lead` (`Lead_Id`),
  CONSTRAINT `fk_ch_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`),
  CONSTRAINT `fk_ch_lead` FOREIGN KEY (`Lead_Id`) REFERENCES `KH_Lead` (`Id`) ON DELETE SET NULL,
  CONSTRAINT `fk_ch_nv` FOREIGN KEY (`NhanVienPhuTrach_Id`) REFERENCES `HT_User` (`Id`),
  CONSTRAINT `chk_ty_le` CHECK ((`TyLeThanhCong` between 0 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.BH_CoHoiBanHang: ~2 rows (approximately)
INSERT INTO `BH_CoHoiBanHang` (`Id`, `TenThuongVu`, `GiaiDoan`, `KhachHang_Id`, `Lead_Id`, `TyLeThanhCong`, `DoanhThuKyVong`, `GhiChu`, `NgayDuKien`, `NhanVienPhuTrach_Id`, `IsDeleted`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'Dự án triển khai CRM Pro cho DEF', 'ThanhCong', 1, NULL, 100, 25000000.00, 'Đã ký hợp đồng', NULL, 2, 0, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(2, 'Bán gói CRM Basic cho XYZ', 'ThuongLuong', 2, NULL, 60, 5000000.00, 'Khách đang xin duyệt budget', NULL, 3, 0, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(3, 'Mở rộng dịch vụ cho cửa hàng Hoa Lan', 'DeXuat', NULL, 2, 30, 10000000.00, 'Đã gửi file Proposal', NULL, 3, 0, '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.BH_LoaiSanPham
CREATE TABLE IF NOT EXISTS `BH_LoaiSanPham` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `TenLoai` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `MoTa` text COLLATE utf8mb4_bin,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.BH_LoaiSanPham: ~2 rows (approximately)
INSERT INTO `BH_LoaiSanPham` (`Id`, `TenLoai`, `MoTa`) VALUES
	(1, 'Phần mềm', 'Bản quyền PM'),
	(2, 'Dịch vụ', 'Triển khai, bảo trì');

-- Dumping structure for table CRMOnline_Pro.BH_SanPham
CREATE TABLE IF NOT EXISTS `BH_SanPham` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `LoaiSanPham_Id` int unsigned DEFAULT NULL,
  `MaSP` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `TenSP` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `DonVi` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `GiaBan` decimal(18,2) DEFAULT '0.00',
  `SoLuongTon` int DEFAULT '0',
  `TrangThai` tinyint DEFAULT '1',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaSP` (`MaSP`),
  KEY `fk_sp_loai` (`LoaiSanPham_Id`),
  CONSTRAINT `fk_sp_loai` FOREIGN KEY (`LoaiSanPham_Id`) REFERENCES `BH_LoaiSanPham` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.BH_SanPham: ~3 rows (approximately)
INSERT INTO `BH_SanPham` (`Id`, `LoaiSanPham_Id`, `MaSP`, `TenSP`, `DonVi`, `GiaBan`, `SoLuongTon`, `TrangThai`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 1, 'CRM-BASIC', 'Phần mềm CRM Bản Basic', 'License', 5000000.00, 50, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(2, 1, 'CRM-PRO', 'Phần mềm CRM Bản Pro', 'License', 15000000.00, 30, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(3, 2, 'SRV-SETUP', 'Dịch vụ Triển khai hệ thống', 'Gói', 10000000.00, 999, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44');

-- Dumping structure for table CRMOnline_Pro.HD_BaoGia
CREATE TABLE IF NOT EXISTS `HD_BaoGia` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `MaBaoGia` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `KhachHang_Id` bigint unsigned NOT NULL,
  `TongTien` decimal(18,2) DEFAULT '0.00',
  `TrangThai` enum('Nhap','DaGui','TuChoi','ChapNhan') COLLATE utf8mb4_bin DEFAULT 'Nhap',
  `NhanVien_Id` int unsigned DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaBaoGia` (`MaBaoGia`),
  KEY `fk_bg_kh` (`KhachHang_Id`),
  CONSTRAINT `fk_bg_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HD_BaoGia: ~2 rows (approximately)

-- Dumping structure for table CRMOnline_Pro.HD_BaoGia_ChiTiet
CREATE TABLE IF NOT EXISTS `HD_BaoGia_ChiTiet` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `BaoGia_Id` bigint unsigned NOT NULL,
  `SanPham_Id` int unsigned NOT NULL,
  `SoLuong` int NOT NULL DEFAULT (0),
  `DonGia` decimal(18,2) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_bgct_bg` (`BaoGia_Id`),
  KEY `fk_bgct_sp` (`SanPham_Id`),
  CONSTRAINT `fk_bgct_bg` FOREIGN KEY (`BaoGia_Id`) REFERENCES `HD_BaoGia` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `fk_bgct_sp` FOREIGN KEY (`SanPham_Id`) REFERENCES `BH_SanPham` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HD_BaoGia_ChiTiet: ~3 rows (approximately)

-- Dumping structure for table CRMOnline_Pro.HD_HopDong
CREATE TABLE IF NOT EXISTS `HD_HopDong` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `MaHopDong` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `KhachHang_Id` bigint unsigned NOT NULL,
  `NgayKy` date DEFAULT NULL,
  `ThoiHan` int DEFAULT NULL,
  `TrangThai` enum('DangThucHien','TamDung','ThanhLy') COLLATE utf8mb4_bin DEFAULT 'DangThucHien',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaHopDong` (`MaHopDong`),
  KEY `fk_hdong_kh` (`KhachHang_Id`),
  CONSTRAINT `fk_hdong_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HD_HopDong: ~0 rows (approximately)
INSERT INTO `HD_HopDong` (`Id`, `MaHopDong`, `KhachHang_Id`, `NgayKy`, `ThoiHan`, `TrangThai`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'HD-DEF-2026', 1, '2026-05-02', 12, 'DangThucHien', '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.HT_ChucVu
CREATE TABLE IF NOT EXISTS `HT_ChucVu` (
  `Id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `TenChucVu` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `TenChucVu` (`TenChucVu`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HT_ChucVu: ~3 rows (approximately)
INSERT INTO `HT_ChucVu` (`Id`, `TenChucVu`, `IsActive`) VALUES
	(1, 'Giám Đốc', 1),
	(2, 'Trưởng Phòng', 1),
	(3, 'Nhân Viên', 1);

-- Dumping structure for table CRMOnline_Pro.HT_PhongBan
CREATE TABLE IF NOT EXISTS `HT_PhongBan` (
  `Id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `TenPhongBan` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `TenPhongBan` (`TenPhongBan`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HT_PhongBan: ~4 rows (approximately)
INSERT INTO `HT_PhongBan` (`Id`, `TenPhongBan`, `IsActive`) VALUES
	(1, 'Ban Giám Đốc', 1),
	(2, 'Phòng Kinh Doanh', 1),
	(3, 'Phòng Kế Toán', 1),
	(4, 'Phòng Kỹ Thuật', 1);

-- Dumping structure for table CRMOnline_Pro.HT_Role
CREATE TABLE IF NOT EXISTS `HT_Role` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `TenRole` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `MoTa` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HT_Role: ~4 rows (approximately)
INSERT INTO `HT_Role` (`Id`, `TenRole`, `MoTa`) VALUES
	(1, 'Admin', 'Quản trị viên hệ thống'),
	(2, 'Manager', 'Quản lý kinh doanh'),
	(3, 'Sale', 'Nhân viên kinh doanh'),
	(4, 'Accountant', 'Nhân viên kế toán');

-- Dumping structure for table CRMOnline_Pro.HT_ThongTinNhanSu
CREATE TABLE IF NOT EXISTS `HT_ThongTinNhanSu` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `Email` varchar(150) COLLATE utf8mb4_bin DEFAULT NULL,
  `SoDienThoai` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `PhongBan_Id` smallint unsigned DEFAULT NULL,
  `ChucVu_Id` smallint unsigned DEFAULT NULL,
  `TrangThai` tinyint(1) DEFAULT '1',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Email` (`Email`),
  KEY `fk_ns_phongban` (`PhongBan_Id`),
  KEY `fk_ns_chucvu` (`ChucVu_Id`),
  CONSTRAINT `fk_ns_chucvu` FOREIGN KEY (`ChucVu_Id`) REFERENCES `HT_ChucVu` (`Id`),
  CONSTRAINT `fk_ns_phongban` FOREIGN KEY (`PhongBan_Id`) REFERENCES `HT_PhongBan` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HT_ThongTinNhanSu: ~5 rows (approximately)
INSERT INTO `HT_ThongTinNhanSu` (`Id`, `HoTen`, `Email`, `SoDienThoai`, `PhongBan_Id`, `ChucVu_Id`, `TrangThai`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'Phạm Nguyễn Quốc Long', 'long.admin@crm.vn', '0901234567', 1, 1, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(2, 'Trần Thu Hà', 'ha.manager@crm.vn', '0987654321', 2, 2, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(3, 'Lê Kinh Doanh', 'kinhdoanh1@crm.vn', '0911222333', 2, 3, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(4, 'Nguyễn Thị Kế Toán', 'ketoan1@crm.vn', '0944555666', 3, 3, 1, '2026-05-02 11:00:44', '2026-05-02 11:00:44');

-- Dumping structure for table CRMOnline_Pro.HT_User
CREATE TABLE IF NOT EXISTS `HT_User` (
  `Id` int unsigned NOT NULL AUTO_INCREMENT,
  `NhanSu_Id` int unsigned DEFAULT NULL,
  `Username` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `Role_Id` int unsigned DEFAULT NULL,
  `TrangThai` enum('Active','Locked','Inactive') COLLATE utf8mb4_bin DEFAULT 'Active',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `NhanSu_Id` (`NhanSu_Id`),
  KEY `fk_user_role` (`Role_Id`),
  CONSTRAINT `fk_user_nhansu` FOREIGN KEY (`NhanSu_Id`) REFERENCES `HT_ThongTinNhanSu` (`Id`) ON DELETE SET NULL,
  CONSTRAINT `fk_user_role` FOREIGN KEY (`Role_Id`) REFERENCES `HT_Role` (`Id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.HT_User: ~5 rows (approximately)
INSERT INTO `HT_User` (`Id`, `NhanSu_Id`, `Username`, `Password`, `Role_Id`, `TrangThai`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 1, 'admin', '123456', 1, 'Active', '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(2, 2, 'manager', '123456', 2, 'Active', '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(3, 3, 'sale01', '123456', 3, 'Active', '2026-05-02 11:00:44', '2026-05-02 11:00:44'),
	(4, 4, 'ketoan01', '123456', 4, 'Active', '2026-05-02 11:00:44', '2026-05-02 11:00:44');

-- Dumping structure for table CRMOnline_Pro.KH_DiaChi
CREATE TABLE IF NOT EXISTS `KH_DiaChi` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `KhachHang_Id` bigint unsigned NOT NULL,
  `DiaChiChiTiet` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `TinhThanh` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `QuanHuyen` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `PhuongXa` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `LoaiDiaChi` enum('Billing','Shipping','Office') COLLATE utf8mb4_bin DEFAULT NULL,
  `IsDefault` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `fk_dc_kh` (`KhachHang_Id`),
  CONSTRAINT `fk_dc_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KH_DiaChi: ~2 rows (approximately)
INSERT INTO `KH_DiaChi` (`Id`, `KhachHang_Id`, `DiaChiChiTiet`, `TinhThanh`, `QuanHuyen`, `PhuongXa`, `LoaiDiaChi`, `IsDefault`) VALUES
	(1, 1, 'Tòa nhà Landmark 81', 'Hồ Chí Minh', 'Quận 1', 'Bến Nghé', 'Office', 1),
	(2, 2, 'Tòa nhà Etown', 'Hồ Chí Minh', 'Quận 10', 'Phường 11', 'Billing', 1);

-- Dumping structure for table CRMOnline_Pro.KH_HoatDong
CREATE TABLE IF NOT EXISTS `KH_HoatDong` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `KhachHang_Id` bigint unsigned DEFAULT NULL,
  `Lead_Id` bigint unsigned DEFAULT NULL,
  `LoaiHoatDong` enum('Call','Meeting','Email','Zalo') COLLATE utf8mb4_bin DEFAULT NULL,
  `NoiDung` text COLLATE utf8mb4_bin,
  `ThoiGianThucHien` datetime DEFAULT NULL,
  `NhanVien_Id` int unsigned DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `fk_hd_kh` (`KhachHang_Id`),
  KEY `fk_hd_lead` (`Lead_Id`),
  KEY `fk_hd_nv` (`NhanVien_Id`),
  CONSTRAINT `fk_hd_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `fk_hd_lead` FOREIGN KEY (`Lead_Id`) REFERENCES `KH_Lead` (`Id`) ON DELETE CASCADE,
  CONSTRAINT `fk_hd_nv` FOREIGN KEY (`NhanVien_Id`) REFERENCES `HT_User` (`Id`),
  CONSTRAINT `chk_hd_target` CHECK (((`KhachHang_Id` is not null) or (`Lead_Id` is not null)))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KH_HoatDong: ~3 rows (approximately)
INSERT INTO `KH_HoatDong` (`Id`, `KhachHang_Id`, `Lead_Id`, `LoaiHoatDong`, `NoiDung`, `ThoiGianThucHien`, `NhanVien_Id`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, NULL, 1, 'Call', 'Gọi điện giới thiệu gói CRM Basic, khách báo bận.', '2026-05-01 09:30:00', 3, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(2, NULL, 2, 'Zalo', 'Gửi báo giá sơ bộ qua Zalo.', '2026-05-02 14:15:00', 3, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(3, 1, NULL, 'Meeting', 'Gặp mặt ký hợp đồng triển khai CRM.', '2026-05-02 10:00:00', 2, '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.KH_KhachHang
CREATE TABLE IF NOT EXISTS `KH_KhachHang` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `MaKhachHang` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `TenKhachHang` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `LoaiKhachHang_Id` smallint unsigned DEFAULT NULL,
  `TinhTrang_Id` smallint unsigned DEFAULT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `SoDienThoai` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `MaSoThue` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `NhanVienPhuTrach_Id` int unsigned DEFAULT NULL,
  `IsDeleted` tinyint(1) DEFAULT '0',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaKhachHang` (`MaKhachHang`),
  KEY `idx_kh_sdt` (`SoDienThoai`),
  KEY `idx_kh_filter` (`NhanVienPhuTrach_Id`,`IsDeleted`,`TinhTrang_Id`),
  KEY `fk_kh_loai` (`LoaiKhachHang_Id`),
  KEY `fk_kh_ttrang` (`TinhTrang_Id`),
  FULLTEXT KEY `idx_fts_kh` (`TenKhachHang`,`Email`),
  CONSTRAINT `fk_kh_loai` FOREIGN KEY (`LoaiKhachHang_Id`) REFERENCES `KH_LoaiKhachHang` (`Id`),
  CONSTRAINT `fk_kh_nv` FOREIGN KEY (`NhanVienPhuTrach_Id`) REFERENCES `HT_User` (`Id`),
  CONSTRAINT `fk_kh_ttrang` FOREIGN KEY (`TinhTrang_Id`) REFERENCES `KH_TinhTrangKhachHang` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KH_KhachHang: ~5 rows (approximately)
INSERT INTO `KH_KhachHang` (`Id`, `MaKhachHang`, `TenKhachHang`, `LoaiKhachHang_Id`, `TinhTrang_Id`, `Email`, `SoDienThoai`, `MaSoThue`, `NhanVienPhuTrach_Id`, `IsDeleted`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'KH0001', 'Tập đoàn DEF (Đã Convert)', 1, 1, 'hung.ceo@def.vn', '0988777666', '0311223344', 1, 0, '2026-05-02 11:00:45', '2026-05-02 11:25:00'),
	(2, 'KH0002', 'Công ty TNHH XYZ', 2, 1, 'contact@xyz.com', '0283888999', '0102030405', 3, 0, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(3, 'KH0003', 'Nguyễn Văn Minh', 3, 2, 'minhnv@yahoo.com', '0912345678', NULL, 3, 0, '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.KH_Lead
CREATE TABLE IF NOT EXISTS `KH_Lead` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TenLead` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `TenCongTy` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `SoDienThoai` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  `Email` varchar(150) COLLATE utf8mb4_bin DEFAULT NULL,
  `TinhTrang` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `NhanVienPhuTrach_Id` int unsigned DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `fk_lead_nv` (`NhanVienPhuTrach_Id`),
  FULLTEXT KEY `idx_fts_lead` (`TenLead`,`TenCongTy`),
  CONSTRAINT `fk_lead_nv` FOREIGN KEY (`NhanVienPhuTrach_Id`) REFERENCES `HT_User` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KH_Lead: ~4 rows (approximately)
INSERT INTO `KH_Lead` (`Id`, `TenLead`, `TenCongTy`, `SoDienThoai`, `Email`, `TinhTrang`, `NhanVienPhuTrach_Id`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'Anh Tuấn', 'Công ty ABC', '0901112222', 'tuan@abc.com', 'Mới', 3, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(2, 'Chị Lan', 'Cửa hàng Hoa Lan', '0933444555', 'lan.hoa@gmail.com', 'Đang chăm sóc', 3, '2026-05-02 11:00:45', '2026-05-02 11:00:45'),
	(3, 'Giám đốc Hùng', 'Tập đoàn DEF', '0988777666', 'hung.ceo@def.vn', 'Đã chuyển đổi', 2, '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.KH_LoaiKhachHang
CREATE TABLE IF NOT EXISTS `KH_LoaiKhachHang` (
  `Id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `TenLoai` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `MoTa` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KH_LoaiKhachHang: ~3 rows (approximately)
INSERT INTO `KH_LoaiKhachHang` (`Id`, `TenLoai`, `MoTa`, `IsActive`) VALUES
	(1, 'VIP', 'Khách hàng chiến lược', 1),
	(2, 'B2B', 'Doanh nghiệp', 1),
	(3, 'B2C', 'Cá nhân', 1);

-- Dumping structure for table CRMOnline_Pro.KH_TinhTrangKhachHang
CREATE TABLE IF NOT EXISTS `KH_TinhTrangKhachHang` (
  `Id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `TenTinhTrang` varchar(100) COLLATE utf8mb4_bin NOT NULL,
  `IsActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KH_TinhTrangKhachHang: ~3 rows (approximately)
INSERT INTO `KH_TinhTrangKhachHang` (`Id`, `TenTinhTrang`, `IsActive`) VALUES
	(1, 'Đang giao dịch', 1),
	(2, 'Tiềm năng', 1),
	(3, 'Ngừng giao dịch', 1);

-- Dumping structure for table CRMOnline_Pro.Kho_TheKho
CREATE TABLE IF NOT EXISTS `Kho_TheKho` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `SanPham_Id` int unsigned NOT NULL,
  `MaChungTu` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `LoaiGiaoDich` enum('NhapMua','XuatBan','NhapTraKhach','XuatTraNCC','XuatHuy','KiemKe') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `SoLuongThayDoi` int NOT NULL COMMENT 'Dấu cộng (+) là Nhập, Dấu trừ (-) là Xuất',
  `TonCuoi` int NOT NULL COMMENT 'Số lượng tồn lũy kế ngay sau khi giao dịch này xảy ra',
  `NgayGiaoDich` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NguoiThucHien_Id` int unsigned DEFAULT NULL,
  `GhiChu` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_thekho_user` (`NguoiThucHien_Id`),
  KEY `idx_thekho_truyvan` (`SanPham_Id`,`NgayGiaoDich`),
  CONSTRAINT `fk_thekho_sp` FOREIGN KEY (`SanPham_Id`) REFERENCES `BH_SanPham` (`Id`),
  CONSTRAINT `fk_thekho_user` FOREIGN KEY (`NguoiThucHien_Id`) REFERENCES `HT_User` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.Kho_TheKho: ~2 rows (approximately)
INSERT INTO `Kho_TheKho` (`Id`, `SanPham_Id`, `MaChungTu`, `LoaiGiaoDich`, `SoLuongThayDoi`, `TonCuoi`, `NgayGiaoDich`, `NguoiThucHien_Id`, `GhiChu`) VALUES
	(1, 1, 'NK-001', 'NhapMua', 50, 50, '2026-05-02 11:00:45', 1, 'Nhập license CRM Basic đầu kỳ'),
	(2, 2, 'NK-001', 'NhapMua', 31, 31, '2026-05-02 11:00:45', 1, 'Nhập license CRM Pro đầu kỳ'),
	(3, 2, 'PX-001', 'XuatBan', 1, 30, '2026-05-02 11:00:45', 2, 'Xuất license cho hợp đồng HD-DEF-2026');

-- Dumping structure for table CRMOnline_Pro.KT_HoaDon
CREATE TABLE IF NOT EXISTS `KT_HoaDon` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `MaHoaDon` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `HopDong_Id` bigint unsigned DEFAULT NULL,
  `KhachHang_Id` bigint unsigned NOT NULL,
  `TongTien` decimal(18,2) NOT NULL,
  `SoTienDaThu` decimal(18,2) DEFAULT '0.00',
  `TrangThaiThanhToan` enum('ChuaThanhToan','ThanhToan1Phan','HoanTat') COLLATE utf8mb4_bin DEFAULT 'ChuaThanhToan',
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaHoaDon` (`MaHoaDon`),
  KEY `fk_hdon_kh` (`KhachHang_Id`),
  KEY `fk_hdon_hopdong` (`HopDong_Id`),
  CONSTRAINT `fk_hdon_hopdong` FOREIGN KEY (`HopDong_Id`) REFERENCES `HD_HopDong` (`Id`) ON DELETE SET NULL,
  CONSTRAINT `fk_hdon_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KT_HoaDon: ~0 rows (approximately)
INSERT INTO `KT_HoaDon` (`Id`, `MaHoaDon`, `HopDong_Id`, `KhachHang_Id`, `TongTien`, `SoTienDaThu`, `TrangThaiThanhToan`, `CreatedAt`, `UpdatedAt`) VALUES
	(1, 'INV-2605-001', 1, 1, 25000000.00, 10000000.00, 'ThanhToan1Phan', '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.KT_PhieuThuChi
CREATE TABLE IF NOT EXISTS `KT_PhieuThuChi` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `MaPhieu` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `LoaiPhieu` enum('Thu','Chi') COLLATE utf8mb4_bin NOT NULL,
  `KhachHang_Id` bigint unsigned DEFAULT NULL,
  `HoaDon_Id` bigint unsigned DEFAULT NULL,
  `SoTien` decimal(18,2) NOT NULL,
  `NguoiLap_Id` int unsigned DEFAULT NULL,
  `NgayTao` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `MaPhieu` (`MaPhieu`),
  KEY `fk_ptc_kh` (`KhachHang_Id`),
  KEY `fk_ptc_hdon` (`HoaDon_Id`),
  KEY `fk_ptc_user` (`NguoiLap_Id`),
  CONSTRAINT `fk_ptc_hdon` FOREIGN KEY (`HoaDon_Id`) REFERENCES `KT_HoaDon` (`Id`),
  CONSTRAINT `fk_ptc_kh` FOREIGN KEY (`KhachHang_Id`) REFERENCES `KH_KhachHang` (`Id`),
  CONSTRAINT `fk_ptc_user` FOREIGN KEY (`NguoiLap_Id`) REFERENCES `HT_User` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.KT_PhieuThuChi: ~0 rows (approximately)
INSERT INTO `KT_PhieuThuChi` (`Id`, `MaPhieu`, `LoaiPhieu`, `KhachHang_Id`, `HoaDon_Id`, `SoTien`, `NguoiLap_Id`, `NgayTao`, `UpdatedAt`) VALUES
	(1, 'PT-0001', 'Thu', 1, 1, 10000000.00, 4, '2026-05-02 11:00:45', '2026-05-02 11:00:45');

-- Dumping structure for table CRMOnline_Pro.SYS_AuditLog
CREATE TABLE IF NOT EXISTS `SYS_AuditLog` (
  `Id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `TableName` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `RecordId` bigint unsigned NOT NULL,
  `Action` enum('INSERT','UPDATE','DELETE') COLLATE utf8mb4_bin NOT NULL,
  `OldData` json DEFAULT NULL,
  `NewData` json DEFAULT NULL,
  `UserId` int unsigned DEFAULT NULL,
  `ChangedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `idx_audit_main` (`TableName`,`RecordId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Dumping data for table CRMOnline_Pro.SYS_AuditLog: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
