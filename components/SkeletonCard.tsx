export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {/* Image skeleton — 4:3 to match PromptCard */}
      <div className="shimmer w-full bg-neutral-200 dark:bg-neutral-800" style={{ aspectRatio: '3/4' }} />

      {/* Content */}
      <div className="flex flex-col gap-3 p-4">
        {/* Title */}
        <div className="shimmer h-4 w-3/4 rounded-md bg-neutral-200 dark:bg-neutral-800" />

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="shimmer h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="shimmer h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="shimmer h-3 w-4/6 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <div className="shimmer h-5 w-14 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="shimmer h-5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <div className="flex gap-2">
            <div className="shimmer h-7 w-16 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            <div className="shimmer h-7 w-16 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="shimmer h-4 w-10 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <div className="shimmer h-6 w-6 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <div className="shimmer h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}
