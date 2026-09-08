import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { USED_CARS } from "@/data/usedCars";
import UsedCarDetailPage from "@/components/UsedCarDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = USED_CARS.find((c) => c.slug === slug);
  if (!car) {
    return {
      title: "Xe cũ không tồn tại | VinFast Phương Đông",
    };
  }
  return {
    title: `${car.name} – Xe cũ Green Future | VinFast Phương Đông`,
    description: `Chi tiết xe cũ ${car.name}, Odo ${car.odo}, năm sản xuất ${car.year}, nguồn gốc Green Future chính hãng tại VinFast Phương Đông.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const car = USED_CARS.find((c) => c.slug === slug);

  if (!car) {
    return notFound();
  }

  return <UsedCarDetailPage car={car} />;
}
