import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const HoatDongManager = () => {
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    loaiHoatDong: "Call",
    noiDung: "",
    thoiGianThucHien: "",
    nhanVienId: "",
    leadId: "",
    khachHangId: "",
  });
  const [targetType, setTargetType] = useState("Lead");

  const fetchData = useCallback(async () => {
    try {
      const [actRes, userRes, leadRes, custRes] = await Promise.all([
        api.get("/hoat-dong"),
        api.get("/users/staff"),
        api.get("/leads"),
        api.get("/khach-hang"),
      ]);
      setActivities(actRes.data);
      setUsers(userRes.data);
      setLeads(leadRes.data);
      setCustomers(custRes.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...form };
      if (targetType === "Lead") dataToSubmit.khachHangId = null;
      if (targetType === "KhachHang") dataToSubmit.leadId = null;

      await api.post("/hoat-dong/log", dataToSubmit);
      setShowForm(false);
      setForm({
        loaiHoatDong: "Call",
        noiDung: "",
        thoiGianThucHien: "",
        nhanVienId: "",
        leadId: "",
        khachHangId: "",
      });
      fetchData();
    } catch (err) {
      alert("Lỗi khi ghi nhật ký. Vui lòng kiểm tra lại thông tin đối tượng.");
    }
  };

  // Hàm phụ hiển thị tên Lead hoặc KH trên bảng
  const getTargetName = (act) => {
    if (act.khachHangId) {
      const kh = customers.find((c) => c.id === act.khachHangId);
      return kh ? `KH: ${kh.tenKhachHang}` : `KH_ID: ${act.khachHangId}`;
    }
    if (act.leadId) {
      const l = leads.find((l) => l.id === act.leadId);
      return l ? `Lead: ${l.tenLead}` : `Lead_ID: ${act.leadId}`;
    }
    return "---";
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h5 className="m-0 text-secondary">Nhật ký & Lịch hẹn</h5>
        <button
          className={`btn btn-sm px-4 ${showForm ? "btn-outline-secondary" : "btn-dark"}`}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Đóng form" : "+ Ghi tương tác"}
        </button>
      </div>

      {showForm && (
        <div className="card card-body bg-light mb-4 border-0 shadow-sm rounded-0 p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-3">
                <label className="form-label text-muted small fw-medium">
                  Loại hình
                </label>
                <select
                  className="form-select form-select-sm"
                  value={form.loaiHoatDong}
                  onChange={(e) =>
                    setForm({ ...form, loaiHoatDong: e.target.value })
                  }
                >
                  <option value="Call">Cuộc gọi</option>
                  <option value="Meeting">Cuộc gặp</option>
                  <option value="Email">Email</option>
                  <option value="Zalo">Zalo</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small fw-medium">
                  Người thực hiện
                </label>
                <select
                  className="form-select form-select-sm"
                  required
                  value={form.nhanVienId}
                  onChange={(e) =>
                    setForm({ ...form, nhanVienId: e.target.value })
                  }
                >
                  <option value="">-- Chọn --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small fw-medium">
                  Thời gian bắt đầu <span className="text-danger">*</span>
                </label>
                <input
                  type="datetime-local"
                  className="form-control form-control-sm"
                  value={form.thoiGianThucHien}
                  onChange={(e) =>
                    setForm({ ...form, thoiGianThucHien: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label text-muted small fw-medium">
                  Liên quan đến (Loại) <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select form-select-sm"
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value)}
                >
                  <option value="Lead">Lead (Tiềm năng)</option>
                  <option value="KhachHang">Khách Hàng (Chính thức)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label text-muted small fw-medium">
                  Chọn Đối tượng cụ thể <span className="text-danger">*</span>
                </label>
                {targetType === "Lead" ? (
                  <select
                    className="form-select form-select-sm"
                    value={form.leadId}
                    onChange={(e) =>
                      setForm({ ...form, leadId: e.target.value })
                    }
                    required
                  >
                    <option value="">-- Chọn Lead --</option>
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.tenLead} {l.tenCongTy ? `(${l.tenCongTy})` : ""}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    className="form-select form-select-sm"
                    value={form.khachHangId}
                    onChange={(e) =>
                      setForm({ ...form, khachHangId: e.target.value })
                    }
                    required
                  >
                    <option value="">-- Chọn Khách Hàng --</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.tenKhachHang}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-md-12">
                <label className="form-label text-muted small fw-medium">
                  Nội dung trao đổi / Mô tả{" "}
                  <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control form-control-sm"
                  rows="3"
                  placeholder="Nhập nội dung..."
                  value={form.noiDung}
                  onChange={(e) =>
                    setForm({ ...form, noiDung: e.target.value })
                  }
                  required
                ></textarea>
              </div>
            </div>
            <div className="mt-4 pt-3 border-top">
              <button type="submit" className="btn btn-primary btn-sm px-4">
                LƯU NHẬT KÝ
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border shadow-sm">
        <table className="table table-bordered table-hover align-middle mb-0 w-100">
          <thead className="bg-light text-secondary text-center">
            <tr>
              <th style={{ width: "120px" }}>Loại hình</th>
              <th>Nội dung</th>
              <th style={{ width: "180px" }}>Thời gian</th>
              <th style={{ width: "150px" }}>Người thực hiện</th>
              <th style={{ width: "250px" }}>Liên quan tới</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.95rem" }}>
            {activities.map((act) => (
              <tr key={act.id}>
                <td className="text-center fw-bold">{act.loaiHoatDong}</td>
                <td className="text-dark">{act.noiDung}</td>
                <td className="text-center">
                  {act.thoiGianThucHien
                    ? new Date(act.thoiGianThucHien).toLocaleString("vi-VN")
                    : "-"}
                </td>
                <td className="text-center text-primary">
                  {users.find((u) => u.id === act.nhanVienId)?.username || "-"}
                </td>
                <td className="text-center text-info fw-medium">
                  {getTargetName(act)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoatDongManager;
