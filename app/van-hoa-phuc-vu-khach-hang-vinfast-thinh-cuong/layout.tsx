import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Văn hóa Phục vụ Khách hàng tại Tập đoàn VinFast Thịnh Cường",
  description:
    "Chúng tôi luôn tâm niệm rằng: Sự chuyên nghiệp trong phục vụ khách hàng bắt đầu từ khoảnh khắc đầu tiên khách hàng quan tâm và tìm hiểu về đại lý, cho đến khi khách hàng quyết định lựa chọn và trở thành người đồng hành cùng thương hiệu.",
  openGraph: {
    title: "Văn hóa Phục vụ Khách hàng tại Tập đoàn VinFast Thịnh Cường",
    description:
      "Chúng tôi luôn tâm niệm rằng: Sự chuyên nghiệp trong phục vụ khách hàng bắt đầu từ khoảnh khắc đầu tiên khách hàng quan tâm và tìm hiểu về đại lý, cho đến khi khách hàng quyết định lựa chọn và trở thành người đồng hành cùng thương hiệu.",
    url: "https://vinfastthinhcuong.com.vn/van-hoa-phuc-vu-khach-hang-vinfast-thinh-cuong/",
    siteName: "Vinfast Thịnh Cường",
    images: [
      {
        url: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/03/web-TVBH-web-o-duoi1-1.jpg",
        width: 768,
        height: 816,
        alt: "Văn hóa phục vụ khách hàng VinFast Thịnh Cường",
      },
    ],
    locale: "vi_VN",
    type: "article",
  },
};

export default function CultureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
