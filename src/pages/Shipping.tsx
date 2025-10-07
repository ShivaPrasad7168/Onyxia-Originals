import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Card } from "@/components/ui/card";
import { Truck, Package, RefreshCw } from "lucide-react";

export const Shipping = () => {
  const { cartItems, setCartOpen } = useCart();

  return (
    <>
      <Navigation
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-12 text-center">Shipping & Returns</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center">
              <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $100</p>
            </Card>
            <Card className="p-6 text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">5-7 business days</p>
            </Card>
            <Card className="p-6 text-center">
              <RefreshCw className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </Card>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4 text-foreground/90">
                <div>
                  <h3 className="font-semibold mb-2">Domestic Shipping (USA)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard Shipping (5-7 business days): $7.99 or FREE on orders over $100</li>
                    <li>Express Shipping (2-3 business days): $15.99</li>
                    <li>Overnight Shipping (1 business day): $29.99</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">International Shipping</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Standard International (10-15 business days): Starting at $19.99</li>
                    <li>Express International (5-7 business days): Starting at $39.99</li>
                    <li>Customs duties and import taxes may apply and are the customer's responsibility</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p>Orders are processed within 1-2 business days (Monday-Friday, excluding holidays). Orders placed on weekends or holidays will be processed the next business day.</p>
                </div>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">Return & Exchange Policy</h2>
              <div className="space-y-4 text-foreground/90">
                <div>
                  <h3 className="font-semibold mb-2">30-Day Return Window</h3>
                  <p>We accept returns within 30 days of delivery. Items must be:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Unworn and unwashed</li>
                    <li>In original condition with all tags attached</li>
                    <li>In original packaging (if applicable)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">How to Return</h3>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Contact our customer service team at returns@onyxia.com to initiate a return</li>
                    <li>Receive your return authorization and shipping label</li>
                    <li>Pack your item(s) securely in the original packaging</li>
                    <li>Ship your return using the provided label</li>
                    <li>Refund will be processed within 5-7 business days after we receive your return</li>
                  </ol>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Exchanges</h3>
                  <p>To exchange an item for a different size or color, please return the original item and place a new order. This ensures you get your preferred item as quickly as possible.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Non-Returnable Items</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Final sale items</li>
                    <li>Items without tags or in worn/washed condition</li>
                    <li>Undergarments and intimate apparel</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Refund Method</h3>
                  <p>Refunds will be issued to the original payment method. Please allow 5-10 business days for the refund to appear in your account after we process your return.</p>
                </div>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Items</h2>
              <p className="text-foreground/90">
                If you receive a damaged or defective item, please contact us within 7 days of delivery at support@onyxia.com with photos of the item and packaging. We will provide a full refund or replacement at no additional cost, including return shipping.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
