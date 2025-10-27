import type { ProductCardLayoutProps, ProductCardProps } from "./data";
import { ProductCard as Layout } from "./layout";

export const ProductCard = ({ ...props }: ProductCardProps) => {
  const layoutProps: ProductCardLayoutProps = {
    ...props,
  };

  return <Layout {...layoutProps} />;
};
