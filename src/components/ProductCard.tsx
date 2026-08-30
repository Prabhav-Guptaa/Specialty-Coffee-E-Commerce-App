import { useRef, useState } from "react";
import { CATEGORY_LABEL, ROAST_LABEL, money } from "../data/products";
import type { Product } from "../data/products";
import { Bean, BeanSolid, Check, Pin, Plus, Search, StarSolid } from "./icons";

interface ProductCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
  onAdd: (p: Product) => void;
}

export default function ProductCard({ product, onQuickView, onAdd }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-espresso/10 bg-cream shadow-[0_1px_0_rgba(43,26,16,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-espresso/25 hover:shadow-[0_22px_44px_-20px_rgba(43,26,16,0.4)]">
      {/* Image */}
      <button
        type="button"
        onClick={() => onQuickView(product)}
        className="relative block w-full cursor-pointer overflow-hidden text-left"
        style={{ backgroundColor: product.tint }}
        aria-label={`Quick look at ${product.name}`}
      >
        <img
          src={product.image}
          alt={`${product.name} — ${product.origin} coffee bag`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-copper px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] text-cream uppercase shadow-md">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-espresso/85 px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-cream uppercase">
          {CATEGORY_LABEL[product.category]}
        </span>
        <span className="absolute inset-x-0 bottom-3 flex justify-center">
          <span className="inline-flex translate-y-3 items-center gap-1.5 rounded-full bg-espresso px-4 py-2 text-[11px] font-extrabold tracking-[0.12em] text-cream uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Search className="h-3.5 w-3.5" /> Quick look
          </span>
        </span>
      </button>

      {/* Body */}
      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="text-left font-display text-[1.35rem] leading-tight font-semibold transition-colors hover:text-copper"
          >
            {product.name}
          </button>
          <span className="font-display text-xl font-semibold whitespace-nowrap tabular">
            {money(product.price)}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-sm font-semibold text-cocoa">
          <Pin className="h-3.5 w-3.5 shrink-0 text-copper" />
          {product.origin} · {product.region.split("·").pop()?.trim()}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full bg-parchment px-2.5 py-1 text-xs font-bold text-bark transition-colors duration-200 group-hover:bg-sand/60"
            >
              {n}
            </span>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-bark/90">{product.description}</p>

        <div className="mt-auto flex items-center justify-between border-t border-espresso/10 pt-3.5">
          <span className="flex items-center gap-1" title={`Roast level: ${ROAST_LABEL[product.roastLevel]}`}>
            {[1, 2, 3, 4, 5].map((i) =>
              i <= product.roastLevel ? (
                <BeanSolid key={i} className="h-3.5 w-3.5 text-copper" />
              ) : (
                <Bean key={i} className="h-3.5 w-3.5 text-sand" />
              ),
            )}
            <span className="ml-1.5 text-xs font-bold text-cocoa">
              {ROAST_LABEL[product.roastLevel]}
            </span>
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-cocoa">
            <StarSolid className="h-3.5 w-3.5 text-caramel" />
            {product.rating}
            <span className="font-semibold text-latte">({product.reviews})</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-bold text-cocoa">{product.weight}</span>
          <button
            type="button"
            onClick={handleAdd}
            className={`btn-sweep inline-flex min-w-[7.5rem] items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-extrabold text-cream transition-colors duration-300 ${
              added ? "bg-sage" : "bg-copper"
            }`}
            // @ts-expect-error custom sweep color
            style={{ "--sweep": "#2b1a10" }}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
