import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Văn hóa Phục vụ Khách hàng tại Tập đoàn VinFast Phương Đông",
  description:
    "Chúng tôi luôn tâm niệm rằng: Sự chuyên nghiệp trong phục vụ khách hàng bắt đầu từ khoảnh khắc đầu tiên khách hàng quan tâm và tìm hiểu về đại lý, cho đến khi khách hàng quyết định lựa chọn và trở thành người đồng hành cùng thương hiệu.",
  openGraph: {
    title: "Văn hóa Phục vụ Khách hàng tại Tập đoàn VinFast Phương Đông",
    description:
      "Chúng tôi luôn tâm niệm rằng: Sự chuyên nghiệp trong phục vụ khách hàng bắt đầu từ khoảnh khắc đầu tiên khách hàng quan tâm và tìm hiểu về đại lý, cho đến khi khách hàng quyết định lựa chọn và trở thành người đồng hành cùng thương hiệu.",
    url: "https://vinfastphuongdonghanoi.com/van-hoa-phuc-vu-khach-hang-vinfast-phuong-dong/",
    siteName: "Vinfast Phương Đông",
    images: [
      {
        url: "/images/banners/banner-he-thong-phuong-dong.jpg",
        width: 768,
        height: 816,
        alt: "Văn hóa phục vụ khách hàng VinFast Phương Đông",
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
