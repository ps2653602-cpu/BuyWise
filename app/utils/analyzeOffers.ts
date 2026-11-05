
import type { VendorOffer } from "../context/BuyWiseContext";

export interface AnalyzedOffer extends VendorOffer {
  priceScore: number;
  deliveryScore: number;
  ratingScore: number;
  totalScore: number;
  recommendation: string;
}

export function analyzeOffers(
  offers: VendorOffer[]
): AnalyzedOffer[] {
  if (offers.length === 0) return [];

  const minPrice = Math.min(...offers.map((o) => o.price));
  const maxPrice = Math.max(...offers.map((o) => o.price));

  const deliveries = offers
    .filter((o) => o.deliveryDays !== undefined && o.deliveryDays > 0)
    .map((o) => o.deliveryDays!);

  const minDelivery = deliveries.length ? Math.min(...deliveries) : 1;
  const maxDelivery = deliveries.length ? Math.max(...deliveries) : 1;

  const analyzed = offers.map((offer) => {
    const priceScore =
      maxPrice === minPrice ? 100 : (minPrice / offer.price) * 100;

    const deliveryScore =
      offer.deliveryDays === undefined
        ? 50
        : maxDelivery === minDelivery
        ? 100
        : (minDelivery / offer.deliveryDays) * 100;

    const ratingScore =
      offer.rating === undefined ? 50 : (offer.rating / 5) * 100;

    const totalScore =
      priceScore * 0.5 +
      deliveryScore * 0.2 +
      ratingScore * 0.3;

    return {
      ...offer,
      priceScore: Number(priceScore.toFixed(1)),
      deliveryScore: Number(deliveryScore.toFixed(1)),
      ratingScore: Number(ratingScore.toFixed(1)),
      totalScore: Number(totalScore.toFixed(1)),
      recommendation: "",
    };
  });

  const bestOffer = [...analyzed].sort(
    (a, b) => b.totalScore - a.totalScore
  )[0];

  return analyzed
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((offer) => ({
      ...offer,
      recommendation:
        offer.id === bestOffer.id
          ? "Best Overall Choice"
          : "Alternative Option",
    }));
}
