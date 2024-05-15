import { cn } from "../src/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md animate-pulse bg-stone-300/60", className)}
      {...props}
    />
  );
}

export { Skeleton };
