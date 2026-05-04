import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import LoaiSanPhamManager from "./LoaiSanPhamManager";

// ─── Inline Styles ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');

  .spm-root {
    font-family: 'Be Vietnam Pro', sans-serif;
    background: #f0f2f5;
    min-height: 100vh;
    padding: 28px;
    color: #1a202c;
  }

  /* ── Page Header ── */
  .spm-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .spm-page-title {
    font-size: 22px;
    font-weight: 700;
    color: #1a202c;
    letter-spacing: -0.3px;
  }
  .spm-page-title span { color: #2563eb; }
  .spm-breadcrumb { font-size: 12px; color: #6b7280; margin-top: 2px; }

  /* ── Buttons ── */
  .spm-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 8px; font-size: 13px;
    font-weight: 600; cursor: pointer; border: none;
    transition: all 0.15s ease; font-family: 'Be Vietnam Pro', sans-serif;
  }
  .spm-btn-primary { background: #2563eb; color: #fff; }
  .spm-btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
  .spm-btn-outline { background: #fff; color: #374151; border: 1.5px solid #d1d5db; }
  .spm-btn-outline:hover { border-color: #2563eb; color: #2563eb; background: #eff6ff; }
  .spm-btn-teal { background: #0d9488; color: #fff; }
  .spm-btn-teal:hover { background: #0f766e; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(13,148,136,0.3); }
  .spm-btn-sm { padding: 6px 12px; font-size: 12px; }
  .spm-btn-danger { background: #fff; color: #dc2626; border: 1.5px solid #fecaca; }
  .spm-btn-danger:hover { background: #fef2f2; border-color: #dc2626; }
  .spm-btn[disabled] { opacity: 0.4; cursor: not-allowed; transform: none !important; box-shadow: none !important; }

  /* ── Stats Cards ── */
  .spm-stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; margin-bottom: 24px;
  }
  .spm-stat-card {
    background: #fff; border-radius: 12px; padding: 18px 20px;
    border: 1px solid #e5e7eb; display: flex; align-items: center; gap: 14px;
  }
  .spm-stat-icon {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .spm-stat-icon.blue { background: #dbeafe; }
  .spm-stat-icon.green { background: #dcfce7; }
  .spm-stat-icon.amber { background: #fef3c7; }
  .spm-stat-icon.red { background: #fee2e2; }
  .spm-stat-val { font-size: 22px; font-weight: 700; color: #111827; line-height: 1; }
  .spm-stat-lbl { font-size: 12px; color: #6b7280; margin-top: 3px; }

  /* ── Table Card ── */
  .spm-card {
    background: #fff; border-radius: 14px; border: 1px solid #e5e7eb;
    overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .spm-card-header {
    padding: 16px 20px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
  }
  .spm-search-wrap { position: relative; flex: 1; max-width: 320px; }
  .spm-search-wrap svg {
    position: absolute; left: 10px; top: 50%;
    transform: translateY(-50%); color: #9ca3af;
  }
  .spm-search {
    width: 100%; padding: 8px 10px 8px 34px;
    border: 1.5px solid #e5e7eb; border-radius: 8px;
    font-size: 13px; font-family: 'Be Vietnam Pro', sans-serif;
    outline: none; transition: border-color 0.15s;
  }
  .spm-search:focus { border-color: #2563eb; }

  /* ── Table ── */
  .spm-table { width: 100%; border-collapse: collapse; }
  .spm-table thead tr { background: #f8fafc; }
  .spm-table th {
    padding: 11px 16px; text-align: left; font-size: 11px;
    font-weight: 700; color: #6b7280; text-transform: uppercase;
    letter-spacing: 0.6px; border-bottom: 1px solid #f3f4f6; white-space: nowrap;
  }
  .spm-table th.center, .spm-table td.center { text-align: center; }
  .spm-table td {
    padding: 13px 16px; font-size: 13.5px; color: #374151;
    border-bottom: 1px solid #f9fafb; vertical-align: middle;
  }
  .spm-table tbody tr:hover { background: #fafbff; }
  .spm-table tbody tr:last-child td { border-bottom: none; }

  .spm-product-thumb {
    width: 46px; height: 46px; object-fit: cover;
    border-radius: 8px; border: 1px solid #e5e7eb;
  }
  .spm-product-name { font-weight: 600; color: #111827; font-size: 13.5px; }
  .spm-product-code { font-size: 11.5px; color: #6b7280; margin-top: 2px; }
  .spm-price { font-weight: 600; color: #16a34a; }
  .spm-stock-badge {
    display: inline-block; padding: 3px 10px;
    border-radius: 20px; font-size: 12px; font-weight: 600;
  }
  .spm-stock-badge.ok { background: #dcfce7; color: #15803d; }
  .spm-stock-badge.low { background: #fef3c7; color: #b45309; }
  .spm-stock-badge.out { background: #fee2e2; color: #dc2626; }
  .spm-status-dot {
    display: inline-flex; align-items: center;
    gap: 5px; font-size: 12.5px; font-weight: 500;
  }
  .spm-status-dot::before {
    content: ''; width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .spm-status-dot.active { color: #15803d; }
  .spm-status-dot.active::before { background: #22c55e; }
  .spm-status-dot.inactive { color: #9ca3af; }
  .spm-status-dot.inactive::before { background: #d1d5db; }

  .spm-cat-tag {
    display: inline-block; background: #f0fdf4; color: #15803d;
    border: 1px solid #bbf7d0; font-size: 11.5px; font-weight: 600;
    padding: 2px 9px; border-radius: 20px;
  }

  .spm-action-group { display: flex; gap: 6px; }

  /* ── Form Panel ── */
  .spm-form-layout {
    display: grid; grid-template-columns: 1fr 340px;
    gap: 20px; align-items: start;
  }
  .spm-form-card {
    background: #fff; border-radius: 14px; border: 1px solid #e5e7eb; overflow: hidden;
  }
  .spm-form-card-header {
    padding: 16px 22px; border-bottom: 1px solid #f3f4f6;
    background: #f8fafc; font-size: 13px; font-weight: 700;
    color: #374151; display: flex; align-items: center; gap: 8px;
  }
  .spm-form-body { padding: 22px; }

  .spm-field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .spm-field { display: flex; flex-direction: column; gap: 5px; }
  .spm-field.full { grid-column: 1 / -1; }
  .spm-label { font-size: 12px; font-weight: 600; color: #374151; letter-spacing: 0.2px; }
  .spm-label .req { color: #dc2626; margin-left: 2px; }
  .spm-input, .spm-select {
    padding: 9px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px;
    font-size: 13.5px; font-family: 'Be Vietnam Pro', sans-serif;
    color: #1a202c; outline: none;
    transition: border-color 0.15s, box-shadow 0.15s; background: #fff;
  }
  .spm-input:focus, .spm-select:focus {
    border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
  }
  .spm-hint { font-size: 11px; color: #9ca3af; margin-top: 2px; }

  /* Category select with add button inline */
  .spm-select-with-action { display: flex; gap: 8px; align-items: center; }
  .spm-select-with-action .spm-select { flex: 1; }
  .spm-btn-icon {
    width: 36px; height: 36px; border-radius: 8px; border: 1.5px solid #d1d5db;
    background: #fff; cursor: pointer; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; flex-shrink: 0; color: #374151;
  }
  .spm-btn-icon:hover { border-color: #0d9488; color: #0d9488; background: #f0fdfa; }

  .spm-toggle-wrap { display: flex; align-items: center; gap: 10px; margin-top: 2px; }
  .spm-toggle {
    width: 42px; height: 24px; background: #d1d5db; border-radius: 12px;
    position: relative; cursor: pointer; transition: background 0.2s;
    flex-shrink: 0; border: none;
  }
  .spm-toggle.on { background: #2563eb; }
  .spm-toggle::after {
    content: ''; position: absolute; width: 18px; height: 18px;
    background: #fff; border-radius: 50%; top: 3px; left: 3px;
    transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  .spm-toggle.on::after { transform: translateX(18px); }
  .spm-toggle-label { font-size: 13px; font-weight: 500; color: #374151; }

  /* ── Image Panel ── */
  .spm-img-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
  .spm-img-item {
    position: relative; border-radius: 10px; overflow: hidden;
    aspect-ratio: 1; border: 2px solid #e5e7eb; transition: border-color 0.15s;
  }
  .spm-img-item.main-img { border-color: #2563eb; }
  .spm-img-item img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .spm-img-overlay {
    position: absolute; inset: 0; background: rgba(0,0,0,0);
    transition: background 0.15s; display: flex;
    align-items: flex-end; justify-content: space-between; padding: 6px;
  }
  .spm-img-item:hover .spm-img-overlay { background: rgba(0,0,0,0.45); }
  .spm-img-badge-main {
    position: absolute; top: 6px; left: 6px; background: #2563eb; color: #fff;
    font-size: 9px; font-weight: 700; padding: 2px 6px;
    border-radius: 4px; letter-spacing: 0.5px;
  }
  .spm-img-action-btn {
    background: rgba(255,255,255,0.9); border: none; border-radius: 6px;
    width: 26px; height: 26px; cursor: pointer; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transition: opacity 0.15s;
  }
  .spm-img-item:hover .spm-img-action-btn { opacity: 1; }
  .spm-upload-zone {
    border: 2px dashed #d1d5db; border-radius: 10px; padding: 18px;
    text-align: center; cursor: pointer; transition: border-color 0.15s, background 0.15s;
    position: relative;
  }
  .spm-upload-zone:hover { border-color: #2563eb; background: #eff6ff; }
  .spm-upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .spm-upload-icon { font-size: 22px; margin-bottom: 6px; }
  .spm-upload-text { font-size: 12px; color: #6b7280; }
  .spm-upload-text strong { color: #2563eb; }

  .spm-meta-row {
    display: flex; justify-content: space-between;
    font-size: 11.5px; color: #9ca3af;
    padding: 10px 0 0; border-top: 1px solid #f3f4f6; margin-top: 16px;
  }

  .spm-empty { text-align: center; padding: 48px 20px; color: #9ca3af; }
  .spm-empty-icon { font-size: 40px; margin-bottom: 12px; }
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtVND = (n) => Number(n || 0).toLocaleString("vi-VN") + " ₫";
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—");
const getStockClass = (qty) => {
  if (qty <= 0) return "out";
  if (qty <= 10) return "low";
  return "ok";
};
const getStockLabel = (qty) => {
  if (qty <= 0) return "Hết hàng";
  if (qty <= 10) return "Sắp hết";
  return qty;
};

// ─── Main Component ───────────────────────────────────────────────────────────
const SanPhamManager = () => {
  // "list" | "add" | "edit" | "loai"
  const [view, setView] = useState("list");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const initialForm = {
    maSP: "",
    tenSP: "",
    loaiSanPhamId: "",
    donVi: "Cái",
    giaBan: "",
    soLuongTon: 0,
    trangThai: true,
    hinhAnhs: [],
  };
  const [formData, setFormData] = useState(initialForm);

  // ── Fetch ──
  const fetchCategories = useCallback(async () => {
    try {
      // API endpoint mapping tới BH_LoaiSanPham
      const res = await api.get("/product-categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Không load được loại SP:", err);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      if (editId) {
        const cur = res.data.find((p) => p.id === editId);
        if (cur) setFormData(cur);
      }
    } catch (err) {
      console.error(err);
    }
  }, [editId]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // ── Actions ──
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        loaiSanPhamId: formData.loaiSanPhamId
          ? Number(formData.loaiSanPhamId)
          : null,
        giaBan: Number(formData.giaBan) || 0,
        soLuongTon: Number(formData.soLuongTon) || 0,
      };
      if (view === "edit") {
        await api.put(`/products/${editId}`, payload);
        alert("Cập nhật thành công!");
      } else {
        await api.post("/products", payload);
        alert("Thêm thành công!");
      }
      setView("list");
      setEditId(null);
      fetchProducts();
    } catch {
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
      fetchProducts();
    } catch {
      alert("Lỗi khi tải ảnh lên!");
    }
  };

  const handleSetMainImage = async (imageId) => {
    try {
      await api.put(`/products/${editId}/images/${imageId}/set-main`);
      fetchProducts();
    } catch {
      alert("Lỗi khi đặt hình chính!");
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!window.confirm("Xóa ảnh này?")) return;
    try {
      await api.delete(`/products/${editId}/images/${imageId}`);
      fetchProducts();
    } catch {
      alert("Lỗi khi xóa ảnh!");
    }
  };

  const field = (key, val) => setFormData((f) => ({ ...f, [key]: val }));

  const filtered = products.filter(
    (p) =>
      p.maSP?.toLowerCase().includes(search.toLowerCase()) ||
      p.tenSP?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalActive = products.filter((p) => p.trangThai).length;
  const totalOut = products.filter((p) => p.soLuongTon <= 0).length;
  const totalLow = products.filter(
    (p) => p.soLuongTon > 0 && p.soLuongTon <= 10,
  ).length;

  // ── Delegate to LoaiSanPhamManager ──
  if (view === "loai") {
    return (
      <LoaiSanPhamManager
        onBack={() => {
          fetchCategories(); // reload categories khi quay lại
          setView("list");
        }}
      />
    );
  }

  // ── FORM VIEW ──
  if (view === "add" || view === "edit") {
    const isEdit = view === "edit";
    const curProd = isEdit ? products.find((p) => p.id === editId) : null;

    return (
      <>
        <style>{styles}</style>
        <div className="spm-root">
          <div className="spm-page-header">
            <div>
              <div className="spm-page-title">
                {isEdit ? "Chỉnh sửa" : "Thêm"} <span>Sản phẩm</span>
              </div>
              <div className="spm-breadcrumb">
                Sản phẩm /{" "}
                {isEdit ? `Sửa: ${formData.tenSP || "..."}` : "Thêm mới"}
              </div>
            </div>
            <button
              className="spm-btn spm-btn-outline"
              onClick={() => {
                setView("list");
                setEditId(null);
              }}
            >
              ← Quay lại danh sách
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="spm-form-layout">
              {/* Left */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Basic Info */}
                <div className="spm-form-card">
                  <div className="spm-form-card-header">
                    📋 Thông tin cơ bản
                  </div>
                  <div className="spm-form-body">
                    <div className="spm-field-grid">
                      <div className="spm-field">
                        <label className="spm-label">
                          Mã sản phẩm <span className="req">*</span>
                        </label>
                        <input
                          className="spm-input"
                          placeholder="VD: SP001"
                          required
                          value={formData.maSP}
                          onChange={(e) => field("maSP", e.target.value)}
                        />
                      </div>
                      <div className="spm-field">
                        <label className="spm-label">Đơn vị tính</label>
                        <select
                          className="spm-select"
                          value={formData.donVi || "Cái"}
                          onChange={(e) => field("donVi", e.target.value)}
                        >
                          {[
                            "Cái",
                            "Hộp",
                            "Thùng",
                            "Lọ",
                            "Túi",
                            "Kg",
                            "Lít",
                            "Bộ",
                            "Gói",
                            "Cuộn",
                            "License",
                            "Gói dịch vụ",
                          ].map((u) => (
                            <option key={u}>{u}</option>
                          ))}
                        </select>
                      </div>
                      <div className="spm-field full">
                        <label className="spm-label">
                          Tên sản phẩm <span className="req">*</span>
                        </label>
                        <input
                          className="spm-input"
                          placeholder="Nhập tên sản phẩm..."
                          required
                          value={formData.tenSP}
                          onChange={(e) => field("tenSP", e.target.value)}
                        />
                      </div>

                      {/* ── Loại sản phẩm — liên kết BH_LoaiSanPham ── */}
                      <div className="spm-field full">
                        <label className="spm-label">Loại sản phẩm</label>
                        <div className="spm-select-with-action">
                          <select
                            className="spm-select"
                            value={formData.loaiSanPhamId || ""}
                            onChange={(e) =>
                              field("loaiSanPhamId", e.target.value)
                            }
                          >
                            <option value="">-- Chọn loại sản phẩm --</option>
                            {categories.length === 0 ? (
                              <option disabled>Đang tải...</option>
                            ) : (
                              categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                  {c.tenLoai}
                                  {c.moTa ? ` — ${c.moTa}` : ""}
                                </option>
                              ))
                            )}
                          </select>
                          {/* Nút tắt sang quản lý loại */}
                          <button
                            type="button"
                            className="spm-btn-icon"
                            title="Quản lý loại sản phẩm"
                            onClick={() => setView("loai")}
                          >
                            🏷️
                          </button>
                        </div>
                        <span className="spm-hint">
                          Nhấn 🏷️ để thêm / sửa loại sản phẩm
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Stock */}
                <div className="spm-form-card">
                  <div className="spm-form-card-header">💰 Giá & Tồn kho</div>
                  <div className="spm-form-body">
                    <div className="spm-field-grid">
                      <div className="spm-field">
                        <label className="spm-label">Giá bán (₫)</label>
                        <input
                          className="spm-input"
                          type="number"
                          min="0"
                          step="1000"
                          placeholder="0"
                          value={formData.giaBan}
                          onChange={(e) => field("giaBan", e.target.value)}
                        />
                        {formData.giaBan > 0 && (
                          <span className="spm-hint">
                            ≈ {fmtVND(formData.giaBan)}
                          </span>
                        )}
                      </div>
                      <div className="spm-field">
                        <label className="spm-label">Số lượng tồn kho</label>
                        <input
                          className="spm-input"
                          type="number"
                          min="0"
                          value={formData.soLuongTon}
                          onChange={(e) =>
                            field("soLuongTon", parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="spm-form-card">
                  <div className="spm-form-card-header">⚙️ Trạng thái</div>
                  <div className="spm-form-body">
                    <div className="spm-toggle-wrap">
                      <button
                        type="button"
                        className={`spm-toggle ${formData.trangThai ? "on" : ""}`}
                        onClick={() => field("trangThai", !formData.trangThai)}
                      />
                      <span className="spm-toggle-label">
                        {formData.trangThai
                          ? "🟢 Đang kinh doanh"
                          : "⚪ Ngừng kinh doanh"}
                      </span>
                    </div>
                  </div>
                </div>

                {isEdit && curProd && (
                  <div
                    style={{
                      background: "#fff",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1px solid #e5e7eb",
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 11.5,
                      color: "#9ca3af",
                    }}
                  >
                    <span>🕐 Tạo: {fmtDate(curProd.createdAt)}</span>
                    <span>✏️ Cập nhật: {fmtDate(curProd.updatedAt)}</span>
                  </div>
                )}
              </div>

              {/* Right — Images */}
              <div>
                <div className="spm-form-card">
                  <div className="spm-form-card-header">
                    🖼️ Hình ảnh sản phẩm
                  </div>
                  <div className="spm-form-body">
                    {isEdit ? (
                      <>
                        {formData.hinhAnhs?.length > 0 ? (
                          <div className="spm-img-grid">
                            {formData.hinhAnhs.map((img) => (
                              <div
                                key={img.id}
                                className={`spm-img-item ${img.isMain ? "main-img" : ""}`}
                              >
                                <img
                                  src={`http://localhost:8081/crm-ver1${img.urlHinhAnh}`}
                                  alt=""
                                />
                                {img.isMain && (
                                  <span className="spm-img-badge-main">
                                    CHÍNH
                                  </span>
                                )}
                                <div className="spm-img-overlay">
                                  <button
                                    type="button"
                                    className="spm-img-action-btn"
                                    disabled={img.isMain}
                                    onClick={() => handleSetMainImage(img.id)}
                                  >
                                    ⭐
                                  </button>
                                  <button
                                    type="button"
                                    className="spm-img-action-btn"
                                    onClick={() => handleDeleteImage(img.id)}
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "16px 0",
                              color: "#9ca3af",
                              fontSize: 13,
                            }}
                          >
                            Chưa có hình ảnh nào
                          </div>
                        )}
                        <label className="spm-upload-zone">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadImage}
                          />
                          <div className="spm-upload-icon">📤</div>
                          <div className="spm-upload-text">
                            <strong>Nhấn để tải ảnh lên</strong>
                            <br />
                            PNG, JPG tối đa 5MB
                          </div>
                        </label>
                      </>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "20px 0",
                          color: "#9ca3af",
                          fontSize: 12.5,
                        }}
                      >
                        💡 Lưu sản phẩm trước, sau đó tải ảnh lên
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                marginTop: 20,
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                padding: "14px 22px",
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                type="button"
                className="spm-btn spm-btn-outline"
                onClick={() => {
                  setView("list");
                  setEditId(null);
                }}
              >
                Hủy
              </button>
              <button type="submit" className="spm-btn spm-btn-primary">
                💾 {isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  // ── LIST VIEW ──
  return (
    <>
      <style>{styles}</style>
      <div className="spm-root">
        <div className="spm-page-header">
          <div>
            <div className="spm-page-title">
              Quản lý <span>Sản phẩm</span>
            </div>
            <div className="spm-breadcrumb">
              Tổng cộng {products.length} sản phẩm trong hệ thống
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {/* ── Nút quản lý loại sản phẩm ── */}
            <button
              className="spm-btn spm-btn-teal"
              onClick={() => setView("loai")}
            >
              🏷️ Loại sản phẩm
              {categories.length > 0 && (
                <span
                  style={{
                    background: "rgba(255,255,255,0.25)",
                    borderRadius: 20,
                    padding: "1px 7px",
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {categories.length}
                </span>
              )}
            </button>
            <button
              className="spm-btn spm-btn-primary"
              onClick={() => {
                setFormData(initialForm);
                setEditId(null);
                setView("add");
              }}
            >
              + Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="spm-stats-row">
          <div className="spm-stat-card">
            <div className="spm-stat-icon blue">📦</div>
            <div>
              <div className="spm-stat-val">{products.length}</div>
              <div className="spm-stat-lbl">Tổng sản phẩm</div>
            </div>
          </div>
          <div className="spm-stat-card">
            <div className="spm-stat-icon green">✅</div>
            <div>
              <div className="spm-stat-val">{totalActive}</div>
              <div className="spm-stat-lbl">Đang kinh doanh</div>
            </div>
          </div>
          <div className="spm-stat-card">
            <div className="spm-stat-icon amber">⚠️</div>
            <div>
              <div className="spm-stat-val">{totalLow}</div>
              <div className="spm-stat-lbl">Sắp hết hàng</div>
            </div>
          </div>
          <div className="spm-stat-card">
            <div className="spm-stat-icon red">🚫</div>
            <div>
              <div className="spm-stat-val">{totalOut}</div>
              <div className="spm-stat-lbl">Hết hàng</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="spm-card">
          <div className="spm-card-header">
            <div className="spm-search-wrap">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="spm-search"
                placeholder="Tìm theo mã, tên sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span style={{ fontSize: 12, color: "#9ca3af" }}>
              {filtered.length} / {products.length} kết quả
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table className="spm-table">
              <thead>
                <tr>
                  <th style={{ width: 60 }} className="center">
                    Ảnh
                  </th>
                  <th>Sản phẩm</th>
                  <th>Loại SP</th>
                  <th>Đơn vị</th>
                  <th>Giá bán</th>
                  <th className="center">Tồn kho</th>
                  <th className="center">Trạng thái</th>
                  <th>Cập nhật</th>
                  <th className="center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9}>
                      <div className="spm-empty">
                        <div className="spm-empty-icon">🔍</div>
                        <div>Không tìm thấy sản phẩm nào</div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => {
                    const mainImg = p.hinhAnhs?.find((h) => h.isMain);
                    const displayUrl = mainImg
                      ? `http://localhost:8081/crm-ver1${mainImg.urlHinhAnh}`
                      : null;
                    // Tìm tên loại từ BH_LoaiSanPham qua loaiSanPhamId
                    const cat = categories.find(
                      (c) =>
                        c.id === p.loaiSanPhamId ||
                        c.id === Number(p.loaiSanPhamId),
                    );
                    return (
                      <tr key={p.id}>
                        <td className="center">
                          {displayUrl ? (
                            <img
                              src={displayUrl}
                              alt=""
                              className="spm-product-thumb"
                            />
                          ) : (
                            <div
                              style={{
                                width: 46,
                                height: 46,
                                borderRadius: 8,
                                background: "#f3f4f6",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                                margin: "0 auto",
                              }}
                            >
                              📷
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="spm-product-name">{p.tenSP}</div>
                          <div className="spm-product-code">{p.maSP}</div>
                        </td>
                        <td>
                          {cat ? (
                            <span className="spm-cat-tag">{cat.tenLoai}</span>
                          ) : (
                            <span style={{ color: "#d1d5db", fontSize: 13 }}>
                              —
                            </span>
                          )}
                        </td>
                        <td style={{ fontSize: 13 }}>{p.donVi || "—"}</td>
                        <td className="spm-price">{fmtVND(p.giaBan)}</td>
                        <td className="center">
                          <span
                            className={`spm-stock-badge ${getStockClass(p.soLuongTon)}`}
                          >
                            {getStockLabel(p.soLuongTon)}
                          </span>
                        </td>
                        <td className="center">
                          <span
                            className={`spm-status-dot ${p.trangThai ? "active" : "inactive"}`}
                          >
                            {p.trangThai ? "Kinh doanh" : "Ngừng"}
                          </span>
                        </td>
                        <td style={{ fontSize: 12, color: "#6b7280" }}>
                          {fmtDate(p.updatedAt)}
                        </td>
                        <td className="center">
                          <div
                            className="spm-action-group"
                            style={{ justifyContent: "center" }}
                          >
                            <button
                              className="spm-btn spm-btn-outline spm-btn-sm"
                              onClick={() => {
                                setFormData(p);
                                setEditId(p.id);
                                setView("edit");
                              }}
                            >
                              ✏️ Sửa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SanPhamManager;
