import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const BaoGiaManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);

  const initialForm = {
    maBaoGia: "",
    khachHang: { id: "" },
    trangThai: "Nhap",
  };

  const [formData, setFormData] = useState(initialForm);

  const fetchData = useCallback(async () => {
    try {
      const [quoteRes, custRes] = await Promise.all([
        api.get("/bao-gia"),
        api.get("/khach-hang"),
      ]);
      setQuotes(quoteRes.data);
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
      const payload = {
        maBaoGia: formData.maBaoGia,
        khachHang: { id: parseInt(formData.khachHang.id) },
        trangThai: formData.trangThai,
      };

      if (view === "edit") {
        await api.put(`/bao-gia/${editId}`, payload);
        alert("Cập nhật thành công!");
      } else {
        await api.post("/bao-gia", payload);
        alert("Tạo báo giá thành công!");
      }
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi khi lưu báo giá!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa báo giá này?")) return;
    try {
      await api.delete(`/bao-gia/${id}`);
      fetchData();
    } catch (err) {
      alert("Lỗi khi xóa!");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Nhap": return "bg-secondary";
      case "DaGui": return "bg-info text-dark";
      case "ChapNhan": return "bg-success";
      case "TuChoi": return "bg-danger";
      default: return "bg-light text-dark";
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
          <h5 className="text-secondary">
            {view === "edit" ? "Sửa Báo Giá" : "Tạo Báo Giá"}
          </h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setView("list")}>
            Trở về
          </button>
        </div>
        <form onSubmit={handleSave} className="row g-3 bg-white p-4 shadow-sm border mb-4">
          <div className="col-md-6">
            <label className="form-label small text-muted">Mã Báo Giá</label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.maBaoGia}
              onChange={(e) => setFormData({ ...formData, maBaoGia: e.target.value })}
              placeholder="VD: BG-001"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Khách Hàng</label>
            <select
              className="form-select form-select-sm"
              required
              value={formData.khachHang.id}
              onChange={(e) => setFormData({ ...formData, khachHang: { id: e.target.value } })}
            >
              <option value="">-- Chọn Khách Hàng --</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.tenKhachHang}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">Trạng Thái</label>
            <select
              className="form-select form-select-sm"
              value={formData.trangThai}
              onChange={(e) => setFormData({ ...formData, trangThai: e.target.value })}
            >
              <option value="Nhap">Bản Nháp</option>
              <option value="DaGui">Đã Gửi</option>
              <option value="ChapNhan">Được Chấp Nhận</option>
              <option value="TuChoi">Bị Từ Chối</option>
            </select>
          </div>
          <div className="col-12 mt-4 text-end">
            <button type="submit" className="btn btn-primary btn-sm px-4">Lưu Báo Giá</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="m-0 text-secondary">Danh sách Báo Giá</h5>
        <button className="btn btn-sm btn-success px-4" onClick={() => { setFormData(initialForm); setEditId(null); setView("add"); }}>
          + Tạo Báo Giá
        </button>
      </div>
      <table className="table table-bordered table-hover w-100 text-center bg-white shadow-sm">
        <thead className="bg-light">
          <tr>
            <th>Mã Báo Giá</th>
            <th>Khách Hàng</th>
            <th>Tổng Tiền</th>
            <th>Trạng Thái</th>
            <th>Ngày Tạo</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {quotes.map((q) => (
            <tr key={q.id}>
              <td className="fw-bold">{q.maBaoGia}</td>
              <td className="text-start">{q.khachHang?.tenKhachHang || "---"}</td>
              <td className="text-success fw-medium">
                {Number(q.tongTien || 0).toLocaleString("vi-VN")} đ
              </td>
              <td>
                <span className={`badge ${getStatusBadge(q.trangThai)}`}>{q.trangThai}</span>
              </td>
              <td>{new Date(q.createdAt).toLocaleDateString("vi-VN")}</td>
              <td>
                <span className="text-primary me-3" style={{ cursor: "pointer" }} onClick={() => {
                  setFormData({ maBaoGia: q.maBaoGia, khachHang: { id: q.khachHang?.id }, trangThai: q.trangThai });
                  setEditId(q.id);
                  setView("edit");
                }}>Sửa</span>
                <span className="text-danger" style={{ cursor: "pointer" }} onClick={() => handleDelete(q.id)}>Xóa</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaoGiaManager;