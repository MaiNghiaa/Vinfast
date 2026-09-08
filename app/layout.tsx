import type { Metadata } from "next";
import { Manrope, Mulish } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VinFast Phương Đông | Hệ thống 09 Showroom & 13 Xưởng dịch vụ chuẩn VinFast",
  description:
    "VinFast Phương Đông – Nhà phân phối xe ô tô điện VinFast chính hãng VinFast Việt Nam, 09 Showroom quy mô và 13 Xưởng Dịch vụ tại: Hà Nội - Quảng Ninh - Phú Thọ (Vĩnh Phúc) - Hồ Chí Minh (Độc quyền sửa chữa Pin và Động cơ), dịch vụ chuyên nghiệp, nhân viên tận tâm.",
  keywords: [
    "VinFast Phương Đông",
    "giá xe VinFast",
    "VF 3",
    "VF 5",
    "VF 6",
    "VF 7",
    "VF 8",
    "VF 9",
    "Minio Green",
    "Limo Green",
    "trạm sạc vinfast",
    "showroom vinfast hà nội",
    "showroom vinfast quảng ninh",
  ],
  openGraph: {
    title: "VinFast Phương Đông | Hệ thống 09 Showroom & 13 Xưởng dịch vụ chuẩn VinFast",
    description:
      "Nhà phân phối xe ô tô điện VinFast chính hãng VinFast Việt Nam số 1 miền Bắc.",
    url: "https://vinfastthinhcuong.com.vn/",
    siteName: "VinFast Phương Đông",
    images: [
      {
        url: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2026/08/lich-lai-thu-vinfast-thinh-cuong-thang-9-2026.jpg",
        width: 1200,
        height: 630,
        alt: "VinFast Phương Đông",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${manrope.variable} ${mulish.variable}`}>
      <body className={`${manrope.className} antialiased selection:bg-[#1863dc] selection:text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
