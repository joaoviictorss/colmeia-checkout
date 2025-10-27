import type {
  ProductCardSkeletonLayoutProps,
  ProductCardSkeletonProps,
} from "./data";
import { ProductCardSkeleton as Layout } from "./layout";

export const ProductCardSkeleton = ({ ...props }: ProductCardSkeletonProps) => {
  const layoutProps: ProductCardSkeletonLayoutProps = {
    ...props,
  };

  return <Layout {...layoutProps} />;
};
