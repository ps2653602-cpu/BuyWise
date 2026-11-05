
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Smart Offer Analysis",
    description:
      "Enter vendor offers and evaluate important factors like price, delivery time and vendor ratings.",
    icon: "⌕",
  },
  {
    number: "02",
    title: "Side-by-Side Comparison",
    description:
      "Compare multiple vendor offers in one place and understand the differences clearly.",
    icon: "▤",
  },
  {
    number: "03",
    title: "Buyer-First Recommendations",
    description:
      "Discover the highest-scoring offer based on your purchasing priorities.",
    icon: "✦",
  },
];

const steps = [
  {
    number: "01",
    title: "Add Requirements",
    description:
      "Enter your product details and add the offers received from different vendors.",
  },
  {
    number: "02",
    title: "Analyze & Compare",
    description:
      "Evaluate prices, delivery timelines and vendor ratings using our scoring system.",
  },
  {
    number: "03",
    title: "Make Better Decisions",
    description:
      "Review the rankings, save interesting offers and choose the option that suits you.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F0E5] text-[#183C32]">

      {/* Hero Section */}

      <section className="grid items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-16 md:py-28">
        <div>
          <span className="inline-block rounded-full border border-[#B8C8B9] px-4 py-2 text-xs font-bold tracking-widest text-[#386B4D]">
            YOUR BUYING DECISION PARTNER
          </span>

          <h1 className="mt-7 max-w-xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Buy smarter.
            <br />
            Choose better.
            <br />
            <span className="text-[#72947D]">
              Save more.
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-8 text-[#60746A]">
            Stop struggling with multiple vendor quotations.
            Compare offers, evaluate important factors and make
            purchasing decisions with greater confidence.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="rounded-full bg-[#183C32] px-8 py-4 font-semibold text-white transition hover:bg-[#285747]"
            >
              Explore Dashboard →
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-[#183C32] px-8 py-4 font-semibold transition hover:bg-white"
            >
              How It Works
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-8 text-sm text-[#60746A]">
            <div>
              <p className="text-2xl font-bold text-[#183C32]">
                50%
              </p>
              <p className="mt-1">Price Weight</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#183C32]">
                20%
              </p>
              <p className="mt-1">Delivery Weight</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-[#183C32]">
                30%
              </p>
              <p className="mt-1">Rating Weight</p>
            </div>
          </div>
        </div>

        {/* Product Preview */}

        <div className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-[#DCE3DF]/60 blur-2xl" />

          <div className="relative rounded-3xl border border-[#DCE3DF] bg-white p-6 shadow-xl md:p-8">

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold tracking-widest text-[#72947D]">
                  BUYWISE WORKSPACE
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Offer Analysis
                </h2>
              </div>

              <span className="rounded-full bg-[#E7F0E7] px-3 py-2 text-xs font-bold text-[#386B4D]">
                LIVE PREVIEW
              </span>
            </div>

            <div className="mt-7 rounded-2xl bg-[#F4F0E5] p-5">
              <p className="text-xs font-semibold text-[#829187]">
                SAMPLE PRODUCT
              </p>

              <h3 className="mt-2 text-xl font-bold">
                Office Laptops
              </h3>

              <p className="mt-2 text-sm text-[#60746A]">
                Sample budget: ₹50,000 – ₹65,000
              </p>
            </div>

            <div className="mt-5 space-y-4">

              <div className="rounded-xl border border-[#72947D] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Vendor A</p>
                    <p className="mt-1 text-sm text-[#829187]">
                      ₹58,000 · 5 days
                    </p>
                  </div>

                  <span className="rounded-full bg-[#E7F0E7] px-3 py-2 text-xs font-bold text-[#386B4D]">
                    Top Score
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-[#E7ECE8]">
                  <div className="h-2 w-[92%] rounded-full bg-[#72947D]" />
                </div>

                <p className="mt-2 text-right text-xs font-bold text-[#386B4D]">
                  92/100
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE3DF] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Vendor B</p>
                    <p className="mt-1 text-sm text-[#829187]">
                      ₹62,000 · 3 days
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#829187]">
                    Alternative
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-[#E7ECE8]">
                  <div className="h-2 w-[78%] rounded-full bg-[#A8B9A9]" />
                </div>

                <p className="mt-2 text-right text-xs font-bold text-[#60746A]">
                  78/100
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE3DF] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold">Vendor C</p>
                    <p className="mt-1 text-sm text-[#829187]">
                      ₹54,000 · 10 days
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-[#829187]">
                    Alternative
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-[#E7ECE8]">
                  <div className="h-2 w-[65%] rounded-full bg-[#A8B9A9]" />
                </div>

                <p className="mt-2 text-right text-xs font-bold text-[#60746A]">
                  65/100
                </p>
              </div>

            </div>

            <div className="mt-5 rounded-xl bg-[#183C32] p-5 text-white">
              <p className="text-xs font-bold tracking-widest text-[#A8C6AA]">
                SAMPLE RECOMMENDATION
              </p>

              <p className="mt-2 font-semibold">
                Vendor A has the highest overall score in this example.
              </p>
            </div>

            <p className="mt-4 text-center text-xs text-[#829187]">
              Illustrative preview · Not live vendor data
            </p>
          </div>
        </div>
      </section>

      {/* Features */}

      <section
        id="features"
        className="bg-white px-6 py-20 md:px-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-widest text-[#72947D]">
            WHAT WE OFFER
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            Everything you need to buy better.
          </h2>

          <p className="mt-5 leading-7 text-[#829187]">
            A simple workspace that brings vendor evaluation,
            comparison and purchasing insights together.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="rounded-2xl border border-[#DCE3DF] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4F0E5] text-2xl font-bold text-[#386B4D]">
                {feature.icon}
              </div>

              <p className="mt-7 text-xs font-bold tracking-widest text-[#72947D]">
                {feature.number}
              </p>

              <h3 className="mt-3 text-xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-[#829187]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}

      <section
        id="how-it-works"
        className="px-6 py-20 md:px-16"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold tracking-widest text-[#72947D]">
            SIMPLE PROCESS
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            From vendor offers to better decisions.
          </h2>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl bg-white p-8"
            >
              <p className="text-4xl font-bold text-[#A8B9A9]">
                {step.number}
              </p>

              <h3 className="mt-5 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-4 leading-7 text-[#829187]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}

      <section className="px-6 pb-20 md:px-16">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#183C32] px-7 py-14 text-center text-white md:px-16">
          <p className="text-sm font-bold tracking-widest text-[#A8C6AA]">
            MAKE YOUR NEXT PURCHASE COUNT
          </p>

          <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold md:text-5xl">
            Ready to make smarter buying decisions?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-[#DCE3DF]">
            Start comparing vendor offers and discover which option
            gives you the best overall value.
          </p>

          <Link
            href="/dashboard"
            className="mt-9 inline-block rounded-full bg-[#F4F0E5] px-8 py-4 font-bold text-[#183C32] transition hover:bg-white"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* Footer */}

      <footer
        id="about"
        className="border-t border-[#DCE3DF] bg-white px-6 py-8 md:px-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 md:flex-row">
          <div>
            <p className="text-xl font-bold">
              BuyWise<span className="text-[#72947D]"> AI.</span>
            </p>

            <p className="mt-1 text-sm text-[#829187]">
              A smarter way to evaluate vendor offers.
            </p>
          </div>

          <div className="text-sm text-[#829187] md:text-right">
            <p>© 2026 BuyWise AI.</p>
            <p className="mt-1">
              Built for smarter buying decisions.
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
