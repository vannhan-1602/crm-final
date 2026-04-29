const Topbar = () => {
  return (
    <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center mb-4">
      <h5 className="m-0 text-secondary">Hệ thống Quản lý Khách hàng</h5>
      <div className="d-flex align-items-center gap-3">
        <span className="text-muted small">
          Xin chào, <strong>Võ Văn Nhân (Admin)</strong>
        </span>
        <button className="btn btn-sm btn-outline-danger">Đăng xuất</button>
      </div>
    </div>
  );
};

export default Topbar;
