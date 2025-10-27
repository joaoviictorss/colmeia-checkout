"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import type { ProductCardLayoutProps } from "../data";

export const ProductCard = ({
  productData,
  onAddToCart,
}: ProductCardLayoutProps) => (
  <div className="group hover:-translate-y-1 flex w-full min-w-[250px] max-w-full flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-[0_8px_25px_rgba(0,0,0,0.12)] max-[480px]:min-w-0 max-[480px]:max-w-full max-[480px]:rounded-4 [481px-768px]:min-w-[240px] [769px+]:min-w-[280px] [769px+]:max-w-[400px]">
    <div className="relative aspect-4/3 w-full overflow-hidden max-[480px]:aspect-square [481px-768px]:aspect-5/4 [769px+]:aspect-4/3">
      <Image
        alt={productData.name}
        className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={productData.image}
      />
    </div>

    <div className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="line-clamp-1 font-bold text-brand-primary text-lg">
          {productData.name}
        </h3>
        <p className="line-clamp-2 text-muted-foreground text-sm">
          {productData.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 max-[320px]:flex-col max-[320px]:items-start max-[320px]:gap-1">
        <span className="font-bold text-2xl text-brand-primary max-[480px]:text-xl [769px+]:text-[1.75rem]">
          {productData.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-brand-secondary text-brand-secondary" />
          <span className="font-semibold text-brand-primary text-sm">
            {productData.rating}
          </span>
        </div>
      </div>

      <Button
        className="w-full bg-brand-secondary font-semibold text-white hover:bg-brand-secondary/90"
        onClick={onAddToCart}
      >
        Adicionar ao carrinho
      </Button>
    </div>
  </div>
);
