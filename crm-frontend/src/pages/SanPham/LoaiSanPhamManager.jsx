import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap');

  .lsp-root {
    font-family: 'Be Vietnam Pro', sans-serif;
    background: #f0f2f5;
    min-height: 100vh;
    padding: 28px;
    color: #1a202c;
  }
  .lsp-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
  }
  .lsp-page-title { font-size: 22px; font-weight: 700; color: #1a202c; letter-spacing: -0.3px; }
  .lsp-page-title span { color: #2563eb; }
  .lsp-breadcrumb { font-size: 12px; color: #6b7280; margin-top: 2px; }

  .lsp-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 18px; border-radius: 8px; font-size: 13px;
    font-weight: 600; cursor: pointer; border: none;
    transition: all 0.15s ease; font-family: 'Be Vietnam Pro', sans-serif;
  }
  .lsp-btn-primary { background: #2563eb; color: #fff; }
  .lsp-btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
  .lsp-btn-outline { background: #fff; color: #374151; border: 1.5px solid #d1d5db; }
  .lsp-btn-outline:hover { border-color: #2563eb; color: #2563eb; background: #eff6ff; }
  .lsp-btn-sm { padding: 6px 12px; font-size: 12px; }
  .lsp-btn-danger { background: #fff; color: #dc2626; border: 1.5px solid #fecaca; }
  .lsp-btn-danger:hover { background: #fef2f2; border-color: #dc2626; }

  .lsp-layout { display: grid; grid-template-columns: 1fr 380px; gap: 20px; align-items: start; }

  .lsp-card {
    background: #fff; border-radius: 14px;
    border: 1px solid #e5e7eb; overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }
  .lsp-card-header {
    padding: 16px 20px; border-bottom: 1px solid #f3f4f6;
    display: flex; align-items: center; justify-content: space-between;
    background: #f8fafc;
  }
  .lsp-card-title { font-size: 13px; font-weight: 700; color: #374151; display: flex; align-items: center; gap: 8px; }

  .lsp-table { width: 100%; border-collapse: collapse; }
  .lsp-table thead tr { background: #f8fafc; }
  .lsp-table th {
    padding: 11px 16px; text-align: left; font-size: 11px;
    font-weight: 700; color: #6b7280; text-transform: uppercase;
    letter-spacing: 0.6px; border-bottom: 1px solid #f3f4f6; white-space: nowrap;
  }
  .lsp-table td {
    padding: 14px 16px; font-size: 13.5px; color: #374151;
    border-bottom: 1px solid #f9fafb; vertical-align: middle;
  }
  .lsp-table tbody tr:hover { background: #fafbff; }
  .lsp-table tbody tr:last-child td { border-bottom: none; }
  .lsp-table td.center { text-align: center; }

  .lsp-id-badge {
    display: inline-block; background: #eff6ff; color: #2563eb;
    font-size: 11px; font-weight: 700; padding: 2px 8px;
    border-radius: 6px; border: 1px solid #bfdbfe;
  }
  .lsp-cat-name { font-weight: 600; color: #111827; }
  .lsp-cat-desc { font-size: 12px; color: #6b7280; margin-top: 2px; }
  .lsp-action-group { display: flex; gap: 6px; justify-content: center; }

  .lsp-empty { text-align: center; padding: 48px 20px; color: #9ca3af; }
  .lsp-empty-icon { font-size: 40px; margin-bottom: 12px; }

  /* Form Panel */
  .lsp-form-panel .lsp-card-header { background: #eff6ff; border-color: #bfdbfe; }
  .lsp-form-body { padding: 22px; display: flex; flex-direction: column; gap: 16px; }
  .lsp-field { display: flex; flex-direction: column; gap: 5px; }
  .lsp-label { font-size: 12px; font-weight: 600; color: #374151; }
  .lsp-label .req { color: #dc2626; margin-left: 2px; }
  .lsp-input, .lsp-textarea {
    padding: 9px 12px; border: 1.5px solid #e5e7eb; border-radius: 8px;
    font-size: 13.5px; font-family: 'Be Vietnam Pro', sans-serif;
    color: #1a202c; outline: none; transition: border-color 0.15s, box-shadow 0.15s;
    background: #fff;
  }
  .lsp-textarea { resize: vertical; min-height: 80px; }
  .lsp-input:focus, .lsp-textarea:focus {
    border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
  }
  .lsp-form-footer {
    padding: 14px 22px; background: #f8fafc;
    border-top: 1px solid #f3f4f6;
    display: flex; justify-content: flex-end; gap: 10px;
  }
  .lsp-edit-indicator {
    margin: 0 22px 0; padding: 10px 14px;
    background: #fffbeb; border: 1px solid #fde68a;
    border-radius: 8px; font-size: 12px; color: #92400e;
    display: flex; align-items: center; gap: 6px;
  }

  .lsp-count-badge {
    background: #f3f4f6; color: #6b7280; font-size: 11px;
    font-weight: 600; padding: 2px 8px; border-radius: 20px;
  }
`;

const LoaiSanPhamManager = ({ onBack }) => {
    const [categories, setCategories] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({ tenLoai: "", moTa: "" });
    const [isAdding, setIsAdding] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            const res = await api.get("/product-categories");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => { fetchCategories(); }, [fetchCategories]);

    const resetForm = () => {
        setFormData({ tenLoai: "", moTa: "" });
        setEditId(null);
        setIsAdding(false);
    };

    const handleEdit = (cat) => {
        setFormData({ tenLoai: cat.tenLoai, moTa: cat.moTa || "" });
        setEditId(cat.id);
        setIsAdding(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/product-categories/${editId}`, formData);
                alert("Cập nhật thành công!");
            } else {
                await api.post("/product-categories", formData);
                alert("Thêm thành công!");
            }
            resetForm();
            fetchCategories();
        } catch {
            alert("Lỗi khi lưu dữ liệu!");
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Xóa loại "${name}"? Các sản phẩm thuộc loại này sẽ bị mất liên kết.`)) return;
        try {
            await api.delete(`/product-categories/${id}`);
            fetchCategories();
        } catch {
            alert("Lỗi khi xóa! Có thể vẫn còn sản phẩm thuộc loại này.");
        }
    };

    const field = (key, val) => setFormData((f) => ({ ...f, [key]: val }));

    return (
        <>
            <style>{styles}</style>
            <div className="lsp-root">
                {/* Header */}
                <div className="lsp-page-header">
                    <div>
                        <div className="lsp-page-title">
                            Quản lý <span>Loại Sản Phẩm</span>
                        </div>
                        <div className="lsp-breadcrumb">
                            Sản phẩm / Loại sản phẩm — {categories.length} loại
                        </div>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                        <button className="lsp-btn lsp-btn-outline" onClick={onBack}>
                            ← Quay lại Sản phẩm
                        </button>
                        <button
                            className="lsp-btn lsp-btn-primary"
                            onClick={() => { resetForm(); setIsAdding(true); }}
                        >
                            + Thêm loại
                        </button>
                    </div>
                </div>

                <div className="lsp-layout">
                    {/* Table */}
                    <div className="lsp-card">
                        <div className="lsp-card-header">
                            <div className="lsp-card-title">
                                🏷️ Danh sách loại sản phẩm
                                <span className="lsp-count-badge">{categories.length}</span>
                            </div>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                            <table className="lsp-table">
                                <thead>
                                <tr>
                                    <th style={{ width: 60 }}>ID</th>
                                    <th>Tên loại</th>
                                    <th>Mô tả</th>
                                    <th className="center" style={{ width: 120 }}>Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories.length === 0 ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <div className="lsp-empty">
                                                <div className="lsp-empty-icon">🏷️</div>
                                                <div>Chưa có loại sản phẩm nào</div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((cat) => (
                                        <tr key={cat.id}>
                                            <td><span className="lsp-id-badge">#{cat.id}</span></td>
                                            <td>
                                                <div className="lsp-cat-name">{cat.tenLoai}</div>
                                            </td>
                                            <td>
                                                <div className="lsp-cat-desc">{cat.moTa || <span style={{ color: "#d1d5db" }}>—</span>}</div>
                                            </td>
                                            <td className="center">
                                                <div className="lsp-action-group">
                                                    <button
                                                        className="lsp-btn lsp-btn-outline lsp-btn-sm"
                                                        onClick={() => handleEdit(cat)}
                                                    >✏️ Sửa</button>
                                                    <button
                                                        className="lsp-btn lsp-btn-danger lsp-btn-sm"
                                                        onClick={() => handleDelete(cat.id, cat.tenLoai)}
                                                    >🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Form */}
                    {isAdding && (
                        <div className="lsp-card lsp-form-panel">
                            <div className="lsp-card-header">
                                <div className="lsp-card-title">
                                    {editId ? "✏️ Chỉnh sửa loại" : "➕ Thêm loại mới"}
                                </div>
                                <button
                                    className="lsp-btn lsp-btn-outline lsp-btn-sm"
                                    onClick={resetForm}
                                >✕</button>
                            </div>

                            {editId && (
                                <div className="lsp-edit-indicator">
                                    ⚠️ Đang sửa loại <strong>#{editId}</strong> — thay đổi sẽ ảnh hưởng tất cả sản phẩm thuộc loại này
                                </div>
                            )}

                            <form onSubmit={handleSave}>
                                <div className="lsp-form-body">
                                    <div className="lsp-field">
                                        <label className="lsp-label">
                                            Tên loại sản phẩm <span className="req">*</span>
                                        </label>
                                        <input
                                            className="lsp-input"
                                            placeholder="VD: Phần mềm, Dịch vụ..."
                                            required
                                            value={formData.tenLoai}
                                            onChange={(e) => field("tenLoai", e.target.value)}
                                        />
                                    </div>
                                    <div className="lsp-field">
                                        <label className="lsp-label">Mô tả</label>
                                        <textarea
                                            className="lsp-textarea"
                                            placeholder="Mô tả ngắn về loại sản phẩm này..."
                                            value={formData.moTa}
                                            onChange={(e) => field("moTa", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="lsp-form-footer">
                                    <button type="button" className="lsp-btn lsp-btn-outline" onClick={resetForm}>
                                        Hủy
                                    </button>
                                    <button type="submit" className="lsp-btn lsp-btn-primary">
                                        💾 {editId ? "Cập nhật" : "Thêm loại"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Placeholder khi chưa mở form */}
                    {!isAdding && (
                        <div className="lsp-card" style={{ border: "2px dashed #e5e7eb", background: "transparent", boxShadow: "none" }}>
                            <div style={{ padding: "40px 24px", textAlign: "center", color: "#9ca3af" }}>
                                <div style={{ fontSize: 36, marginBottom: 12 }}>🏷️</div>
                                <div style={{ fontWeight: 600, marginBottom: 6, color: "#6b7280" }}>Chưa chọn loại nào</div>
                                <div style={{ fontSize: 12 }}>Nhấn <strong>+ Thêm loại</strong> hoặc chọn <strong>Sửa</strong> để bắt đầu</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LoaiSanPhamManager;