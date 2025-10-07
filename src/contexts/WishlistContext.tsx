import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { Product } from "@/components/ProductCard";

interface WishlistContextType {
  wishlistIds: string[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "onyxia_wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? (JSON.parse(raw) as string[]) : [];
      setWishlistIds(Array.isArray(parsed) ? parsed : []);
    } catch {
      setWishlistIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore write failures
    }
  }, [wishlistIds]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const addToWishlist = (product: Product) => {
    setWishlistIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    setWishlistIds((prev) => (prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]));
  };

  const value = useMemo(
    () => ({ wishlistIds, isInWishlist, toggleWishlist, addToWishlist, removeFromWishlist }),
    [wishlistIds]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};


