# HE THONG QUAN LY KHACH HANG (CRM ONLINE)

Hệ thống CRM Online là một ứng dụng Web Full-stack được xây dựng nhằm mục đích hỗ trợ doanh nghiệp quản lý vòng đời khách hàng.
Hệ thống tập trung vào việc lưu trữ, phân loại và theo dõi các luồng tương tác từ giai đoạn khách hàng tiềm năng (Lead) cho đến khi trở thành khách hàng chính thức (B2B/B2C).
Dự án được phát triển với sự phân tách rõ ràng giữa giao diện người dùng (Frontend) và xử lý nghiệp vụ (Backend) .
Được viết theo mô hình MVC

## I. CONG NGHE SU DUNG

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



## II. HUONG DAN CAI DAT VA VAN HANH

Để khởi chạy dự án trên môi trường máy chủ cục bộ (localhost), thực hiện tuần tự các bước dưới đây:

### Buoc 1: Khoi tao Co so du lieu (Database)

1. Sử dụng các công cụ quản trị MySQL (như HeidiSQL, MySQL Workbench, hoặc XAMPP).
2. Tạo một cơ sở dữ liệu mới với tên gọi: CRMOnline\_Pro (khuyến nghị định dạng UTF-8).
3. Mở và thực thi (Execute) file script SQL được đính kèm trong mã nguồn: CRMOnline\_Pro.sql.

### Buoc 2: Cau hinh va khoi chay Backend (Spring Boot)

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

### Buoc 3: Cai dat va khoi chay Frontend (React.js)

1. Sử dụng phần mềm Visual Studio Code để mở thư mục chứa mã nguồn Frontend (crm-frontend).
2. Mở Terminal tích hợp trong VS Code.
3. Thực thi lệnh sau để cài đặt các thư viện Node.js cần thiết:
npm install
4. Sau khi cài đặt hoàn tất, khởi chạy máy chủ Frontend bằng lệnh:
npm run dev
5. Truy cập vào đường dẫn hiển thị trên Terminal (mặc định là http://localhost:5173) thông qua trình duyệt web để bắt đầu sử dụng hệ thống.



## III. CAC PHAN HE NGHIEP VU CHINH

1. Phan he Quan ly Khach hang tiem nang (Lead)

   * Thêm mới, cập nhật, xóa và tìm kiếm hồ sơ Lead từ nhiều nguồn tiếp cận khác nhau.
   * Giao việc / Phân công: chỉ định Lead cho từng nhân viên kinh doanh phụ trách.
   * Chuyển đổi (Convert): Cập nhật trạng thái Lead thành Khách hàng chính thức khi phát sinh giao dịch thành công.
2. Phan he Quan ly Khach hang to chuc va ca nhan (B2B / B2C)

   * Lưu trữ và phân loại hồ sơ khách hàng theo cá nhân hoặc tổ chức.
   * Quản lý các thông tin chi tiết: Tên, Mã số thuế, Thông tin liên hệ, Loại hình kinh doanh và Tình trạng giao dịch.
3. Phan he Nhat ky va Lich hen (Hoat dong CSKH)

   * Ghi nhận chi tiết nhật ký tương tác với khách hàng bao gồm: Cuộc gọi, Cuộc gặp mặt, Email, Zalo.
   * Liên kết dữ liệu: Mỗi hoạt động bắt buộc phải được tham chiếu trực tiếp đến một khách hàng tiềm năng (Lead) hoặc khách hàng chính thức (B2B/B2C).
   * Truy xuất lịch sử: Hiển thị đầy đủ mốc thời gian, người thực hiện và nội dung chi tiết của từng lần tương tác.

