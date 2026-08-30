import { useState } from "react";
import type { FormEvent } from "react";
import { Bean, Check, Clock, Cup, Flame, Leaf, Pin, Truck } from "./icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setState("error");
      return;
    }
    setState("done");
  };

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer id="visit" className="relative scroll-mt-16 overflow-hidden bg-espresso text-paper">
      <Bean
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 rotate-12 text-bark/40"
      />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Newsletter */}
          <div>
            <p className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.3em] text-honey uppercase">
              <Bean className="h-3.5 w-3.5" /> The Sunday pour-over
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
              Stay steeped<span className="text-honey">.</span>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-paper/60">
              One email a week: what&rsquo;s dropping off the roaster, brew guides
              from the bar, and first dibs on micro-lots before they hit the counter.
            </p>
            {state === "done" ? (
              <p className="mt-6 flex max-w-md items-center gap-2.5 rounded-full border border-sage/50 bg-sage/15 px-5 py-3.5 text-sm font-extrabold text-honey">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage text-cream">
                  <Check className="h-3.5 w-3.5" />
                </span>
                You&rsquo;re on the list — first pour&rsquo;s on us.
              </p>
            ) : (
              <>
                <form onSubmit={subscribe} className="mt-6 flex max-w-md gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setState("idle");
                    }}
                    placeholder="you@firstlight.coffee"
                    aria-label="Email for newsletter"
                    className={`min-w-0 flex-1 rounded-full border bg-paper/10 px-5 py-3 text-sm font-semibold text-cream placeholder:text-paper/35 focus:ring-2 focus:outline-none ${
                      state === "error"
                        ? "border-rust focus:ring-rust/40"
                        : "border-paper/20 focus:border-honey focus:ring-honey/30"
                    }`}
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-copper px-6 py-3 text-sm font-extrabold text-cream transition-colors duration-300 hover:bg-honey hover:text-espresso"
                  >
                    Sign up
                  </button>
                </form>
                {state === "error" && (
                  <p className="mt-2 text-xs font-bold text-honey">
                    That email looks a little under-extracted — try again?
                  </p>
                )}
              </>
            )}
          </div>

          {/* Info columns */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.28em] text-honey uppercase">
                Visit the roastery
              </p>
              <ul className="mt-4 space-y-3.5 text-sm leading-relaxed font-semibold text-paper/75">
                <li className="flex items-start gap-2.5">
                  <Pin className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  214 NW Flanders St<br />Portland, OR 97209
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  Mon–Fri 7–5 · Sat–Sun 8–4
                  <br />
                  Roast tours Saturdays, 9 AM
                </li>
                <li className="flex items-start gap-2.5">
                  <Cup className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  Espresso bar, tasting flights, and a very opinionated grinder wall
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.28em] text-honey uppercase">
                Good to know
              </p>
              <ul className="mt-4 space-y-3.5 text-sm leading-relaxed font-semibold text-paper/75">
                <li className="flex items-start gap-2.5">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  Free shipping over $40, flat $4.50 under
                </li>
                <li className="flex items-start gap-2.5">
                  <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  Compostable kraft bags, carbon-neutral post
                </li>
                <li className="flex items-start gap-2.5">
                  <Flame className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                  Roast date stamped on every bag — never “best by” mystery
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
          <p className="text-xs font-semibold text-paper/45">
            © 2026 Emberline Roasters — a demo storefront. No real beans were harmed.
          </p>
          <button
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2.5 text-xs font-extrabold tracking-[0.14em] text-paper/70 uppercase transition-colors duration-300 hover:border-copper hover:bg-copper hover:text-cream"
          >
            Back to top
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
