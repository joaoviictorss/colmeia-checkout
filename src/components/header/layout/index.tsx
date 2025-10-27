import { LogOut, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/user-context";
import type { User as UserType } from "@/utils/types/user";
import type { CartIconProps, HeaderLayoutProps, UserMenuProps } from "../data";

export const Header = ({ cartItems, user, loading }: HeaderLayoutProps) => (
  <header className="sticky top-0 z-50 border-border/40 border-b bg-white/95 shadow backdrop-blur-sm">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link className="flex items-center gap-3" href="/">
        <Image alt="Colmeia Checkout" height={32} src="/logo.png" width={32} />
        <span className="font-semibold text-brand-primary text-lg">
          Colmeia Checkout
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <UserSection loading={loading} user={user} />
        <CartIcon itemCount={cartItems} />
      </div>
    </div>
  </header>
);

const CartIcon = ({ itemCount }: CartIconProps) => {
  const maxCartItemsLabel = 99;

  return (
    <Button asChild className="relative" size="sm" variant="outline">
      <Link href="/checkout">
        <ShoppingCart className="size-4" />
        {itemCount > 0 && (
          <span className="-right-1 -top-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary font-medium text-white text-xs">
            {itemCount > maxCartItemsLabel ? "99+" : itemCount}
          </span>
        )}
      </Link>
    </Button>
  );
};

const UserSection = ({
  user,
  loading,
}: {
  user: UserType | null;
  loading: boolean;
}) => {
  if (loading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />;
  }

  if (user) {
    return <UserMenu user={user} />;
  }

  return (
    <Button asChild size="sm" variant="outline">
      <Link href="/sign-in">
        <User className="mr-2 h-4 w-4" />
        Entrar
      </Link>
    </Button>
  );
};

const UserMenu = ({ user }: UserMenuProps) => {
  const { logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-fit w-fit items-center gap-2 p-0"
          size="sm"
          variant="ghost"
        >
          <div className="flex size-7 items-center justify-center rounded-full bg-linear-to-br from-brand-primary to-brand-primary/80 font-semibold text-sm text-white ring-2 ring-gray-100">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-fit">
        <DropdownMenuItem
          className="hover:text-red-600 focus:bg-red-50 focus:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
