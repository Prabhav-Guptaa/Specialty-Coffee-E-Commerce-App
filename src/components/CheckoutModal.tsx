import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import confetti from "canvas-confetti";
import { useCart } from "../context/CartContext";
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, PROMO_CODES, money } from "../data/products";
import { ArrowRight, Card, Check, Close, Spinner, Truck } from "./icons";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  onBackToCart: () => void;
  promo: string | null;
  onClearPromo: () => void;
}

const STEPS = ["Details", "Payment", "Done"];

const inputCls =
  "w-full rounded-lg border border-espresso/20 bg-cream px-3.5 py-2.5 text-sm font-semibold placeholder:font-medium placeholder:text-latte focus:border-copper focus:ring-2 focus:ring-copper/30 focus:outline-none";

function Field({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[10px] font-extrabold tracking-[0.2em] text-cocoa uppercase">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs font-bold text-rust">{error}</span>}
    </label>
  );
}

interface OrderSummary {
  id: string;
  email: string;
  first: string;
  total: number;
  count: number;
  delivery: string;
}

export default function CheckoutModal({
  open,
  onClose,
  onBackToCart,
  promo,
  onClearPromo,
}: CheckoutModalProps) {
  const { items, count, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [form, setForm] = useState({
    email: "",
    first: "",
    last: "",
    address: "",
    city: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  useEffect(() => {
    if (open) return;
    setStep(0);
    setProcessing(false);
    setErrors({});
    setOrder(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !processing) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, processing, onClose]);

  if (!open) return null;

  const discount = promo ? subtotal * (PROMO_CODES[promo] ?? 0) : 0;
  const shipBase = subtotal - discount;
  const shipping = items.length === 0 || shipBase >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = shipBase + shipping;

  const set = (key: keyof typeof form) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const validateDetails = () => {
    const e: Record<string, string> = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.first.trim()) e.first = "Required";
    if (!form.last.trim()) e.last = "Required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    return e;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (!form.cardName.trim()) e.cardName = "Required";
    if (form.cardNumber.replace(/\s/g, "").length !== 16)
      e.cardNumber = "16 digits, any will do";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits";
    return e;
  };

  const submitDetails = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validateDetails();
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(1);
  };

  const submitPayment = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validatePayment();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setProcessing(true);
    const delivery = new Date(Date.now() + 5 * 86400000).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const summary: OrderSummary = {
      id: `EM-${Math.floor(100000 + Math.random() * 900000)}`,
      email: form.email,
      first: form.first,
      total,
      count,
      delivery,
    };

    window.setTimeout(() => {
      setOrder(summary);
      setProcessing(false);
      setStep(2);
      clear();
      onClearPromo();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({
          particleCount: 130,
          spread: 78,
          origin: { y: 0.62 },
          colors: ["#B4532B", "#E4A85B", "#C9803D", "#FBF6EA", "#71804E", "#2B1A10"],
        });
      }
    }, 1600);
  };

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length <= 2) return d;
    return `${d.slice(0, 2)}/${d.slice(2)}`;
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div
        className="absolute inset-0 animate-fade bg-espresso/70"
        onClick={() => !processing && onClose()}
      />

      <div className="relative flex max-h-[94vh] w-full max-w-3xl animate-scale-in flex-col overflow-hidden rounded-t-2xl bg-paper shadow-2xl sm:max-h-[88vh] sm:rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-4">
          <h2 className="font-display text-2xl font-semibold">
            {step === 2 ? "Order confirmed" : "Checkout"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={processing}
            aria-label="Close checkout"
            className="rounded-full p-2 text-bark transition-all duration-300 hover:rotate-90 hover:bg-parchment hover:text-espresso disabled:opacity-30"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 px-6 pt-5">
          {STEPS.map((label, i) => {
            const done = step > i;
            const active = step === i;
            return (
              <div key={label} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-all duration-300 ${
                    done
                      ? "bg-sage text-cream"
                      : active
                        ? "bg-espresso text-cream shadow-[2px_2px_0_rgba(180,83,43,0.55)]"
                        : "border border-espresso/25 text-cocoa"
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span
                  className={`text-[10px] font-extrabold tracking-[0.18em] uppercase ${
                    active ? "text-espresso" : "text-cocoa/70"
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className={`h-px flex-1 ${done ? "bg-sage" : "bg-espresso/15"}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grow overflow-y-auto p-6">
          {step === 2 && order ? (
            /* ── Done ── */
            <div className="flex flex-col items-center py-6 text-center">
              <svg viewBox="0 0 64 64" className="h-20 w-20">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#71804E" strokeWidth="3" opacity="0.25" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#71804E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="176"
                  strokeDashoffset="176"
                  transform="rotate(-90 32 32)"
                  style={{ animation: "draw-check 0.8s 0.1s cubic-bezier(0.22,1,0.36,1) forwards" }}
                />
                <path
                  d="M20 33.5 28.5 42 45 24"
                  fill="none"
                  stroke="#71804E"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="draw-check"
                />
              </svg>
              <h3 className="mt-5 font-display text-3xl font-semibold">
                Order {order.id} is in.
              </h3>
              <p className="mt-3 max-w-md leading-relaxed text-bark">
                Thanks, {order.first || "friend"} — a confirmation is headed to{" "}
                <span className="font-extrabold">{order.email}</span>. Your{" "}
                {order.count} bag{order.count === 1 ? "" : "s"} drop off the roaster
                Tuesday and ride out Wednesday.
              </p>
              <p className="mt-4 flex items-center gap-2 rounded-full border border-sage/40 bg-sage/10 px-4 py-2 text-sm font-extrabold text-sage">
                <Truck className="h-4 w-4" /> Arriving by {order.delivery} · paid {money(order.total)}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-sweep group mt-7 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-sm font-extrabold text-cream"
              >
                Back to the roastery
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            <div className="mt-5 grid gap-8 md:grid-cols-[1fr_15rem]">
              {/* ── Forms ── */}
              {step === 0 ? (
                <form onSubmit={submitDetails} noValidate className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" error={errors.email} className="sm:col-span-2">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      placeholder="you@firstlight.coffee"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="First name" error={errors.first}>
                    <input
                      type="text"
                      value={form.first}
                      onChange={(e) => set("first")(e.target.value)}
                      placeholder="Jo"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Last name" error={errors.last}>
                    <input
                      type="text"
                      value={form.last}
                      onChange={(e) => set("last")(e.target.value)}
                      placeholder="Barista"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Street address" error={errors.address} className="sm:col-span-2">
                    <input
                      type="text"
                      value={form.address}
                      onChange={(e) => set("address")(e.target.value)}
                      placeholder="214 NW Flanders St"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="City" error={errors.city}>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => set("city")(e.target.value)}
                      placeholder="Portland"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="ZIP" error={errors.zip}>
                    <input
                      type="text"
                      value={form.zip}
                      onChange={(e) => set("zip")(e.target.value)}
                      placeholder="97209"
                      className={inputCls}
                    />
                  </Field>
                  <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={onBackToCart}
                      className="text-sm font-bold text-cocoa underline-offset-2 hover:underline"
                    >
                      ← Back to crate
                    </button>
                    <button
                      type="submit"
                      className="btn-sweep group inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-7 py-3 text-sm font-extrabold text-cream"
                    >
                      Continue to payment
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={submitPayment} noValidate className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name on card" error={errors.cardName} className="sm:col-span-2">
                    <input
                      type="text"
                      value={form.cardName}
                      onChange={(e) => set("cardName")(e.target.value)}
                      placeholder="Jo Barista"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Card number" error={errors.cardNumber} className="sm:col-span-2">
                    <div className="relative">
                      <Card className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-cocoa" />
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={(e) => set("cardNumber")(formatCard(e.target.value))}
                        placeholder="4242 4242 4242 4242"
                        className={`${inputCls} pl-10 tabular`}
                      />
                    </div>
                  </Field>
                  <Field label="Expiry" error={errors.expiry}>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.expiry}
                      onChange={(e) => set("expiry")(formatExpiry(e.target.value))}
                      placeholder="08/27"
                      className={`${inputCls} tabular`}
                    />
                  </Field>
                  <Field label="CVC" error={errors.cvc}>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={form.cvc}
                      onChange={(e) => set("cvc")(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      className={`${inputCls} tabular`}
                    />
                  </Field>
                  <p className="rounded-lg border border-dashed border-cocoa/40 bg-cream/70 px-3.5 py-2.5 text-xs font-semibold text-cocoa sm:col-span-2">
                    Demo checkout — any numbers work, nothing is charged, no beans
                    are actually shipped. Yet.
                  </p>
                  <div className="mt-2 flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      disabled={processing}
                      className="text-sm font-bold text-cocoa underline-offset-2 hover:underline disabled:opacity-50"
                    >
                      ← Back to details
                    </button>
                    <button
                      type="submit"
                      disabled={processing}
                      className="btn-sweep inline-flex min-w-[13rem] items-center justify-center gap-2 rounded-full bg-copper px-7 py-3 text-sm font-extrabold text-cream transition-colors disabled:opacity-80"
                      // @ts-expect-error custom sweep color
                      style={{ "--sweep": "#2b1a10" }}
                    >
                      {processing ? (
                        <>
                          <Spinner className="h-4 w-4 animate-spin" /> Pulling the shot…
                        </>
                      ) : (
                        <>Pay {money(total)}</>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* ── Summary ── */}
              <aside className="h-fit rounded-xl border border-espresso/15 bg-cream/80 p-4">
                <p className="text-[10px] font-extrabold tracking-[0.24em] text-cocoa uppercase">
                  Order summary
                </p>
                <ul className="mt-3 space-y-2 border-b border-espresso/10 pb-3">
                  {items.map((i) => (
                    <li key={i.key} className="flex justify-between gap-2 text-sm font-bold">
                      <span className="text-bark">
                        {i.qty}× {i.product.name}
                        <span className="block text-xs font-semibold text-cocoa">{i.grind}</span>
                      </span>
                      <span className="tabular">{money(i.product.price * i.qty)}</span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-3 space-y-1.5 text-sm font-bold text-bark">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd className="tabular">{money(subtotal)}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sage">
                      <dt>{promo}</dt>
                      <dd className="tabular">−{money(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt>Shipping</dt>
                    <dd className="tabular">{shipping === 0 ? "Free" : money(shipping)}</dd>
                  </div>
                  <div className="flex justify-between border-t border-espresso/15 pt-2 font-display text-base font-semibold">
                    <dt>Total</dt>
                    <dd className="tabular">{money(total)}</dd>
                  </div>
                </dl>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
