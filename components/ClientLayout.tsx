"use client";

import React, { useState, createContext, useContext } from "react";
import dynamic from "next/dynamic";
import Header from "./Header";
import Footer from "./Footer";
import FloatingActions from "./FloatingActions";
import PageTransition from "./animation/PageTransition";

const BookingModal = dynamic(() => import("./BookingModal"), { ssr: false });

interface ModalContextType {
  openBooking: (vehicleSlug?: string, type?: "lai-thu" | "bao-gia" | "dich-vu") => void;
}

const ModalContext = createContext<ModalContextType>({
  openBooking: () => {},
});

export const useModal = () => useContext(ModalContext);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVehicle, setModalVehicle] = useState<string | undefined>();
  const [modalType, setModalType] = useState<"lai-thu" | "bao-gia" | "dich-vu">("lai-thu");

  const openBooking = (vehicleSlug?: string, type: "lai-thu" | "bao-gia" | "dich-vu" = "lai-thu") => {
    setModalVehicle(vehicleSlug);
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <ModalContext.Provider value={{ openBooking }}>
      <div className="flex flex-col min-h-screen">
        <Header onOpenBookingModal={(slug) => openBooking(slug, "lai-thu")} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingActions onOpenBookingModal={(type) => openBooking(undefined, (type as any) || "lai-thu")} />
        {modalOpen && (
          <BookingModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            defaultVehicleSlug={modalVehicle}
            defaultType={modalType}
          />
        )}
      </div>
    </ModalContext.Provider>
  );
}
