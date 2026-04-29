import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const HopDongManager = () => {
  const [contracts, setContracts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [view, setView] = useState("list");

  // Tương đương data form trong Vanilla JS của bạn kia
  const [formData, setFormData] = useState({
    customerId: "",
    maHopDong: "",
    ngayKy: "",
    thoiHan: "",
    trangThai: "DangThucHien",
  });

  const fetchData = useCallback(async () => {
    try {
      // Lấy danh sách hợp đồng và khách hàng theo chuẩn API của bạn kia
      const [contractRes, custRes] = await Promise.all([
        api.get("/contracts"),
        api.get("/khach-hang"), // Dùng chung API Khách Hàng của bạn
      ]);
      // API của bạn kia trả về nằm trong { data: [...] }
      setContracts(contractRes.data.data || contractRes.data);
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
      // Gọi API lưu hợp đồng giống hệt hàm apiPost('/contracts/'+cid, d) của bạn kia
      await api.post(`/contracts/${formData.customerId}`, {
        maHopDong: formData.maHopDong,
        ngayKy: formData.ngayKy,
        thoiHan: parseInt(formData.thoiHan),
        trangThai: formData.trangThai,
      });
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi tạo hợp đồng");
    }
  };

  if (view === "add") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
          <h5 className="text-secondary">Tạo hợp đồng mới</h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setView("list")}
          >
            Trở về
          </button>
        </div>
        <div className="card border-0 shadow-sm p-4">
          <form onSubmit={handleSave} className="row g-4">
            <div className="col-md-6">
              <label className="form-label text-muted small">Khách hàng</label>
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
            <div className="col-md-6">
              <label className="form-label text-muted small">Mã Hợp Đồng</label>
              <input
                type="text"
                className="form-control form-control-sm"
                required
                value={formData.maHopDong}
                onChange={(e) =>
                  setFormData({ ...formData, maHopDong: e.target.value })
                }
                placeholder="VD: HD-001"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted small">Ngày Ký</label>
              <input
                type="date"
                className="form-control form-control-sm"
                required
                value={formData.ngayKy}
                onChange={(e) =>
                  setFormData({ ...formData, ngayKy: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-muted small">
                Thời hạn (tháng)
              </label>
              <input
                type="number"
                className="form-control form-control-sm"
                required
                value={formData.thoiHan}
                onChange={(e) =>
                  setFormData({ ...formData, thoiHan: e.target.value })
                }
              />
            </div>
            <div className="col-md-12 border-top pt-3 mt-4">
              <button type="submit" className="btn btn-primary btn-sm px-4">
                Lưu Dữ Liệu
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="m-0 text-secondary">Danh sách Hợp đồng</h5>
        <button
          className="btn btn-sm btn-success px-4"
          onClick={() => setView("add")}
        >
          + Tạo Hợp Đồng
        </button>
      </div>
      <table className="table table-bordered table-hover w-100">
        <thead className="bg-light text-center">
          <tr>
            <th>Mã HĐ</th>
            <th>Khách hàng</th>
            <th>Ngày ký</th>
            <th>Thời hạn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr key={c.id} className="text-center">
              <td className="fw-bold">{c.maHopDong}</td>
              <td>{c.customer?.tenKhachHang || "---"}</td>
              <td>{c.ngayKy}</td>
              <td>{c.thoiHan} tháng</td>
              <td>
                <span className="badge bg-primary">{c.trangThai}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default HopDongManager;
