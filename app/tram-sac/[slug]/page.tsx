import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CHARGERS } from "@/data/chargers";
import ChargerDetailPage from "@/components/ChargerDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const charger = CHARGERS.find((c) => c.slug === slug);
  if (!charger) {
    return {
      title: "Trạm sạc không tồn tại | VinFast Thịnh Cường",
    };
  }
  return {
    title: `${charger.name} – VinFast Thịnh Cường`,
    description: charger.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const charger = CHARGERS.find((c) => c.slug === slug);

  if (!charger) {
    return notFound();
  }

  return <ChargerDetailPage charger={charger} />;
}
