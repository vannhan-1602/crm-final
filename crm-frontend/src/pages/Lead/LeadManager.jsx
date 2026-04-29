import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const LeadManager = () => {
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  // Full các trường trong DB KH_Lead
  const initialForm = {
    tenLead: "",
    tenCongTy: "",
    soDienThoai: "",
    email: "",
    tinhTrang: "Mới",
    nhanVienPhuTrachId: "",
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = useCallback(async () => {
    try {
      const [leadRes, userRes] = await Promise.all([
        api.get("/leads"),
        api.get("/users/staff"),
      ]);
      setLeads(leadRes.data);
      setUsers(userRes.data);
    } catch (err) {
      console.error("Lỗi:", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredLeads = leads.filter(
    (l) =>
      (l.tenLead &&
        l.tenLead.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (l.soDienThoai && l.soDienThoai.includes(searchTerm)),
  );

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (view === "edit") {
        await api.put(`/leads/${editId}`, formData);
      } else {
        await api.post("/leads", formData);
      }
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi khi lưu dữ liệu.");
    }
  };

  const openEditForm = (lead) => {
    setFormData({
      tenLead: lead.tenLead || "",
      tenCongTy: lead.tenCongTy || "",
      soDienThoai: lead.soDienThoai || "",
      email: lead.email || "",
      tinhTrang: lead.tinhTrang || "Mới",
      nhanVienPhuTrachId: lead.nhanVienPhuTrachId || "",
    });
    setEditId(lead.id);
    setView("edit");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa vĩnh viễn Lead này?")) return;
    try {
      await api.delete(`/leads/${id}`);
      fetchData();
    } catch (err) {
      alert("Lỗi khi xóa Lead.");
    }
  };

  const handleAssign = async (leadId, nvId) => {
    if (!nvId) return;
    try {
      await api.put(`/leads/${leadId}/assign/${nvId}`);
      fetchData();
    } catch (err) {
      alert("Lỗi phân công.");
    }
  };

  const handleConvert = async (id) => {
    if (!window.confirm("Chuyển đổi thành Khách Hàng chính thức?")) return;
    try {
      await api.post(`/leads/${id}/convert`);
      fetchData();
    } catch (err) {
      alert("Lỗi chuyển đổi.");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <h5 className="m-0 text-secondary">
            {view === "edit" ? "Cập nhật Lead" : "Thêm mới Lead"}
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
                TỔNG QUAN
              </h6>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Tên liên hệ (Lead) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.tenLead}
                    onChange={(e) =>
                      setFormData({ ...formData, tenLead: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Di động <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.soDienThoai}
                    onChange={(e) =>
                      setFormData({ ...formData, soDienThoai: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Tên công ty / Tổ chức
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={formData.tenCongTy}
                    onChange={(e) =>
                      setFormData({ ...formData, tenCongTy: e.target.value })
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
                    Tình trạng
                  </label>
                  <select
                    className="form-select form-select-sm"
                    value={formData.tinhTrang}
                    onChange={(e) =>
                      setFormData({ ...formData, tinhTrang: e.target.value })
                    }
                  >
                    <option value="Mới">Mới</option>
                    <option value="Đang tiếp cận">Đang tiếp cận</option>
                    <option value="Đang chăm sóc">Đang chăm sóc</option>
                    <option value="Đã chuyển đổi">Đã chuyển đổi</option>
                    <option value="Ngừng chăm sóc">Ngừng chăm sóc</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-medium text-dark small">
                    Giao cho người dùng
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
                    <option value="">-- Chưa gán --</option>
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
            placeholder="Tìm kiếm tên, SĐT..."
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
          + Thêm Lead
        </button>
      </div>

      <div className="bg-white border shadow-sm">
        <table className="table table-bordered table-hover align-middle mb-0 w-100">
          <thead className="bg-light text-secondary text-center">
            <tr>
              <th style={{ width: "100px" }}>Thao tác</th>
              <th>Tên Lead</th>
              <th>Liên hệ</th>
              <th>Công ty</th>
              <th>Tình trạng</th>
              <th>Phụ trách</th>
              <th style={{ width: "220px" }}>Convert / Giao việc</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.95rem" }}>
            {filteredLeads.map((lead) => (
              <tr key={lead.id}>
                <td className="text-center">
                  {lead.tinhTrang !== "Đã chuyển đổi" ? (
                    <>
                      <span
                        className="text-primary me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => openEditForm(lead)}
                      >
                        Sửa
                      </span>
                      <span
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(lead.id)}
                      >
                        Xóa
                      </span>
                    </>
                  ) : (
                    <span className="text-muted small">
                      <i className="bi bi-lock-fill"></i> Đã khóa
                    </span>
                  )}
                </td>
                <td className="fw-medium text-dark">{lead.tenLead}</td>
                <td>
                  {lead.soDienThoai}{" "}
                  <span className="text-muted d-block small">{lead.email}</span>
                </td>
                <td>{lead.tenCongTy || "-"}</td>
                <td className="text-center">
                  <span
                    className={`badge ${
                      lead.tinhTrang === "Đã chuyển đổi"
                        ? "bg-success"
                        : lead.tinhTrang === "Ngừng chăm sóc"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                    }`}
                  >
                    {lead.tinhTrang}
                  </span>
                </td>
                <td className="text-primary">
                  {users.find((u) => u.id === lead.nhanVienPhuTrachId)
                    ?.username || "Chưa gán"}
                </td>

                <td>
                  <div className="d-flex gap-2 justify-content-center">
                    {lead.tinhTrang !== "Đã chuyển đổi" ? (
                      <>
                        <button
                          className="btn btn-sm btn-dark"
                          onClick={() => handleConvert(lead.id)}
                        >
                          Convert
                        </button>
                        <select
                          className="form-select form-select-sm w-auto"
                          value={lead.nhanVienPhuTrachId || ""}
                          onChange={(e) =>
                            handleAssign(lead.id, e.target.value)
                          }
                        >
                          <option value="">Giao cho...</option>
                          {users.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.username}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <span className="badge bg-light text-success border">
                        Hoàn thành
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadManager;
