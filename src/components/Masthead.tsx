import type { CSSProperties } from "react";
import { FEATURED, lastRoastDate, money } from "../data/products";
import type { Product } from "../data/products";
import Reveal from "./Reveal";
import { ArrowRight, Bean, BeanSolid, Cup, Sparkle, StarSolid } from "./icons";

interface MastheadProps {
  onQuickView: (p: Product) => void;
}

function RotatingStamp() {
  return (
    <div className="relative h-24 w-24 shrink-0 text-bark sm:h-28 sm:w-28">
      <svg viewBox="0 0 120 120" className="h-full w-full animate-spin-slow">
        <defs>
          <path id="stamp-circ" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" />
        </defs>
        <text className="fill-current text-[10.5px] font-bold tracking-[2.6px] uppercase">
          <textPath href="#stamp-circ" textLength="278" lengthAdjust="spacingAndGlyphs">
            Fresh roast · small batch · fresh roast ·
          </textPath>
        </text>
      </svg>
      <BeanSolid className="absolute top-1/2 left-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-copper" />
    </div>
  );
}

export default function Masthead({ onQuickView }: MastheadProps) {
  const roastDate = lastRoastDate();

  return (
    <section className="relative overflow-hidden">
      {/* ambient warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[34rem] w-[34rem] rounded-full opacity-50"
        style={{ background: "radial-gradient(circle, #e4a85b55 0%, transparent 65%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 -left-40 h-[30rem] w-[30rem] rounded-full opacity-40"
        style={{ background: "radial-gradient(circle, #b4532b33 0%, transparent 65%)" }}
      />
      <BeanSolid
        aria-hidden="true"
        className="pointer-events-none absolute top-24 left-[46%] hidden h-8 w-8 animate-floaty text-copper/30 lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 left-[6%] hidden animate-floaty lg:block"
        style={{ "--r": "24deg", animationDelay: "1.4s" } as CSSProperties}
      >
        <BeanSolid className="h-6 w-6 text-caramel/40" />
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-14 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-20 lg:pb-24">
        {/* Left — the pitch */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3">
              <Bean className="h-4 w-4 shrink-0 text-copper" />
              <span className="text-[11px] font-extrabold tracking-[0.3em] text-cocoa uppercase">
                Small-batch roastery — Portland, OR
              </span>
              <span className="hidden h-px flex-1 bg-espresso/20 sm:block" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-6 font-display text-[2.7rem] leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-[4.3rem]">
              Roasted at first light.
              <span className="mt-2 block font-light text-copper italic">
                On your porch by Friday.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bark">
              Six single-origin lots and blends, roasted twelve bags at a time on
              our 1962 Probat. Order by Sunday night and your beans leave the
              roastery while they&rsquo;re still singing.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#shop"
                className="btn-sweep group inline-flex items-center gap-2.5 rounded-full bg-espresso px-7 py-3.5 text-sm font-extrabold tracking-wide text-cream transition-colors duration-300"
              >
                Browse the counter
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <button
                type="button"
                onClick={() => onQuickView(FEATURED)}
                className="group inline-flex items-center gap-2 border-b-2 border-copper/40 pb-1 text-sm font-extrabold text-copper transition-colors hover:border-copper hover:text-espresso"
              >
                <Cup className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
                Meet this week&rsquo;s roast
              </button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-10 flex max-w-xl items-center justify-between gap-6 rounded-xl border border-dashed border-cocoa/50 bg-cream/70 px-5 py-4">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.28em] text-cocoa uppercase">
                  Next roast
                </p>
                <p className="mt-1 font-display text-2xl font-semibold">
                  Tuesday, {roastDate}
                </p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs font-semibold text-cocoa">
                  <span>Drop 212°C</span>
                  <BeanSolid className="h-2.5 w-2.5 text-copper" />
                  <span>12 bags</span>
                  <BeanSolid className="h-2.5 w-2.5 text-copper" />
                  <span>Ships Wed</span>
                </p>
              </div>
              <RotatingStamp />
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-cocoa">
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarSolid key={i} className="h-3.5 w-3.5 text-caramel" />
                ))}
              </span>
              <span>4.8 from 1,100+ pours</span>
              <span className="hidden items-center gap-1.5 sm:flex">
                <Sparkle className="h-3.5 w-3.5 text-copper" />
                Roasted fresh {roastDate}
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — this week's cup */}
        <div className="relative lg:col-span-5">
          <Reveal delay={200} className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-xl border border-espresso/20 bg-parchment"
            />
            <button
              type="button"
              onClick={() => onQuickView(FEATURED)}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border-[3px] border-espresso text-left"
              aria-label={`View ${FEATURED.name}`}
            >
              <img
                src={FEATURED.image}
                alt={`A freshly brewed cup of ${FEATURED.name}`}
                className="aspect-[4/5] w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
              />
              <span className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-cream/25 bg-espresso/85 px-4 py-3 text-cream backdrop-blur-sm">
                <span>
                  <span className="block text-[10px] font-extrabold tracking-[0.24em] text-honey uppercase">
                    This week at the roastery
                  </span>
                  <span className="font-display text-lg font-semibold">
                    {FEATURED.name} · {FEATURED.origin}
                  </span>
                </span>
                <span className="font-display text-xl font-semibold text-honey tabular">
                  {money(FEATURED.price)}
                </span>
              </span>
            </button>

            {/* price sticker */}
            <span className="absolute -top-4 -left-3 -rotate-6 rounded-full border border-espresso bg-honey px-4 py-2 font-display text-sm font-semibold text-espresso shadow-[3px_3px_0_rgba(43,26,16,0.25)] sm:-left-6">
              {FEATURED.notes[0]} + {FEATURED.notes[1]}
            </span>

            {/* floating beans */}
            <span
              aria-hidden="true"
              className="absolute -right-4 top-10 animate-floaty"
              style={{ "--r": "18deg" } as CSSProperties}
            >
              <BeanSolid className="h-9 w-9 text-copper" />
            </span>
            <span
              aria-hidden="true"
              className="absolute -bottom-5 right-16 animate-floaty"
              style={{ "--r": "-30deg", animationDelay: "0.8s" } as CSSProperties}
            >
              <BeanSolid className="h-7 w-7 text-espresso/70" />
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
