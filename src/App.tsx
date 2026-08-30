import { useCallback, useEffect, useRef, useState } from "react";
import { CartProvider, useCart } from "./context/CartContext";
import { PROMO_CODES } from "./data/products";
import type { Product } from "./data/products";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import Masthead from "./components/Masthead";
import CraftBand from "./components/CraftBand";
import Shop from "./components/Shop";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import type { ToastItem } from "./components/Toast";

function Storefront() {
  const { add, count, items } = useCart();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [promo, setPromo] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastId = useRef(0);

  const pushToast = useCallback((msg: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t.slice(-2), { id, msg }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  }, []);

  const handleQuickAdd = useCallback(
    (p: Product) => {
      add(p, "Whole bean", 1);
      pushToast(`${p.name} · whole bean added to your crate`);
    },
    [add, pushToast],
  );

  const handleModalAdd = useCallback(
    (p: Product, grind: string, qty: number) => {
      add(p, grind, qty);
      pushToast(
        `${qty}× ${p.name} · ${grind.toLowerCase()} added to your crate`,
      );
    },
    [add, pushToast],
  );

  const applyPromo = useCallback((code: string) => {
    const normalized = code.trim().toUpperCase();
    if (PROMO_CODES[normalized]) {
      setPromo(normalized);
      return true;
    }
    return false;
  }, []);

  // Lock page scroll while any overlay is open
  useEffect(() => {
    const locked = quickView !== null || cartOpen || checkoutOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [quickView, cartOpen, checkoutOpen]);

  const openCheckout = () => {
    if (items.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div id="top" className="grain min-h-screen">
      <Marquee />
      <Header count={count} onCart={() => setCartOpen(true)} />
      <main>
        <Masthead onQuickView={setQuickView} />
        <Marquee />
        <Shop onQuickView={setQuickView} onAdd={handleQuickAdd} />
        <CraftBand />
      </main>
      <Footer />

      <ProductModal
        product={quickView}
        onClose={() => setQuickView(null)}
        onAdd={handleModalAdd}
      />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={openCheckout}
        promo={promo}
        onApplyPromo={applyPromo}
        onClearPromo={() => setPromo(null)}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onBackToCart={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
        promo={promo}
        onClearPromo={() => setPromo(null)}
      />
      <Toast toasts={toasts} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
