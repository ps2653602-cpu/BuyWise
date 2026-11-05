
"use client";

import { useBuyWise } from "../context/BuyWiseContext";
import { analyzeOffers } from "../utils/analyzeOffers";

export default function SavedPage() {
  const { offers, toggleSaved, removeOffer } = useBuyWise();

  const savedOffers = offers.filter((offer) => offer.saved);

  const analyzedOffers = analyzeOffers(savedOffers).sort(
    (a, b) => b.totalScore - a.totalScore
  );

  const bestOffer = analyzedOffers[0];

  const totalSavedValue = savedOffers.reduce(
    (total, offer) => total + offer.price,
    0
  );

  const averageScore =
    analyzedOffers.length > 0
      ? (
          analyzedOffers.reduce(
            (total, offer) => total + offer.totalScore,
            0
          ) / analyzedOffers.length
        ).toFixed(1)
      : "0";

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
            Saved Offers
          </h1>

          <p className="mt-3 text-[#829187]">
            Your personal collection of vendor offers worth considering.
          </p>
        </div>

        {/* Statistics */}

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-[#183C32] p-6 text-white">
            <p className="text-sm text-[#C4D5C8]">
              TOTAL SAVED OFFERS
            </p>

            <p className="mt-3 text-4xl font-bold">
              {savedOffers.length}
            </p>

            <p className="mt-2 text-sm text-[#DCE3DF]">
              Offers saved for later review
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCE3DF] bg-white p-6">
            <p className="text-sm text-[#829187]">
              TOTAL SAVED VALUE
            </p>

            <p className="mt-3 text-3xl font-bold">
              ₹{totalSavedValue.toLocaleString("en-IN")}
            </p>

            <p className="mt-2 text-sm text-[#829187]">
              Combined value of saved offers
            </p>
          </div>

          <div className="rounded-2xl border border-[#DCE3DF] bg-white p-6">
            <p className="text-sm text-[#829187]">
              AVERAGE OFFER SCORE
            </p>

            <p className="mt-3 text-3xl font-bold">
              {averageScore}/100
            </p>

            <p className="mt-2 text-sm text-[#829187]">
              Average performance score
            </p>
          </div>
        </div>

        {analyzedOffers.length === 0 ? (
          /* Empty State */

          <div className="mt-9 rounded-3xl border border-[#DCE3DF] bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F0E5] text-3xl">
              ♡
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No saved offers yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#829187]">
              Save vendor offers from your comparison page.
              They will appear here so you can review them whenever you want.
            </p>

            <a
              href="/compare"
              className="mt-7 inline-block rounded-full bg-[#183C32] px-7 py-3 font-semibold text-white transition hover:bg-[#386B4D]"
            >
              Explore Offers →
            </a>
          </div>
        ) : (
          <>
            {/* Best Saved Offer */}

            {bestOffer && (
              <div className="mt-9 rounded-3xl bg-[#183C32] p-8 text-white md:p-9">
                <p className="text-sm font-bold tracking-widest text-[#A8C6AA]">
                  ✦ TOP SAVED OFFER
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-5">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {bestOffer.vendor}
                    </h2>

                    <p className="mt-2 text-[#DCE3DF]">
                      {bestOffer.product}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/10 px-6 py-4">
                    <p className="text-sm text-[#C4D5C8]">
                      Overall Score
                    </p>

                    <p className="mt-1 text-3xl font-bold">
                      {bestOffer.totalScore}/100
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5 border-t border-white/20 pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-[#C4D5C8]">
                      Price
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      ₹{bestOffer.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#C4D5C8]">
                      Delivery
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {bestOffer.deliveryDays !== undefined
                        ? `${bestOffer.deliveryDays} days`
                        : "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[#C4D5C8]">
                      Vendor Rating
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {bestOffer.rating !== undefined
                        ? `${bestOffer.rating}/5`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Offers List */}

            <div className="mt-12">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-bold tracking-widest text-[#72947D]">
                    YOUR COLLECTION
                  </p>

                  <h2 className="mt-2 text-2xl font-bold">
                    All Saved Offers
                  </h2>
                </div>

                <p className="text-sm text-[#829187]">
                  {analyzedOffers.length} offers available
                </p>
              </div>

              <div className="mt-6 space-y-5">
                {analyzedOffers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className="rounded-2xl border border-[#DCE3DF] bg-white p-6 shadow-sm transition hover:shadow-md md:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#F4F0E5] px-3 py-1 text-xs font-bold text-[#386B4D]">
                            SAVED #{index + 1}
                          </span>

                          {index === 0 && (
                            <span className="rounded-full bg-[#E5EFE6] px-3 py-1 text-xs font-bold text-[#386B4D]">
                              TOP PERFORMER
                            </span>
                          )}
                        </div>

                        <h3 className="mt-4 text-xl font-bold">
                          {offer.vendor}
                        </h3>

                        <p className="mt-1 text-sm text-[#829187]">
                          {offer.product}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold">
                          ₹{offer.price.toLocaleString("en-IN")}
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
                          Overall Score
                        </span>

                        <span className="font-bold text-[#386B4D]">
                          {offer.totalScore}/100
                        </span>
                      </div>

                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#E7ECE8]">
                        <div
                          className="h-full rounded-full bg-[#72947D]"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(0, offer.totalScore)
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Score Breakdown */}

                    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                      {[
                        {
                          label: "Overall",
                          score: offer.totalScore,
                        },
                        {
                          label: "Price",
                          score: offer.priceScore,
                        },
                        {
                          label: "Delivery",
                          score: offer.deliveryScore,
                        },
                        {
                          label: "Rating",
                          score: offer.ratingScore,
                        },
                      ].map((factor) => (
                        <div
                          key={factor.label}
                          className="rounded-xl bg-[#F4F0E5] p-4"
                        >
                          <p className="text-xs text-[#829187]">
                            {factor.label} Score
                          </p>

                          <p className="mt-2 text-xl font-bold">
                            {factor.score}/100
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Offer Information */}

                    <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#60746A]">
                      <p>
                        Delivery:{" "}
                        {offer.deliveryDays !== undefined
                          ? `${offer.deliveryDays} days`
                          : "Not specified"}
                      </p>

                      <p>
                        Vendor Rating:{" "}
                        {offer.rating !== undefined
                          ? `${offer.rating}/5`
                          : "Not specified"}
                      </p>
                    </div>

                    <div className="mt-5 rounded-xl bg-[#F4F0E5] p-4">
                      <p className="text-sm font-semibold text-[#386B4D]">
                        {offer.recommendation}
                      </p>

                      <p className="mt-2 whitespace-pre-wrap text-sm text-[#829187]">
                        {offer.details || "No additional details provided."}
                      </p>
                    </div>

                    {/* Actions */}

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() => toggleSaved(offer.id)}
                        className="rounded-full border border-[#183C32] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#F4F0E5]"
                      >
                        ♡ Remove from Saved
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to permanently delete this offer?"
                            )
                          ) {
                            removeOffer(offer.id);
                          }
                        }}
                        className="rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Delete Offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Navigation */}

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="/compare"
            className="rounded-full bg-[#183C32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#386B4D]"
          >
            Compare Offers →
          </a>

          <a
            href="/recommendations"
            className="rounded-full border border-[#183C32] px-6 py-3 text-sm font-semibold transition hover:bg-white"
          >
            View Recommendations →
          </a>

          <a
            href="/analyze"
            className="rounded-full border border-[#183C32] px-6 py-3 text-sm font-semibold transition hover:bg-white"
          >
            Add New Offers
          </a>
        </div>

      </div>
    </main>
  );
}
