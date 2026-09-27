# FUNewsManagementSystem - Assignment 01

Project: **Huynh_Tuan_Kiet_SE1910**

Môn học: **SBA301 - Working with ReactJS application**

> **Đang phát triển (WIP).** Đây là bản lưu tiến độ ngày 27/09/2026 để tiếp tục hoàn thiện, chưa phải bản nộp cuối.

Frontend quản trị tin tức bằng React, Vite và Bootstrap. Dữ liệu hiện dùng mảng JavaScript, chưa kết nối backend hoặc database.

## Cài đặt và chạy

Yêu cầu Node.js `^20.19.0 || >=22.12.0` và npm (theo Vite đang cài trong project).

```bash
git clone https://github.com/huynktIT6789/Huynh_Tuan_Kiet_SE1910_Assignment01_SBA.git Huynh_Tuan_Kiet_SE1910
cd Huynh_Tuan_Kiet_SE1910
npm ci
npm run dev
```

Nếu đã có project trên máy, bỏ qua bước clone. Repo hiện để riêng tư; tài khoản clone cần quyền truy cập.

Mở địa chỉ localhost mà Vite hiển thị trong terminal. Các lệnh khác:

```bash
npm run lint
npm run build
npm run preview
```

`npm run preview` dùng sau khi build để xem thử bản build. `node_modules/`, `dist/` và cấu hình IDE không được commit; dependency được ghi trong `package-lock.json`.

## Tài khoản test

- Username: `Admin`
- Password: `Admin`
- Phân biệt chữ hoa/chữ thường. Đây là mock authentication phục vụ bài tập.
- Các account trong `src/data/mockData.js` chỉ là dữ liệu mẫu, chưa dùng để đăng nhập.

## Tiến độ đối chiếu yêu cầu

Trạng thái dưới đây dựa trên việc đọc source; không thay thế kết quả kiểm thử giao diện.

| Yêu cầu | Trạng thái hiện tại |
| --- | --- |
| R01 - React + Vite, tên project đúng quy ước | Đã có |
| R02, R03 - Login và Admin/Admin vào admin page | Có kiểm tra rỗng, sai credential và logout |
| R04 - Logo tạo bằng AI | Chưa có logo trong Header |
| R05 - Header và admin layout | Đã có Header, Sidebar, Content |
| R06 - Dashboard/Category/News/Users/Settings | Có đủ menu; Dashboard, Users, Settings mới là placeholder |
| R07 - Category CRUD + Search | Đã có code, tìm theo tên |
| R08 - News CRUD + Search | Đã có code, tìm theo tiêu đề |
| R09 - User/Account CRUD + Search | Chưa triển khai |
| R10 - Create/Update bằng dialog | Có ở Category và News |
| R11 - Delete confirmation | Có ở Category và News |
| R12 - Data model và quan hệ | Có mock data; Category và News chưa dùng chung state |

## Cấu trúc chính

```text
src/
  App.jsx                       # Auth state, login/logout
  components/
    AdminLayout.jsx             # Active page và nội dung từng menu
    Header.jsx
    Sidebar.jsx
  pages/
    LoginPage.jsx
    CategoryManagement.jsx      # CRUD, search và dialog Category
    NewsManagement.jsx          # CRUD, search và dialog News
  data/
    mockData.js                 # Categories, news và users mẫu
```

## Giới hạn và việc làm tiếp

- [ ] Triển khai Users/Account CRUD + Search, role Admin = 1 và Staff = 2.
- [ ] Thêm logo tạo bằng AI vào Header, lưu nguồn/prompt tạo logo.
- [ ] Hoàn thiện nội dung Dashboard và Settings theo phạm vi bài.
- [ ] Đưa Category/News lên state dùng chung để thay đổi Category được phản ánh ở News; xử lý category đang được bài viết sử dụng.
- [ ] Quyết định có lưu dữ liệu bằng localStorage hay không. Hiện dữ liệu quản lý nằm trong state từng page, mất khi chuyển sang page khác hoặc reload; reload cũng mất trạng thái đăng nhập.
- [ ] Bổ sung validation News (hiện chỉ bắt buộc title), kiểm tra quan hệ category và các trường hợp biên.
- [ ] Chạy kiểm thử giao diện: login rỗng/sai/đúng, logout, từng CRUD, dialog cancel, delete cancel/confirm, search không có kết quả.
- [ ] Hoàn thiện test matrix, ảnh/video demo nếu lớp yêu cầu, sơ đồ component/state, debug log từ các lỗi thực tế và AI usage log.

## Kiểm tra tại bản lưu tiến độ

Môi trường kiểm tra: Node.js `v24.20.0`, npm `11.19.0`.

| Kiểm tra | Kết quả ngày 27/09/2026 |
| --- | --- |
| `npm run build` | PASS - Vite tạo bản build thành công |
| `npm run lint` | PASS - Oxlint kết thúc không báo lỗi |
| Chạy lại `npm ci` từ bản clone sạch | Chưa kiểm tra |
| Smoke test trên trình duyệt | Chưa kiểm tra trong lần lưu tiến độ này |

Build/lint thành công chưa xác nhận toàn bộ chức năng đạt yêu cầu assignment.

## Nguồn tham khảo và AI usage

- Yêu cầu bài: `SBA301_Assignment01_Student_Guide.pdf`, đặc biệt mục 0.1, 1.2 và 11.
- Project dùng template React + Vite và Bootstrap; dependency cụ thể nằm trong `package.json`.
- Ngày 27/09/2026, dùng Codex với yêu cầu: đọc hướng dẫn assignment và push bản đang làm dở để tiếp tục sau.
- Phạm vi hỗ trợ của lần này: đối chiếu source với yêu cầu, cập nhật README, bổ sung `.gitignore`, chạy build/lint và chuẩn bị Git. Không bổ sung chức năng ứng dụng trong lần lưu tiến độ này.
- Kiểm chứng: đọc các component và mock data; ghi kết quả thực tế của `npm run build` và `npm run lint` ở trên. Sinh viên cần tự chạy demo và kiểm tra lại nội dung trước bản nộp cuối.
- Lịch sử sử dụng AI trước lần lưu này chưa được xác minh; sinh viên bổ sung nếu có.
