# Kế Hoạch Headless CMS Directus – VinFast Phương Đông

> Tài liệu tổng hợp các quyết định kiến trúc, schema dữ liệu, phân quyền, luồng khách hàng (lead), kênh cấp dữ liệu cho Sales và lộ trình triển khai Directus cho website đại lý.
>
> Cập nhật: 17/09/2026 · Trạng thái: **Bản kế hoạch – chờ chốt các mục ở phần 12**

---

## 📌 Tóm Tắt Quyết Định Đã Chốt

| # | Quyết định | Nội dung |
| :-: | :--- | :--- |
| 1 | **Vai trò Directus** | Nguồn dữ liệu duy nhất (single source of truth) cho website đại lý và các site của Sales |
| 2 | **Tài khoản** | Chỉ **1 tài khoản Admin** đăng nhập Directus. Sales **không** đăng nhập |
| 3 | **Khách hàng / liên hệ** | Mọi lead (từ web đại lý và site Sales) đổ về **chung 1 kho**, admin xem toàn bộ và biết rõ *khách là ai – đến từ đâu – ai phụ trách* |
| 4 | **Giá xe** | **Chỉ Admin** được sửa giá. Giá tách thành bảng riêng `price_lists`, có ngày hiệu lực và lưu lịch sử vĩnh viễn |
| 5 | **Sales dùng dữ liệu** | Sales (site WordPress riêng) **chỉ đọc** dữ liệu qua Feed API của Next.js, mỗi Sales 1 key. Không truy cập trực tiếp Directus |
| 6 | **Phạm vi giai đoạn 1** | Xe mới, xe cũ, tin tức, liên hệ, khách hàng **+** trạm sạc, tuyển dụng & hồ sơ CV, dịch vụ, phụ kiện |
| 7 | **Dữ liệu hiện có** | Viết **script migrate** từ `data/*.ts` + tải ảnh về Directus Files |

---

## 1. Kiến Trúc Tổng Thể

```
                      ┌─────────────────────────┐
   Admin (1 tài khoản)│        DIRECTUS         │  cms.<domain>  – không công khai cho Sales
   ─────────────────► │  Postgres + File Storage│
                      └───────────┬─────────────┘
                                  │  REST/GraphQL (Public role: chỉ đọc published)
                                  │  Service token (chỉ ghi leads/customers/applications)
                      ┌───────────▼─────────────┐
                      │   NEXT.JS (web đại lý)  │
                      │  • Trang web public     │
                      │  • /api/leads  (ghi)    │
                      │  • /api/careers (ghi)   │
                      │  • /api/feed/* (Sales)  │
                      │  • /api/hooks/* (Flows) │
                      └───┬───────────────┬─────┘
          Khách truy cập  │               │  /api/feed/*  +  X-Partner-Key
                          │               ▼
                          │   ┌───────────────────────────┐
                          │   │ WordPress của từng Sales  │
                          │   │ Plugin "VF Phương Đông"   │
                          │   │ • Shortcode giá/xe/ưu đãi │
                          │   │ • Form → /api/leads       │
                          │   └───────────────────────────┘
                          ▼
                 Telegram / Email: báo Admin & Sales khi có lead / khi được giao lead
```

**Nguyên tắc:**
- Directus **không bao giờ** bị gọi trực tiếp từ trình duyệt để ghi dữ liệu, và **không** cấp token cho site WordPress.
- Mọi dữ liệu ghi vào (lead, CV) đi qua Next.js để: validate (Zod), chống spam, gộp khách theo SĐT, gắn nguồn, gửi thông báo.
- Mọi dữ liệu cấp cho Sales đi qua Feed API: chỉ trả field được phép, có cache, thu hồi được theo từng Sales.

---

## 2. License & Giới Hạn Directus (Quan Trọng)

Từ **Directus v12 (05/2026)** áp dụng license MSCL:

| Gói | Điều kiện | Giới hạn |
| :--- | :--- | :--- |
| **Open Innovation Grant** (miễn phí, đầy đủ) | Doanh thu **< 5 triệu USD/năm** **và** **< 50 nhân viên** | Không giới hạn |
| **Core** (miễn phí) | Tổ chức lớn hơn ngưỡng trên | **3 user seats · 25 collections · 5 Flows** · lưu revisions/activity 30 ngày |
| Team / Enterprise (trả phí) | Khi cần vượt giới hạn Core | Theo báo giá Directus |

**➡️ Kế hoạch này được thiết kế để chạy vừa gói Core** (phòng trường hợp công ty vượt ngưỡng Grant):

| Tài nguyên | Giới hạn Core | Dự kiến dùng | Còn dư |
| :--- | :-: | :-: | :-: |
| User seats | 3 | 2 (Admin + Service account) | 1 |
| Collections | 25 | 22 (đã tính cả bảng trung gian) | 3 |
| Flows | 5 | 2 | 3 |

Cách tiết kiệm đã áp dụng:
- Danh mục xe, chuyên mục tin, phòng ban tuyển dụng, danh mục phụ kiện dùng **dropdown field** thay vì bảng riêng.
- Lịch sử chăm sóc khách lưu dạng **repeater JSON** trong `leads` thay vì bảng `lead_activities`.
- Logic xử lý lead nằm ở **Next.js** thay vì Directus Flows.
- Lịch sử giá lưu bằng **bảng `price_lists`** (vĩnh viễn) thay vì dựa vào revisions (chỉ 30 ngày).
- Web đọc nội dung qua **Public role** (không tốn seat).

> ⚠️ Chưa xác nhận chính xác bảng trung gian (junction) và singleton có bị tính vào 25 collections không → đã tính cả vào cho an toàn.

---

## 3. Nguyên Tắc Thiết Kế Schema

1. **Dữ liệu cần lọc / tính toán → field thật, kiểu số.** Không lưu `priceText: "Từ 278.000.000 VNĐ"`, `odo: "12.000 km"` như hiện tại. Frontend tự format.
2. **Tiền VND dùng kiểu `bigInteger`.** Giá VF 9 và các bản cao có thể vượt giới hạn `integer` (2.147.483.647).
3. **Nội dung chỉ để hiển thị → JSON repeater** (bảng so sánh, thuộc tính bổ sung, bullet list).
4. **Ảnh lưu trong Directus Files**, chia thư mục (`vehicles/`, `used-cars/`, `posts/`, `showrooms/`, `chargers/`, `private/cv/`). Bỏ hotlink `vinfastthinhcuong.com.vn`.
5. **Bảng nội dung có đủ:** `status` (draft / published / archived), `sort`, `date_created`, `date_updated`, `user_updated`. Bảng có trang riêng có thêm `slug` (unique) + nhóm SEO (`seo_title`, `seo_description`, `og_image`).
6. **Field nội bộ** (biển số, VIN, giá nhập, ghi chú) **không cấp quyền đọc** cho Public role và không có trong Feed.
7. **Nội dung được chia sẻ cho Sales** phải bật cờ `share_to_sales`.

---

## 4. Danh Sách Collections (22)

| # | Nhóm | Collection | Ghi chú |
| :-: | :--- | :--- | :--- |
| 1 | Chung | `site_settings` | Singleton |
| 2 | Chung | `showrooms` | |
| 3 | Xe mới | `vehicles` | |
| 4 | Xe mới | `vehicle_trims` | Phiên bản & thông số (không chứa giá) |
| 5 | Xe mới | `vehicle_colors` | |
| 6 | Xe mới | `vehicle_sections` | Khối ngoại thất / nội thất / an toàn |
| 7 | Xe mới | `vehicles_files` | Junction gallery (có field `group`) |
| 8 | Giá | `price_lists` | 🔒 Chỉ Admin |
| 9 | Ưu đãi | `promotions` | |
| 10 | Ưu đãi | `promotions_vehicles` | Junction |
| 11 | Xe cũ | `used_cars` | |
| 12 | Xe cũ | `used_cars_files` | Junction gallery |
| 13 | Tin tức | `posts` | |
| 14 | Tin tức | `posts_vehicles` | Junction – xe liên quan |
| 15 | CRM | `customers` | |
| 16 | CRM | `leads` | |
| 17 | CRM | `sales_partners` | |
| 18 | Mở rộng | `chargers` | |
| 19 | Mở rộng | `jobs` | |
| 20 | Mở rộng | `job_applications` | 🔒 Private |
| 21 | Mở rộng | `services` | |
| 22 | Mở rộng | `accessories` | |

---

## 5. Schema Chi Tiết

> Ký hiệu: **M2O** = liên kết nhiều-một · **O2M** = một-nhiều · **M2M** = nhiều-nhiều · 🔒 = không public / không có trong Feed · ⭐ = bắt buộc

### 5.1. `site_settings` (Singleton)

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `company_name` ⭐ | string | Công Ty Cổ Phần Phương Đông |
| `hq_address` | text | |
| `hotline` ⭐ | string | |
| `email` | string | |
| `sales_hours` / `service_hours` | string | |
| `insurance_note` | text | |
| `social_links` | JSON repeater | `{ platform, url }` |
| `default_seo_title` / `default_seo_description` / `default_og_image` | string / text / file | |
| `consent_text` | text | Nội dung ô đồng ý xử lý dữ liệu cá nhân dùng chung cho mọi form |

### 5.2. `showrooms`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `code` ⭐ | string, unique | N00801, N00802… |
| `slug` ⭐ | string, unique | `hoang-quoc-viet` (giữ đúng `id` hiện tại) |
| `name` ⭐ | string | |
| `type` ⭐ | dropdown | `3S` / `showroom` / `workshop` |
| `province` ⭐ | dropdown | Hà Nội, Quảng Ninh, Vĩnh Phúc, TP. HCM, Tuyên Quang… |
| `address` ⭐ | text | |
| `hotline_sales` / `hotline_service` | string | |
| `hours_sales` / `hours_service` | string | |
| `map_url` | string | |
| `lat` / `lng` | decimal | Phục vụ JSON-LD `AutoDealer` & bản đồ |
| `image` | M2O file | |
| `status`, `sort` | | |

### 5.3. `vehicles`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ | string, unique | `vinfast-vf3` |
| `name` ⭐ | string | |
| `category` ⭐ | dropdown | `electric-car` / `green-mobility` / `commercial` |
| `segment` | dropdown | Mini e-SUV, A-SUV, B-SUV, C-SUV, D-SUV, E-SUV, MPV 7 chỗ, Xe tải van |
| `badge` | string | Mới ra mắt, Bán chạy nhất |
| `tagline` | string | |
| `watermark_text` | string | |
| `thumbnail` ⭐ / `banner_image` | M2O file | |
| `is_featured` | boolean | |
| **Thông số chung** | | |
| `range_km` | integer | 210 |
| `range_standard` | dropdown | NEDC / WLTP |
| `fast_charge_minutes` | integer | 36 |
| `fast_charge_text` | string | "36 phút (10-70%)" |
| `power_hp` | integer | |
| `seats` | integer | |
| `length_mm` / `width_mm` / `height_mm` | integer | Tách từ `dimensions` |
| `wheelbase_mm` / `ground_clearance_mm` | integer | |
| `battery_kwh` | decimal | |
| `battery_type` | string | LFP… |
| `gearbox` / `engine_type` | string | |
| **Nội dung hiển thị** | | |
| `exterior_subtitle` / `exterior_intro` / `exterior_banner` | string / JSON list / file | |
| `interior_subtitle` / `interior_intro` / `interior_banner` | string / JSON list / file | |
| `safety_title` | string | |
| `review_video_title` / `review_video_url` / `review_video_bg` | string / string / file | |
| `features` | JSON list | |
| `comparison_table` | JSON repeater | `{ model, features[], std1, std2 }` |
| `additional_attributes` | JSON repeater | `{ label, value }` |
| **Quan hệ** | | |
| `trims` | O2M → `vehicle_trims` | |
| `colors` | O2M → `vehicle_colors` | |
| `sections` | O2M → `vehicle_sections` | |
| `gallery` | M2M files (`vehicles_files`) | Junction có field `group`: `thumbnail` / `slider` / `lifestyle` |
| `promotions` | M2M → `promotions` | |
| `share_to_sales` | boolean | Mặc định `true` |
| `status`, `sort`, SEO | | |

> ❌ **Bỏ** `basePrice`, `priceText`, `priceRangeText`, `pricingTable`, `commitments`, `monthlyOffer`, `relatedNews` khỏi `vehicles`. Giá lấy từ `price_lists`, ưu đãi lấy từ `promotions`, tin liên quan lấy từ `posts_vehicles`.

### 5.4. `vehicle_trims`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `vehicle` ⭐ | M2O → `vehicles` | |
| `name` ⭐ | string | VF3 Eco (TC2) |
| `model_year` | integer | 2026 |
| `range_km` | integer | |
| `power_hp` / `torque_nm` | integer | |
| `acceleration_text` | string | "5.3s (0-50 km/h)" |
| `drive_type` | dropdown | FWD / RWD / AWD |
| `airbags` | integer | |
| `has_adas` | boolean | |
| `equipment_highlights` | JSON list | Trang bị khác biệt của bản |
| `prices` | O2M → `price_lists` | Hiển thị lịch sử giá (Admin) |
| `status`, `sort` | | |

### 5.5. `vehicle_colors`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `vehicle` ⭐ | M2O → `vehicles` | |
| `name` ⭐ | string | |
| `hex` ⭐ | string (color picker) | |
| `kind` | dropdown | `exterior` / `interior` |
| `image` | M2O file | Ảnh xe theo màu |
| `is_premium` | boolean | Màu nâng cao (giá phụ thu nằm ở `price_lists` nếu có) |
| `sort` | | |

### 5.6. `vehicle_sections`

Gom các khối ngoại thất / nội thất / công nghệ an toàn (thay `exteriorData.items`, `interiorData.items`, `safetyTech.items`).

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `vehicle` ⭐ | M2O → `vehicles` | |
| `section` ⭐ | dropdown | `exterior` / `interior` / `safety` |
| `title` ⭐ / `subtitle` | string | |
| `description` | text | |
| `image` | M2O file | |
| `sort` | | |

### 5.7. `price_lists` 🔒 (chỉ Admin ghi)

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `trim` ⭐ | M2O → `vehicle_trims` | |
| `list_price` ⭐ | bigInteger | Giá niêm yết (VND) |
| `promo_price` | bigInteger | Giá sau ưu đãi |
| `price_with_battery` / `price_without_battery` | bigInteger | Nếu còn áp dụng |
| `premium_color_surcharge` | bigInteger | Phụ thu màu nâng cao |
| `effective_from` ⭐ | date | |
| `effective_to` | date | Để trống = đang áp dụng |
| `reference_doc` | string | Số thông báo giá của đại lý chính / VinFast |
| `attachment` 🔒 | M2O file | Bản scan thông báo giá |
| `note` 🔒 | text | |
| `status` ⭐ | dropdown | `draft` / `active` / `archived` |
| `user_created` / `date_created` | auto | Ai nhập, lúc nào |

**Quy tắc lấy giá hiện hành:** `status = active` **và** `effective_from ≤ hôm nay` **và** (`effective_to` trống **hoặc** `≥ hôm nay`), sắp xếp `effective_from` giảm dần, lấy dòng đầu.
**"Giá từ"** của xe = giá thấp nhất trong các phiên bản đang hiệu lực → **tính tự động**, không nhập tay.
**Khi đại lý chính đổi giá:** Admin **thêm dòng mới**, đặt `effective_to` cho dòng cũ. Không sửa đè.

### 5.8. `promotions`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `title` ⭐ | string | CAM KẾT GIÁ XE VINFAST VF3 2026 TỐT NHẤT |
| `slug` | string, unique | |
| `summary` | text | Tương đương `monthlyOffer` |
| `benefits` | JSON list | Tương đương `commitments` |
| `discount_amount` / `discount_percent` | bigInteger / decimal | 🔒 Khóa như giá nếu ưu đãi do đại lý chính quy định (xem phần 12) |
| `content` | WYSIWYG | |
| `image` | M2O file | |
| `vehicles` | M2M → `vehicles` | Để trống = áp dụng mọi xe |
| `valid_from` ⭐ / `valid_to` | date | |
| `share_to_sales` | boolean | |
| `status`, `sort` | | |

### 5.9. `used_cars`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ | string, unique | |
| `title` ⭐ | string | |
| `vehicle` | M2O → `vehicles` | Dòng xe gốc |
| `trim` | M2O → `vehicle_trims` | |
| `vehicle_type` | dropdown | `electric` / `gasoline` / `commercial` |
| `year` ⭐ | integer | |
| `odo_km` ⭐ | integer | |
| `price` ⭐ | bigInteger | 🔒 Chỉ Admin sửa |
| `exterior_color` / `interior_color` | string | |
| `seats` | integer | |
| `trunk_capacity` | string | |
| `range_text` | string | |
| `battery_ownership` | dropdown | Thuê pin / Mua pin |
| `battery_soh` | integer | % sức khỏe pin |
| `condition` | string | |
| `document_status` | string | Pháp lý |
| `sale_status` ⭐ | dropdown | `available` / `deposited` / `sold` |
| `showroom` | M2O → `showrooms` | Thay `allocatedTo` |
| `province` | dropdown | |
| `thumbnail` ⭐ | M2O file | |
| `gallery` | M2M files (`used_cars_files`) | |
| `notes` | JSON list | Ghi chú công khai |
| `plate_number` 🔒 | string | Biển số |
| `vin` 🔒 | string | |
| `purchase_price` 🔒 | bigInteger | Giá nhập |
| `internal_note` 🔒 | text | |
| `share_to_sales` | boolean | |
| `status`, `sort`, SEO | | |

> Cam kết "Green Future" (4 khối) chuyển vào `site_settings` hoặc giữ tĩnh trong code vì ít thay đổi.

### 5.10. `posts`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ | string, unique | |
| `title` ⭐ | string | |
| `category` ⭐ | dropdown | `uu-dai` / `tin-noi-bo` / `su-kien` / `danh-gia-xe` / `tram-sac` |
| `excerpt` | text | |
| `content` ⭐ | WYSIWYG | Ảnh trong bài upload vào Directus Files |
| `thumbnail` ⭐ | M2O file | |
| `published_at` ⭐ | datetime | Hẹn giờ đăng: web chỉ hiện bài có `published_at ≤ now` |
| `author_name` | string | Không dùng user (tiết kiệm seat) |
| `is_featured` | boolean | |
| `reading_minutes` | integer | Có thể tính tự động |
| `related_vehicles` | M2M → `vehicles` | |
| `share_to_sales` | dropdown | `none` / `excerpt` (tiêu đề + tóm tắt + link gốc) / `full` (kèm canonical) |
| `status`, SEO | | |

### 5.11. `customers`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `phone` ⭐ | string, **unique** | Chuẩn hóa `0xxxxxxxxx` trước khi lưu |
| `full_name` ⭐ | string | |
| `email` | string | |
| `province` | string | |
| `owner_partner` | M2O → `sales_partners` | Sales đang giữ khách (theo quy tắc ở 6.4) |
| `first_source_type` / `first_source_partner` | dropdown / M2O | Nguồn đầu tiên |
| `tags` | tags | VIP, đã mua VF 6, khách xe xăng cũ… |
| `note` | text | |
| `leads` | O2M → `leads` | Toàn bộ lịch sử liên hệ |
| `consent_at` | datetime | Lần gần nhất khách đồng ý |
| `date_created` / `date_updated` | auto | |

### 5.12. `leads`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `code` ⭐ | string, unique | `LD-2609-0012` (Next.js sinh) |
| **Khách là ai** | | |
| `customer` ⭐ | M2O → `customers` | |
| `contact_name` / `contact_phone` | string | Bản ghi nguyên gốc khách điền |
| `type` ⭐ | dropdown | `test_drive` / `quote` / `rolling_cost` / `installment` / `service` / `used_car` / `contact` / `charging_station` |
| `vehicle` | M2O → `vehicles` | |
| `trim` | M2O → `vehicle_trims` | |
| `used_car` | M2O → `used_cars` | |
| `service_type` | string | Bảo dưỡng, đồng sơn… |
| `showroom` | M2O → `showrooms` | |
| `preferred_date` | date | |
| `message` | text | |
| `quoted_price_snapshot` | JSON | Giá tại thời điểm khách hỏi (lấy từ `price_lists`, không nhận từ form) |
| **Đến từ đâu** | | |
| `source_type` ⭐ | dropdown | `dealer_web` / `partner_site` / `hotline` / `walk_in` / `other` |
| `source_partner` | M2O → `sales_partners` | Sales mang khách về |
| `source_url` | string | Trang khách điền form |
| `utm_source` / `utm_medium` / `utm_campaign` | string | |
| `ip_hash` / `user_agent` 🔒 | string | Chống spam, ẩn |
| **Ai xử lý** | | |
| `assigned_to` | M2O → `sales_partners` | |
| `assigned_at` | datetime | |
| `status` ⭐ | dropdown | `new` → `contacted` → `appointment` → `quoted` → `won` / `lost` / `spam` |
| `is_duplicate` | boolean | Khách đã tồn tại & đang thuộc Sales khác |
| `duplicate_of_partner` | M2O → `sales_partners` | Sales đang giữ khách |
| `care_log` | JSON repeater | `{ date, channel (call/zalo/meet), content, result }` |
| `result_vehicle` | M2O → `vehicles` | Nếu chốt |
| `lost_reason` | dropdown | Giá, chọn hãng khác, chưa có nhu cầu… |
| **Pháp lý** | | |
| `consent` ⭐ | boolean | Khách tích ô đồng ý |
| `consent_at` ⭐ | datetime | |
| `consent_text_version` | string | |
| `date_created` | auto | |

### 5.13. `sales_partners`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `code` ⭐ | string, unique | `SP-001` |
| `full_name` ⭐ | string | |
| `phone` ⭐ / `zalo` / `email` | string | Hiển thị trên site của Sales |
| `avatar` | M2O file | |
| `showroom` | M2O → `showrooms` | |
| `website_domain` | string | Domain site WordPress |
| `allowed_origins` | JSON list | |
| `feed_key_hash` 🔒 | string | Chỉ lưu hash; key gốc hiển thị 1 lần khi tạo |
| `telegram_chat_id` 🔒 | string | Nhận thông báo lead |
| `notify_channel` | dropdown | `telegram` / `email` / `none` |
| `status` ⭐ | dropdown | `active` / `suspended` |
| `note` 🔒 | text | |

### 5.14. `chargers`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ / `name` ⭐ | string | |
| `category_name` | string | Trạm sạc nhanh DC / Trạm sạc gia đình AC |
| `type` ⭐ | dropdown | `AC` / `DC` |
| `power_kw` | decimal | |
| `power_text` / `charging_time` / `voltage` / `connector` | string | |
| `price` | bigInteger | 🔒 Chỉ Admin (nếu là giá bán) |
| `price_text` | string | "Liên hệ" khi không có giá |
| `image` ⭐ | M2O file | |
| `description` / `intro_paragraph` | text | |
| `features` | JSON list | |
| `quick_specs` | JSON repeater | `{ label, value }` |
| `pillars` | JSON repeater | `{ number, title, subtitle, desc, bullets[], concluding_text }` |
| `projects` | JSON repeater | Công trình đã lắp (`CHARGER_PROJECTS`) – ảnh lưu file ID |
| `status`, `sort`, SEO | | |

> Tin liên quan trạm sạc = `posts` có `category = tram-sac`.

### 5.15. `jobs`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ / `title` ⭐ | string | |
| `department` ⭐ | dropdown | Kinh doanh & Bán hàng / Marketing & Media / Kỹ thuật & Xưởng / Tài chính & Kế toán / Nhân sự & Ban Lãnh đạo |
| `location` ⭐ | dropdown | Trụ sở Hà Nội / Hà Nội – Quảng Ninh / Hệ thống Showroom |
| `showroom` | M2O → `showrooms` | Tùy chọn |
| `salary_min` / `salary_max` | integer (triệu) | Phục vụ bộ lọc mức lương |
| `salary_text` | string | "15 – 18 triệu" |
| `quantity` | integer | |
| `employment_type` | dropdown | Toàn thời gian / Bán thời gian / Thực tập |
| `image` | M2O file | |
| `description` | text | |
| `responsibilities` / `requirements` / `benefits` | JSON list | |
| `published_at` ⭐ / `deadline` | datetime / date | Phục vụ JSON-LD `JobPosting` |
| `status` | | |

### 5.16. `job_applications` 🔒

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `job` ⭐ | M2O → `jobs` | |
| `full_name` ⭐ / `phone` ⭐ / `email` | string | |
| `cv_file` 🔒 | M2O file | Thư mục `private/cv`, không public |
| `cv_link` | string | Google Drive / TopCV (form hiện tại) |
| `note` | text | |
| `status` | dropdown | `new` / `reviewing` / `interview` / `offered` / `rejected` / `hired` |
| `hr_note` 🔒 | text | |
| `consent` ⭐ / `consent_at` ⭐ | boolean / datetime | |
| `date_created` | auto | |

### 5.17. `services`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ / `title` ⭐ | string | Bảo dưỡng, Sửa chữa nhanh, Đồng sơn, Cứu hộ, Làm đẹp xe… |
| `group` | dropdown | `maintenance` / `repair` / `body_paint` / `detailing` / `rescue` |
| `icon` / `image` | M2O file | |
| `summary` / `content` | text / WYSIWYG | |
| `maintenance_levels` | JSON repeater | `{ level, km, months, items[] }` – Cấp 1 12.000km… |
| `insurance_partners` | JSON list | Bảo Việt, PJICO, PVI… |
| `cta_type` | dropdown | `booking` / `link` / `phone` |
| `cta_value` | string | |
| `status`, `sort`, SEO | | |

### 5.18. `accessories`

| Field | Kiểu | Ghi chú |
| :--- | :--- | :--- |
| `slug` ⭐ / `name` ⭐ | string | |
| `category` | dropdown | Nội thất / Ngoại thất / Công nghệ / Sạc & điện / Chăm sóc xe |
| `compatible_models` | tags | `vinfast-vf3`, `vinfast-vf6`… (dùng tags thay M2M để tiết kiệm collection) |
| `price` | bigInteger | 🔒 Chỉ Admin |
| `price_text` | string | "Liên hệ" |
| `image` ⭐ | M2O file | |
| `description` | text | |
| `warranty_text` | string | 3 năm / 100.000 km |
| `share_to_sales` | boolean | |
| `status`, `sort` | | |

---

## 6. Luồng Khách Hàng (Lead) & CRM

### 6.1. Luồng tiếp nhận

```
Khách điền form (web đại lý hoặc site Sales)
        │
        ▼
POST /api/leads  (Next.js)
  1. Validate Zod + honeypot + Cloudflare Turnstile (web đại lý) + rate limit theo IP & SĐT
  2. Bắt buộc consent = true
  3. Xác định nguồn: có X-Partner-Key hợp lệ → source_type = partner_site, source_partner = Sales đó
                     không có → source_type = dealer_web
  4. Chuẩn hóa SĐT → tìm customers theo phone
        ├─ chưa có → tạo customer (owner_partner = source_partner nếu có)
        └─ đã có  → cập nhật tên/email nếu thiếu; kiểm tra trùng khách (6.4)
  5. Snapshot giá hiện hành từ price_lists (nếu type = quote / rolling_cost / installment)
  6. Tạo lead: code, status = new, assigned_to (theo 6.3)
  7. Gửi thông báo: Telegram group Admin (+ Sales được giao nếu có)
  8. Trả về { code } cho form hiển thị "Đã gửi thành công"
```

### 6.2. Các form hiện có được map về `leads.type`

| Form / Trang | `type` |
| :--- | :--- |
| BookingModal – Đăng ký lái thử | `test_drive` |
| BookingModal – Nhận báo giá | `quote` |
| BookingModal – Đặt lịch dịch vụ | `service` |
| `/du-toan-lan-banh` | `rolling_cost` / `installment` |
| `/xe-cu/[slug]` | `used_car` |
| `/contact`, `/lien-he` | `contact` (giữ lựa chọn "Nhu cầu" vào `service_type`) |
| `/tram-sac` – đăng ký lắp trạm | `charging_station` |
| `/tuyen-dung` – nộp CV | **→ `job_applications`** (không vào `leads`) |

### 6.3. Quy tắc giao lead

| Nguồn | Giao cho |
| :--- | :--- |
| Site của Sales A | Tự động `assigned_to = Sales A` |
| Web đại lý, hotline, walk-in | Để trống → Admin giao thủ công |
| Khách trùng | Theo quy tắc 6.4 |

Khi Admin đổi `assigned_to` trong Directus → **Flow #2** gọi `/api/hooks/lead-assigned` → Next.js gửi Telegram/email cho Sales (tên, SĐT, nhu cầu, xe, mã lead). Sales **không cần đăng nhập** Directus.

### 6.4. Xử lý trùng khách

Khi SĐT đã tồn tại và `owner_partner` khác Sales vừa gửi lead:
- Lead mới vẫn được tạo, gắn `is_duplicate = true`, `duplicate_of_partner = Sales đang giữ`.
- Thông báo Admin kèm cảnh báo ⚠️ **Trùng khách**.
- Quyền giữ khách: **chờ chốt (phần 12)**. Mặc định đề xuất: *Admin xem và quyết từng trường hợp*, hệ thống gợi ý Sales nhận khách trước.

### 6.5. Màn hình làm việc của Admin trong Directus

Tạo sẵn **Bookmarks (bộ lọc lưu sẵn)** trong collection `leads`:
- 🔴 Lead mới hôm nay
- ⏳ Chưa giao (`assigned_to` trống)
- ⚠️ Trùng khách
- 👤 Theo từng Sales
- 🏢 Theo showroom
- 📅 Có lịch hẹn trong 7 ngày tới

Layout:
- **Table** – cột: Mã · Thời gian · Khách · SĐT · Nhu cầu · Xe · Nguồn · Phụ trách · Trạng thái
- **Kanban** – kéo thả theo `status`
- **Insights dashboard** – số lead theo ngày, theo nguồn, theo Sales, tỉ lệ chốt

Xuất dữ liệu: dùng tính năng **Export CSV/Excel** có sẵn của Directus (thay cho đồng bộ Google Sheets realtime).

### 6.6. Dữ liệu cá nhân

- Mọi form có ô **"Tôi đồng ý để VinFast Phương Đông liên hệ tư vấn và xử lý dữ liệu cá nhân theo chính sách"** – bắt buộc tích.
- Lưu `consent`, `consent_at`, `consent_text_version`.
- Thêm trang **Chính sách bảo vệ dữ liệu cá nhân** trên web đại lý; plugin WordPress link về trang này.
- Sales nhận thông tin khách qua thông báo → cần quy định nội bộ về việc sử dụng dữ liệu.
- ⚖️ Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 có hiệu lực từ 01/01/2026 → **cần pháp chế rà soát** nội dung đồng ý và việc chia sẻ dữ liệu khách cho Sales.

---

## 7. Cấp Dữ Liệu Cho Sales (WordPress)

### 7.1. Feed API (Next.js)

Header bắt buộc: `X-Partner-Key: <key>` (gọi từ server WordPress, **không** từ trình duyệt).

| Endpoint | Trả về | Điều kiện |
| :--- | :--- | :--- |
| `GET /api/feed/partner` | Thông tin Sales (tên, SĐT, Zalo, avatar, showroom) | |
| `GET /api/feed/vehicles` | Danh sách xe + thông số + màu + gallery | `status = published`, `share_to_sales = true` |
| `GET /api/feed/vehicles/[slug]` | Chi tiết 1 xe | |
| `GET /api/feed/prices` | Giá hiện hành theo phiên bản | Tính theo quy tắc 5.7 |
| `GET /api/feed/promotions` | Ưu đãi còn hiệu lực | `valid_from ≤ now ≤ valid_to`, `share_to_sales = true` |
| `GET /api/feed/used-cars` | Xe cũ còn hàng | `sale_status ≠ sold`, `share_to_sales = true` |
| `GET /api/feed/posts` | Tin tức | Theo `share_to_sales` = `excerpt` / `full` |
| `GET /api/feed/showrooms` | Showroom | |
| `GET /api/feed/accessories` | Phụ kiện | `share_to_sales = true` |

**Không bao giờ trả:** field 🔒, `customers`, `leads`, `job_applications`, `price_lists.note/attachment`.

**Cache:** `revalidate` theo tag (vd. `vehicles`, `prices`). **Flow #1** trong Directus: khi Admin sửa nội dung → gọi `/api/hooks/revalidate` → web đại lý và Feed cập nhật ngay.

**Bảo mật:** rate limit theo key; key bị lộ → Admin đặt Sales `suspended` hoặc tạo key mới.

### 7.2. Plugin WordPress "VF Phương Đông Connect"

| Thành phần | Mô tả |
| :--- | :--- |
| Trang cài đặt | Nhập Partner Key |
| Cache | WordPress transient 1–6 giờ; nếu Feed lỗi vẫn hiển thị bản cache gần nhất |
| Shortcode | `[vf_bang_gia model="vinfast-vf3"]` · `[vf_uu_dai]` · `[vf_danh_sach_xe category="electric-car"]` · `[vf_xe_cu showroom="bat-trang"]` · `[vf_thong_so model="vinfast-vf6"]` · `[vf_form type="test_drive" model="vinfast-vf3"]` · `[vf_lien_he_sales]` |
| Form | Submit về WordPress (admin-ajax) → plugin chuyển tiếp server-to-server tới `/api/leads` kèm key. Có ô consent bắt buộc |
| SEO | Render HTML phía server (Google đọc được giá/thông số). Bài tin `full` tự chèn `<link rel="canonical">` về web đại lý |
| Hiển thị giá | Chỉ qua shortcode. Quy định với Sales: **không tự gõ giá** vào bài viết |

> Phương án phụ cho Sales dùng Ladipage / không dùng WordPress: **mã nhúng JS** (`<script src=".../embed/price-table.js?model=vf3&partner=SP-001">`) – nhanh nhưng yếu SEO.

---

## 8. Phân Quyền

### 8.1. Tài khoản & token

| Tài khoản | Loại | Dùng cho | Seat |
| :--- | :--- | :--- | :-: |
| **Admin** | User (bật 2FA) | Quản trị toàn bộ | 1 |
| **svc-nextjs** | User dịch vụ, static token (lưu trong env server Next.js) | Ghi `customers`, `leads`, `job_applications`; đọc field nội bộ cần cho gateway | 1 |
| **Public** | Role public (không đăng nhập) | Web đại lý đọc nội dung published | 0 |
| *(Dự phòng)* | | Marketing sau này, nếu cần | 1 |

### 8.2. Ma trận quyền

| Collection | Admin | svc-nextjs | Public (web) |
| :--- | :-: | :-: | :-: |
| Nội dung (`vehicles`, `trims`, `colors`, `sections`, `posts`, `showrooms`, `chargers`, `jobs`, `services`, `accessories`) | CRUD | Đọc | Đọc (`published`, trừ field 🔒) |
| `price_lists` | **CRUD (duy nhất)** | Đọc | Đọc giá `active` (không `note`, `attachment`) |
| `promotions` | CRUD | Đọc | Đọc (đang hiệu lực) |
| `used_cars` | CRUD | Đọc | Đọc (trừ biển số, VIN, giá nhập, ghi chú nội bộ) |
| `customers` | CRUD | Tạo / Đọc / Sửa | ❌ |
| `leads` | CRUD | Tạo / Đọc | ❌ |
| `sales_partners` | CRUD | Đọc | ❌ |
| `job_applications` | CRUD | Tạo | ❌ |
| Files thư mục `private/*` | Toàn quyền | Tạo | ❌ |

### 8.3. Nếu sau này thêm tài khoản Marketing

- Được sửa nội dung xe (mô tả, ảnh, section), tin tức, ảnh ưu đãi.
- **Không** có quyền ghi `price_lists`; **không** thấy field giá trong `used_cars`, `accessories`, `chargers`; **không** sửa số tiền trong `promotions`.
- **Không** thấy `customers`, `leads`, `sales_partners`, `job_applications`.

---

## 9. Directus Flows (2/5)

| # | Flow | Trigger | Hành động |
| :-: | :--- | :--- | :--- |
| 1 | Revalidate cache | `items.create/update/delete` trên collection nội dung & `price_lists` | Webhook `POST /api/hooks/revalidate` (kèm secret, tên collection) |
| 2 | Lead được giao | `items.update` trên `leads` khi `assigned_to` thay đổi | Webhook `POST /api/hooks/lead-assigned` |

Dự phòng 3 Flow cho: nhắc lead quá 24h chưa liên hệ, tự hết hạn ưu đãi, báo cáo tuần.

---

## 10. Migrate Dữ Liệu Hiện Có

### 10.1. Công cụ

- `directus/snapshot.yaml` – schema lưu trong git, áp dụng bằng `npx directus schema apply`.
- `scripts/migrate/` – Node + TypeScript (`tsx`) + `@directus/sdk`.
- Chạy được nhiều lần (idempotent): upsert theo `slug` / `code`.
- Ảnh: tải từ URL gốc → upload Directus Files → lưu bảng map `url → file_id` (`scripts/migrate/.image-map.json`) để không tải trùng.
- Log báo cáo: số bản ghi tạo mới / cập nhật / lỗi, ảnh tải lỗi.

### 10.2. Bảng map dữ liệu

| Nguồn trong code | Đích Directus | Chuyển đổi chính |
| :--- | :--- | :--- |
| `data/showrooms.ts` → `HEADQUARTERS` | `site_settings` | |
| `data/showrooms.ts` → `SHOWROOMS` | `showrooms` | `id` → `slug`; `type` chuẩn hóa lowercase |
| `data/vehicles.ts` → thông tin chung, `specs` | `vehicles` | Parse `dimensions` → `length/width/height_mm`; parse số km, kWh, mã lực |
| `vehicles[].trims` | `vehicle_trims` | |
| `vehicles[].trims.priceNoBattery/priceWithBattery` + `pricingTable` | `price_lists` | Parse "299,000,000 VNĐ" → số; `effective_from` = ngày migrate; `status = active`; **Admin rà lại toàn bộ giá sau migrate** |
| `vehicles[].colors` | `vehicle_colors` | |
| `vehicles[].exteriorData / interiorData / safetyTech` | `vehicles` (intro, banner) + `vehicle_sections` | |
| `vehicles[].galleryThumbnails / sliderPhotos / lifestyleGallery` | `vehicles_files` | `group` tương ứng |
| `vehicles[].commitments / commitmentsTitle / monthlyOffer` | `promotions` | Mỗi xe 1 promotion, `valid_to` = cuối tháng hiện tại |
| `vehicles[].comparisonTable / additionalAttributes / reviewVideo` | `vehicles` | JSON |
| `vehicles[].relatedNews` | `posts_vehicles` | Map theo `slug` bài viết |
| `data/usedCars.ts` → `USED_CARS` | `used_cars` + `used_cars_files` | `priceText` → `price`; `allocatedTo` → `showroom`; `carStatus` → `sale_status` |
| `data/usedCars.ts` → `GREEN_FUTURE_COMMITMENTS` | `site_settings` (JSON) hoặc giữ tĩnh | |
| `data/news.ts` → `POSTS` | `posts` | Ảnh trong `content` HTML: tải về Files & thay URL |
| `data/chargers.ts` → `CHARGERS`, `CHARGER_PROJECTS` | `chargers` | |
| `data/chargers.ts` → `CHARGER_RELATED_NEWS` | `posts` (`category = tram-sac`) | Nếu bài chưa tồn tại |
| `app/tuyen-dung/page.tsx` → `JOBS_DATA` | `jobs` | `salary` → `salary_min/max`; `date` → `published_at` |
| `app/dich-vu/page.tsx` (danh sách dịch vụ) | `services` | |
| `app/phu-kien-chinh-hang/page.tsx` | `accessories` | Nếu có danh sách sản phẩm; khối "4 giá trị" giữ tĩnh |
| `cars_scraped.json`, `chargers_scraped.json` | Đối chiếu bổ sung | |

### 10.3. Cập nhật frontend Next.js

- Thêm `lib/directus.ts` (client `@directus/sdk`, fetch có `next: { tags, revalidate }`).
- Thêm `lib/queries/*` cho từng collection; `lib/format.ts` format giá VND, km.
- Sinh TypeScript types từ schema (thay dần `data/types.ts`).
- Thay import `data/*.ts` trong các trang: `/`, `/xe-moi`, `/san-pham/[slug]`, `/xe-cu`, `/xe-cu/[slug]`, `/tin-tuc`, `/tin-tuc/[slug]`, `/tin-tuc/chuyen-muc/*`, `/tram-sac`, `/tram-sac/[slug]`, `/tuyen-dung`, `/dich-vu`, `/phu-kien-chinh-hang`, `/so-sanh-xe`, `/du-toan-lan-banh`, `Header`, `Footer`, `BookingModal`.
- `next.config.mjs`: thêm domain Directus vào `images.remotePatterns`.
- Giữ `data/*.ts` làm fallback đến khi go-live ổn định rồi xóa.

---

## 11. Lộ Trình Triển Khai

### Giai đoạn 0 – Chốt quyết định
- [ ] Chốt các mục ở **phần 12**
- [ ] Xác định gói license (Grant hay Core)
- [ ] Chốt hạ tầng & domain (`cms.<domain>`)

### Giai đoạn 1 – Hạ tầng Directus
- [ ] Docker Compose: Directus + PostgreSQL + Redis (cache); storage local hoặc S3-compatible
- [ ] HTTPS, domain, giới hạn IP truy cập trang admin (nếu được)
- [ ] Backup PostgreSQL hằng ngày + backup thư mục uploads; thử khôi phục
- [ ] Tài khoản Admin (2FA), tài khoản `svc-nextjs`, cấu hình Public role
- [ ] Môi trường `staging` và `production`

### Giai đoạn 2 – Schema
- [ ] Tạo 22 collections theo phần 5, đặt interface/display tiếng Việt cho Admin dễ dùng
- [ ] Phân quyền theo phần 8 (kiểm tra field 🔒 bằng request Public thật)
- [ ] Tạo Bookmarks, Kanban, Insights dashboard cho `leads`
- [ ] Export `snapshot.yaml` vào git

### Giai đoạn 3 – Migrate dữ liệu
- [ ] Viết script migrate + tải ảnh
- [ ] Chạy trên staging, đối chiếu từng trang với dữ liệu cũ
- [ ] **Admin rà soát toàn bộ `price_lists`**

### Giai đoạn 4 – Next.js đọc Directus
- [ ] `lib/directus.ts`, queries, types
- [ ] Chuyển từng trang (xem 10.3), ưu tiên: Xe mới → Giá → Xe cũ → Tin tức → Showroom → Trạm sạc → Dịch vụ/Phụ kiện → Tuyển dụng
- [ ] Revalidate qua Flow #1
- [ ] Sitemap, JSON-LD (`AutoDealer`, `Car`, `JobPosting`) sinh từ Directus

### Giai đoạn 5 – Lead gateway & CRM
- [ ] `POST /api/leads`, `POST /api/careers` (Zod, Turnstile, rate limit, consent)
- [ ] Gộp khách theo SĐT, snapshot giá, xử lý trùng khách
- [ ] Nối toàn bộ form hiện có (phần 6.2)
- [ ] Telegram bot + email thông báo; Flow #2 giao lead
- [ ] Trang Chính sách bảo vệ dữ liệu cá nhân

### Giai đoạn 6 – Feed & Plugin WordPress cho Sales
- [ ] Feed API (phần 7.1), quản lý key trong `sales_partners`
- [ ] Plugin WordPress: cài đặt key, cache, shortcode, form
- [ ] Thử nghiệm với 1–2 Sales, sau đó hướng dẫn & triển khai rộng
- [ ] Văn bản quy định Sales: hiển thị giá qua shortcode, sử dụng dữ liệu khách

### Giai đoạn 7 – Kiểm thử & Go-live
- [ ] Test phân quyền (Public không đọc được lead / field 🔒 / giá nháp)
- [ ] Test form end-to-end từ web đại lý và site Sales
- [ ] Test hiệu năng & Core Web Vitals
- [ ] Hướng dẫn Admin sử dụng Directus (nhập giá, giao lead, xử lý trùng khách)
- [ ] Go-live, theo dõi 2 tuần, sau đó xóa `data/*.ts`

---

## 12. Các Mục Cần Chốt

| # | Câu hỏi | Đề xuất mặc định |
| :-: | :--- | :--- |
| 1 | Công ty có **< 5 triệu USD doanh thu và < 50 nhân viên** không? (quyết định gói Grant hay Core) | Thiết kế vừa Core như tài liệu này |
| 2 | Khi **trùng khách**, ai được giữ khách? | Admin quyết từng trường hợp, hệ thống gợi ý Sales nhận trước |
| 3 | **Ưu đãi / khuyến mãi** có do đại lý chính quy định và cần khóa như giá không? | Khóa field số tiền giảm, cho sửa nội dung/ảnh |
| 4 | Sales được lấy những dữ liệu nào? (xe, giá, ưu đãi, xe cũ, tin tức, phụ kiện) | Tất cả qua cờ `share_to_sales`; tin tức mặc định `excerpt` |
| 5 | Hạ tầng Directus: VPS tự quản (Docker) hay Directus Cloud? | VPS tại Việt Nam, Docker Compose |
| 6 | Kênh thông báo cho Admin & Sales: Telegram, email hay Zalo OA/ZNS? | Telegram + email trước, Zalo ZNS giai đoạn sau |
| 7 | Có cần đồng bộ Google Sheets realtime như roadmap cũ không? | Không – dùng Export của Directus |

---

## 13. Rủi Ro & Lưu Ý

| Rủi ro | Giảm thiểu |
| :--- | :--- |
| Vượt giới hạn gói Core (collections/flows/seats) | Theo dõi số lượng, còn dư 3 collections & 3 flows; nâng gói nếu mở rộng |
| Lộ key của Sales | Chỉ gọi server-to-server, lưu hash, thu hồi theo từng Sales, rate limit |
| Sales tự sửa giá trên site riêng | Hiển thị giá chỉ qua shortcode + quy định nội bộ (không chặn được bằng kỹ thuật) |
| Nội dung trùng lặp làm giảm SEO web đại lý | Tin tức mặc định chia sẻ `excerpt`; bài `full` có canonical |
| Mất dữ liệu lead | Backup hằng ngày, thử khôi phục định kỳ |
| Ảnh hotlink từ site cũ bị xóa | Migrate toàn bộ ảnh vào Directus Files trước go-live |
| Giá sai sau migrate | Admin rà soát 100% `price_lists` trước khi public |
| Dữ liệu cá nhân chia sẻ cho Sales | Consent bắt buộc, chính sách công khai, pháp chế rà soát |

---

### Nguồn tham khảo

- [Directus v12 License Change (MSCL)](https://directus.com/resources/directus-v12-license-change)
- [Directus Pricing](https://directus.com/pricing)
- [Luật Bảo vệ dữ liệu cá nhân số 91/2025/QH15 – Bộ Công an](https://bocongan.gov.vn/chinh-sach-phap-luat/co-so-du-lieu-van-ban/luat-bao-ve-du-lieu-ca-nhan-1753688803)
