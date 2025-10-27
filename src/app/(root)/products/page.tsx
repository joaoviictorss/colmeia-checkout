"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import { mockProducts } from "@/utils/mockData/products";
import type { Product } from "@/utils/types/product";

const API_DELAY_MS = 1500;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Simula uma chamada de API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));

      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (productId: number) => {
    // TODO: Implementar lógica de adicionar ao carrinho

    console.log("Adicionando produto ao carrinho:", productId);
  };

  return (
    <div className="container mx-auto">
      <h1 className="mb-8 font-bold text-3xl text-gray-900">Produtos</h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index.toString()} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              onAddToCart={() => handleAddToCart(product.id)}
              productData={product}
            />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500 text-lg">Nenhum produto encontrado.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
