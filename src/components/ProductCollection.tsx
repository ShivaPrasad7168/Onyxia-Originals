import { useMemo, useState } from "react";
import { ProductCard, Product } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";

// products imported

interface ProductCollectionProps {
  onAddToCart: (product: Product) => void;
}

export const ProductCollection = ({ onAddToCart }: ProductCollectionProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);

  const categories = ["all", "signature", "essential", "limited"];

  const filteredProducts = useMemo(() => {
    const byCategory =
      filter === "all"
        ? products
        : products.filter(
            (p) => (p.category || "").toLowerCase() === filter.toLowerCase()
          );
    const byQuery = query.trim()
      ? byCategory.filter((p) =>
          `${p.name} ${p.description} ${p.slug}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : byCategory;
    const byPrice = byQuery.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    return byPrice;
  }, [filter, query, priceRange]);

  return (
    <section id="collection" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Our Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover timeless pieces crafted with precision and passion
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-3xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="md:col-span-2"
          />
          <div className="flex items-center justify-between gap-2">
            <Input
              type="number"
              min={0}
              placeholder="Min $"
              value={priceRange[0] || ""}
              onChange={(e) =>
                setPriceRange([Number(e.target.value || 0), priceRange[1]])
              }
            />
            <Input
              type="number"
              min={0}
              placeholder="Max $"
              value={priceRange[1] || ""}
              onChange={(e) =>
                setPriceRange([
                  priceRange[0],
                  Number(e.target.value || 0) || 9999,
                ])
              }
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <Tabs value={filter} onValueChange={setFilter} className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-card">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
};
