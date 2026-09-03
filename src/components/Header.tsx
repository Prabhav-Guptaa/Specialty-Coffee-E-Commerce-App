import { Bean, Tote } from "./icons";

interface HeaderProps {
  count: number;
  onCart: () => void;
}

const LINKS = [
  { href: "#shop", label: "The Counter" },
  { href: "#craft", label: "Our Craft" },
  { href: "#visit", label: "Visit" },
];

export default function Header({ count, onCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-espresso/10 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-honey transition-transform duration-300 group-hover:rotate-12">
            <Bean className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[1.35rem] font-semibold tracking-tight">
              Emberline
            </span>
            <span className="mt-1 block text-[9px] font-bold tracking-[0.34em] text-cocoa uppercase">
              Roasters
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-bold tracking-wide text-bark transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-copper after:transition-all after:duration-300 hover:text-copper hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border border-espresso/15 px-3 py-1.5 text-xs font-bold text-bark lg:flex">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-sage" />
            Roast day · Tuesdays
          </span>
          <button
            type="button"
            onClick={onCart}
            aria-label={`Open crate, ${count} item${count === 1 ? "" : "s"}`}
            className="btn-sweep relative rounded-full border border-espresso/25 p-2.5 text-espresso transition-colors duration-300 hover:border-espresso hover:text-cream"
          >
            <Tote className="h-5 w-5" />
            {count > 0 && (
              <span
                key={count}
                className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] animate-pop items-center justify-center rounded-full bg-copper px-1 text-[11px] font-extrabold text-cream"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
