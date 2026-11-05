
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type VendorOffer = {
  id: number;
  vendor: string;
  product: string;
  price: number;
  details: string;
  saved: boolean;
  deliveryDays?: number;
  rating?: number;
};

type BuyWiseContextType = {
  offers: VendorOffer[];
  addOffer: (offer: Omit<VendorOffer, "id" | "saved">) => void;
  toggleSaved: (id: number) => void;
  removeOffer: (id: number) => void;
};

const BuyWiseContext = createContext<BuyWiseContextType | undefined>(
  undefined
);

export function BuyWiseProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<VendorOffer[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedOffers = localStorage.getItem("buywise-offers");

      if (storedOffers) {
        setOffers(JSON.parse(storedOffers));
      }
    } catch {
      console.error("Could not load saved offers.");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("buywise-offers", JSON.stringify(offers));
    }
  }, [offers, loaded]);

  function addOffer(offer: Omit<VendorOffer, "id" | "saved">) {
    setOffers((current) => [
      ...current,
      {
        ...offer,
        id: Date.now(),
        saved: false,
      },
    ]);
  }

  function toggleSaved(id: number) {
    setOffers((current) =>
      current.map((offer) =>
        offer.id === id ? { ...offer, saved: !offer.saved } : offer
      )
    );
  }

  function removeOffer(id: number) {
    setOffers((current) => current.filter((offer) => offer.id !== id));
  }

  return (
    <BuyWiseContext.Provider
      value={{ offers, addOffer, toggleSaved, removeOffer }}
    >
      {children}
    </BuyWiseContext.Provider>
  );
}

export function useBuyWise() {
  const context = useContext(BuyWiseContext);

  if (!context) {
    throw new Error("useBuyWise must be used inside BuyWiseProvider");
  }

  return context;
}
