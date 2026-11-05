
"use client";

import { useBuyWise } from "../context/BuyWiseContext";
import { analyzeOffers } from "../utils/analyzeOffers";

export default function ComparePage() {
  const { offers, toggleSaved } = useBuyWise();

  const sortedOffers = analyzeOffers(offers);
  const bestOffer = sortedOffers[0];

  const lowestPrice = offers.length
    ? Math.min(...offers.map((offer) => offer.price))
    : 0;

  const lowestOffer = offers.find(
    (offer) => offer.price === lowestPrice
  );

  function ScoreBar({
    label,
    score,
  }: {
    label: string;
    score: number;
  }) {
    return (
      <div>
        <div className="mb-2 flex justify-between text-xs">
          <span className="font-semibold text-[#60746A]">
            {label}
          </span>
          <span className="font-bold">{score}/100</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[#EAEFEA]">
          <div
            className="h-full rounded-full bg-[#386B4D] transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F0E5] p-5 text-[#183C32] md:p-10">
      <div className="mx-auto max-w-7xl">

        <a
          href="/dashboard"
          className="text-sm font-semibold text-[#72947D] hover:text-[#183C32]"
        >
          ← Back to Dashboard
        </a>

        <div className="mt-8">
          <p className="text-sm font-bold tracking-widest text-[#72947D]">
            BUYWISE AI WORKSPACE
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Compare Offers
          </h1>

          <p className="mt-3 text-[#829187]">
            Compare vendors based on price, delivery, ratings and overall performance.
          </p>
        </div>

        {offers.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-12 text-center shadow-sm">
            <p className="text-4xl">📊</p>

            <h2 className="mt-4 text-2xl font-bold">
              No offers available yet
            </h2>

            <p className="mt-3 text-[#829187]">
              Add vendor offers first to compare them here.
            </p>

            <a
              href="/analyze"
              className="mt-6 inline-block rounded-full bg-[#183C32] px-7 py-3 font-semibold text-white hover:bg-[#285747]"
            >
              Add Vendor Offers →
            </a>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="mt-9 grid gap-5 md:grid-cols-2">

              <div className="rounded-2xl bg-[#183C32] p-7 text-white shadow-sm">
                <p className="text-sm font-semibold tracking-widest text-[#C4D5C8]">
                  🏆 BEST OVERALL VENDOR
                </p>

                <h2 className="mt-4 text-2xl font-bold">
                  {bestOffer.vendor}
                </h2>

                <p className="mt-1 text-sm text-[#C4D5C8]">
                  {bestOffer.product}
                </p>

                <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-sm text-[#C4D5C8]">
                      Offer Price
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      ₹{bestOffer.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 px-5 py-3 text-center">
                    <p className="text-xs text-[#C4D5C8]">
                      Overall Score
                    </p>
                    <p className="text-3xl font-bold">
                      {bestOffer.totalScore}
                      <span className="text-sm">/100</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-7 shadow-sm">
                <p className="text-sm font-bold tracking-widest text-[#72947D]">
                  💰 LOWEST PRICE OFFER
                </p>

                <h2 className="mt-4 text-2xl font-bold">
                  {lowestOffer?.vendor}
                </h2>

                <p className="mt-1 text-sm text-[#829187]">
                  {lowestOffer?.product}
                </p>

                <p className="mt-5 text-3xl font-bold">
                  ₹{lowestPrice.toLocaleString("en-IN")}
                </p>

                <p className="mt-2 text-sm text-[#829187]">
                  Most affordable submitted offer.
                </p>
              </div>
            </div>

            {/* Vendor Performance Cards */}
            <section className="mt-9">
              <div className="mb-5">
                <h2 className="text-2xl font-bold">
                  Vendor Performance
                </h2>

                <p className="mt-1 text-sm text-[#829187]">
                  Compare individual scores and vendor performance.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {sortedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className={`rounded-2xl bg-white p-6 shadow-sm ${
                      offer.id === bestOffer.id
                        ? "border-2 border-[#72947D]"
                        : "border border-[#DCE3DF]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold">
                          {offer.vendor}
                        </h3>

                        <p className="mt-1 text-sm text-[#829187]">
                          {offer.product}
                        </p>
                      </div>

                      {offer.id === bestOffer.id && (
                        <span className="rounded-full bg-[#E7EFE8] px-3 py-1 text-xs font-bold text-[#386B4D]">
                          Best Overall
                        </span>
                      )}
                    </div>

                    <p className="mt-5 text-2xl font-bold">
                      ₹{offer.price.toLocaleString("en-IN")}
                    </p>

                    <div className="mt-5 space-y-4">
                      <ScoreBar
                        label="Price Score"
                        score={offer.priceScore}
                      />

                      <ScoreBar
                        label="Delivery Score"
                        score={offer.deliveryScore}
                      />

                      <ScoreBar
                        label="Rating Score"
                        score={offer.ratingScore}
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#DCE3DF] pt-4">
                      <div>
                        <p className="text-xs text-[#829187]">
                          Overall Score
                        </p>

                        <p className="text-2xl font-bold text-[#386B4D]">
                          {offer.totalScore}/100
                        </p>
                      </div>

                      <button
                        onClick={() => toggleSaved(offer.id)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          offer.saved
                            ? "bg-[#E7EFE8] text-[#386B4D]"
                            : "bg-[#183C32] text-white hover:bg-[#285747]"
                        }`}
                      >
                        {offer.saved ? "♥ Saved" : "♡ Save"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Detailed Comparison Table */}
            <section className="mt-9 overflow-x-auto rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold">
                Detailed Vendor Comparison
              </h2>

              <p className="mb-6 text-sm text-[#829187]">
                A side-by-side breakdown of all submitted offers.
              </p>

              <table className="w-full min-w-[900px] text-left">
                <thead>
                  <tr className="border-b border-[#DCE3DF] text-sm text-[#829187]">
                    <th className="p-4">Criteria</th>

                    {sortedOffers.map((offer) => (
                      <th key={offer.id} className="p-4">
                        {offer.vendor}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {[
                    {
                      label: "Product",
                      getValue: (o: (typeof sortedOffers)[number]) => o.product,
                    },
                    {
                      label: "Price",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        `₹${o.price.toLocaleString("en-IN")}`,
                    },
                    {
                      label: "Delivery Time",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        o.deliveryDays !== undefined
                          ? `${o.deliveryDays} days`
                          : "Not provided",
                    },
                    {
                      label: "Vendor Rating",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        o.rating !== undefined
                          ? `${o.rating}/5`
                          : "Not provided",
                    },
                    {
                      label: "Price Score",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        `${o.priceScore}/100`,
                    },
                    {
                      label: "Delivery Score",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        `${o.deliveryScore}/100`,
                    },
                    {
                      label: "Rating Score",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        `${o.ratingScore}/100`,
                    },
                    {
                      label: "Overall Score",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        `${o.totalScore}/100`,
                    },
                    {
                      label: "Recommendation",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        o.recommendation,
                    },
                    {
                      label: "Details",
                      getValue: (o: (typeof sortedOffers)[number]) =>
                        o.details || "Not provided",
                    },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="border-b border-[#DCE3DF]"
                    >
                      <td className="p-4 font-semibold">
                        {row.label}
                      </td>

                      {sortedOffers.map((offer) => (
                        <td
                          key={offer.id}
                          className="p-4"
                        >
                          {row.getValue(offer)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/saved"
                className="rounded-full bg-[#183C32] px-7 py-3 font-semibold text-white hover:bg-[#285747]"
              >
                View Saved Offers →
              </a>

              <a
                href="/recommendations"
                className="rounded-full border border-[#183C32] px-7 py-3 font-semibold hover:bg-white"
              >
                View Recommendations →
              </a>
            </div>

            <p className="mt-6 text-sm leading-6 text-[#829187]">
              Scores are calculated using price (50%), delivery (20%)
              and vendor rating (30%). Missing information receives
              a neutral score. This is a rule-based comparison system.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
