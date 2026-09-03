import { useEffect, useRef, useState } from "react";
import {
  CATEGORY_LABEL,
  GRINDS,
  lastRoastDate,
  money,
} from "../data/products";
import type { Product } from "../data/products";
import {
  Bean,
  Check,
  Close,
  Drop,
  Leaf,
  Minus,
  Mountain,
  Plus,
  Sparkle,
  StarSolid,
  Truck,
} from "./icons";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAdd: (p: Product, grind: string, qty: number) => void;
}

export default function ProductModal({ product, onClose, onAdd }: ProductModalProps) {
  const [grind, setGrind] = useState<string>("Whole bean");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [armed, setArmed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    setGrind("Whole bean");
    setQty(1);
    setAdded(false);
    setArmed(false);
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setArmed(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, [product?.id]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const meters = [
    { label: "Acidity", value: product.profile.acidity, bar: "bg-caramel", Icon: Drop },
    { label: "Body", value: product.profile.body, bar: "bg-espresso", Icon: Bean },
    { label: "Sweetness", value: product.profile.sweetness, bar: "bg-honey", Icon: Sparkle },
  ];

  const handleAdd = () => {
    onAdd(product, grind, qty);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
    >
      <div className="absolute inset-0 animate-fade bg-espresso/70" onClick={onClose} />

      <div className="relative grid max-h-[94vh] w-full max-w-4xl animate-scale-in grid-rows-[auto_1fr] overflow-hidden rounded-t-2xl bg-paper shadow-2xl sm:rounded-xl md:grid-cols-2 md:grid-rows-1">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute top-3.5 right-3.5 z-20 rounded-full bg-espresso/85 p-2.5 text-cream transition-transform duration-300 hover:rotate-90 hover:bg-copper"
        >
          <Close className="h-4 w-4" />
        </button>

        {/* Image side */}
        <div className="relative max-h-56 overflow-hidden md:max-h-none" style={{ backgroundColor: product.tint }}>
          <img
            src={product.image}
            alt={`${product.name} coffee bag`}
            className="h-full w-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-3.5 left-3.5 rounded-full bg-copper px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-cream uppercase shadow-md">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details side */}
        <div className="flex flex-col gap-5 overflow-y-auto p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-parchment px-2.5 py-1 text-[10px] font-extrabold tracking-[0.16em] text-bark uppercase">
                {CATEGORY_LABEL[product.category]}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-cocoa">
                <StarSolid className="h-3.5 w-3.5 text-caramel" />
                {product.rating} · {product.reviews} pours
              </span>
            </div>
            <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h3>
            <p className="mt-1 font-display text-2xl font-semibold text-copper tabular">
              {money(product.price)}
              <span className="ml-2 text-sm font-bold text-cocoa">{product.weight}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm font-semibold text-cocoa">
            <span className="flex items-center gap-1.5">
              <Mountain className="h-4 w-4 text-copper" /> {product.altitude}
            </span>
            <span className="flex items-center gap-1.5">
              <Drop className="h-4 w-4 text-copper" /> {product.process}
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-copper" /> {product.varietal}
            </span>
          </div>

          <p className="leading-relaxed text-bark">{product.description}</p>

          {/* Cup profile meters */}
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.28em] text-cocoa uppercase">
              In the cup
            </p>
            <div className="mt-3 space-y-2.5">
              {meters.map(({ label, value, bar, Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-cocoa" />
                  <span className="w-20 shrink-0 text-sm font-bold">{label}</span>
                  <div className="h-1.5 grow overflow-hidden rounded-full bg-parchment">
                    <div
                      className={`h-full rounded-full ${bar} transition-[width] duration-1000 ease-out`}
                      style={{ width: armed ? `${value}%` : "0%" }}
                    />
                  </div>
                  <span className="w-8 text-right text-xs font-bold text-cocoa tabular">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {product.notes.map((n) => (
              <span key={n} className="rounded-full bg-parchment px-3 py-1.5 text-xs font-bold text-bark">
                {n}
              </span>
            ))}
          </div>

          <p className="border-l-2 border-copper/60 pl-4 text-sm leading-relaxed text-bark italic">
            From the roastery — {product.story}
          </p>

          {/* Grind */}
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.28em] text-cocoa uppercase">
              Grind
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {GRINDS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrind(g)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-bold transition-all duration-200 ${
                    grind === g
                      ? "border-espresso bg-espresso text-cream shadow-[2px_2px_0_rgba(180,83,43,0.55)]"
                      : "border-espresso/25 text-bark hover:border-copper hover:text-copper"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + add */}
          <div className="mt-auto flex flex-col gap-3 border-t border-espresso/10 pt-5 sm:flex-row sm:items-center">
            <div className="inline-flex shrink-0 items-center self-start rounded-full border border-espresso/25">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
                className="p-2.5 text-bark transition-colors hover:text-copper disabled:opacity-30 disabled:hover:text-bark"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-base font-extrabold tabular">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(12, q + 1))}
                disabled={qty >= 12}
                aria-label="Increase quantity"
                className="p-2.5 text-bark transition-colors hover:text-copper disabled:opacity-30 disabled:hover:text-bark"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={`btn-sweep inline-flex grow items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-cream transition-colors duration-300 ${
                added ? "bg-sage" : "bg-copper"
              }`}
              // @ts-expect-error custom sweep color
              style={{ "--sweep": "#2b1a10" }}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> In the crate
                </>
              ) : (
                <>Add to crate — {money(product.price * qty)}</>
              )}
            </button>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-bold text-cocoa">
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-copper" /> Roasted {lastRoastDate()} · ships Wed
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="h-4 w-4 text-copper" /> Compostable kraft bag
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
