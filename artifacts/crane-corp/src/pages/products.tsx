import { useState } from "react";
import { Link, useSearch } from "wouter";
import { motion } from "framer-motion";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowRight, Filter } from "lucide-react";

export default function Products() {
  const searchStr = useSearch();
  const params = new URLSearchParams(searchStr);
  const initialCategoryId = params.get("category") ? parseInt(params.get("category")!) : undefined;

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(initialCategoryId);

  const { data: categories, isLoading: catsLoading } = useListCategories();
  const { data: products, isLoading: prodsLoading } = useListProducts(
    selectedCategory ? { categoryId: selectedCategory, status: "published" } : { status: "published" }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-[#0f172a] text-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-primary tracking-widest mb-3">OUR EQUIPMENT</div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight uppercase mb-4">Products</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore our comprehensive range of lifting solutions, engineered for precision and built for the world's most demanding projects.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Category Filter */}
        <div className="flex items-center gap-3 mb-12 flex-wrap">
          <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground mr-2">
            <Filter className="w-4 h-4" /> FILTER:
          </span>
          <Button
            variant={!selectedCategory ? "default" : "outline"}
            onClick={() => setSelectedCategory(undefined)}
            className="rounded-none font-bold"
            data-testid="filter-all"
          >
            ALL PRODUCTS
          </Button>
          {catsLoading
            ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-10 w-32" />)
            : categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? undefined : cat.id)}
                className="rounded-none font-bold"
                data-testid={`filter-${cat.slug}`}
              >
                {cat.name}
                <Badge className="ml-2 text-xs" variant="secondary">{cat.productCount}</Badge>
              </Button>
            ))}
        </div>

        {/* Products Grid */}
        {prodsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="aspect-[3/4]" />)}
          </div>
        ) : !products?.length ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">No products found in this category.</p>
            <Button className="mt-6" onClick={() => setSelectedCategory(undefined)}>View All Products</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                data-testid={`card-product-${product.id}`}
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="group bg-card border border-border overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer">
                    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                      <img
                        src={product.coverImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-0 left-0 bg-primary text-primary-foreground px-4 py-2 font-black text-sm">
                        {product.capacity}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white font-bold text-sm flex items-center gap-2">
                          VIEW DETAILS <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs font-bold text-primary tracking-widest mb-2 uppercase">{product.categoryName}</div>
                      <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">{product.name}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div className={cn(
                          "text-xs font-bold px-2 py-1 rounded-sm",
                          product.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        )}>
                          {product.status === "published" ? "AVAILABLE" : "DRAFT"}
                        </div>
                        <Button variant="ghost" size="sm" className="font-bold group-hover:text-primary">
                          Details <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-primary py-16 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4">Need a Custom Lifting Solution?</h2>
          <p className="text-white/80 mb-8 text-lg">Our engineering team is ready to design the perfect crane for your project requirements.</p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="font-bold px-8 h-14">
              CONTACT OUR ENGINEERS
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
