
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Analyze", href: "/analyze" },
  { name: "Compare", href: "/compare" },
  { name: "Recommendations", href: "/recommendations" },
  { name: "Saved Offers", href: "/saved" },
];

export default function GlobalNavigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#DCE3DF] bg-[#F4F0E5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 md:px-8">

        {/* Brand */}

        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#183C32] text-xl font-bold text-white">
            B
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#183C32]">
              BuyWise<span className="text-[#72947D]"> AI</span>
            </h1>

            <p className="text-[10px] font-semibold tracking-widest text-[#829187]">
              SMARTER BUYING
            </p>
          </div>
        </Link>

        {/* Navigation Links */}

        <nav className="flex w-full items-center gap-2 overflow-x-auto pb-1 md:w-auto md:pb-0">
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#183C32] text-white"
                    : "text-[#60746A] hover:bg-white hover:text-[#183C32]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
