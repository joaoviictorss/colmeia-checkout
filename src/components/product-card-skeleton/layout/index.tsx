import type { ProductCardSkeletonLayoutProps } from "../data";

export const ProductCardSkeleton = ({
  ...props
}: ProductCardSkeletonLayoutProps) => (
  <div
    {...props}
    className="flex w-full min-w-[250px] max-w-full flex-col overflow-hidden rounded-[1.25rem] bg-white max-[480px]:min-w-0 max-[480px]:max-w-full max-[480px]:rounded-4 [481px-768px]:min-w-[240px] [769px+]:min-w-[280px] [769px+]:max-w-[400px]"
  >
    <div className="relative aspect-4/3 w-full overflow-hidden max-[480px]:aspect-square [481px-768px]:aspect-5/4 [769px+]:aspect-4/3">
      <div className="skeleton-base h-full w-full rounded-none" />
    </div>

    <div className="flex flex-1 flex-col gap-4 p-5 max-[480px]:gap-3 max-[480px]:p-4 [481px-768px]:gap-3.5 [481px-768px]:p-4.5">
      <div className="flex items-center justify-between gap-3 max-[320px]:flex-col max-[320px]:items-start max-[320px]:gap-2">
        <div className="skeleton-base h-4 w-20 flex-1 max-[480px]:h-[14px]" />
        <div className="skeleton-base h-4 w-10 shrink-0 max-[480px]:h-[14px]" />
      </div>

      <div className="flex flex-1 flex-col gap-2 max-[480px]:gap-1.5">
        <div className="skeleton-base h-5 w-[85%] max-[480px]:h-[18px] [769px+]:h-[22px]" />
        <div className="skeleton-base h-[14px] w-full max-[480px]:h-[13px]" />
        <div className="skeleton-base h-[14px] w-[75%] max-[480px]:h-[13px]" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 max-[320px]:flex-col max-[320px]:items-start max-[320px]:gap-1">
        <div className="skeleton-base h-6 w-[100px] max-[480px]:h-5 [769px+]:h-7 [769px+]:w-[120px]" />
        <div className="skeleton-base h-[14px] w-20 shrink-0 max-[480px]:h-[13px]" />
      </div>

      <div className="skeleton-base h-10 w-full rounded-lg max-[480px]:rounded-[0.375rem]" />
    </div>
  </div>
);
