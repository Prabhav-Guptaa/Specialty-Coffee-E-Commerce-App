import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "../data/products";
import type { CategoryId, Product } from "../data/products";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import { Bean, Close, Search } from "./icons";

type SortId = "featured" | "price-asc" | "price-desc" | "rating";

interface ShopProps {
  onQuickView: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function Shop({ onQuickView, onAdd }: ShopProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [sort, setSort] = useState<SortId>("featured");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const inCategory = category === "all" || p.category === category;
      if (!inCategory) return false;
      if (!q) return true;
      const haystack = [p.name, p.origin, p.region, p.notes.join(" "), p.process, p.category]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setSort("featured");
  };

  return (
    <section id="shop" className="relative scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.3em] text-copper uppercase">
                Six roasts, zero filler
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                The coffee counter
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed font-semibold text-cocoa">
              Roasted Tuesdays, shipped Wednesdays. Free shipping on crates over{" "}
              <span className="text-copper">$40</span>.
            </p>
          </div>
        </Reveal>

        {/* Toolbar */}
        <Reveal delay={100}>
          <div className="sticky top-16 z-30 -mx-4 mt-8 border-y border-espresso/10 bg-paper/95 px-4 py-3.5 backdrop-blur-md sm:-mx-6 sm:px-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full max-w-md">
                <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-cocoa" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search roasts, origins, tasting notes…"
                  aria-label="Search coffees"
                  className="w-full rounded-full border border-espresso/20 bg-cream py-2.5 pr-10 pl-11 text-sm font-semibold placeholder:font-medium placeholder:text-latte focus:border-copper focus:ring-2 focus:ring-copper/30 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-cocoa transition-colors hover:bg-parchment hover:text-espresso"
                  >
                    <Close className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="no-scrollbar flex gap-2 overflow-x-auto">
                {CATEGORIES.map((c) => {
                  const active = category === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                        active
                          ? "border-espresso bg-espresso text-cream shadow-[2px_2px_0_rgba(180,83,43,0.55)]"
                          : "border-espresso/20 bg-transparent text-bark hover:border-copper hover:text-copper"
                      }`}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative shrink-0">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortId)}
                  aria-label="Sort coffees"
                  className="w-full cursor-pointer appearance-none rounded-full border border-espresso/20 bg-cream py-2.5 pr-10 pl-4 text-sm font-bold text-bark focus:border-copper focus:ring-2 focus:ring-copper/30 focus:outline-none lg:w-auto"
                >
                  <option value="featured">Sort · Featured</option>
                  <option value="price-asc">Price · Low to high</option>
                  <option value="price-desc">Price · High to low</option>
                  <option value="rating">Top rated</option>
                </select>
                <svg
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-cocoa"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mt-5 text-sm font-bold text-cocoa" aria-live="polite">
          Showing {filtered.length} of {PRODUCTS.length} roasts
          {category !== "all" && (
            <span className="ml-2 rounded-full bg-parchment px-2.5 py-0.5 text-xs">
              {CATEGORIES.find((c) => c.id === category)?.label}
            </span>
          )}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80} className="h-full">
                <ProductCard product={p} onQuickView={onQuickView} onAdd={onAdd} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-cocoa/40 bg-cream/60 px-6 py-20 text-center">
            <Bean className="mx-auto h-12 w-12 rotate-12 text-sand" />
            <h3 className="mt-5 font-display text-2xl font-semibold">
              Nothing in the hopper.
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed font-semibold text-cocoa">
              No beans match {query ? `“${query}”` : "that filter"}. Try a tasting
              note like <em className="font-display">“hazelnut”</em> or an origin
              like <em className="font-display">“Kenya”</em>.
            </p>
            <button
              type="button"
              onClick={reset}
              className="btn-sweep mt-6 rounded-full border border-espresso px-6 py-2.5 text-sm font-extrabold transition-colors hover:text-cream"
            >
              Clear search &amp; filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
