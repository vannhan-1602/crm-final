import { useState, useEffect, useCallback } from "react";

const API_BASE = "http://localhost:8081/crm-ver1/api";

const TT_LABEL = { Moi: "Mới", DangXuLy: "Đang xử lý", ChoPhanHoi: "Chờ phản hồi", Dong: "Đã đóng" };
const MD_LABEL = { Cao: "Cao", TrungBinh: "Trung bình", Thap: "Thấp" };

const TT_STYLE = {
    Moi:         { bg: "#EBF3FD", color: "#1659A8" },
    DangXuLy:    { bg: "#E6F4EC", color: "#1A6B3A" },
    ChoPhanHoi:  { bg: "#FEF3E2", color: "#8A4A00" },
    Dong:        { bg: "#F0F0EE", color: "#4A4A48" },
};

const MD_STYLE = {
    Cao:        { bg: "#FDECEA", color: "#8B2020" },
    TrungBinh:  { bg: "#FEF3E2", color: "#8A4A00" },
    Thap:       { bg: "#E6F4EC", color: "#1A6B3A" },
};

const Badge = ({ label, style }) => (
    <span style={{
        display: "inline-block", fontSize: 11, fontWeight: 600,
        padding: "2px 9px", borderRadius: 10,
        background: style?.bg, color: style?.color, whiteSpace: "nowrap",
    }}>{label}</span>
);

const defaultForm = {
    tieuDe: "", moTa: "", khachHangId: "", mucDoUuTien: "TrungBinh",
    nguonTiepNhan: "Phone", nhanVienXuLyId: "", ngayHenXuLy: "",
};

export default function TicketManager() {
    const [tickets, setTickets]       = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);
    const [page, setPage]             = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [filterTT, setFilterTT]     = useState("");
    const [filterMD, setFilterMD]     = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [detail, setDetail]         = useState(null);
    const [phanHois, setPhanHois]     = useState([]);
    const [newPH, setNewPH]           = useState("");
    const [showModal, setShowModal]   = useState(false);
    const [editId, setEditId]         = useState(null);
    const [form, setForm]             = useState(defaultForm);
    const [saving, setSaving]         = useState(false);
    const [stats, setStats]           = useState({ total: 0, moi: 0, dang: 0, cho: 0 });

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({ page, size: 15 });
            if (filterTT) params.append("trangThai", filterTT);
            if (filterMD) params.append("mucDoUuTien", filterMD);
            const res = await fetch(`${API_BASE}/tickets?${params}`);
            if (!res.ok) throw new Error(`Lỗi ${res.status}`);
            const data = await res.json();
            const content = data.content ?? data;
            setTickets(Array.isArray(content) ? content : []);
            setTotalPages(data.totalPages ?? 1);
            const all = data.content ?? data;
            if (Array.isArray(all)) {
                setStats({
                    total: all.length,
                    moi:  all.filter(t => t.trangThai === "Moi").length,
                    dang: all.filter(t => t.trangThai === "DangXuLy").length,
                    cho:  all.filter(t => t.trangThai === "ChoPhanHoi").length,
                });
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [page, filterTT, filterMD]);

    useEffect(() => { fetchTickets(); }, [fetchTickets]);

    const fetchDetail = async (id) => {
        try {
            const [tRes, phRes] = await Promise.all([
                fetch(`${API_BASE}/tickets/${id}`),
                fetch(`${API_BASE}/tickets/${id}/phan-hoi`),
            ]);
            if (tRes.ok)  setDetail(await tRes.json());
            if (phRes.ok) setPhanHois(await phRes.json());
        } catch {}
    };

    const handleRowClick = (id) => {
        if (selectedId === id) { setSelectedId(null); setDetail(null); return; }
        setSelectedId(id);
        fetchDetail(id);
    };

    const handleChangeTT = async (id, trangThai) => {
        try {
            await fetch(`${API_BASE}/tickets/${id}/trang-thai`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trangThai }),
            });
            fetchTickets();
            if (selectedId === id) fetchDetail(id);
        } catch {}
    };

    const handleAddPH = async () => {
        if (!newPH.trim() || !selectedId) return;
        try {
            await fetch(`${API_BASE}/tickets/${selectedId}/phan-hoi`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ loaiPhanHoi: "NoiBoXuLy", noiDung: newPH }),
            });
            setNewPH("");
            fetchDetail(selectedId);
        } catch {}
    };

    const openCreate = () => {
        setEditId(null);
        setForm(defaultForm);
        setShowModal(true);
    };

    const openEdit = (t, e) => {
        e.stopPropagation();
        setEditId(t.id);
        setForm({
            tieuDe: t.tieuDe ?? "",
            moTa: t.moTa ?? "",
            khachHangId: t.khachHang?.id ?? "",
            mucDoUuTien: t.mucDoUuTien ?? "TrungBinh",
            nguonTiepNhan: t.nguonTiepNhan ?? "Phone",
            nhanVienXuLyId: t.nhanVienXuLy?.id ?? "",
            ngayHenXuLy: t.ngayHenXuLy?.slice(0, 10) ?? "",
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.tieuDe.trim()) { alert("Vui lòng nhập tiêu đề"); return; }
        setSaving(true);
        try {
            const body = {
                tieuDe: form.tieuDe,
                moTa: form.moTa,
                mucDoUuTien: form.mucDoUuTien,
                nguonTiepNhan: form.nguonTiepNhan,
                ngayHenXuLy: form.ngayHenXuLy || null,
                khachHang: form.khachHangId ? { id: Number(form.khachHangId) } : null,
                nhanVienXuLy: form.nhanVienXuLyId ? { id: Number(form.nhanVienXuLyId) } : null,
            };
            const url = editId ? `${API_BASE}/tickets/${editId}` : `${API_BASE}/tickets`;
            const method = editId ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`Lỗi ${res.status}`);
            setShowModal(false);
            fetchTickets();
        } catch (e) {
            alert("Lưu thất bại: " + e.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!window.confirm("Xác nhận xóa ticket này?")) return;
        await fetch(`${API_BASE}/tickets/${id}`, { method: "DELETE" });
        if (selectedId === id) { setSelectedId(null); setDetail(null); }
        fetchTickets();
    };

    const fmtDate = (s) => {
        if (!s) return "—";
        const d = new Date(s);
        return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
    };

    const fmtDateTime = (s) => {
        if (!s) return "";
        const d = new Date(s);
        return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
    };

    /* ── Styles ── */
    const S = {
        wrap:      { fontFamily: "'Be Vietnam Pro', sans-serif", padding: "24px 28px", color: "#1a1a1a", minHeight: "100vh", background: "#F7F6F3" },
        header:    { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
        h1:        { fontSize: 20, fontWeight: 700, letterSpacing: "-0.3px", color: "#111" },
        btnPrimary:{ padding: "8px 18px", fontSize: 13, fontWeight: 600, background: "#111", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" },
        statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 },
        statCard:  { background: "#fff", border: "0.5px solid #E5E3DC", borderRadius: 10, padding: "14px 16px" },
        statLabel: { fontSize: 11, color: "#888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 },
        statVal:   { fontSize: 26, fontWeight: 700, color: "#111" },
        toolbar:   { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" },
        select:    { height: 34, padding: "0 10px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 8, background: "#fff", color: "#333", cursor: "pointer", outline: "none" },
        table:     { width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: 10, overflow: "hidden", border: "0.5px solid #E5E3DC", fontSize: 13 },
        th:        { padding: "10px 12px", textAlign: "left", fontWeight: 600, fontSize: 11, color: "#888", textTransform: "uppercase", letterSpacing: "0.4px", borderBottom: "0.5px solid #E5E3DC", background: "#FAFAF8" },
        td:        { padding: "10px 12px", borderBottom: "0.5px solid #F0EEE8", verticalAlign: "middle" },
        trHover:   { cursor: "pointer", transition: "background 0.12s" },
        maCode:    { fontFamily: "monospace", fontSize: 11.5, color: "#888" },
        tieude:    { fontWeight: 600, color: "#111", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
        kh:        { fontSize: 12, color: "#666" },
        ngay:      { fontSize: 12, color: "#aaa" },
        btnEdit:   { padding: "3px 10px", fontSize: 12, border: "0.5px solid #D4D2CB", borderRadius: 6, background: "transparent", color: "#555", cursor: "pointer", marginRight: 4 },
        btnDel:    { padding: "3px 10px", fontSize: 12, border: "0.5px solid #FBBDBD", borderRadius: 6, background: "transparent", color: "#B91C1C", cursor: "pointer" },
        detail:    { marginTop: 12, background: "#fff", border: "0.5px solid #E5E3DC", borderRadius: 10, padding: "18px 20px" },
        dpHead:    { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
        dpTitle:   { fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 2 },
        dpGrid:    { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", fontSize: 13, marginBottom: 14 },
        dpKey:     { fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 2 },
        dpVal:     { color: "#333", fontWeight: 500 },
        phList:    { borderTop: "0.5px solid #F0EEE8", paddingTop: 12 },
        phItem:    { padding: "8px 0", borderBottom: "0.5px solid #F5F4F0" },
        phWho:     { fontSize: 12, fontWeight: 700, color: "#333" },
        phTime:    { fontSize: 11, color: "#bbb", marginLeft: 8 },
        phText:    { fontSize: 13, color: "#555", marginTop: 3 },
        phAddRow:  { display: "flex", gap: 8, marginTop: 12 },
        phInput:   { flex: 1, height: 34, padding: "0 10px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 8, outline: "none" },
        phBtn:     { padding: "0 14px", height: 34, fontSize: 13, fontWeight: 600, border: "none", borderRadius: 8, background: "#111", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" },
        closeBtn:  { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#aaa", lineHeight: 1, padding: 0 },
        overlay:   { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 },
        modal:     { background: "#fff", borderRadius: 12, padding: "24px", width: 520, maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" },
        mTitle:    { fontSize: 16, fontWeight: 700, marginBottom: 18, color: "#111" },
        formRow:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 },
        formCol:   { display: "flex", flexDirection: "column", gap: 4 },
        label:     { fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.4px" },
        input:     { height: 36, padding: "0 10px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 8, outline: "none", color: "#111" },
        textarea:  { padding: "8px 10px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 8, outline: "none", resize: "vertical", minHeight: 72, fontFamily: "inherit", color: "#111" },
        mFooter:   { display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18, paddingTop: 14, borderTop: "0.5px solid #F0EEE8" },
        btnCancel: { padding: "8px 16px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 8, background: "#fff", color: "#555", cursor: "pointer" },
        btnSave:   { padding: "8px 18px", fontSize: 13, fontWeight: 600, border: "none", borderRadius: 8, background: "#111", color: "#fff", cursor: "pointer" },
        selFull:   { height: 36, padding: "0 10px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 8, background: "#fff", color: "#111", outline: "none" },
        empty:     { textAlign: "center", padding: "40px 20px", color: "#bbb", fontSize: 13 },
        errBox:    { background: "#FEF2F2", border: "0.5px solid #FBBDBD", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#B91C1C" },
        pagination:{ display: "flex", gap: 6, justifyContent: "flex-end", marginTop: 12, alignItems: "center" },
        pageBtn:   { padding: "5px 12px", fontSize: 13, border: "0.5px solid #D4D2CB", borderRadius: 6, background: "#fff", cursor: "pointer", color: "#333" },
        pageBtnAct:{ padding: "5px 12px", fontSize: 13, border: "none", borderRadius: 6, background: "#111", cursor: "pointer", color: "#fff" },
        ttSelect:  { height: 28, padding: "0 8px", fontSize: 12, border: "0.5px solid #E0DED7", borderRadius: 6, background: "#FAFAF8", color: "#333", cursor: "pointer", outline: "none" },
    };

    const FormField = ({ label, children, full }) => (
        <div style={{ ...S.formCol, ...(full ? { gridColumn: "1 / -1" } : {}) }}>
            <label style={S.label}>{label}</label>
            {children}
        </div>
    );

    return (
        <>
            {/* Google Font */}
            <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet" />

            <div style={S.wrap}>
                {/* Header */}
                <div style={S.header}>
                    <div>
                        <h1 style={S.h1}>Quản lý Ticket</h1>
                        <p style={{ fontSize: 12, color: "#999", marginTop: 2 }}>Hỗ trợ & xử lý khiếu nại khách hàng</p>
                    </div>
                    <button style={S.btnPrimary} onClick={openCreate}>+ Tạo ticket</button>
                </div>

                {/* Stats */}
                <div style={S.statsGrid}>
                    {[
                        { label: "Tổng ticket", val: stats.total, sub: "tất cả" },
                        { label: "Mới", val: stats.moi, sub: "chờ tiếp nhận", color: "#1659A8" },
                        { label: "Đang xử lý", val: stats.dang, sub: "đang theo dõi", color: "#1A6B3A" },
                        { label: "Chờ phản hồi", val: stats.cho, sub: "cần liên hệ", color: "#8A4A00" },
                    ].map((s) => (
                        <div key={s.label} style={S.statCard}>
                            <div style={S.statLabel}>{s.label}</div>
                            <div style={{ ...S.statVal, ...(s.color ? { color: s.color } : {}) }}>{s.val}</div>
                            <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{s.sub}</div>
                        </div>
                    ))}
                </div>

                {/* Toolbar */}
                <div style={S.toolbar}>
                    <select style={S.select} value={filterTT} onChange={e => { setFilterTT(e.target.value); setPage(0); }}>
                        <option value="">Tất cả trạng thái</option>
                        {Object.entries(TT_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    <select style={S.select} value={filterMD} onChange={e => { setFilterMD(e.target.value); setPage(0); }}>
                        <option value="">Tất cả mức độ</option>
                        {Object.entries(MD_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                    <button style={{ ...S.btnEdit, marginRight: 0, height: 34 }} onClick={fetchTickets}>Làm mới</button>
                </div>

                {/* Error */}
                {error && <div style={S.errBox}>Lỗi tải dữ liệu: {error}. Đang hiển thị dữ liệu mẫu.</div>}

                {/* Table */}
                <table style={S.table}>
                    <thead>
                    <tr>
                        {["Mã ticket", "Tiêu đề", "Khách hàng", "Mức độ", "Trạng thái", "Ngày tạo", ""].map(h => (
                            <th key={h} style={S.th}>{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr><td colSpan={7} style={S.empty}>Đang tải...</td></tr>
                    ) : tickets.length === 0 ? (
                        <tr><td colSpan={7} style={S.empty}>Không có ticket nào</td></tr>
                    ) : tickets.map(t => (
                        <tr
                            key={t.id}
                            style={{ ...S.trHover, background: selectedId === t.id ? "#F7F4EE" : "transparent" }}
                            onClick={() => handleRowClick(t.id)}
                            onMouseEnter={e => { if (selectedId !== t.id) e.currentTarget.style.background = "#FAFAF8"; }}
                            onMouseLeave={e => { if (selectedId !== t.id) e.currentTarget.style.background = "transparent"; }}
                        >
                            <td style={S.td}><span style={S.maCode}>{t.maTicket}</span></td>
                            <td style={S.td}><div style={S.tieude} title={t.tieuDe}>{t.tieuDe}</div></td>
                            <td style={S.td}><span style={S.kh}>{t.khachHang?.tenKhachHang ?? t.khachHang?.ten ?? "—"}</span></td>
                            <td style={S.td}><Badge label={MD_LABEL[t.mucDoUuTien] ?? t.mucDoUuTien} style={MD_STYLE[t.mucDoUuTien]} /></td>
                            <td style={S.td}>
                                <select
                                    style={S.ttSelect}
                                    value={t.trangThai}
                                    onClick={e => e.stopPropagation()}
                                    onChange={e => handleChangeTT(t.id, e.target.value)}
                                >
                                    {Object.entries(TT_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                                </select>
                            </td>
                            <td style={S.td}><span style={S.ngay}>{fmtDate(t.createdAt)}</span></td>
                            <td style={S.td} onClick={e => e.stopPropagation()}>
                                <button style={S.btnEdit} onClick={e => openEdit(t, e)}>Sửa</button>
                                <button style={S.btnDel} onClick={e => handleDelete(t.id, e)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={S.pagination}>
                        <button style={S.pageBtn} disabled={page === 0} onClick={() => setPage(p => p - 1)}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} style={page === i ? S.pageBtnAct : S.pageBtn} onClick={() => setPage(i)}>{i + 1}</button>
                        ))}
                        <button style={S.pageBtn} disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>›</button>
                    </div>
                )}

                {/* Detail Panel */}
                {selectedId && detail && (
                    <div style={S.detail}>
                        <div style={S.dpHead}>
                            <div>
                                <div style={S.dpTitle}>{detail.tieuDe}</div>
                                <span style={S.maCode}>{detail.maTicket}</span>
                            </div>
                            <button style={S.closeBtn} onClick={() => { setSelectedId(null); setDetail(null); }}>✕</button>
                        </div>
                        <div style={S.dpGrid}>
                            <div>
                                <div style={S.dpKey}>Khách hàng</div>
                                <div style={S.dpVal}>{detail.khachHang?.tenKhachHang ?? detail.khachHang?.ten ?? "—"}</div>
                            </div>
                            <div>
                                <div style={S.dpKey}>Nhân viên xử lý</div>
                                <div style={S.dpVal}>{detail.nhanVienXuLy?.hoTen ?? detail.nhanVienXuLy?.ten ?? "Chưa phân công"}</div>
                            </div>
                            <div>
                                <div style={S.dpKey}>Mức độ ưu tiên</div>
                                <div style={S.dpVal}><Badge label={MD_LABEL[detail.mucDoUuTien]} style={MD_STYLE[detail.mucDoUuTien]} /></div>
                            </div>
                            <div>
                                <div style={S.dpKey}>Nguồn tiếp nhận</div>
                                <div style={S.dpVal}>{detail.nguonTiepNhan ?? "—"}</div>
                            </div>
                            <div>
                                <div style={S.dpKey}>Ngày hẹn xử lý</div>
                                <div style={S.dpVal}>{fmtDate(detail.ngayHenXuLy)}</div>
                            </div>
                            <div>
                                <div style={S.dpKey}>Ngày đóng</div>
                                <div style={S.dpVal}>{fmtDate(detail.ngayDong)}</div>
                            </div>
                            {detail.moTa && (
                                <div style={{ gridColumn: "1 / -1" }}>
                                    <div style={S.dpKey}>Mô tả</div>
                                    <div style={{ ...S.dpVal, color: "#555", fontWeight: 400, lineHeight: 1.6 }}>{detail.moTa}</div>
                                </div>
                            )}
                        </div>

                        {/* Phản hồi */}
                        <div style={S.phList}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>
                                Lịch sử phản hồi ({phanHois.length})
                            </div>
                            {phanHois.length === 0 && <div style={{ fontSize: 13, color: "#ccc", paddingBottom: 8 }}>Chưa có phản hồi nào.</div>}
                            {phanHois.map(ph => (
                                <div key={ph.id} style={S.phItem}>
                                    <div>
                                        <span style={S.phWho}>{ph.nguoiPhanHoi?.hoTen ?? ph.nguoiPhanHoi?.ten ?? "Hệ thống"}</span>
                                        <span style={S.phTime}>{fmtDateTime(ph.createdAt)}</span>
                                        {ph.loaiPhanHoi && <Badge label={ph.loaiPhanHoi} style={{ bg: "#F0EEE8", color: "#555" }} />}
                                    </div>
                                    <div style={S.phText}>{ph.noiDung}</div>
                                </div>
                            ))}
                            <div style={S.phAddRow}>
                                <input
                                    style={S.phInput}
                                    placeholder="Nhập nội dung phản hồi..."
                                    value={newPH}
                                    onChange={e => setNewPH(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleAddPH()}
                                />
                                <button style={S.phBtn} onClick={handleAddPH}>Gửi</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div style={S.overlay} onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
                    <div style={S.modal}>
                        <h2 style={S.mTitle}>{editId ? "Cập nhật ticket" : "Tạo ticket mới"}</h2>
                        <div style={S.formRow}>
                            <FormField label="Tiêu đề *" full>
                                <input style={{ ...S.input, gridColumn: "1/-1" }} value={form.tieuDe} onChange={e => setForm(f => ({ ...f, tieuDe: e.target.value }))} placeholder="Nhập tiêu đề..." />
                            </FormField>
                        </div>
                        <div style={S.formRow}>
                            <FormField label="Mức độ ưu tiên">
                                <select style={S.selFull} value={form.mucDoUuTien} onChange={e => setForm(f => ({ ...f, mucDoUuTien: e.target.value }))}>
                                    <option value="Cao">Cao</option>
                                    <option value="TrungBinh">Trung bình</option>
                                    <option value="Thap">Thấp</option>
                                </select>
                            </FormField>
                            <FormField label="Nguồn tiếp nhận">
                                <select style={S.selFull} value={form.nguonTiepNhan} onChange={e => setForm(f => ({ ...f, nguonTiepNhan: e.target.value }))}>
                                    <option value="Phone">Điện thoại</option>
                                    <option value="Email">Email</option>
                                    <option value="Chat">Chat</option>
                                    <option value="TrucTiep">Trực tiếp</option>
                                </select>
                            </FormField>
                        </div>
                        <div style={S.formRow}>
                            <FormField label="ID Khách hàng">
                                <input style={S.input} value={form.khachHangId} onChange={e => setForm(f => ({ ...f, khachHangId: e.target.value }))} placeholder="ID khách hàng" />
                            </FormField>
                            <FormField label="ID Nhân viên xử lý">
                                <input style={S.input} value={form.nhanVienXuLyId} onChange={e => setForm(f => ({ ...f, nhanVienXuLyId: e.target.value }))} placeholder="ID nhân viên" />
                            </FormField>
                        </div>
                        <div style={S.formRow}>
                            <FormField label="Ngày hẹn xử lý" full>
                                <input type="date" style={S.input} value={form.ngayHenXuLy} onChange={e => setForm(f => ({ ...f, ngayHenXuLy: e.target.value }))} />
                            </FormField>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 10 }}>
                            <label style={S.label}>Mô tả</label>
                            <textarea style={S.textarea} value={form.moTa} onChange={e => setForm(f => ({ ...f, moTa: e.target.value }))} placeholder="Mô tả chi tiết vấn đề..." />
                        </div>
                        <div style={S.mFooter}>
                            <button style={S.btnCancel} onClick={() => setShowModal(false)}>Hủy</button>
                            <button style={S.btnSave} onClick={handleSave} disabled={saving}>{saving ? "Đang lưu..." : "Lưu ticket"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}