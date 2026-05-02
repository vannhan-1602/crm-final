import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const SanPhamManager = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);

  const initialForm = {
    maSP: "",
    tenSP: "",
    loaiSanPhamId: "1",
    donVi: "Cái",
    giaBan: "",
    soLuongTon: 0,
    trangThai: true,
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
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
        await api.put(`/products/${editId}`, formData);
      } else {
        await api.post("/products", formData);
      }
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi khi lưu Sản Phẩm!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      await api.delete(`/products/${id}`);
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
            {view === "edit" ? "Cập nhật Sản Phẩm" : "Thêm Sản Phẩm Mới"}
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
            <label className="form-label small text-muted">Mã Sản Phẩm *</label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.maSP}
              onChange={(e) =>
                setFormData({ ...formData, maSP: e.target.value })
              }
            />
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Tên Sản Phẩm *
            </label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.tenSP}
              onChange={(e) =>
                setFormData({ ...formData, tenSP: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted">Đơn vị</label>
            <select
              className="form-select form-select-sm"
              value={formData.donVi}
              onChange={(e) =>
                setFormData({ ...formData, donVi: e.target.value })
              }
            >
              <option value="Cái">Cái</option>
              <option value="Hộp">Hộp</option>
              <option value="Kg">Kg</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted">Giá Bán (VNĐ)</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={formData.giaBan}
              onChange={(e) =>
                setFormData({ ...formData, giaBan: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted">Số Lượng Tồn</label>
            <input
              type="number"
              className="form-control form-control-sm"
              value={formData.soLuongTon}
              onChange={(e) =>
                setFormData({ ...formData, soLuongTon: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Lưu Thông Tin
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="m-0 text-secondary">Danh sách Sản Phẩm</h5>
        <button
          className="btn btn-sm btn-success px-4"
          onClick={() => {
            setFormData(initialForm);
            setView("add");
          }}
        >
          + Thêm Sản Phẩm
        </button>
      </div>
      <table className="table table-bordered table-hover w-100 text-center bg-white shadow-sm">
        <thead className="bg-light">
          <tr>
            <th>Mã SP</th>
            <th>Tên Sản Phẩm</th>
            <th>Đơn vị</th>
            <th>Giá Bán</th>
            <th>Tồn kho</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="fw-bold">{p.maSP}</td>
              <td className="text-start">{p.tenSP}</td>
              <td>{p.donVi}</td>
              <td className="text-success fw-medium">
                {Number(p.giaBan).toLocaleString("vi-VN")} đ
              </td>
              <td>{p.soLuongTon}</td>
              <td>
                <span
                  className={`badge ${p.trangThai ? "bg-success" : "bg-secondary"}`}
                >
                  {p.trangThai ? "Đang bán" : "Ngừng bán"}
                </span>
              </td>
              <td>
                <span
                  className="text-primary me-3"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setFormData(p);
                    setEditId(p.id);
                    setView("edit");
                  }}
                >
                  Sửa
                </span>
                <span
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(p.id)}
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

export default SanPhamManager;
