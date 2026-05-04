import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import LeadManager from "./pages/Lead/LeadManager";
import KhachHangManager from "./pages/KhachHang/KhachHangManager";
import HoatDongManager from "./pages/HoatDong/HoatDongManager";
import HopDongManager from "./pages/HopDong/HopDongManager";
import HoaDonManager from "./pages/HoaDon/HoaDonManager";
import PhieuThuChiManager from "./pages/ThuChi/PhieuThuChiManager";
import KhoHangManager from "./pages/KhoHang/KhoHangManager";
import SanPhamManager from "./pages/SanPham/SanPhamManager";
import CoHoiManager from "./pages/CoHoi/CoHoiManager";
import TicketManager from "./pages/Ticket/TicketManager.jsx";
import BaoGiaManager from "./pages/BaoGia/BaoGiaManager";
import BaoCaoManager from "./pages/BaoCaoThongKe/BaoCaoManager";

function App() {
  return (
    <Router>
      <div
        className="d-flex w-100 min-vh-100"
        style={{ backgroundColor: "#f4f6f9" }}
      >
        <Sidebar />

        <div style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}>
          <Topbar />

          <div className="container-fluid px-4 pb-4">
            <div className="bg-white p-4 shadow-sm border rounded">
              <Routes>
                <Route path="/" element={<Navigate to="/leads" />} />
                <Route path="/leads" element={<LeadManager />} />
                <Route path="/khach-hang" element={<KhachHangManager />} />
                <Route path="/hoat-dong" element={<HoatDongManager />} />
                <Route path="/hop-dong" element={<HopDongManager />} />
                <Route path="/hoa-don" element={<HoaDonManager />} />
                <Route path="/thu-chi" element={<PhieuThuChiManager />} />
                <Route path="/kho-hang" element={<KhoHangManager />} />
                <Route path="/san-pham" element={<SanPhamManager />} />
                <Route path="/co-hoi" element={<CoHoiManager />} />
                <Route path="/tickets" element={<TicketManager />} />
                <Route path="/bao-gia" element={<BaoGiaManager />} />
                <Route path="/bao-cao" element={<BaoCaoManager />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
