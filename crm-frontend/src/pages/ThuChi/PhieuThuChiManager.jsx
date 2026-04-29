import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const PhieuThuChiManager = () => {
  const [receipts, setReceipts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [view, setView] = useState("list");
  const [loaiPhieu, setLoaiPhieu] = useState("Thu");
  const [formData, setFormData] = useState({
    maPhieu: "",
    customerId: "",
    invoiceId: "",
    soTien: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [rcpRes, custRes, invRes] = await Promise.all([
        api.get("/receipts-payments"),
        api.get("/khach-hang"),
        api.get("/invoices"),
      ]);
      setReceipts(rcpRes.data.data || rcpRes.data);
      setCustomers(custRes.data);
      setInvoices(invRes.data.data || invRes.data);
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
      const payload = {
        maPhieu: formData.maPhieu,
        loaiPhieu: loaiPhieu,
        soTien: parseFloat(formData.soTien),
        customer: { id: parseInt(formData.customerId) },
      };
      if (formData.invoiceId) {
        payload.invoice = { id: parseInt(formData.invoiceId) };
      }
      await api.post("/receipts-payments", payload);
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi tạo phiếu!");
    }
  };

  if (view === "add") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
          <h5 className="text-secondary">
            Tạo phiếu {loaiPhieu === "Thu" ? "Thu" : "Chi"}
          </h5>
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
            <label className="form-label small text-muted">Mã Phiếu</label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.maPhieu}
              onChange={(e) =>
                setFormData({ ...formData, maPhieu: e.target.value })
              }
              placeholder="VD: PT-001"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Khách Hàng</label>
            <select
              className="form-select form-select-sm"
              required
              value={formData.customerId}
              onChange={(e) =>
                setFormData({ ...formData, customerId: e.target.value })
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
          {loaiPhieu === "Thu" && (
            <div className="col-md-6">
              <label className="form-label small text-muted">
                Hóa Đơn (Tự cấn trừ công nợ)
              </label>
              <select
                className="form-select form-select-sm"
                value={formData.invoiceId}
                onChange={(e) =>
                  setFormData({ ...formData, invoiceId: e.target.value })
                }
              >
                <option value="">-- Không chọn --</option>
                {invoices
                  .filter(
                    (i) => i.customer?.id === parseInt(formData.customerId),
                  )
                  .map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.maHoaDon} - Còn: {i.tongTien - i.soTienDaThu}đ
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div className="col-md-6">
            <label className="form-label small text-muted">Số Tiền (VNĐ)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              required
              value={formData.soTien}
              onChange={(e) =>
                setFormData({ ...formData, soTien: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Lưu Phiếu
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="m-0 text-secondary">Danh sách Thu & Chi</h5>
        <div>
          <button
            className="btn btn-sm btn-success px-3 me-2"
            onClick={() => {
              setLoaiPhieu("Thu");
              setView("add");
            }}
          >
            + Phiếu Thu
          </button>
          <button
            className="btn btn-sm btn-danger px-3"
            onClick={() => {
              setLoaiPhieu("Chi");
              setView("add");
            }}
          >
            - Phiếu Chi
          </button>
        </div>
      </div>
      <table className="table table-bordered table-hover w-100 text-center">
        <thead className="bg-light">
          <tr>
            <th>Mã phiếu</th>
            <th>Loại</th>
            <th>Khách hàng</th>
            <th>Hóa đơn</th>
            <th>Số tiền</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((r) => (
            <tr key={r.id}>
              <td className="fw-bold">{r.maPhieu}</td>
              <td>
                <span
                  className={`badge ${r.loaiPhieu === "Thu" ? "bg-success" : "bg-danger"}`}
                >
                  {r.loaiPhieu}
                </span>
              </td>
              <td>{r.customer?.tenKhachHang || "---"}</td>
              <td>{r.invoice?.maHoaDon || "---"}</td>
              <td className="fw-medium">
                {Number(r.soTien).toLocaleString("vi-VN")}đ
              </td>
              <td>{r.ngayTao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default PhieuThuChiManager;
