import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

import { useEffect } from "react";

const Wishlist = () => {
  const { wishlistIds } = useWishlist();
  const { cartItems, setCartOpen } = useCart();
  const items = products.filter((p) => wishlistIds.includes(p.id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {items.length === 0 ? (
          <p className="text-muted-foreground">No items in your wishlist yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={() => {}} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;


