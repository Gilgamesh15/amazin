import { Fragment } from "react";
import { Skeleton } from "./ui/skeleton";

export function CategoriesBarSkeleton() {
  return (
    <div className="h-full w-[320px] flex flex-col gap-2 py-2">
      <Skeleton className="flex-[4]" />
      <Skeleton className="flex-[4]" />
      <Skeleton className="flex-[2] ml-8" />
      <Skeleton className="flex-[2] ml-8" />
      <Skeleton className="flex-[2] ml-8" />
      <Skeleton className="flex-[1] ml-16" />
      <Skeleton className="flex-[1] ml-16" />
      <Skeleton className="flex-[2] ml-8" />
      <Skeleton className="flex-[4]" />
      <Skeleton className="flex-[2] ml-8" />
      <Skeleton className="flex-[4]" />
      <Skeleton className="flex-[2] ml-8" />
      <Skeleton className="flex-[2] ml-8" />
    </div>
  );
}

export function FeaturedSkeleton() {
  return (
    <article className="py-4 feature-grid">
      {[...Array(5)].map((_, index) => (
        <Fragment key={index}>
          <section className={`feature-grid_item-${index + 1} relative`}>
            <Skeleton className="absolute h-[calc(100%-5.5rem)] w-full bottom-18" />
            <Skeleton className="absolute h-4 w-[60%] bottom-16" />
            <Skeleton className="absolute h-4 w-[75%] bottom-10" />
            <Skeleton className="absolute h-4 w-[40%] bottom-2" />
          </section>
        </Fragment>
      ))}
    </article>
  );
}
