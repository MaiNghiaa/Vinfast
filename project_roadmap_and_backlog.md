# Bảng Kế Hoạch & Các Đầu Mục Còn Lại (Project Backlog & Roadmap)

Tài liệu này tổng hợp toàn bộ các hạng mục công việc còn lại của dự án website **VinFast Phương Đông**, được phân chia theo mức độ ưu tiên, phân hệ giao diện (Frontend), các trang chi tiết và hệ thống xử lý Backend (BE).

---

## 📌 Bảng Tiến Độ Tổng Quan

| Phân hệ | Trạng thái | Ghi chú |
| :--- | :---: | :--- |
| **Trang chủ (`/`)** | 🟢 Đã hoàn thiện | Đã chuẩn hóa Hero, Danh mục xe, Showroom, Video banner, Bảng vinh danh |
| **Giới thiệu về chúng tôi (`/gioi-thieu`)** | 🟢 Đã hoàn thiện | Đã đồng bộ layout 1:1 theo live |
| **Triết lý phục vụ khách hàng (`/van-hoa-...`)** | 🟢 Đã hoàn thiện | Đã hiệu chỉnh video popup, timeline văn hóa, spacing chuẩn |
| **Dịch vụ chính (`/dich-vu`)** | 🟢 Đã hoàn thiện | Đã căn chỉnh banner 500px, bg-black/80, typography Mulish/Manrope |
| **Làm đẹp xe (`/lam-dep-xe`, `/toyota-touch`)** | 🟢 Đã hoàn thiện | Đã thiết kế đồng bộ theo layout dịch vụ bảo dưỡng |
| **Phụ kiện chính hãng (`/phu-kien-chinh-hang`)** | 🟢 Đã hoàn thiện | Đã đồng bộ 1:1 chuẩn live: Hero VF 8 đỏ, 4 giá trị outline, SQDR |
| **Tuyển dụng (`/tuyen-dung`)** | 🟢 Đã hoàn thiện | Đã đồng bộ 20 tin thật, Hero VF 9, thanh lọc ngang, modal xem JD & nộp CV |
| **Trạm sạc (`/tram-sac`)** | 🟡 Cần rà soát | Đã có giao diện, cần rà soát lại danh sách điểm sạc thực tế |
| **Chi tiết sản phẩm xe (`/san-pham/[slug]`)** | 🔴 Chưa rà soát | Cần kiểm tra bảng thông số, bộ chọn màu, ảnh 360/gallery |
| **Danh mục xe mới & xe cũ (`/xe-moi`, `/xe-cu`)** | 🔴 Chưa rà soát | Cần đối chiếu với chuyên mục thực tế trên live |
| **Công cụ dự toán lăn bánh & so sánh xe** | 🔴 Cần hoàn thiện | Cập nhật công thức tính lệ phí trước bạ xe điện 0% và bảng trả góp |
| **Tin tức & Các chuyên mục bài viết** | 🔴 Cần hoàn thiện | 3 chuyên mục: Ưu đãi, Tin nội bộ, Tin sự kiện và trang đọc chi tiết bài |
| **Hệ thống Backend (API, Form, Email, Sheets)** | 🔴 Chưa triển khai | Cần tạo API lưu lead, gửi email thông báo và đồng bộ Google Sheets |

---

## 🚀 CHI TIẾT CÁC ĐẦU MỤC CÔNG VIỆC CẦN LÀM

### I. Phân Hệ Chi Tiết Sản Phẩm Xe (`/san-pham/[slug]`)
*Mục tiêu: Đảm bảo khách hàng xem xe có trải nghiệm trực quan, chân thực và dễ dàng đăng ký lái thử/mua xe.*

- [ ] **1. Kiểm tra & Chuẩn hóa 11 Dòng Xe VinFast:**
  - Nhóm xe điện phổ thông: `vinfast-vf3`, `vinfast-vf5`, `vinfast-vf6`, `vinfast-vf7`, `vinfast-vf8`, `vinfast-vf9`.
  - Nhóm xe điện dịch vụ/mới: `vinfast-minio-green`, `vinfast-herio-green`, `vinfast-nerio-green`, `vinfast-limo-green`, `xe-tai-van-dien-vinfast-ec-van`.
- [ ] **2. Bộ Chọn Màu Xe Động (Color Picker):**
  - Hiển thị bảng màu ngoại thất thực tế (Trắng, Đen, Đỏ, Xanh lục bảo, Xám xi măng, Vàng hồng...) đổi ảnh theo màu xe được chọn.
  - Tùy chọn phối màu nội thất (Đen, Nâu Saddle, Be, Xanh Navy).
- [ ] **3. Bảng Thông Số Kỹ Thuật (Specs Accordion):**
  - Kích thước (Dài x Rộng x Cao, Chiều dài cơ sở, Khoảng sáng gầm).
  - Hệ truyền động (Động cơ đơn/đôi FWD/AWD, Công suất mã lực, Momen xoắn).
  - Pin & Quãng đường di chuyển (Dung lượng pin kWh, chuẩn sạc nhanh DC 10-70%, tầm hoạt động 1 lần sạc).
  - Công nghệ an toàn & ADAS cấp độ 2 (Hỗ trợ giữ làn, Kiểm soát hành trình thích ứng, Phanh tự động khẩn cấp).
- [ ] **4. Nút Kêu Gọi Hành Động (CTA Bar):**
  - Tích hợp nút `Đăng ký lái thử`, `Nhận báo giá lăn bánh`, `Dự toán trả góp` liên kết trực tiếp với model xe đang xem.

---

### II. Phân Hệ Mua Bán Xe & Công Cụ Tiện Ích
- [ ] **1. Trang Danh mục Xe Mới (`/xe-moi`):**
  - Bộ lọc theo phân khúc xe: SUV Đô thị (VF 3, VF 5, VF 6), SUV Hạng sang (VF 7, VF 8, VF 9), Xe chuyên dụng Xanh SM.
  - Hiển thị mức giá niêm yết mới nhất kèm badge ưu đãi (VD: Tặng sạc miễn phí, Miễn phí gửi xe Vinhomes).
- [ ] **2. Trang Xe Đã Qua Sử Dụng (`/xe-cu` - Xe GF Cũ):**
  - Đối chiếu với chuyên mục [vinfastthinhcuong.com.vn/danh-muc-xe/xe-gf-cu/](https://vinfastthinhcuong.com.vn/danh-muc-xe/xe-gf-cu/).
  - Bổ sung cam kết chất lượng xe cũ chính hãng: Kiểm định 160 điểm, chứng nhận dung lượng pin SOH > 85%, bảo hành chính hãng kế thừa.
- [ ] **3. Công cụ Dự Toán Chi Phí Lăn Bánh (`/du-toan-lan-banh`):**
  - Bảng tính tự động theo tỉnh/thành (Hà Nội, Quảng Ninh, Vĩnh Phúc, v.v.).
  - Áp dụng chính sách miễn 100% lệ phí trước bạ cho ô tô điện.
  - Tích hợp bảng tính lãi suất trả góp hàng tháng (Vay 70-85% giá trị xe, thời hạn 1-8 năm).
- [ ] **4. Công cụ So Sánh Xe (`/so-sanh-xe`):**
  - Cho phép người dùng chọn 2 hoặc 3 mẫu xe để so sánh đối đầu từng tiêu chí (Giá, Kích thước, Pin, Vận tốc tối đa, Trang bị tiện nghi).

---

### III. Phân Hệ Xưởng Dịch Vụ & Bảo Dưỡng
- [ ] **1. Trang Sửa Chữa & Bảo Dưỡng Định Kỳ (`/dich-vu/bao-duong`):**
  - Đối chiếu với [vinfastthinhcuong.com.vn/dich-vu-bao-duong/](https://vinfastthinhcuong.com.vn/dich-vu-bao-duong/).
  - Bổ sung bảng các cấp bảo dưỡng xe điện: Cấp 1 (12.000km/1 năm), Cấp 2 (24.000km), Cấp 3 (48.000km), Cấp 4 (96.000km).
  - Giới thiệu trang thiết bị xưởng dịch vụ chuẩn 5 sao (cầu nâng điện, máy chẩn đoán thông minh, hệ thống kiểm tra pin chuyên dụng).
- [ ] **2. Trang Đồng Sơn & Bảo Hiểm (`/dich-vu/dong-son`):**
  - Đối chiếu với [vinfastthinhcuong.com.vn/dich-vu-dong-son-2/](https://vinfastthinhcuong.com.vn/dich-vu-dong-son-2/).
  - Quy trình sơn sấy khép kín công nghệ sơn gốc nước thân thiện môi trường.
  - Danh sách đơn vị bảo hiểm liên kết trực tiếp (Bảo Việt, PJICO, PVI, PTI, MIC, BIC, VietinBank Insurance).

---

### IV. Phân Hệ Tin Tức & Khuyến Mại
- [ ] **1. Trang Tổng Tin Tức (`/tin-tuc`):**
  - Cấu trúc layout blog/news chuẩn: Bài viết tiêu điểm (Featured Post) lớn ở trên đầu, lưới các bài viết mới nhất ở dưới.
- [ ] **2. Các Trang Chuyên Mục Con (`/tin-tuc/chuyen-muc/[category]`):**
  - `tin-khuyen-mai` (Live: `/chuyen-muc/uu-dai/`): Khuyến mại, quà tặng khi mua xe điện.
  - `tin-noi-bo` (Live: `/chuyen-muc/tin-noi-bo/`): Hoạt động tập đoàn Phương Đông, bàn giao xe cho khách hàng.
  - `tin-su-kien` (Live: `/chuyen-muc/su-kien/`): Các ngày hội trải nghiệm lái thử xe tại Vincom.
- [ ] **3. Trang Đọc Chi Tiết Bài Viết (`/tin-tuc/[slug]`):**
  - Giao diện đọc bài viết chuẩn: Tiêu đề, Tác giả, Ngày đăng, Thời gian đọc.
  - Sidebar: Hộp đăng ký nhận ưu đãi, Danh sách bài xem nhiều nhất, Các mẫu xe đang hot.
  - Khối bài viết liên quan (Related Articles) ở cuối bài.

---

### V. HỆ THỐNG BACKEND (BE), API & TÍCH HỢP

Hiện tại các form trên trang mới chỉ có giao diện (UI) và state tạm thời. Để website đi vào hoạt động thực tế phục vụ khách hàng và đại lý, cần xây dựng phân hệ Backend sau:

- [ ] **1. Xây Dựng Các API Routes Tiếp Nhận Thông Tin (`app/api/...`):**
  - `POST /api/leads`: Tiếp nhận khách đăng ký nhận báo giá, lái thử, tính giá lăn bánh.
  - `POST /api/service-booking`: Tiếp nhận đặt hẹn sửa chữa, bảo dưỡng, làm đẹp xe.
  - `POST /api/charging-station`: Đăng ký điểm mở trạm sạc nhượng quyền.
  - `POST /api/careers`: Tiếp nhận hồ sơ ứng tuyển kèm thông tin ứng viên.
  - `POST /api/contact`: Tiếp nhận form liên hệ và góp ý dịch vụ.
  - *Bảo mật:* Validate dữ liệu đầu vào (Zod), chống spam / rate limiting.

- [ ] **2. Tự Động Đồng Bộ Google Sheets (Google Sheets API):**
  - Khách điền bất kỳ form nào trên web sẽ tự động đổ dữ liệu thành 1 dòng trong Google Sheets của đại lý theo thời gian thực (Họ tên, SĐT, Nhu cầu, Dòng xe, Ngày giờ).
  - Đội ngũ kinh doanh/CSKH có thể mở Sheets trực tiếp để gọi điện tư vấn ngay.

- [ ] **3. Gửi Email Thông Báo Tự Động (Resend / Nodemailer):**
  - **Gửi cho Quản lý / CSKH:** Thông báo ngay khi có khách hàng tiềm năng vừa đăng ký trên web.
  - **Gửi cho Khách hàng:** Email thư cảm ơn và xác nhận đăng ký thành công chuyên nghiệp.

- [ ] **4. Thông Báo Tức Thì Qua Telegram Bot / Zalo ZNS (Tùy chọn):**
  - Bắn tin nhắn thông báo vào group Telegram của Showroom khi có khách đặt lịch hẹn hoặc đặt cọc xe để xử lý tức thời trong vòng 5 phút.

- [ ] **5. Cơ Sở Dữ Liệu & Trang Quản Trị (Admin CMS - Tùy chọn nâng cao):**
  - Quản lý tập trung giá bán xe, bảng khuyến mại, danh sách tin tức và hồ sơ ứng viên tuyển dụng mà không cần can thiệp vào code.

---

### VI. SEO KỸ THUẬT & TỐI ƯU HÓA
- [ ] **1. Tự động sinh `sitemap.xml` và `robots.txt`.**
- [ ] **2. Thẻ Meta OpenGraph & Twitter Cards:** Hiển thị thumbnail đẹp mắt khi chia sẻ link lên Zalo, Facebook, iMessage.
- [ ] **3. Cấu trúc Schema Markup (JSON-LD):**
  - `AutoDealer`: Khai báo địa chỉ các showroom Phương Đông (Hà Nội, Quảng Ninh, Vĩnh Phúc), giờ mở cửa, hotline.
  - `Product` & `Car`: Khai báo thông tin xe cho Google Rich Snippets.
  - `JobPosting`: Giúp các tin tuyển dụng hiển thị trực tiếp trên Google Jobs.
- [ ] **4. Tối ưu hình ảnh & Core Web Vitals:** Đảm bảo tốc độ tải trang dưới 1.5 giây.
