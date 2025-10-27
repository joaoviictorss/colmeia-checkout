import type { Product } from "@/utils/types/product";

export interface ProductCardProps {
  productData: Product;
  onAddToCart?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ProductCardLayoutProps extends ProductCardProps {}
