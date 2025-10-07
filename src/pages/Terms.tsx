import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

export const Terms = () => {
  const { cartItems, setCartOpen } = useCart();

  return (
    <>
      <Navigation
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using ONYXIA's website and services, you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use of Services</h2>
              <p>You agree to use our services only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malicious code or disrupt our services</li>
                <li>Engage in fraudulent activities</li>
                <li>Harass or harm other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Account Responsibilities</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for 
                all activities under your account. Notify us immediately of any unauthorized access or security breaches.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Product Information and Pricing</h2>
              <p>
                We strive to provide accurate product descriptions and pricing. However, errors may occur. 
                We reserve the right to correct errors, update information, or cancel orders if information 
                is inaccurate, even after an order has been submitted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Orders and Payment</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>All orders are subject to acceptance and availability</li>
                <li>We reserve the right to refuse or cancel any order</li>
                <li>Payment must be received before order fulfillment</li>
                <li>Prices are subject to change without notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of 
                ONYXIA and protected by copyright and trademark laws. You may not reproduce, distribute, or 
                create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p>
                ONYXIA shall not be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your use of our services. Our total liability shall not exceed the 
                amount you paid for the product or service in question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Returns and Refunds</h2>
              <p>
                Returns and refunds are subject to our Return Policy. Please review our Shipping & Returns 
                page for detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Dispute Resolution</h2>
              <p>
                Any disputes arising from these terms or your use of our services shall be resolved through 
                binding arbitration in accordance with the laws of the State of New York, United States.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately 
                upon posting. Your continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at:<br />
                Email: legal@onyxia.com<br />
                Address: 123 Fashion Avenue, New York, NY 10001
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
