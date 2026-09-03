import Reveal from "./Reveal";
import { BeanSolid, Flame } from "./icons";

const STATS = [
  {
    value: "14",
    label: "Partner farms",
    copy: "Direct-trade relationships across six countries, paid 2× commodity at minimum.",
  },
  {
    value: "212°C",
    label: "Drop temperature",
    copy: "Hot enough for full development, never hot enough to scorch. Logged on every batch.",
  },
  {
    value: "48 h",
    label: "Roaster to courier",
    copy: "Beans rest overnight to settle their CO₂, then ride out while the aromatics peak.",
  },
  {
    value: "4.8★",
    label: "Average pour",
    copy: "From 2,140 verified cups rated by people who actually drank them.",
  },
];

export default function CraftBand() {
  return (
    <section id="craft" className="relative scroll-mt-20 bg-espresso text-paper">
      <Flame
        aria-hidden="true"
        className="pointer-events-none absolute top-10 right-8 h-24 w-24 text-copper/15"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.3em] text-honey uppercase">
              <BeanSolid className="h-3.5 w-3.5" /> Our craft
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] font-semibold sm:text-[2.75rem]">
              Twelve bags at a time.
              <span className="block font-light text-honey italic">Never more.</span>
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-paper/65">
              Big roasters optimize for throughput; we optimize for the six
              minutes inside the drum. Every batch is cupped the next morning,
              and anything under 86 points goes to the staff kitchen — not to you.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:pt-2">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className="border-l-2 border-copper/60 pl-5 transition-colors duration-300 hover:border-honey">
                <p className="font-display text-5xl font-semibold text-honey tabular">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-extrabold tracking-[0.24em] text-paper/50 uppercase">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
