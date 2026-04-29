import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const KhoHangManager = () => {
  const [inventoryCards, setInventoryCards] = useState([]);
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState({
    productId: "",
    loaiGiaoDich: "NhapMua",
    soLuongThayDoi: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const [invRes, prodRes] = await Promise.all([
        api.get("/inventory-cards"),
        api.get("/products"),
      ]);
      setInventoryCards(invRes.data.data || invRes.data);
      setProducts(prodRes.data.data || prodRes.data);
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
      await api.post("/inventory-cards", {
        product: { id: parseInt(formData.productId) },
        loaiGiaoDich: formData.loaiGiaoDich,
        soLuongThayDoi: parseInt(formData.soLuongThayDoi),
      });
      setView("list");
      fetchData();
    } catch (err) {
      alert("Lỗi giao dịch kho! (Có thể do xuất quá số lượng tồn)");
    }
  };

  if (view === "add") {
    return (
      <div className="container-fluid p-0">
        <div className="d-flex justify-content-between mb-3 border-bottom pb-2">
          <h5 className="text-secondary">Tạo Giao Dịch Kho</h5>
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
            <label className="form-label small text-muted">Sản Phẩm</label>
            <select
              className="form-select form-select-sm"
              required
              value={formData.productId}
              onChange={(e) =>
                setFormData({ ...formData, productId: e.target.value })
              }
            >
              <option value="">-- Chọn Sản Phẩm --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.tenSP} (Tồn: {p.soLuongTon})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Loại Giao Dịch
            </label>
            <select
              className="form-select form-select-sm"
              value={formData.loaiGiaoDich}
              onChange={(e) =>
                setFormData({ ...formData, loaiGiaoDich: e.target.value })
              }
            >
              <option value="NhapMua">Nhập mua (+)</option>
              <option value="XuatBan">Xuất bán (-)</option>
              <option value="NhapTraKhach">Nhập trả khách (+)</option>
              <option value="XuatTraNCC">Xuất trả NCC (-)</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label small text-muted">
              Số Lượng (Nhập số dương)
            </label>
            <input
              type="number"
              className="form-control form-control-sm"
              required
              min="1"
              value={formData.soLuongThayDoi}
              onChange={(e) =>
                setFormData({ ...formData, soLuongThayDoi: e.target.value })
              }
            />
          </div>
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary btn-sm px-4">
              Lưu Giao Dịch
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between mb-4">
        <h5 className="m-0 text-secondary">Lịch sử Thẻ Kho</h5>
        <button
          className="btn btn-sm btn-primary px-3"
          onClick={() => setView("add")}
        >
          + Giao Dịch Mới
        </button>
      </div>
      <table className="table table-bordered table-hover w-100 text-center">
        <thead className="bg-light">
          <tr>
            <th>Sản phẩm</th>
            <th>Mã SP</th>
            <th>Loại GD</th>
            <th>SL Thay đổi</th>
            <th>Tồn cuối</th>
          </tr>
        </thead>
        <tbody>
          {inventoryCards.map((i) => (
            <tr key={i.id}>
              <td>{i.product?.tenSP || "---"}</td>
              <td className="fw-bold">{i.product?.maSP || "---"}</td>
              <td>
                <span className="badge bg-secondary">{i.loaiGiaoDich}</span>
              </td>
              <td
                className={
                  i.loaiGiaoDich.includes("Nhap")
                    ? "text-success fw-bold"
                    : "text-danger fw-bold"
                }
              >
                {i.loaiGiaoDich.includes("Nhap") ? "+" : "-"}
                {i.soLuongThayDoi}
              </td>
              <td className="fw-bold text-primary">{i.tonCuoi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default KhoHangManager;
