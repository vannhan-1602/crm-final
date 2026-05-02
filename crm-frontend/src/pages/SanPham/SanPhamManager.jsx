import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const SanPhamManager = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list");
  const [editId, setEditId] = useState(null);

  const initialForm = {
    maSP: "",
    tenSP: "",
    loaiSanPhamId: "1",
    donVi: "Cái",
    giaBan: "",
    soLuongTon: 0,
    trangThai: true,
    hinhAnhs: [],
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = useCallback(async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);

      if (editId) {
        const currentProduct = res.data.find((p) => p.id === editId);
        if (currentProduct) setFormData(currentProduct);
      }
    } catch (err) {
      console.error(err);
    }
  }, [editId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (view === "edit") {
        await api.put(`/products/${editId}`, formData);
        alert("Cập nhật thành công!");
      } else {
        await api.post("/products", formData);
        alert("Thêm thành công!");
      }
      setView("list");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu dữ liệu!");
    }
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      await api.post(`/products/${editId}/images/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchData();
      alert("Tải ảnh lên thành công!");
    } catch (err) {
      alert("Lỗi khi tải ảnh lên!");
    }
  };

  const handleSetMainImage = async (imageId) => {
    try {
      await api.put(`/products/${editId}/images/${imageId}/set-main`);
      fetchData();
    } catch (err) {
      alert("Lỗi khi đặt hình chính!");
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Xóa ảnh này?")) return;
    try {
      await api.delete(`/products/${editId}/images/${imageId}`);
      fetchData();
    } catch (err) {
      alert("Lỗi khi xóa ảnh!");
    }
  };

  if (view === "add" || view === "edit") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
          <h5>{view === "edit" ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}</h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => {
              setView("list");
              setEditId(null);
            }}
          >
            Trở lại
          </button>
        </div>

        <form
          onSubmit={handleSave}
          className="row g-3 bg-white p-4 shadow-sm border mb-4"
        >
          <div className="col-md-6">
            <label className="form-label small text-muted">Mã Sản Phẩm</label>
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
            <label className="form-label small text-muted">Tên Sản Phẩm</label>
            <input
              className="form-control form-control-sm"
              required
              value={formData.tenSP}
              onChange={(e) =>
                setFormData({ ...formData, tenSP: e.target.value })
              }
            />
          </div>

          {view === "edit" && (
            <div className="col-12 mt-4 pt-3 border-top">
              <h6 className="fw-bold text-primary mb-3">
                🖼️ Bộ sưu tập hình ảnh
              </h6>

              <div className="mb-4">
                <label className="form-label small">
                  Chọn ảnh từ máy tính:
                </label>
                <input
                  type="file"
                  className="form-control form-control-sm w-50"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </div>

              <div className="d-flex flex-wrap gap-3">
                {formData.hinhAnhs?.map((img) => (
                  <div
                    key={img.id}
                    className="position-relative border rounded overflow-hidden"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <img
                      src={`http://localhost:8081/crm-ver1${img.urlHinhAnh}`}
                      alt="SP"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />

                    {img.isMain && (
                      <span
                        className="badge bg-warning text-dark position-absolute top-0 start-0 m-1"
                        style={{ fontSize: "10px" }}
                      >
                        Chính
                      </span>
                    )}

                    <div className="position-absolute bottom-0 w-100 d-flex justify-content-between p-1 bg-dark bg-opacity-75">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-light py-0 px-1"
                        title="Đặt làm hình chính"
                        disabled={img.isMain}
                        onClick={() => handleSetMainImage(img.id)}
                      >
                        ⭐
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger py-0 px-1"
                        title="Xóa ảnh"
                        onClick={() => handleDeleteImage(img.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="col-12 mt-4 text-end">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Lưu Sản Phẩm
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
            setEditId(null);
            setView("add");
          }}
        >
          + Thêm Sản Phẩm
        </button>
      </div>
      <table className="table table-bordered table-hover w-100 text-center bg-white shadow-sm">
        <thead className="bg-light">
          <tr>
            <th style={{ width: "80px" }}>Ảnh</th>
            <th>Mã SP</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá Bán</th>
            <th>Tồn kho</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {products.map((p) => {
            const mainImg = p.hinhAnhs?.find((h) => h.isMain);
            const displayUrl = mainImg
              ? `http://localhost:8081/crm-ver1${mainImg.urlHinhAnh}`
              : "https://via.placeholder.com/50?text=No+Img";
            return (
              <tr key={p.id}>
                <td>
                  <img
                    src={displayUrl}
                    alt="SP"
                    className="rounded border"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td className="fw-bold">{p.maSP}</td>
                <td className="text-start">{p.tenSP}</td>
                <td className="text-success">
                  {Number(p.giaBan).toLocaleString("vi-VN")} đ
                </td>
                <td>{p.soLuongTon}</td>
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
                    Sửa/Ảnh
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SanPhamManager;
