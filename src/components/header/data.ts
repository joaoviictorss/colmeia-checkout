import type { Product } from "@/utils/types/product";
import type { User } from "@/utils/types/user";

export interface HeaderProps {
  onProductSelect?: (product: Product) => void;
}

export interface HeaderLayoutProps extends HeaderProps {
  cartItems: number;
  user: User | null;
  loading: boolean;
}

export interface CartIconProps {
  itemCount: number;
}

export interface UserMenuProps {
  user: User;
}
