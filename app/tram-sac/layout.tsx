import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trạm sạc – Vinfast Phương Đông",
  description:
    "Hệ thống trạm sạc VinFast V-Green Phương Đông - Khảo sát, cung cấp và lắp đặt trạm sạc nhanh DC 30kW, 60kW, 120kW và trạm sạc gia đình AC trên toàn quốc.",
  alternates: {
    canonical: "https://vinfastthinhcuong.com.vn/tram-sac/",
  },
  openGraph: {
    title: "Trạm sạc – Vinfast Phương Đông",
    description:
      "Giải pháp toàn diện về trạm sạc ô tô điện VinFast V-Green Phương Đông - Lắp đặt trạm sạc DC, AC chính hãng trên toàn quốc.",
    url: "https://vinfastthinhcuong.com.vn/tram-sac/",
    siteName: "Vinfast Phương Đông",
    images: [
      {
        url: "https://vinfastthinhcuong.com.vn/wp-content/uploads/2025/06/suachuaimg_1656869862_1658394682.webp",
        width: 1200,
        height: 630,
        alt: "Trạm sạc VinFast Phương Đông",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function TramSacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
