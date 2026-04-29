import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const KhachHangManager = () => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  // Full các trường trong DB KH_KhachHang
  const initialForm = {
    maKhachHang: "",
    tenKhachHang: "",
    loaiKhachHangId: 1,
    tinhTrangId: 1,
    email: "",
    soDienThoai: "",
    maSoThue: "",
    nhanVienPhuTrachId: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = useCallback(async () => {
    try {
      const [custRes, userRes] = await Promise.all([
        api.get("/khach-hang"),
        api.get("/users/staff"),
      ]);
      setCustomers(custRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (view === "edit") {
        await api.put(`/khach-hang/${editId}`, formData);
      } else {
        if (!formData.maKhachHang)
          formData.maKhachHang = "KH" + Date.now().toString().slice(-6);
        await api.post("/khach-hang", formData);
      }
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi lưu dữ liệu.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa khách hàng này?")) return;
    try {
      await api.delete(`/khach-hang/${id}`);
      fetchData();
    } catch (err) {
      alert("Lỗi khi xóa.");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <h5 className="m-0 text-secondary">
            {view === "edit" ? "Sửa Khách Hàng" : "Tạo Khách Hàng"}
          </h5>
          <button
            className="btn btn-sm btn-outline-secondary px-3"
            onClick={() => setView("list")}
          >
            Trở về
          </button>
        </div>
        <div className="card border-0 shadow-sm rounded-0">
          <div className="card-body p-4">
            <form onSubmit={handleSave}>
              <h6 className="fw-bold mb-3 border-bottom pb-2 text-primary">
                THÔNG TIN KHÁCH HÀNG
              </h6>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Tên khách hàng <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.tenKhachHang}
                    onChange={(e) =>
                      setFormData({ ...formData, tenKhachHang: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Mã khách hàng
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.maKhachHang}
                    onChange={(e) =>
                      setFormData({ ...formData, maKhachHang: e.target.value })
                    }
                    placeholder="Để trống tự sinh mã"
                    disabled={view === "edit"}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Loại hình kinh doanh
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={formData.loaiKhachHangId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        loaiKhachHangId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="1">KH Tổ chức (VIP)</option>
                    <option value="2">KH Tổ chức (B2B)</option>
                    <option value="3">KH Cá nhân (B2C)</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Tình trạng
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={formData.tinhTrangId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tinhTrangId: parseInt(e.target.value),
                      })
                    }
                  >
                    <option value="1">Đang giao dịch</option>
                    <option value="2">Tiềm năng</option>
                    <option value="3">Ngừng giao dịch</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Điện thoại
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.soDienThoai}
                    onChange={(e) =>
                      setFormData({ ...formData, soDienThoai: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Địa chỉ Email
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Mã số thuế
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.maSoThue}
                    onChange={(e) =>
                      setFormData({ ...formData, maSoThue: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Người phụ trách
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={formData.nhanVienPhuTrachId || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nhanVienPhuTrachId: e.target.value
                          ? parseInt(e.target.value)
                          : "",
                      })
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
              </div>
              <div className="mt-4 pt-3 border-top">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm px-4 me-2"
                >
                  LƯU DỮ LIỆU
                </button>
                <button
                  type="button"
                  className="btn btn-light btn-sm border px-4"
                  onClick={() => setView("list")}
                >
                  HỦY
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control form-control-sm"
            style={{ width: "350px" }}
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-sm btn-primary px-4">Lọc</button>
        </div>
        <button
          className="btn btn-sm btn-success px-4"
          onClick={() => {
            setFormData(initialForm);
            setView("add");
          }}
        >
          + Tạo Khách Hàng
        </button>
      </div>
      <div className="bg-white border shadow-sm">
        <table className="table table-bordered table-hover align-middle mb-0 w-100">
          <thead className="bg-light text-secondary text-center">
            <tr>
              <th style={{ width: "100px" }}>Thao tác</th>
              <th>Tên Khách Hàng</th>
              <th>Mã KH</th>
              <th>Loại hình</th>
              <th>Tình trạng</th>
              <th>Mã số thuế</th>
              <th>Liên hệ</th>
              <th>Phụ trách</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.95rem" }}>
            {customers
              .filter((c) =>
                c.tenKhachHang
                  ?.toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              )
              .map((c) => (
                <tr key={c.id}>
                  <td className="text-center">
                    <span
                      className="text-primary me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFormData(c);
                        setEditId(c.id);
                        setView("edit");
                      }}
                    >
                      Sửa
                    </span>
                    <span
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(c.id)}
                    >
                      Xóa
                    </span>
                  </td>
                  <td className="fw-medium text-dark">{c.tenKhachHang}</td>
                  <td className="text-center">{c.maKhachHang}</td>
                  <td className="text-center">
                    {c.loaiKhachHangId === 3 ? "Cá nhân" : "Tổ chức"}
                  </td>
                  <td className="text-center">
                    {c.tinhTrangId === 1
                      ? "Đang GD"
                      : c.tinhTrangId === 2
                        ? "Tiềm năng"
                        : "Ngừng GD"}
                  </td>
                  <td className="text-center">{c.maSoThue || "-"}</td>
                  <td>
                    {c.soDienThoai}
                    <br />
                    <span className="text-muted small">{c.email}</span>
                  </td>
                  <td className="text-primary">
                    {users.find((u) => u.id === c.nhanVienPhuTrachId)
                      ?.username || "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KhachHangManager;
