
"use client";

import { useBuyWise } from "../context/BuyWiseContext";
import { analyzeOffers } from "../utils/analyzeOffers";

export default function RecommendationsPage() {
  const { offers } = useBuyWise();

  const recommendations = analyzeOffers(offers);
  const bestOffer = recommendations[0];

  const lowestPrice = recommendations.length
    ? Math.min(...recommendations.map((item) => item.price))
    : 0;

  const fastestDelivery = recommendations
    .filter(
      (item) =>
        item.deliveryDays !== undefined && item.deliveryDays > 0
    )
    .sort((a, b) => a.deliveryDays! - b.deliveryDays!)[0];

  return (
    <main className="min-h-screen bg-[#F4F0E5] p-6 text-[#183C32] md:p-12">
      <div className="mx-auto max-w-6xl">

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
            Smart Recommendations
          </h1>

          <p className="mt-3 text-[#829187]">
            Compare vendor performance and find the most suitable offer.
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-[#DCE3DF] bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F0E5] text-3xl">
              ✦
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No recommendations yet
            </h2>

            <p className="mt-3 text-[#829187]">
              Add at least one vendor offer to generate your recommendations.
            </p>

            <a
              href="/analyze"
              className="mt-7 inline-block rounded-full bg-[#183C32] px-7 py-3 font-semibold text-white transition hover:bg-[#386B4D]"
            >
              Add Vendor Offers →
            </a>
          </div>
        ) : (
          <>
            {/* Best Overall Recommendation */}

            <div className="mt-9 overflow-hidden rounded-3xl bg-[#183C32] p-8 text-white shadow-sm md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold tracking-widest text-[#A8C6AA]">
                    ✦ BEST OVERALL RECOMMENDATION
                  </p>

                  <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                    {bestOffer.vendor}
                  </h2>

                  <p className="mt-2 text-[#DCE3DF]">
                    {bestOffer.product}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 px-6 py-5">
                  <p className="text-sm text-[#C4D5C8]">
                    Overall Score
                  </p>

                  <p className="mt-1 text-4xl font-bold">
                    {bestOffer.totalScore}
                    <span className="text-lg text-[#C4D5C8]">/100</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-5 border-t border-white/20 pt-7 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-[#C4D5C8]">Offer Price</p>
                  <p className="mt-2 text-2xl font-bold">
                    ₹{bestOffer.price.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#C4D5C8]">Delivery Time</p>
                  <p className="mt-2 text-2xl font-bold">
                    {bestOffer.deliveryDays ?? "N/A"}
                    {bestOffer.deliveryDays !== undefined ? " days" : ""}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#C4D5C8]">Vendor Rating</p>
                  <p className="mt-2 text-2xl font-bold">
                    {bestOffer.rating ?? "N/A"}
                    {bestOffer.rating !== undefined ? " / 5" : ""}
                  </p>
                </div>
              </div>

              <p className="mt-7 rounded-xl bg-white/10 p-4 text-sm text-[#DCE3DF]">
                This vendor has the highest combined score based on price,
                delivery time and vendor rating.
              </p>
            </div>

            {/* Quick Insights */}

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#DCE3DF] bg-white p-6">
                <p className="text-sm text-[#829187]">
                  Total Offers Compared
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {recommendations.length}
                </p>

                <p className="mt-2 text-xs text-[#829187]">
                  Vendor offers analyzed
                </p>
              </div>

              <div className="rounded-2xl border border-[#DCE3DF] bg-white p-6">
                <p className="text-sm text-[#829187]">
                  Lowest Available Price
                </p>

                <p className="mt-3 text-3xl font-bold">
                  ₹{lowestPrice.toLocaleString("en-IN")}
                </p>

                <p className="mt-2 text-xs text-[#829187]">
                  Across all compared offers
                </p>
              </div>

              <div className="rounded-2xl border border-[#DCE3DF] bg-white p-6">
                <p className="text-sm text-[#829187]">
                  Fastest Delivery
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {fastestDelivery
                    ? `${fastestDelivery.deliveryDays} days`
                    : "N/A"}
                </p>

                <p className="mt-2 text-xs text-[#829187]">
                  {fastestDelivery
                    ? fastestDelivery.vendor
                    : "No delivery data available"}
                </p>
              </div>
            </div>

            {/* Vendor Rankings */}

            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-bold tracking-widest text-[#72947D]">
                    PERFORMANCE ANALYSIS
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    Vendor Rankings
                  </h2>
                </div>

                <p className="text-sm text-[#829187]">
                  Ranked by overall score
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {recommendations.map((item, index) => {
                  const isBest = item.id === bestOffer.id;

                  const strengths = [
                    {
                      label: "Price",
                      score: item.priceScore,
                    },
                    {
                      label: "Delivery",
                      score: item.deliveryScore,
                    },
                    {
                      label: "Rating",
                      score: item.ratingScore,
                    },
                  ];

                  const strongest = [...strengths].sort(
                    (a, b) => b.score - a.score
                  )[0];

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border bg-white p-6 md:p-7 ${
                        isBest
                          ? "border-[#72947D]"
                          : "border-[#DCE3DF]"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-[#F4F0E5] px-3 py-1 text-xs font-bold text-[#386B4D]">
                              RANK #{index + 1}
                            </span>

                            {isBest && (
                              <span className="rounded-full bg-[#E5EFE6] px-3 py-1 text-xs font-bold text-[#386B4D]">
                                BEST OVERALL
                              </span>
                            )}
                          </div>

                          <h3 className="mt-4 text-xl font-bold">
                            {item.vendor}
                          </h3>

                          <p className="mt-1 text-sm text-[#829187]">
                            {item.product}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>

                          <p className="text-xs text-[#829187]">
                            Offer Price
                          </p>
                        </div>
                      </div>

                      {/* Overall Score */}

                      <div className="mt-7">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold">
                            Overall Performance
                          </span>

                          <span className="font-bold text-[#386B4D]">
                            {item.totalScore}/100
                          </span>
                        </div>

                        <div className="mt-3 h-3 overflow-hidden rounded-full bg-[#E7ECE8]">
                          <div
                            className="h-full rounded-full bg-[#72947D] transition-all"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, item.totalScore)
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Score Breakdown */}

                      <div className="mt-7 grid gap-4 sm:grid-cols-3">
                        {strengths.map((factor) => (
                          <div
                            key={factor.label}
                            className="rounded-xl bg-[#F4F0E5] p-4"
                          >
                            <p className="text-sm text-[#829187]">
                              {factor.label} Score
                            </p>

                            <p className="mt-2 text-xl font-bold">
                              {factor.score}/100
                            </p>

                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DCE3DF]">
                              <div
                                className="h-full rounded-full bg-[#72947D]"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    Math.max(0, factor.score)
                                  )}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Strength Insight */}

                      <div className="mt-5 rounded-xl border border-[#DCE3DF] p-4">
                        <p className="text-sm font-bold text-[#386B4D]">
                          Strongest Factor: {strongest.label}
                        </p>

                        <p className="mt-1 text-sm text-[#829187]">
                          This vendor performs best in the {strongest.label.toLowerCase()} category
                          compared with its other score categories.
                        </p>
                      </div>

                      {item.details && (
                        <div className="mt-4">
                          <p className="text-xs font-bold uppercase tracking-wider text-[#829187]">
                            Offer Details
                          </p>

                          <p className="mt-2 whitespace-pre-wrap text-sm text-[#829187]">
                            {item.details}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scoring Information */}

            <div className="mt-10 rounded-2xl border border-[#DCE3DF] bg-white p-7">
              <h2 className="text-xl font-bold">
                How are recommendations calculated?
              </h2>

              <p className="mt-2 text-sm text-[#829187]">
                Each vendor receives a score based on three factors.
                The weighted scores are combined to calculate the final ranking.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#F4F0E5] p-5">
                  <p className="text-sm text-[#829187]">Price</p>
                  <p className="mt-2 text-3xl font-bold">50%</p>
                  <p className="mt-2 text-xs text-[#829187]">
                    Lower prices receive higher scores.
                  </p>
                </div>

                <div className="rounded-xl bg-[#F4F0E5] p-5">
                  <p className="text-sm text-[#829187]">Delivery</p>
                  <p className="mt-2 text-3xl font-bold">20%</p>
                  <p className="mt-2 text-xs text-[#829187]">
                    Faster delivery receives higher scores.
                  </p>
                </div>

                <div className="rounded-xl bg-[#F4F0E5] p-5">
                  <p className="text-sm text-[#829187]">Vendor Rating</p>
                  <p className="mt-2 text-3xl font-bold">30%</p>
                  <p className="mt-2 text-xs text-[#829187]">
                    Higher vendor ratings receive higher scores.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-xs leading-6 text-[#829187]">
                Note: BuyWise currently uses a frontend-based rule system
                for calculating scores. It does not use a live AI model.
                If delivery or rating information is missing, a neutral
                score is assigned.
              </p>
            </div>

            {/* Navigation */}

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/compare"
                className="rounded-full bg-[#183C32] px-7 py-3 font-semibold text-white transition hover:bg-[#386B4D]"
              >
                Compare Offers →
              </a>

              <a
                href="/analyze"
                className="rounded-full border border-[#183C32] px-7 py-3 font-semibold text-[#183C32] transition hover:bg-white"
              >
                Add More Offers
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
