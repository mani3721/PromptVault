'use client';

import { SortOption } from '@/lib/types';

interface SortBarProps {
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: string }[] = [
  { value: 'trending', label: 'Trending', icon: '🔥' },
  { value: 'new', label: 'New', icon: '✨' },
  { value: 'most-copied', label: 'Most Copied', icon: '📋' },
];

export function SortBar({ sort, onSortChange, totalCount }: SortBarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        <span className="font-semibold text-neutral-900 dark:text-neutral-100">{totalCount}</span>{' '}
        {totalCount === 1 ? 'prompt' : 'prompts'}
      </p>

      <div className="flex items-center gap-1 rounded-xl border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-700 dark:bg-neutral-800/50">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
              sort === option.value
                ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
