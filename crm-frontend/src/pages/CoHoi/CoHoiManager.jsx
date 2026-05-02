import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const CoHoiManager = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);

  const initialForm = {
    tenThuongVu: "",
    giaiDoan: "KhaoSat",
    khachHangId: "",
    leadId: "",
    tyLeThanhCong: 0,
    doanhThuKyVong: "",
    nhanVienPhuTrachId: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = useCallback(async () => {
    try {
      const [oppRes, custRes, leadRes, userRes] = await Promise.all([
        api.get("/co-hoi"),
        api.get("/khach-hang"),
        api.get("/leads"),
        api.get("/users/staff"),
      ]);
      setOpportunities(oppRes.data);
      setCustomers(custRes.data);
      setLeads(leadRes.data);
      setUsers(userRes.data);
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
      if (view === "edit") {
        await api.put(`/co-hoi/${editId}`, formData);
      } else {
        await api.post("/co-hoi", formData);
      }
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi khi lưu Cơ hội bán hàng!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa cơ hội bán hàng này?")) return;
    try {
      await api.delete(`/co-hoi/${id}`);
      fetchData();
    } catch (err) {
      alert("Lỗi khi xóa!");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
          <h5 className="text-secondary">
            {view === "edit" ? "Sửa Thương Vụ" : "Thêm Thương Vụ Mới"}
          </h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setView("list")}
          >
            Trở lại
          </button>
        </div>
        <form
          onSubmit={handleSave}
          className="row g-3 bg-white p-4 shadow-sm border"
        >
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Tên Thương Vụ *
            </label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.tenThuongVu}
              onChange={(e) =>
                setFormData({ ...formData, tenThuongVu: e.target.value })
              }
            />
          </div>
          <div className="col-md-3">
            <label className="form-label small text-muted">Giai Đoạn</label>
            <select
              className="form-select form-select-sm"
              value={formData.giaiDoan}
              onChange={(e) =>
                setFormData({ ...formData, giaiDoan: e.target.value })
              }
            >
              <option value="KhaoSat">Khảo sát</option>
              <option value="DeXuat">Đề xuất</option>
              <option value="ThuongLuong">Thương lượng</option>
              <option value="ThanhCong">Thành công</option>
              <option value="ThatBai">Thất bại</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label small text-muted">Tỷ lệ win (%)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              max="100"
              value={formData.tyLeThanhCong}
              onChange={(e) =>
                setFormData({ ...formData, tyLeThanhCong: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Khách Hàng Quan Tâm
            </label>
            <select
              className="form-select form-select-sm"
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
              Doanh thu kỳ vọng (VNĐ)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={formData.doanhThuKyVong}
              onChange={(e) =>
                setFormData({ ...formData, doanhThuKyVong: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Lưu Thương Vụ
            </button>
          </div>
        </form>
      </div>
    );
  }

  const getStageBadge = (stage) => {
    const badges = {
      KhaoSat: "bg-info text-dark",
      DeXuat: "bg-primary",
      ThuongLuong: "bg-warning text-dark",
      ThanhCong: "bg-success",
      ThatBai: "bg-danger",
    };
    return badges[stage] || "bg-secondary";
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="m-0 text-secondary">Cơ Hội Bán Hàng (Pipeline)</h5>
        <button
          className="btn btn-sm btn-success px-4"
          onClick={() => {
            setFormData(initialForm);
            setView("add");
          }}
        >
          + Tạo Thương Vụ
        </button>
      </div>
      <table className="table table-bordered table-hover w-100 text-center bg-white shadow-sm">
        <thead className="bg-light">
          <tr>
            <th>Tên Thương Vụ</th>
            <th>Khách hàng</th>
            <th>Giai Đoạn</th>
            <th>Tỷ lệ Win</th>
            <th>Doanh Thu KV</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {opportunities.map((opp) => (
            <tr key={opp.id}>
              <td className="fw-bold text-start">{opp.tenThuongVu}</td>
              <td>
                {customers.find((c) => c.id === opp.khachHangId)
                  ?.tenKhachHang || "---"}
              </td>
              <td>
                <span className={`badge ${getStageBadge(opp.giaiDoan)}`}>
                  {opp.giaiDoan}
                </span>
              </td>
              <td>
                <div
                  className="progress mx-auto"
                  style={{ width: "80%", height: "10px" }}
                >
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${opp.tyLeThanhCong}%` }}
                  ></div>
                </div>
                <small>{opp.tyLeThanhCong}%</small>
              </td>
              <td className="fw-medium text-success">
                {Number(opp.doanhThuKyVong).toLocaleString("vi-VN")} đ
              </td>
              <td>
                <span
                  className="text-primary me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setFormData(opp);
                    setEditId(opp.id);
                    setView("edit");
                  }}
                >
                  Sửa
                </span>
                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(opp.id)}
                >
                  Xóa
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoHoiManager;
