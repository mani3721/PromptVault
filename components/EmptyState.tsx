interface EmptyStateProps {
  searchQuery: string;
  activeTag: string;
  onClear: () => void;
}

export function EmptyState({ searchQuery, activeTag, onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
        <svg
          className="h-7 w-7 text-neutral-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h3 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
        No prompts found
      </h3>
      <p className="mb-6 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
        {searchQuery && activeTag !== 'All'
          ? `No prompts matching "${searchQuery}" in the "${activeTag}" category.`
          : searchQuery
          ? `No prompts matching "${searchQuery}". Try a different search term.`
          : `No prompts in the "${activeTag}" category yet.`}
      </p>
      <button
        onClick={onClear}
        className="flex h-9 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        Clear filters
      </button>
    </div>
  );
}
