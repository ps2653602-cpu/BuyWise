
"use client";

import { useState } from "react";
import { useBuyWise } from "../context/BuyWiseContext";

export default function AnalyzePage() {
  const { offers, addOffer } = useBuyWise();

  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState("");
  const [requirements, setRequirements] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [rating, setRating] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputClass =
    "w-full rounded-xl border border-[#DCE3DF] bg-white p-4 outline-none transition focus:border-[#72947D] focus:ring-2 focus:ring-[#72947D]/20";

  const savedOffers = offers.filter((offer) => offer.saved);

  function handleAddOffer() {
    setError("");
    setSuccess("");

    if (!product.trim() || !budget.trim()) {
      setError("Please enter your product and maximum budget.");
      return;
    }

    if (!Number.isFinite(Number(budget)) || Number(budget) <= 0) {
      setError("Please enter a valid maximum budget.");
      return;
    }

    if (!vendor.trim() || !price.trim() || Number(price) <= 0) {
      setError("Please enter a valid vendor name and offer price.");
      return;
    }

    if (!Number.isFinite(Number(price))) {
      setError("Please enter a valid offer price.");
      return;
    }

    if (
      !deliveryDays.trim() ||
      !Number.isFinite(Number(deliveryDays)) ||
      Number(deliveryDays) <= 0
    ) {
      setError("Please enter a valid delivery time.");
      return;
    }

    if (
      !rating.trim() ||
      !Number.isFinite(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    ) {
      setError("Vendor rating must be between 1 and 5.");
      return;
    }

    addOffer({
      vendor: vendor.trim(),
      product: product.trim(),
      price: Number(price),
      details: [
        details.trim(),
        requirements.trim()
          ? `Buyer requirements: ${requirements.trim()}`
          : "",
      ]
        .filter(Boolean)
        .join(" | "),
      deliveryDays: Number(deliveryDays),
      rating: Number(rating),
    });

    setVendor("");
    setPrice("");
    setDetails("");
    setDeliveryDays("");
    setRating("");

    setSuccess("Vendor offer added successfully!");
  }

  const budgetStatus =
    price && budget && Number(price) > 0 && Number(budget) > 0
      ? Number(price) <= Number(budget)
        ? "Within your budget"
        : "Above your budget"
      : "";

  return (
    <main className="min-h-screen bg-[#F4F0E5] p-5 text-[#183C32] md:p-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
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
            Analyze Offers
          </h1>

          <p className="mt-3 text-[#829187]">
            Enter your requirements and compare vendor offers
            to make smarter purchasing decisions.
          </p>
        </div>

        {/* Progress overview */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#829187]">
              Total Offers
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {offers.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#829187]">
              Saved Offers
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {savedOffers.length}
            </h2>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-[#829187]">
              Current Product
            </p>
            <h2 className="mt-2 truncate text-xl font-bold">
              {product || "Not selected"}
            </h2>
          </div>
        </div>

        {/* Requirements */}
        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm md:p-9">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFE8] font-bold text-[#386B4D]">
              01
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Your Requirements
              </h2>

              <p className="text-sm text-[#829187]">
                Tell us what you want to purchase.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Product / Service *
              </label>

              <input
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. Office laptops"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Maximum Budget (₹) *
              </label>

              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                type="number"
                min="1"
                placeholder="e.g. 65000"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold">
              Additional Requirements
            </label>

            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Mention quality, features, delivery time or other priorities..."
              rows={4}
              className={inputClass}
            />
          </div>
        </section>

        {/* Vendor offer */}
        <section className="mt-7 rounded-3xl bg-white p-7 shadow-sm md:p-9">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E7EFE8] font-bold text-[#386B4D]">
              02
            </div>

            <div>
              <h2 className="text-xl font-bold">
                Add Vendor Offer
              </h2>

              <p className="text-sm text-[#829187]">
                Enter the details received from your vendor.
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Vendor Name *
              </label>

              <input
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="e.g. ABC Technologies"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Offer Price (₹) *
              </label>

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="1"
                placeholder="e.g. 58000"
                className={inputClass}
              />

              {budgetStatus && (
                <p
                  className={`mt-2 text-xs font-semibold ${
                    budgetStatus === "Within your budget"
                      ? "text-[#386B4D]"
                      : "text-red-600"
                  }`}
                >
                  {budgetStatus}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Delivery Time (Days) *
              </label>

              <input
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                type="number"
                min="1"
                placeholder="e.g. 5"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Vendor Rating (1–5) *
              </label>

              <input
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="e.g. 4.5"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-semibold">
              Offer Details
            </label>

            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Product quality, warranty, features..."
              rows={3}
              className={inputClass}
            />
          </div>

          {/* Error and success messages */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-xl border border-[#C4D5C8] bg-[#E7EFE8] p-4 text-sm font-semibold text-[#386B4D]">
              ✓ {success}
            </div>
          )}

          <button
            onClick={handleAddOffer}
            className="mt-6 w-full rounded-full bg-[#183C32] px-7 py-4 font-semibold text-white transition hover:bg-[#285747] sm:w-auto"
          >
            + Add Vendor Offer
          </button>
        </section>

        {/* Added offers */}
        <section className="mt-8 rounded-3xl bg-white p-7 shadow-sm md:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">
                Your Vendor Offers
              </h2>

              <p className="mt-1 text-sm text-[#829187]">
                Review all the offers added to your workspace.
              </p>
            </div>

            <span className="rounded-full bg-[#E7EFE8] px-4 py-2 text-sm font-bold text-[#386B4D]">
              {offers.length} Offers
            </span>
          </div>

          {offers.length === 0 ? (
            <div className="mt-7 rounded-2xl bg-[#F4F0E5] p-8 text-center">
              <p className="text-3xl">📦</p>

              <h3 className="mt-3 font-bold">
                No vendor offers yet
              </h3>

              <p className="mt-2 text-sm text-[#829187]">
                Add your first vendor offer using the form above.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {[...offers].reverse().map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-2xl border border-[#DCE3DF] p-5 transition hover:shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold">
                        {offer.vendor}
                      </h3>

                      <p className="mt-1 text-sm text-[#829187]">
                        {offer.product}
                      </p>
                    </div>

                    <p className="text-xl font-bold">
                      ₹{offer.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
                    <span className="rounded-full bg-[#F4F0E5] px-3 py-2">
                      🚚 {offer.deliveryDays ?? "N/A"} days
                    </span>

                    <span className="rounded-full bg-[#F4F0E5] px-3 py-2">
                      ⭐ {offer.rating ?? "N/A"}/5
                    </span>

                    <span className="rounded-full bg-[#E7EFE8] px-3 py-2 text-[#386B4D]">
                      {offer.saved ? "♥ Saved" : "Not saved"}
                    </span>
                  </div>

                  {offer.details && (
                    <p className="mt-4 text-sm leading-6 text-[#60746A]">
                      {offer.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-wrap justify-between gap-4">
          <a
            href="/dashboard"
            className="rounded-full border border-[#183C32] px-7 py-4 font-semibold transition hover:bg-white"
          >
            ← Dashboard
          </a>

          <a
            href="/recommendations"
            className="rounded-full bg-[#183C32] px-8 py-4 font-semibold text-white transition hover:bg-[#285747]"
          >
            View Recommendations →
          </a>
        </div>
      </div>
    </main>
  );
}
