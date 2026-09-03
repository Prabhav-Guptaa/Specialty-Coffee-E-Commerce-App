export type CategoryId = "light" | "medium" | "dark" | "blend" | "decaf";

export interface Product {
  id: string;
  name: string;
  origin: string;
  region: string;
  category: CategoryId;
  price: number;
  weight: string;
  badge?: string;
  notes: [string, string, string];
  roastLevel: 1 | 2 | 3 | 4 | 5;
  profile: { acidity: number; body: number; sweetness: number };
  altitude: string;
  process: string;
  varietal: string;
  rating: number;
  reviews: number;
  description: string;
  story: string;
  image: string;
  tint: string;
}

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "All beans" },
  { id: "light", label: "Light roast" },
  { id: "medium", label: "Medium roast" },
  { id: "dark", label: "Dark roast" },
  { id: "blend", label: "Espresso blend" },
  { id: "decaf", label: "Decaf" },
];

export const CATEGORY_LABEL: Record<CategoryId, string> = {
  light: "Light roast",
  medium: "Medium roast",
  dark: "Dark roast",
  blend: "Espresso blend",
  decaf: "Decaf",
};

export const ROAST_LABEL: Record<number, string> = {
  1: "Blonde",
  2: "Light",
  3: "Medium",
  4: "Medium-dark",
  5: "Dark",
};

export const GRINDS = [
  "Whole bean",
  "Espresso",
  "Pour over",
  "French press",
  "Cold brew",
] as const;

export const FREE_SHIPPING_THRESHOLD = 40;
export const FLAT_SHIPPING = 4.5;
export const PROMO_CODES: Record<string, number> = { FRESHROAST: 0.1 };

export const money = (n: number) =>
  `$${n.toFixed(2).replace(/\.00$/, "")}`;

export const PRODUCTS: Product[] = [
  {
    id: "dawn-patrol",
    name: "Dawn Patrol",
    origin: "Ethiopia",
    region: "Yirgacheffe · Gedeb",
    category: "light",
    price: 19.5,
    weight: "12 oz / 340 g",
    badge: "Roaster's pick",
    notes: ["bergamot", "apricot", "wild honey"],
    roastLevel: 2,
    profile: { acidity: 85, body: 35, sweetness: 70 },
    altitude: "1,950 – 2,200 m",
    process: "Washed",
    varietal: "Heirloom",
    rating: 4.9,
    reviews: 214,
    description:
      "A luminous washed heirloom from the Gedeb highlands — floral, tea-like, and impossibly clean.",
    story:
      "We buy this lot directly from a washing-station co-op of 412 smallholder farmers, paying 2.4× the commodity price. A gentle Nordic-style roast keeps the florals ringing without tipping into grass.",
    image:
      "https://image.qwenlm.ai/generated-images/06c926a1-c2e1-4fe9-8863-763927033d64/_result.png",
    tint: "#f3e3c6",
  },
  {
    id: "paper-lantern",
    name: "Paper Lantern",
    origin: "Kenya",
    region: "Nyeri AA · Othaya",
    category: "light",
    price: 21,
    weight: "12 oz / 340 g",
    badge: "New crop",
    notes: ["blackcurrant", "ruby grapefruit", "demerara"],
    roastLevel: 2,
    profile: { acidity: 92, body: 42, sweetness: 64 },
    altitude: "1,800 – 2,000 m",
    process: "Washed, double-fermented",
    varietal: "SL28 · SL34",
    rating: 4.8,
    reviews: 96,
    description:
      "Electric Kenyan acidity with a syrupy blackcurrant core. Loud, juicy, unapologetic.",
    story:
      "SL28 is the varietal that made Kenyan coffee famous, and this AA lot is a textbook example — phosphoric sparkle up front, a long demerara finish behind it. Our brightest roast of the year.",
    image:
      "https://image.qwenlm.ai/generated-images/c77a6e19-1189-4164-acd9-0538d88625ba/_result.png",
    tint: "#f4dbc9",
  },
  {
    id: "velvet-hour",
    name: "Velvet Hour",
    origin: "Colombia",
    region: "Huila · Finca La Cima",
    category: "medium",
    price: 17,
    weight: "12 oz / 340 g",
    notes: ["caramel", "red plum", "cacao nib"],
    roastLevel: 3,
    profile: { acidity: 58, body: 66, sweetness: 82 },
    altitude: "1,700 m",
    process: "Washed",
    varietal: "Pink Bourbon",
    rating: 4.8,
    reviews: 187,
    description:
      "Our house medium — round and comforting, with stone-fruit brightness under a blanket of caramel.",
    story:
      "The Herrera family has farmed La Cima for three generations. Their pink bourbon trees grow under native shade, ripening slowly into this plush, plum-sweet cup. It's the coffee our own baristas drink at home.",
    image:
      "https://image.qwenlm.ai/generated-images/ac68524a-e51d-4784-8b00-cec31e0ae213/_result.png",
    tint: "#ecd2c4",
  },
  {
    id: "hearth-home",
    name: "Hearth & Home",
    origin: "Brazil + Guatemala",
    region: "Cerrado · Huehuetenango",
    category: "blend",
    price: 15.5,
    weight: "12 oz / 340 g",
    badge: "Best seller",
    notes: ["toasted hazelnut", "milk chocolate", "brown sugar"],
    roastLevel: 4,
    profile: { acidity: 38, body: 86, sweetness: 76 },
    altitude: "1,200 – 1,800 m",
    process: "Natural + washed",
    varietal: "Mundo Novo · Caturra",
    rating: 4.9,
    reviews: 412,
    description:
      "Built for milk and built to last — our espresso blend pulls syrupy shots with a hazelnut-crema finish.",
    story:
      "Two coffees, one job: comfort. A natural Brazilian base supplies chocolate and weight, while a washed Guatemalan keeps things sweet and clean. Dial it once and it behaves all month.",
    image:
      "https://image.qwenlm.ai/generated-images/4e4d7c65-161a-4022-b34f-df4d051bb89f/_result.png",
    tint: "#eed9b6",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    origin: "Indonesia",
    region: "Sumatra · Mandheling",
    category: "dark",
    price: 16.5,
    weight: "12 oz / 340 g",
    notes: ["dark chocolate", "molasses", "cedar"],
    roastLevel: 5,
    profile: { acidity: 24, body: 94, sweetness: 58 },
    altitude: "1,100 – 1,500 m",
    process: "Wet-hulled (giling basah)",
    varietal: "Ateng · Jember",
    rating: 4.7,
    reviews: 166,
    description:
      "A brooding, full-throttle dark roast — smoldering chocolate and cedar, zero bitterness if you brew it bold.",
    story:
      "Wet-hulling gives Sumatra its famous heavy body, and we push the roast to the edge of second crack without crossing it. The result is dark chocolate, not charcoal. French-press heaven.",
    image:
      "https://image.qwenlm.ai/generated-images/964c03b0-6e04-490e-a9e5-89104b08a0b6/_result.png",
    tint: "#e2d2bd",
  },
  {
    id: "moonless",
    name: "Moonless",
    origin: "Colombia",
    region: "Cauca · Sugarcane EA",
    category: "decaf",
    price: 17.5,
    weight: "12 oz / 340 g",
    badge: "9 PM approved",
    notes: ["toffee", "almond", "orange blossom"],
    roastLevel: 3,
    profile: { acidity: 48, body: 62, sweetness: 86 },
    altitude: "1,750 m",
    process: "Sugarcane E.A. decaf",
    varietal: "Castillo",
    rating: 4.8,
    reviews: 98,
    description:
      "Decaf that refuses to apologize — sugarcane decaffeination keeps every ounce of toffee sweetness intact.",
    story:
      "Most decaf is an afterthought. Ours starts with a genuinely great Cauca lot, decaffeinated gently with natural sugarcane ethyl acetate at 97% removal. Pour a cup at midnight; nobody will know.",
    image:
      "https://image.qwenlm.ai/generated-images/4ec4b4bc-9b27-425f-b57f-e070164bdde5/_result.png",
    tint: "#dde0d6",
  },
];

export const FEATURED = PRODUCTS[2]; // Velvet Hour — this week's roast

/** Most recent Tuesday (roast day), formatted like "Mar 4". */
export function lastRoastDate(): string {
  const d = new Date();
  const diff = (d.getDay() - 2 + 7) % 7;
  d.setDate(d.getDate() - diff);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
