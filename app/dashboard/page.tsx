
"use client";

import { useBuyWise } from "../context/BuyWiseContext";
import { analyzeOffers } from "../utils/analyzeOffers";

export default function DashboardPage() {
  const { offers } = useBuyWise();

  const savedOffers = offers.filter((offer) => offer.saved);
  const vendors = new Set(
    offers.map((offer) => offer.vendor.trim().toLowerCase())
  );

  const totalValue = offers.reduce(
    (sum, offer) => sum + offer.price,
    0
  );

  const sortedOffers = [...offers].sort(
    (a, b) => a.price - b.price
  );

  const analyzedOffers = analyzeOffers(offers);
  const bestOffer = analyzedOffers[0];

  const stats = [
    {
      label: "Total Offers",
      value: offers.length,
      icon: "📦",
    },
    {
      label: "Total Vendors",
      value: vendors.size,
      icon: "🏢",
    },
    {
      label: "Saved Offers",
      value: savedOffers.length,
      icon: "♥",
    },
    {
      label: "Lowest Offer",
      value: sortedOffers.length
        ? `₹${sortedOffers[0].price.toLocaleString("en-IN")}`
        : "₹0",
      icon: "💰",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F4F0E5] text-[#183C32]">
      <div className="flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}
        <aside className="w-full bg-[#183C32] p-7 text-white md:w-64">
          <h1 className="text-2xl font-bold">BuyWise AI</h1>

          <p className="mt-2 text-sm text-[#C4D5C8]">
            Smarter Buying Workspace
          </p>

          <nav className="mt-10 space-y-3">
            {[
              ["Dashboard", "/dashboard"],
              ["Analyze Offers", "/analyze"],
              ["Compare Offers", "/compare"],
              ["Recommendations", "/recommendations"],
              ["Saved Offers", "/saved"],
            ].map(([label, link]) => (
              <a
                key={link}
                href={link}
                className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                  link === "/dashboard"
                    ? "bg-white text-[#183C32]"
                    : "text-[#DCE3DF] hover:bg-[#285747]"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-12 rounded-2xl bg-[#285747] p-5">
            <p className="text-sm font-semibold">
              Buyer-first decisions
            </p>

            <p className="mt-2 text-xs leading-5 text-[#DCE3DF]">
              Compare vendor offers and make purchasing decisions
              with confidence.
            </p>
          </div>
        </aside>

        {/* Main Dashboard */}
        <section className="flex-1 p-6 md:p-10">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-widest text-[#72947D]">
                BUYWISE AI WORKSPACE
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Dashboard
              </h2>

              <p className="mt-2 text-[#829187]">
                Welcome to your purchasing dashboard.
              </p>
            </div>

            <a
              href="/analyze"
              className="rounded-full bg-[#183C32] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#285747]"
            >
              + Add New Offer
            </a>
          </div>

          {/* Statistics */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#829187]">
                    {stat.label}
                  </p>

                  <span className="text-2xl">
                    {stat.icon}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold">
                  {stat.value}
                </h3>
              </div>
            ))}
          </div>

          {/* Best Overall Offer */}
          {bestOffer && (
            <div className="mt-8 rounded-2xl bg-[#183C32] p-7 text-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold tracking-widest text-[#C4D5C8]">
                    BEST OVERALL OFFER
                  </p>

                  <h3 className="mt-3 text-2xl font-bold">
                    {bestOffer.vendor}
                  </h3>

                  <p className="mt-1 text-sm text-[#C4D5C8]">
                    {bestOffer.product}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-5 text-center">
                  <p className="text-xs text-[#C4D5C8]">
                    Overall Score
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {bestOffer.totalScore}
                    <span className="text-sm">/100</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xl font-bold">
                  ₹{bestOffer.price.toLocaleString("en-IN")}
                </p>

                <a
                  href="/recommendations"
                  className="rounded-full bg-white px-5 py-3 text-sm font-bold text-[#183C32] hover:bg-[#F4F0E5]"
                >
                  View Analysis →
                </a>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="mt-9 grid gap-6 lg:grid-cols-3">

            {/* Recent Offers */}
            <div className="rounded-2xl bg-white p-7 shadow-sm lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">
                    Recent Vendor Offers
                  </h3>

                  <p className="mt-1 text-sm text-[#829187]">
                    Your recently added purchasing offers.
                  </p>
                </div>

                <a
                  href="/compare"
                  className="text-sm font-bold text-[#72947D]"
                >
                  Compare all →
                </a>
              </div>

              {offers.length === 0 ? (
                <div className="mt-7 rounded-xl bg-[#F4F0E5] p-7 text-center">
                  <p className="font-semibold">
                    No offers added yet.
                  </p>

                  <a
                    href="/analyze"
                    className="mt-4 inline-block rounded-full bg-[#183C32] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Add Your First Offer
                  </a>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {[...offers].reverse().slice(0, 5).map((offer) => (
                    <div
                      key={offer.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F4F0E5] p-4 transition hover:bg-[#EAE6D9]"
                    >
                      <div>
                        <p className="font-bold">
                          {offer.vendor}
                        </p>

                        <p className="mt-1 text-sm text-[#829187]">
                          {offer.product}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ₹{offer.price.toLocaleString("en-IN")}
                        </p>

                        <p className="text-xs text-[#829187]">
                          {offer.saved ? "♥ Saved" : "Not saved"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Purchasing Overview */}
            <div className="rounded-2xl bg-[#183C32] p-7 text-white">
              <p className="text-sm font-semibold text-[#C4D5C8]">
                PURCHASING OVERVIEW
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                Your buying activity
              </h3>

              <div className="mt-7 space-y-6">
                <div>
                  <p className="text-sm text-[#C4D5C8]">
                    Total value of offers
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    ₹{totalValue.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#C4D5C8]">
                    Saved for review
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {savedOffers.length}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#C4D5C8]">
                    Vendors compared
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {vendors.size}
                  </p>
                </div>

                <a
                  href="/recommendations"
                  className="inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-[#183C32]"
                >
                  View Recommendations →
                </a>
              </div>
            </div>
          </div>

          {/* Offer Distribution */}
          <div className="mt-8 rounded-2xl bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold">
              Offer Overview
            </h3>

            <p className="mt-1 text-sm text-[#829187]">
              Distribution of your current purchasing offers.
            </p>

            <div className="mt-6 space-y-5">
              {[
                {
                  label: "Saved Offers",
                  count: savedOffers.length,
                  color: "bg-[#386B4D]",
                },
                {
                  label: "Offers Not Saved",
                  count: offers.length - savedOffers.length,
                  color: "bg-[#829187]",
                },
              ].map((item) => {
                const percentage =
                  offers.length > 0
                    ? (item.count / offers.length) * 100
                    : 0;

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span className="text-[#829187]">
                        {item.count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-[#F4F0E5]">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 rounded-2xl border border-[#DCE3DF] bg-white p-6">
            <h3 className="font-bold">
              Quick Actions
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="/analyze"
                className="rounded-full bg-[#F4F0E5] px-5 py-3 text-sm font-semibold hover:bg-[#EAE6D9]"
              >
                Analyze Offers
              </a>

              <a
                href="/compare"
                className="rounded-full bg-[#F4F0E5] px-5 py-3 text-sm font-semibold hover:bg-[#EAE6D9]"
              >
                Compare Vendors
              </a>

              <a
                href="/saved"
                className="rounded-full bg-[#F4F0E5] px-5 py-3 text-sm font-semibold hover:bg-[#EAE6D9]"
              >
                Saved Offers
              </a>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
