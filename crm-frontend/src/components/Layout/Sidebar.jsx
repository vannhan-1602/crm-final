import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white vh-100 p-3"
      style={{ width: "250px", position: "fixed" }}
    >
      <h4 className="text-center fw-bold text-uppercase border-bottom pb-3 mb-3">
        CRM Online
      </h4>
      <div className="nav flex-column gap-2">
        <NavLink
          to="/leads"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Khách hàng tiềm năng
        </NavLink>
        <NavLink
          to="/khach-hang"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Khách hàng B2B/B2C
        </NavLink>
        <NavLink
          to="/hoat-dong"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Nhật ký & Lịch hẹn
        </NavLink>
        <NavLink
          to="/hop-dong"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Quản lý Hợp đồng
        </NavLink>
        <NavLink
          to="/hoa-don"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Quản lý Hóa đơn
        </NavLink>
        <NavLink
          to="/thu-chi"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Quản lý Thu / Chi
        </NavLink>

        <NavLink
          to="/san-pham"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Quản lý Sản phẩm
        </NavLink>
        <NavLink
          to="/co-hoi"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >
          Cơ hội Bán hàng
        </NavLink>

        <NavLink
          to="/kho-hang"
          className={({ isActive }) =>
            `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
          }
        >   Quản Lý Ticket
        </NavLink>

        <NavLink
            to="/tickets"
            className={({ isActive }) =>
                `nav-link ${isActive ? "bg-primary text-white" : "text-light"}`
            }
        >
          Quản lý Kho
        </NavLink>
      </div>
      <div className="position-absolute bottom-0 start-0 w-100 p-3 border-top border-secondary text-center small"></div>
    </div>
  );
};

export default Sidebar;
