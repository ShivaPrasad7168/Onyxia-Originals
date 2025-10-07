import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  const { cartItems, setCartOpen } = useCart();

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days. Express shipping (2-3 business days) is available at checkout. International orders may take 10-15 business days depending on customs clearance."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy from the date of delivery. Items must be unworn, unwashed, and in original condition with tags attached. Return shipping is free for defective items, otherwise customers cover return shipping costs."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our website or the carrier's website. Allow 24 hours for tracking information to update."
    },
    {
      question: "What sizes do you offer?",
      answer: "We offer sizes from S to 2XL. Please refer to our size guide on each product page for detailed measurements. If you're between sizes, we recommend sizing up for a more comfortable fit."
    },
    {
      question: "How should I care for my ONYXIA garments?",
      answer: "Machine wash cold with like colors, tumble dry low or hang dry. Do not bleach. Iron on low heat if needed. Avoid dry cleaning unless specified on the care label. Following these instructions will help maintain the quality and longevity of your garments."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination. International customers are responsible for any customs duties or import taxes that may apply."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 2 hours of placement. After this window, orders are processed and cannot be changed. Please contact us immediately if you need to make changes."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption."
    },
    {
      question: "Do you restock sold-out items?",
      answer: "Popular items are restocked regularly. You can sign up for restock notifications on product pages. Limited edition items may not be restocked once sold out."
    },
    {
      question: "How do I know if an item is authentic?",
      answer: "All ONYXIA products come with authenticity tags and packaging. Each item has a unique product code that can be verified on our website. We only sell authentic ONYXIA products—no imitations or replicas."
    }
  ];

  return (
    <>
      <Navigation
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
          <p className="text-center text-muted-foreground mb-12">
            Find answers to common questions about ordering, shipping, and our products.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 bg-muted rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-4">
              Our customer service team is here to help
            </p>
            <a href="/contact" className="text-primary hover:underline font-medium">
              Contact Us →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
