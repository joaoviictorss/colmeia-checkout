"use client";

import { useUser } from "@/contexts/user-context";
import { useCart } from "@/hooks/use-cart";
import type { HeaderLayoutProps, HeaderProps } from "./data";
import { Header as Layout } from "./layout";

export const Header = ({ onProductSelect, ...props }: HeaderProps) => {
  const { state } = useCart();
  const { user, loading } = useUser();

  const layoutProps: HeaderLayoutProps = {
    cartItems: state.itemCount,
    user,
    loading,
    onProductSelect,
    ...props,
  };

  return <Layout {...layoutProps} />;
};
