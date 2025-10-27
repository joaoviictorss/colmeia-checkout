import type { Product } from "@/utils/types/product";

export interface HeaderProps {
  onProductSelect?: (product: Product) => void;
}

export interface HeaderLayoutProps extends HeaderProps {
  cartItems: number;
}

export interface CartIconProps {
  itemCount: number;
}
