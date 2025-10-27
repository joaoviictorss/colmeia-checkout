"use client"

import { useContext } from "react";
import { CartContext } from "@/contexts/cart-context";

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
