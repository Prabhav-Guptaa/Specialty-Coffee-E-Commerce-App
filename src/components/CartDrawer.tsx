import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useCart } from "../context/CartContext";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, PROMO_CODES, money } from "../data/products";
import { ArrowRight, Bean, Check, Close, Minus, Plus, Trash, Truck } from "./icons";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  promo: string | null;
  onApplyPromo: (code: string) => boolean;
  onClearPromo: () => void;
}

export default function CartDrawer({
  open,
  onClose,
  onCheckout,
  promo,
  onApplyPromo,
  onClearPromo,
}: CartDrawerProps) {
  const { items, count, subtotal, setQty, remove } = useCart();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const discount = promo ? subtotal * (PROMO_CODES[promo] ?? 0) : 0;
  const shipBase = subtotal - discount;
  const shipping = items.length === 0 || shipBase >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = shipBase + shipping;
  const progress = Math.min(100, (shipBase / FREE_SHIPPING_THRESHOLD) * 100);
  const remaining = FREE_SHIPPING_THRESHOLD - shipBase;

  const submitPromo = (e: FormEvent) => {
    e.preventDefault();
    const ok = onApplyPromo(code.trim());
    setError(!ok);
    if (ok) setCode("");
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping crate">
      <div className="absolute inset-0 animate-fade bg-espresso/60" onClick={onClose} />

      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md animate-slide-in flex-col border-l border-espresso/15 bg-paper shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <h2 className="font-display text-2xl font-semibold">
            Your crate
            {count > 0 && (
              <span className="ml-2.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-copper px-1.5 text-xs font-extrabold text-cream">
                {count}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close crate"
            className="rounded-full p-2 text-bark transition-all duration-300 hover:rotate-90 hover:bg-parchment hover:text-espresso"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex grow flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-parchment">
              <Bean className="h-9 w-9 rotate-12 text-cocoa" />
            </span>
            <h3 className="font-display text-2xl font-semibold">Nothing in the crate yet.</h3>
            <p className="text-sm leading-relaxed font-semibold text-cocoa">
              Six roasts are waiting on the counter — freshly dropped and still warm.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-sweep mt-2 rounded-full bg-espresso px-6 py-3 text-sm font-extrabold text-cream"
            >
              Browse the beans
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping meter */}
            <div className="border-b border-espresso/10 bg-cream/70 px-5 py-3.5">
              <p className="flex items-center gap-2 text-xs font-bold text-bark">
                <Truck className="h-4 w-4 text-copper" />
                {shipping === 0 ? (
                  <span className="text-sage">Free shipping unlocked — nice pour.</span>
                ) : (
                  <span>
                    <span className="text-copper tabular">{money(remaining)}</span> away from
                    free shipping
                  </span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-parchment">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    shipping === 0 ? "bg-sage" : "bg-copper"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <ul className="grow divide-y divide-espresso/10 overflow-y-auto px-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3.5 py-4">
                  <div
                    className="h-20 w-16 shrink-0 overflow-hidden rounded-lg border border-espresso/15"
                    style={{ backgroundColor: item.product.tint }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex grow flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base leading-tight font-semibold">
                          {item.product.name}
                        </p>
                        <p className="mt-0.5 text-xs font-bold text-cocoa">
                          {item.grind} · {money(item.product.price)} ea
                        </p>
                      </div>
                      <p className="font-display text-base font-semibold tabular">
                        {money(item.product.price * item.qty)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="inline-flex items-center rounded-full border border-espresso/25">
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          disabled={item.qty <= 1}
                          aria-label={`Decrease ${item.product.name} quantity`}
                          className="p-1.5 text-bark transition-colors hover:text-copper disabled:opacity-30"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-extrabold tabular">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          disabled={item.qty >= 12}
                          aria-label={`Increase ${item.product.name} quantity`}
                          className="p-1.5 text-bark transition-colors hover:text-copper disabled:opacity-30"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(item.key)}
                        aria-label={`Remove ${item.product.name}`}
                        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold text-cocoa transition-colors hover:bg-rust/10 hover:text-rust"
                      >
                        <Trash className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-espresso/10 bg-cream/70 px-5 py-5">
              {/* Promo */}
              {promo ? (
                <div className="flex items-center justify-between rounded-lg border border-sage/40 bg-sage/10 px-3.5 py-2.5">
                  <span className="flex items-center gap-2 text-xs font-extrabold text-sage">
                    <Check className="h-4 w-4" /> {promo} — 10% off applied
                  </span>
                  <button
                    type="button"
                    onClick={onClearPromo}
                    className="text-xs font-bold text-cocoa underline-offset-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={submitPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.toUpperCase());
                      setError(false);
                    }}
                    placeholder="Promo code"
                    aria-label="Promo code"
                    className={`min-w-0 flex-1 rounded-full border bg-paper px-4 py-2 text-sm font-bold placeholder:font-semibold placeholder:text-latte focus:ring-2 focus:outline-none ${
                      error
                        ? "border-rust focus:ring-rust/30"
                        : "border-espresso/20 focus:border-copper focus:ring-copper/30"
                    }`}
                  />
                  <button
                    type="submit"
                    className="rounded-full border border-espresso px-4 py-2 text-sm font-extrabold transition-colors hover:bg-espresso hover:text-cream"
                  >
                    Apply
                  </button>
                </form>
              )}
              {error && (
                <p className="mt-2 text-xs font-bold text-rust">
                  That code didn&rsquo;t pull a shot. Try <span className="font-extrabold">FRESHROAST</span>.
                </p>
              )}
              {!promo && !error && (
                <p className="mt-2 text-xs font-semibold text-latte">
                  Psst — the house code is FRESHROAST.
                </p>
              )}

              {/* Totals */}
              <dl className="mt-4 space-y-1.5 text-sm font-bold">
                <div className="flex justify-between text-bark">
                  <dt>Subtotal</dt>
                  <dd className="tabular">{money(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sage">
                    <dt>Discount ({promo})</dt>
                    <dd className="tabular">−{money(discount)}</dd>
                  </div>
                )}
                <div className="flex justify-between text-bark">
                  <dt>Shipping</dt>
                  <dd className="tabular">{shipping === 0 ? "Free" : money(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-espresso/15 pt-2.5 font-display text-lg font-semibold text-espresso">
                  <dt>Total</dt>
                  <dd className="tabular">{money(total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={onCheckout}
                className="btn-sweep group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-espresso py-3.5 text-sm font-extrabold text-cream"
              >
                Check out · {money(total)}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-2.5 w-full text-center text-xs font-bold text-cocoa underline-offset-2 hover:underline"
              >
                or keep browsing
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
