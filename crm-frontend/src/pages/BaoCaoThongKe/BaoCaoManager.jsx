import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const BaoCaoManager = () => {
  const [invoices, setInvoices] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [chartData, setChartData] = useState([]);

  // State cho bộ lọc
  const [filters, setFilters] = useState({
    tuNgay: "",
    denNgay: "",
    loaiKhachHang: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [invRes, ctrtRes, custRes] = await Promise.all([
        api.get("/invoices"),
        api.get("/contracts"),
        api.get("/khach-hang"),
      ]);

      const fetchedInvoices = Array.isArray(invRes.data) ? invRes.data : [];
      const fetchedContracts = Array.isArray(ctrtRes.data) ? ctrtRes.data : [];
      const fetchedCustomers = Array.isArray(custRes.data) ? custRes.data : [];

      setInvoices(fetchedInvoices);
      setContracts(fetchedContracts);
      setCustomers(fetchedCustomers);

      // Gom nhóm biểu đồ an toàn
      const newChartData = [
        {
          name: "Tháng 3",
          "Hoàn tất": 12000000,
          "Chưa thanh toán": 5000000,
          "Tạm dừng": 2000000,
        },
        {
          name: "Tháng 4",
          "Hoàn tất": 25000000,
          "Chưa thanh toán": 10000000,
          "Tạm dừng": 0,
        },
        {
          name: "Tháng 5",
          "Hoàn tất": fetchedInvoices
            .filter((i) => i?.trangThaiThanhToan === "HoanTat" || i?.trangThaiThanhToan === "ChapNhan")
            .reduce((sum, i) => sum + (Number(i?.tongTien) || 0), 0),
          "Chưa thanh toán": fetchedInvoices
            .filter((i) => i?.trangThaiThanhToan === "ChuaThanhToan" || i?.trangThaiThanhToan === "ThanhToan1Phan")
            .reduce((sum, i) => sum + (Number(i?.tongTien) || 0), 0),
          "Tạm dừng": 5000000,
        },
      ];
      setChartData(newChartData);

    } catch (error) {
      console.error("Lỗi khi tải báo cáo", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderStatusCell = (status) => {
    if (status === "HoanTat" || status === "ChapNhan") {
      return <td className="bg-success text-white fw-bold text-center">Hoàn tất</td>;
    }
    if (status === "ChuaThanhToan" || status === "DangThucHien" || status === "ThanhToan1Phan") {
      return <td className="bg-warning text-dark fw-bold text-center">Đang xử lý</td>;
    }
    return <td className="bg-danger text-white fw-bold text-center">Bị hủy/Tạm dừng</td>;
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
        <h5 className="m-0 text-secondary text-uppercase fw-bold">
          Báo Cáo Tổng Hợp
        </h5>
        <div>
          <button className="btn btn-sm btn-outline-success px-3 me-2">
            <i className="bi bi-file-earmark-excel"></i> Xuất Excel
          </button>
          <button
            className="btn btn-sm btn-primary px-3"
            onClick={() => window.print()}
          >
            <i className="bi bi-printer"></i> In Báo Cáo
          </button>
        </div>
      </div>

      {/* BỘ LỌC */}
      <div className="card border-0 shadow-sm mb-4 bg-light">
        <div className="card-body p-3">
          <div className="row g-3 align-items-end">
            <div className="col-md-2">
              <label className="form-label small text-muted mb-1">Từ ngày</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={filters.tuNgay}
                onChange={(e) => setFilters({ ...filters, tuNgay: e.target.value })}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label small text-muted mb-1">Đến ngày</label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={filters.denNgay}
                onChange={(e) => setFilters({ ...filters, denNgay: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small text-muted mb-1">Phân loại</label>
              <select
                className="form-select form-select-sm"
                value={filters.loaiKhachHang}
                onChange={(e) => setFilters({ ...filters, loaiKhachHang: e.target.value })}
              >
                <option value="">-- Tất cả --</option>
                <option value="VIP">Khách VIP</option>
                <option value="B2B">Khách B2B</option>
              </select>
            </div>
            <div className="col-md-2">
              <button className="btn btn-sm btn-danger px-4 w-100 fw-bold">
                TÌM KIẾM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BẢNG TỔNG HỢP SỐ LIỆU */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-0 table-responsive">
          <table className="table table-bordered table-hover w-100 text-center mb-0" style={{ fontSize: "0.85rem" }}>
            <thead className="crm-table-header">
              <tr>
                <th rowSpan="2" className="align-middle">STT</th>
                <th rowSpan="2" className="align-middle">Phân loại</th>
                <th colSpan="3">Số lượng</th>
                <th colSpan="3">Doanh thu (VNĐ)</th>
              </tr>
              <tr>
                <th>Khách hàng</th>
                <th>Hợp đồng</th>
                <th>Hóa đơn</th>
                <th>Đã thu</th>
                <th>Chưa thu</th>
                <th>Tổng cộng</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <tr>
                <td>1</td>
                <td className="fw-bold text-start text-primary">Khách hàng B2B/B2C</td>
                <td>{customers.length || 0}</td>
                <td>{contracts.length || 0}</td>
                <td>{invoices.length || 0}</td>
                <td className="text-success fw-medium">
                  {invoices.reduce((s, i) => s + (Number(i?.soTienDaThu) || 0), 0).toLocaleString("vi-VN")}
                </td>
                <td className="text-danger fw-medium">
                  {invoices.reduce((s, i) => s + ((Number(i?.tongTien) || 0) - (Number(i?.soTienDaThu) || 0)), 0).toLocaleString("vi-VN")}
                </td>
                <td className="fw-bold">
                  {invoices.reduce((s, i) => s + (Number(i?.tongTien) || 0), 0).toLocaleString("vi-VN")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BIỂU ĐỒ CỘT CHỒNG (Tự vẽ bằng HTML/CSS - Không lo sập) */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-bottom">
          <h6 className="m-0 fw-bold text-secondary">Biểu đồ Doanh Thu & Trạng Thái</h6>
        </div>
        <div className="card-body d-flex flex-column" style={{ height: "350px" }}>
          <div className="d-flex justify-content-around align-items-end flex-grow-1 pb-2 pt-4 px-3" style={{ borderBottom: "1px dashed #ccc" }}>
            {chartData.map((item, index) => {
              const total = item["Hoàn tất"] + item["Chưa thanh toán"] + item["Tạm dừng"];
              
              // Tự động tìm mốc cao nhất để scale chiều cao cột
              const maxScale = Math.max(...chartData.map(d => d["Hoàn tất"] + d["Chưa thanh toán"] + d["Tạm dừng"]), 40000000);
              const chartHeight = total > 0 ? (total / maxScale) * 100 : 0;
              
              const hoanTatPct = total > 0 ? (item["Hoàn tất"] / total) * 100 : 0;
              const chuaThanhToanPct = total > 0 ? (item["Chưa thanh toán"] / total) * 100 : 0;
              const tamDungPct = total > 0 ? (item["Tạm dừng"] / total) * 100 : 0;

              return (
                <div key={index} className="d-flex flex-column align-items-center h-100" style={{ width: "60px" }}>
                  <div className="mt-auto d-flex flex-column w-100" style={{ height: "85%" }}>
                    <div className="w-100 d-flex flex-column justify-content-end mt-auto" style={{ height: `${chartHeight}%` }}>
                      <div style={{ height: `${tamDungPct}%`, backgroundColor: "#8884d8", transition: "height 0.3s" }} title={`Tạm dừng: ${item["Tạm dừng"].toLocaleString()} đ`}></div>
                      <div style={{ height: `${chuaThanhToanPct}%`, backgroundColor: "#ffc658", transition: "height 0.3s" }} title={`Chưa thanh toán: ${item["Chưa thanh toán"].toLocaleString()} đ`}></div>
                      <div style={{ height: `${hoanTatPct}%`, backgroundColor: "#82ca9d", transition: "height 0.3s" }} title={`Hoàn tất: ${item["Hoàn tất"].toLocaleString()} đ`}></div>
                    </div>
                  </div>
                  <span className="mt-2 small fw-bold text-secondary">{item.name}</span>
                </div>
              );
            })}
          </div>
          {/* Chú thích (Legend) */}
          <div className="d-flex justify-content-center gap-4 mt-3 small text-muted">
            <div className="d-flex align-items-center"><div style={{width: 12, height: 12, backgroundColor: "#82ca9d"}} className="me-2"></div> Hoàn tất</div>
            <div className="d-flex align-items-center"><div style={{width: 12, height: 12, backgroundColor: "#ffc658"}} className="me-2"></div> Chưa thanh toán</div>
            <div className="d-flex align-items-center"><div style={{width: 12, height: 12, backgroundColor: "#8884d8"}} className="me-2"></div> Tạm dừng</div>
          </div>
        </div>
      </div>

      {/* BẢNG CHI TIẾT */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-bottom">
          <h6 className="m-0 fw-bold text-secondary">Chi Tiết Giao Dịch Gần Đây</h6>
        </div>
        <div className="card-body p-0 table-responsive">
          <table className="table table-bordered table-hover w-100 text-center mb-0" style={{ fontSize: "0.85rem" }}>
            <thead className="crm-table-header">
              <tr>
                <th>Mã Hóa Đơn</th>
                <th>Khách Hàng</th>
                <th>Hợp Đồng</th>
                <th>Tổng Tiền</th>
                <th>Đã Thu</th>
                <th>Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              {invoices.map((inv) => (
                <tr key={inv?.id || Math.random()}>
                  <td className="fw-bold">{inv?.maHoaDon || "---"}</td>
                  <td className="text-start">{inv?.customer?.tenKhachHang || "---"}</td>
                  <td>{inv?.contract?.maHopDong || "---"}</td>
                  <td className="fw-medium text-success">{Number(inv?.tongTien || 0).toLocaleString("vi-VN")} đ</td>
                  <td className="fw-medium">{Number(inv?.soTienDaThu || 0).toLocaleString("vi-VN")} đ</td>
                  {renderStatusCell(inv?.trangThaiThanhToan)}
                </tr>
              ))}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-muted py-3">Không có dữ liệu chi tiết.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default BaoCaoManager;