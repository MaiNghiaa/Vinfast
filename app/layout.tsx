import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "VinFast Phương Đông | Hệ thống 4 Showroom & 3 Xưởng dịch vụ chính hãng Hà Nội",
  description:
    "VinFast Phương Đông – Nhà phân phối xe ô tô điện VinFast chính hãng tại Hà Nội. Hệ thống 04 Showroom và 03 Xưởng Dịch vụ (Thường Tín, Hoàng Quốc Việt, Hòa Lạc, Bát Tràng), dịch vụ chuyên nghiệp, tận tâm phục vụ.",
  keywords: [
    "VinFast Phương Đông",
    "giá xe VinFast",
    "VF 3",
    "VF 5",
    "VF 6",
    "VF e34",
    "VF 7",
    "VF 8",
    "VF 9",
    "ePV 7",
    "EC Van",
    "showroom vinfast phương đông",
    "vinfast hoàng quốc việt",
    "vinfast phương đông thường tín",
    "vinfast hòa lạc",
    "vinfast bát tràng",
  ],
  openGraph: {
    title: "VinFast Phương Đông | Hệ thống 4 Showroom & 3 Xưởng dịch vụ chính hãng Hà Nội",
    description:
      "Nhà phân phối xe ô tô điện VinFast chính hãng - Hệ thống 4 Showroom & 3 Xưởng dịch vụ tại Hà Nội.",
    url: "https://vinfastphuongdonghanoi.com/",
    siteName: "VinFast Phương Đông",
    images: [
      {
        url: "/images/banners/banner-he-thong-phuong-dong.jpg",
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
    <html lang="vi" className={beVietnam.variable}>
      <body className={`${beVietnam.className} antialiased selection:bg-[#1863dc] selection:text-white`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
