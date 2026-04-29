import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const HoaDonManager = () => {
  const [invoices, setInvoices] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState({
    maHoaDon: "",
    hopDongId: "",
    khachHangId: "",
    tongTien: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [invRes, ctrtRes, custRes] = await Promise.all([
        api.get("/invoices"),
        api.get("/contracts"),
        api.get("/khach-hang"),
      ]);
      setInvoices(invRes.data.data || invRes.data);
      setContracts(ctrtRes.data.data || ctrtRes.data);
      setCustomers(custRes.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await api.post("/invoices", {
        maHoaDon: formData.maHoaDon,
        hopDongId: parseInt(formData.hopDongId),
        khachHangId: parseInt(formData.khachHangId),
        tongTien: parseFloat(formData.tongTien),
      });
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi tạo hóa đơn");
    }
  };

  if (view === "add") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
          <h5 className="text-secondary">Tạo hóa đơn mới</h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setView("list")}
          >
            Trở về
          </button>
        </div>
        <form
          onSubmit={handleSave}
          className="row g-3 bg-white p-4 shadow-sm border"
        >
          <div className="col-md-6">
            <label className="form-label small text-muted">Mã Hóa Đơn</label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.maHoaDon}
              onChange={(e) =>
                setFormData({ ...formData, maHoaDon: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Khách Hàng</label>
            <select
              className="form-select form-select-sm"
              required
              value={formData.khachHangId}
              onChange={(e) =>
                setFormData({ ...formData, khachHangId: e.target.value })
              }
            >
              <option value="">-- Chọn Khách Hàng --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.tenKhachHang}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Hợp Đồng Liên Quan
            </label>
            <select
              className="form-select form-select-sm"
              required
              value={formData.hopDongId}
              onChange={(e) =>
                setFormData({ ...formData, hopDongId: e.target.value })
              }
            >
              <option value="">-- Chọn Hợp Đồng --</option>
              {contracts
                .filter(
                  (c) => c.customer?.id === parseInt(formData.khachHangId),
                )
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.maHopDong}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Tổng Tiền (VNĐ)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              required
              value={formData.tongTien}
              onChange={(e) =>
                setFormData({ ...formData, tongTien: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Lưu Hóa Đơn
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="m-0 text-secondary">Danh sách Hóa đơn</h5>
        <button
          className="btn btn-sm btn-success px-4"
          onClick={() => setView("add")}
        >
          + Tạo Hóa Đơn
        </button>
      </div>
      <table className="table table-bordered table-hover w-100">
        <thead className="bg-light text-center">
          <tr>
            <th>Mã HĐ</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Đã thu</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {invoices.map((i) => (
            <tr key={i.id}>
              <td className="fw-bold">{i.maHoaDon}</td>
              <td>{i.customer?.tenKhachHang || "---"}</td>
              <td className="text-danger fw-medium">
                {Number(i.tongTien).toLocaleString("vi-VN")}đ
              </td>
              <td className="text-success">
                {Number(i.soTienDaThu).toLocaleString("vi-VN")}đ
              </td>
              <td>
                <span className="badge bg-warning text-dark">
                  {i.trangThaiThanhToan}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HoaDonManager;
