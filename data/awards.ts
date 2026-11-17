export type AwardCategory =
  | "Giải thưởng VinFast vinh danh"
  | "Tiêu chuẩn & Xưởng dịch vụ 3S"
  | "Vinh danh cá nhân & Đội ngũ";

export type AwardTabKey = "all" | "vinfast" | "3s" | "team";

export interface AwardTab {
  key: AwardTabKey;
  label: string;
  category?: AwardCategory;
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  category: AwardCategory;
  year: string;
  recipient: string;
  issuedBy: string;
  image: string;
  description: string;
  featured?: boolean;
}

export const AWARD_TABS: AwardTab[] = [
  { key: "all", label: "Tất cả" },
  { key: "vinfast", label: "Vinh danh từ VinFast", category: "Giải thưởng VinFast vinh danh" },
  { key: "3s", label: "Xưởng dịch vụ chuẩn 3S", category: "Tiêu chuẩn & Xưởng dịch vụ 3S" },
  { key: "team", label: "Đội ngũ tư vấn", category: "Vinh danh cá nhân & Đội ngũ" },
];

export const AWARDS: AwardItem[] = [
  // --- Nhóm 1: Giải thưởng VinFast vinh danh ---
  {
    id: "top-10-ban-le-toan-quoc",
    title: "Top 10 Bán Lẻ Xuất Sắc Nhất Toàn Quốc",
    subtitle: "VinFast vinh danh đại lý phân phối xuất sắc toàn quốc",
    category: "Giải thưởng VinFast vinh danh",
    year: "2025",
    recipient: "VinFast Phương Đông Hà Nội",
    issuedBy: "VinFast Việt Nam",
    image: "/images/about/top-10-ban-le-vinfast.jpg",
    description: "VinFast vinh danh VinFast Phương Đông trong Top 10 đại lý bán lẻ có sản lượng bàn giao xe điện và chất lượng dịch vụ xuất sắc nhất toàn quốc.",
    featured: true,
  },
  {
    id: "cup-doanh-so-phuong-dong",
    title: "Cúp Doanh Số Xuất Sắc VinFast Phương Đông",
    subtitle: "Top Sales Dealer Award – Dẫn đầu bứt phá doanh số xe điện",
    category: "Giải thưởng VinFast vinh danh",
    year: "2025",
    recipient: "Công ty TNHH Phương Đông Hà Nội",
    issuedBy: "VinFast Việt Nam",
    image: "/images/awards/award-pd-doanhso.png",
    description: "Biểu trưng vinh danh đóng góp nổi bật của VinFast Phương Đông trong chiến dịch phủ sóng ô tô điện thông minh toàn quốc.",
    featured: true,
  },
  {
    id: "tri-an-dai-ly-vinfast-2026",
    title: "Tri Ân Đại Lý Phân Phối VinFast 2026",
    subtitle: "Đại hội đối tác & Tri ân hệ thống phân phối ô tô điện VinFast",
    category: "Giải thưởng VinFast vinh danh",
    year: "2026",
    recipient: "Tập thể Cán bộ Nhân viên VinFast Phương Đông",
    issuedBy: "VinFast Auto",
    image: "/images/about/gala-vinfast-2026.jpg",
    description: "Ghi nhận sự đồng hành bền bỉ và cống hiến vượt bậc của toàn thể đội ngũ VinFast Phương Đông tại sự kiện thường niên của VinFast.",
    featured: true,
  },
  {
    id: "gala-sac-day-nang-luong-2026",
    title: "Sạc Đầy Năng Lượng – Bứt Phá Vươn Xa",
    subtitle: "Ngày hội đại lý phân phối VinFast Việt Nam 2026",
    category: "Giải thưởng VinFast vinh danh",
    year: "2026",
    recipient: "Đại diện VinFast Phương Đông",
    issuedBy: "VinFast Auto",
    image: "/images/about/gala-vinfast-2026-waving.jpg",
    description: "Khẳng định tinh thần tiên phong, sẵn sàng bứt phá mục tiêu kinh doanh và phụng sự khách hàng chuyển đổi giao thông xanh.",
    featured: false,
  },

  // --- Nhóm 2: Tiêu chuẩn & Xưởng dịch vụ 3S ---
  {
    id: "xuong-dich-vu-hoa-lac-3s",
    title: "Xưởng Dịch Vụ Hòa Lạc Chuẩn 3S VinFast",
    subtitle: "Trung tâm bảo dưỡng, sửa chữa & đồng sơn công nghệ cao",
    category: "Tiêu chuẩn & Xưởng dịch vụ 3S",
    year: "2025",
    recipient: "Xưởng dịch vụ VinFast Phương Đông Hòa Lạc",
    issuedBy: "Hệ thống Dịch vụ Hậu mãi VinFast",
    image: "/images/about/xuong-dich-vu-hoa-lac.jpg",
    description: "Đáp ứng đầy đủ quy chuẩn khắt khe về diện tích, phòng sơn sấy, cầu nâng chuyên dụng và hạ tầng trụ sạc siêu nhanh của VinFast.",
    featured: true,
  },
  {
    id: "xuong-dich-vu-thuong-tin-3s",
    title: "Trụ Sở & Xưởng Dịch Vụ 3S Thường Tín",
    subtitle: "Tổ hợp 3S cửa ngõ phía Nam Hà Nội",
    category: "Tiêu chuẩn & Xưởng dịch vụ 3S",
    year: "2025",
    recipient: "VinFast Phương Đông Thường Tín (207 Quán Gánh)",
    issuedBy: "VinFast Auto",
    image: "/images/showrooms/thuong-tin.jpg",
    description: "Trụ sở chính với quy mô xưởng dịch vụ đầy đủ trang thiết bị chẩn đoán điện toán, bảo dưỡng định kỳ và giám định bảo hiểm tại chỗ.",
    featured: true,
  },
  {
    id: "xuong-dich-vu-bat-trang-3s",
    title: "Showroom & Xưởng Dịch Vụ 3S Bát Tràng",
    subtitle: "Tổ hợp dịch vụ ô tô điện 3S phía Đông Hà Nội",
    category: "Tiêu chuẩn & Xưởng dịch vụ 3S",
    year: "2025",
    recipient: "VinFast Phương Đông Bát Tràng (Gia Lâm)",
    issuedBy: "VinFast Auto",
    image: "/images/showrooms/bat-trang.jpg",
    description: "Cung cấp trọn vẹn chu trình bán hàng – dịch vụ bảo hành sửa chữa – phụ tùng phụ kiện chính hãng VinFast tại khu vực Gia Lâm.",
    featured: true,
  },

  // --- Nhóm 3: Vinh danh cá nhân & Đội ngũ ---
  {
    id: "tvbh-xuat-sac-nam-2025",
    title: "Tư Vấn Bán Hàng Xuất Sắc Năm 2025",
    subtitle: "Ghi nhận thành tích cá nhân xuất sắc về sản lượng & CSI",
    category: "Vinh danh cá nhân & Đội ngũ",
    year: "2025",
    recipient: "Tư vấn bán hàng Phương Đông Hoàng Quốc Việt",
    issuedBy: "Ban Giám Đốc VinFast Phương Đông",
    image: "/images/about/pd-showroom-1.jpg",
    description: "Vinh danh cá nhân đạt chỉ số hài lòng khách hàng (CSI) và số lượng giao xe xuất sắc nhất trong năm 2025.",
    featured: true,
  },
  {
    id: "tvbh-xuat-sac-thang-12-2025",
    title: "Tư Vấn Xuất Sắc Nhất Tháng 12/2025",
    subtitle: "Dẫn đầu doanh số chiến dịch bứt phá cuối năm",
    category: "Vinh danh cá nhân & Đội ngũ",
    year: "2025",
    recipient: "Tư vấn bán hàng Phương Đông Hoàng Quốc Việt",
    issuedBy: "Ban Giám Đốc VinFast Phương Đông",
    image: "/images/about/pd-showroom-2.jpg",
    description: "Khen thưởng cá nhân có doanh số vượt bậc trong giai đoạn cao điểm bàn giao xe điện toàn quốc.",
    featured: false,
  },
  {
    id: "tvbh-xuat-sac-thang-05-2026",
    title: "Tư Vấn Bán Hàng Xuất Sắc Tháng 05/2026",
    subtitle: "Thành tích bán hàng nổi bật đầu Quý II/2026",
    category: "Vinh danh cá nhân & Đội ngũ",
    year: "2026",
    recipient: "Tư vấn bán hàng Phương Đông Hoàng Quốc Việt",
    issuedBy: "Ban Giám Đốc VinFast Phương Đông",
    image: "/images/about/pd-showroom-3.jpg",
    description: "Thành tích tư vấn lái thử và ký kết hợp đồng xe điện ấn tượng tại Showroom Hoàng Quốc Việt.",
    featured: false,
  },
  {
    id: "vinh-danh-doi-ngu-hoang-quoc-viet",
    title: "Tập Thể Tư Vấn Showroom Hoàng Quốc Việt",
    subtitle: "Biểu trưng vinh danh đội ngũ tư vấn tận tâm",
    category: "Vinh danh cá nhân & Đội ngũ",
    year: "2025–2026",
    recipient: "Đội ngũ Showroom Hoàng Quốc Việt (14 Hoàng Quốc Việt, Cầu Giấy)",
    issuedBy: "VinFast Phương Đông",
    image: "/images/news/vinh-danh-tu-van-hoang-quoc-viet-v2.jpg",
    description: "Ghi nhận chuyên môn tư vấn dòng xe điện VinFast, tỉ lệ tư vấn lái thử thành công và sự tận tâm hỗ trợ khách hàng đăng ký, bấm biển, nhận xe.",
    featured: true,
  },
];
