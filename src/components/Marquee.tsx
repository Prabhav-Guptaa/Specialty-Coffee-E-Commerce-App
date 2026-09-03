import { Fragment } from "react";
import { Bean } from "./icons";

const ITEMS = [
  "Free shipping over $40",
  "Roasted every Tuesday",
  "Bergamot · Apricot · Wild honey",
  "Ships within 48 hours",
  "Blackcurrant · Ruby grapefruit",
  "Direct trade, 14 farms",
  "Toasted hazelnut · Milk chocolate",
  "Compostable kraft bags",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {ITEMS.map((item, i) => (
        <Fragment key={i}>
          <span className="px-6 font-display text-sm font-medium italic tracking-wide whitespace-nowrap sm:text-base">
            {item}
          </span>
          <Bean className="h-4 w-4 shrink-0 opacity-70" />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-espresso/20 bg-copper py-2.5 text-cream">
      <div className="marquee-track flex w-max animate-marquee">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
