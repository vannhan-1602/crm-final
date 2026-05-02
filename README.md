# HỆ THỐNG QUẢN LÝ KHÁCH HÀNG (CRM ONLINE)

Hệ thống CRM Online là một ứng dụng Web Full-stack được xây dựng nhằm mục đích hỗ trợ doanh nghiệp quản lý vòng đời khách hàng.
Hệ thống tập trung vào việc lưu trữ, phân loại và theo dõi các luồng tương tác từ giai đoạn khách hàng tiềm năng (Lead) cho đến khi trở thành khách hàng chính thức (B2B/B2C).
Dự án được phát triển với sự phân tách rõ ràng giữa giao diện người dùng (Frontend) và xử lý nghiệp vụ (Backend) .
Được viết theo mô hình MVC

## I. CÔNG NGHỆ SỬ DỤNG

1. Môi trường Backend:

   * Ngôn ngữ: Java (JDK 17)
   * Framework: Spring Boot, Spring Data JPA, Hibernate
   * Công cụ hỗ trợ: Lombok
2. Môi trường Frontend:

   * Thư viện cốt lõi: React.js (Sử dụng Vite để đóng gói)
   * Quản lý định tuyến: React Router DOM
   * Giao tiếp API: Axios
   * Giao diện (UI/UX): Bootstrap 5
3. Cơ sở dữ liệu:

   * Hệ quản trị: MySQL 8.0+



## II. HƯỚNG DẪN CÀI ĐẶT VÀ VẬN HÀNH

Để khởi chạy dự án trên môi trường máy chủ cục bộ (localhost), thực hiện tuần tự các bước dưới đây:

### Buoc 1: Khời tạo cơ sở dữ liệu (Database)

1. Sử dụng các công cụ quản trị MySQL (như HeidiSQL, MySQL Workbench, hoặc XAMPP).
2. Tạo một cơ sở dữ liệu mới với tên gọi: CRMOnline\_Pro (khuyến nghị định dạng UTF-8).
3. Mở và thực thi (Execute) file script SQL được đính kèm trong mã nguồn: CRMOnline\_Pro.sql.

### Buoc 2: Cấu hình và khởi chạy Backend (Spring Boot)

1. Sử dụng phần mềm IntelliJ IDEA để mở thư mục chứa mã nguồn Backend (crm-backend).
2. Điều hướng đến file cấu hình cơ sở dữ liệu tại: src/main/resources/application.yml.
3. Thay đổi thông tin username và password tại mục datasource để khớp với cấu hình MySQL trên máy tính của bạn:
spring:
datasource:
url: "jdbc:mysql://localhost:3306/CRMOnline\_Pro?useSSL=false\&serverTimezone=UTC"
username: \[Nhap\_Username\_Cua\_Ban]
password: \[Nhap\_Password\_Cua\_Ban]



1. Chờ tải hoàn tất các thư viện phụ thuộc (Dependencies).
2. Thực thi lớp chính: Version1Application.java.
3. Backend khởi chạy thành công khi cửa sổ Console thông báo ứng dụng đang hoạt động tại cổng 8081.

### Buoc 3: Cài đặt và khởi chạy Frontend (React.js)

1. Sử dụng phần mềm Visual Studio Code để mở thư mục chứa mã nguồn Frontend (crm-frontend).
2. Mở Terminal tích hợp trong VS Code.
3. Thực thi lệnh sau để cài đặt các thư viện Node.js cần thiết:
npm install
4. Sau khi cài đặt hoàn tất, khởi chạy máy chủ Frontend bằng lệnh:
npm run dev
5. Truy cập vào đường dẫn hiển thị trên Terminal (mặc định là http://localhost:5173) thông qua trình duyệt web để bắt đầu sử dụng hệ thống.



## III. CÁC PHÂN HỆ NGHIỆP VỤ CHÍNH

Hệ thống được thiết kế bao gồm 6 phân hệ cốt lõi, liên kết chặt chẽ với nhau tạo thành một quy trình khép kín từ lúc tiếp cận khách hàng đến khi chốt sale và quản lý sau bán:

1. **Phân hệ Quản lý Khách hàng tiềm năng (Lead)**

   * Thêm mới, cập nhật, xóa và tìm kiếm hồ sơ Lead từ nhiều nguồn tiếp cận khác nhau.
   * **Giao việc / Phân công:** Chỉ định Lead cho từng nhân viên kinh doanh phụ trách.
   * **Chuyển đổi (Convert):** Tự động chuyển trạng thái Lead thành Khách hàng chính thức (B2B/B2C) khi phát sinh giao dịch thành công.
2. **Phân hệ Quản lý Khách hàng (B2B / B2C)**

   * Lưu trữ và phân loại hồ sơ khách hàng theo cá nhân (Cá nhân VIP, Khách lẻ) hoặc tổ chức (B2B).
   * Quản lý các thông tin chi tiết: Tên, Mã số thuế, Liên hệ, Tình trạng giao dịch (Đang GD, Tạm ngừng,...).
   * Xóa mềm (Soft Delete) giúp bảo toàn dữ liệu lịch sử.
3. **Phân hệ CSKH (Nhật ký \& Lịch hẹn)**

   * Ghi nhận chi tiết lịch sử tương tác: Cuộc gọi, Cuộc gặp mặt, Email, Zalo.
   * Liên kết dữ liệu chéo: Mỗi hoạt động bắt buộc tham chiếu trực tiếp đến một khách hàng tiềm năng (Lead) hoặc khách hàng chính thức.
   * Theo dõi tiến độ chăm sóc khách hàng của từng nhân viên.
4. **Phân hệ Quản lý Hợp đồng (Contract)**

   * Khởi tạo và quản lý hợp đồng gắn liền với Khách hàng.
   * Theo dõi chi tiết: Mã hợp đồng, Ngày ký, Thời hạn hợp đồng.
   * Quản lý vòng đời hợp đồng qua các trạng thái: Đang thực hiện, Tạm dừng, Thanh lý.
5. **Phân hệ Tài chính (Hóa đơn \& Phiếu Thu/Chi)**

   * **Hóa đơn (Invoice):** Xuất hóa đơn dựa trên Hợp đồng đã ký.
   * **Thu/Chi (Receipt/Payment):** Lập phiếu thu tiền hoặc chi tiền, gắn trực tiếp vào Hóa đơn tương ứng.
   * **Tự động hóa:** Hệ thống tự động đối soát số tiền đã thu và cập nhật trạng thái Hóa đơn một cách thông minh (*Chưa thanh toán -> Thanh toán 1 phần -> Hoàn tất*).
6. **Phân hệ Quản lý Kho hàng \& Sản phẩm (Inventory)**

   * Quản lý danh mục Sản phẩm và số lượng tồn kho thực tế.
   * **Thẻ kho (Inventory Card):** Ghi nhận chi tiết mọi biến động kho thông qua các loại giao dịch: *Nhập mua, Xuất bán, Nhập trả khách, Xuất trả NCC, Xuất hủy, Kiểm kê*.
   * **Tự động hóa:** Tự động cộng/trừ số lượng tồn kho của sản phẩm mỗi khi phát sinh giao dịch xuất/nhập, đảm bảo dữ liệu kho luôn chính xác (Real-time).

7\. Phân hệ Quản lý Cơ hội bán hàng (Sales Pipeline)Quản lý luồng bán hàng: 

   * Theo dõi các thương vụ tiềm năng từ giai đoạn tiếp cận đến khi chốt hợp đồng thành công.  
   * Phân tích giai đoạn: Phân loại cơ hội qua các bước: Khảo sát, Đề xuất, Thương lượng, Thành công hoặc Thất bại.  
   * Dự báo doanh thu: Thiết lập tỷ lệ thành công (%) và doanh thu kỳ vọng để hỗ trợ nhà quản lý dự báo dòng tiền trong tương lai.  
   * Liên kết linh hoạt: Một cơ hội có thể được tạo từ một Khách hàng tiềm năng (Lead) hoặc gắn trực tiếp với một Khách hàng chính thức (B2B/B2C). 

