"use client";

import { useCart } from "@/hooks/use-cart";
import type { HeaderLayoutProps, HeaderProps } from "./data";
import { Header as Layout } from "./layout";

export const Header = ({ onProductSelect, ...props }: HeaderProps) => {
  const { state } = useCart();

  const layoutProps: HeaderLayoutProps = {
    cartItems: state.itemCount,
    onProductSelect,
    ...props,
  };

  return <Layout {...layoutProps} />;
};