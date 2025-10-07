import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

export const Privacy = () => {
  const { cartItems, setCartOpen } = useCart();

  return (
    <>
      <Navigation
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>
          
          <div className="space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="mb-2">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, phone number, and shipping address</li>
                <li>Payment information (processed securely through our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Communications with our customer service team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Detect and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
              <p>We do not sell or rent your personal information. We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Service providers who help us operate our business (shipping, payment processing)</li>
                <li>Law enforcement when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information. However, no method of transmission over the Internet is 100% secure, and we 
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, analyze site 
                traffic, and personalize content. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and receive a copy of your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect personal 
                information from children under 13. If you become aware that a child has provided us with 
                personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us at:<br />
                Email: privacy@onyxia.com<br />
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
