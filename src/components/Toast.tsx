import { Check } from "./icons";

export interface ToastItem {
  id: number;
  msg: string;
}

export default function Toast({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex animate-rise items-center gap-2.5 rounded-full border border-cream/15 bg-espresso py-2.5 pr-5 pl-2.5 text-cream shadow-[0_16px_40px_-12px_rgba(43,26,16,0.6)]"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage">
            <Check className="h-3.5 w-3.5 text-cream" />
          </span>
          <span className="text-sm font-bold">{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
