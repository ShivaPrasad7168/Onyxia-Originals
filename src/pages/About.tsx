import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

export const About = () => {
  const { cartItems, setCartOpen } = useCart();

  return (
    <>
      <Navigation
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">About ONYXIA</h1>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <p className="text-lg">
              ONYXIA represents the fusion of timeless elegance and modern sophistication. 
              Our name, inspired by the precious gemstone onyx, symbolizes strength, protection, 
              and refined beauty—qualities we infuse into every piece we create.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that luxury should be accessible without compromising on quality. 
              Our mission is to craft premium clothing that empowers individuals to express 
              their unique style with confidence and grace.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p>
              Founded with a passion for exceptional craftsmanship, ONYXIA emerged from a 
              vision to redefine contemporary fashion. Each collection is meticulously designed, 
              combining premium fabrics with attention to detail that our customers have come to trust.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Quality & Craftsmanship</h2>
            <p>
              Every ONYXIA piece undergoes rigorous quality control. We source only the finest 
              materials and work with skilled artisans to ensure that each garment meets our 
              exacting standards. From fabric selection to final stitching, excellence is our promise.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Sustainability</h2>
            <p>
              We are committed to responsible fashion. Our production processes prioritize 
              sustainability, minimizing waste and ensuring ethical manufacturing practices 
              that respect both people and planet.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
