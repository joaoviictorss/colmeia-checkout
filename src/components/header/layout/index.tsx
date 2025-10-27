import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { CartIconProps, HeaderLayoutProps } from "../data";

export const Header = ({ cartItems }: HeaderLayoutProps) => (
  <header className="sticky top-0 z-50 border-border/40 border-b bg-white/95 shadow backdrop-blur-sm">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link className="flex items-center gap-3" href="/">
        <Image alt="Colmeia Checkout" height={32} src="/logo.png" width={32} />
        <span className="font-semibold text-brand-primary text-lg">
          Colmeia Checkout
        </span>
      </Link>

      <div className="flex items-center gap-6">
        <CartIcon itemCount={cartItems} />
      </div>
    </div>
  </header>
);

const CartIcon = ({ itemCount }: CartIconProps) => {
  const maxCartItemsLabel = 99;

  return (
    <Link
      className="relative flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      href="/carrinho"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="-right-1 -top-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary font-medium text-white text-xs">
          {itemCount > maxCartItemsLabel ? "99+" : itemCount}
        </span>
      )}
    </Link>
  );
};
