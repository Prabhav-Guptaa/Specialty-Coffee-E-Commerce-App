interface IconProps {
  className?: string;
}

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Bean({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 3.5c4.14 0 7.5 3.8 7.5 8.5s-3.36 8.5-7.5 8.5S4.5 16.7 4.5 12 7.86 3.5 12 3.5Z" />
      <path d="M12 3.5c-2.6 3-2.6 5.6 0 8.5s2.6 5.5 0 8.5" />
    </svg>
  );
}

export function BeanSolid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.5c4.14 0 7.5 3.8 7.5 8.5s-3.36 8.5-7.5 8.5S4.5 16.7 4.5 12 7.86 3.5 12 3.5Z"
      />
      <path
        fill="none"
        stroke="#f5eddd"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12 3.5c-2.6 3-2.6 5.6 0 8.5s2.6 5.5 0 8.5"
      />
    </svg>
  );
}

export function Cup({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 9.5h13V15a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9.5Z" />
      <path d="M17 10.5h1.4a2.6 2.6 0 0 1 0 5.2H17" />
      <path d="M8.5 3.2c-.9 1.1.9 2.1 0 3.3M12.5 3.2c-.9 1.1.9 2.1 0 3.3" />
    </svg>
  );
}

export function Tote({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M5.4 8.5h13.2l-1.25 10.7a1.9 1.9 0 0 1-1.9 1.8H8.55a1.9 1.9 0 0 1-1.9-1.8L5.4 8.5Z" />
      <path d="M8.6 8.5V7a3.4 3.4 0 0 1 6.8 0v1.5" />
    </svg>
  );
}

export function Search({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m15.9 15.9 4.6 4.6" />
    </svg>
  );
}

export function Close({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  );
}

export function Minus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M5.5 12h13" />
    </svg>
  );
}

export function Trash({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M5 7h14M10 7V5.6A1.6 1.6 0 0 1 11.6 4h.8A1.6 1.6 0 0 1 14 5.6V7" />
      <path d="m7.2 7 .8 12a2 2 0 0 0 2 1.9h4a2 2 0 0 0 2-1.9l.8-12" />
      <path d="M10.4 11v6M13.6 11v6" />
    </svg>
  );
}

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M4 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Truck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M2.5 6.5h11.5v10H2.5zM14 10h3.8l3.2 3.2v3.3h-7" />
      <circle cx="7" cy="17.5" r="1.7" />
      <circle cx="16.8" cy="17.5" r="1.7" />
    </svg>
  );
}

export function Leaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M5 19C5 11 10 6 19 5c-.5 9-5.5 14-12 14" />
      <path d="M5 19c3-5.2 7-9.2 11-11.4" />
    </svg>
  );
}

export function Flame({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 3.5c1.1 2.6 4.5 4.7 4.5 8.6a4.5 4.5 0 0 1-9 0c0-1.6.6-2.9 1.5-4.1.3 1.1 1 1.8 1.8 2.2-.4-2.5.2-4.7 1.2-6.7Z" />
    </svg>
  );
}

export function Drop({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 3.5S6 10.2 6 14.6a6 6 0 0 0 12 0C18 10.2 12 3.5 12 3.5Z" />
    </svg>
  );
}

export function StarSolid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 3.4 2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.3l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7L12 3.4Z"
      />
    </svg>
  );
}

export function Mountain({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="m3 19 6.5-11 4 6.5L16 11l5 8H3Z" />
    </svg>
  );
}

export function Pin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.3" r="2.2" />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Mail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.6" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </svg>
  );
}

export function Card({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3.5 10h17M7 14.8h4" />
    </svg>
  );
}

export function Spinner({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function Sparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 4.5 13.7 10.3 19.5 12 13.7 13.7 12 19.5 10.3 13.7 4.5 12 10.3 10.3 12 4.5Z"
      />
    </svg>
  );
}
