'use client';

import { ALL_TAGS, Tag } from '@/lib/types';

const TAG_COLORS: Record<string, string> = {
  All: 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900',
  Coding: 'bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-800/50',
  Creative: 'bg-purple-100 text-purple-700 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:ring-purple-800/50',
  Marketing: 'bg-green-100 text-green-700 ring-green-200 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-800/50',
  Writing: 'bg-amber-100 text-amber-700 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-800/50',
  Design: 'bg-pink-100 text-pink-700 ring-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:ring-pink-800/50',
  Business: 'bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-800/50',
  Research: 'bg-cyan-100 text-cyan-700 ring-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:ring-cyan-800/50',
  Education: 'bg-orange-100 text-orange-700 ring-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:ring-orange-800/50',
  Productivity: 'bg-teal-100 text-teal-700 ring-teal-200 dark:bg-teal-900/30 dark:text-teal-400 dark:ring-teal-800/50',
  'AI Art': 'bg-violet-100 text-violet-700 ring-violet-200 dark:bg-violet-900/30 dark:text-violet-400 dark:ring-violet-800/50',
  SEO: 'bg-lime-100 text-lime-700 ring-lime-200 dark:bg-lime-900/30 dark:text-lime-400 dark:ring-lime-800/50',
  Data: 'bg-sky-100 text-sky-700 ring-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:ring-sky-800/50',
};

export const TAG_INACTIVE_COLORS: Record<string, string> = {
  All: 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700',
  Coding: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-blue-50 hover:text-blue-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400',
  Creative: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-purple-50 hover:text-purple-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-400',
  Marketing: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-green-50 hover:text-green-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-green-900/20 dark:hover:text-green-400',
  Writing: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-amber-50 hover:text-amber-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-amber-900/20 dark:hover:text-amber-400',
  Design: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-pink-50 hover:text-pink-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-pink-900/20 dark:hover:text-pink-400',
  Business: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-emerald-50 hover:text-emerald-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400',
  Research: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-cyan-50 hover:text-cyan-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-400',
  Education: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-orange-50 hover:text-orange-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-orange-900/20 dark:hover:text-orange-400',
  Productivity: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-teal-50 hover:text-teal-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-teal-900/20 dark:hover:text-teal-400',
  'AI Art': 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-violet-50 hover:text-violet-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-violet-900/20 dark:hover:text-violet-400',
  SEO: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-lime-50 hover:text-lime-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-lime-900/20 dark:hover:text-lime-400',
  Data: 'bg-transparent text-neutral-600 ring-1 ring-neutral-200 hover:bg-sky-50 hover:text-sky-700 dark:text-neutral-400 dark:ring-neutral-700 dark:hover:bg-sky-900/20 dark:hover:text-sky-400',
};

interface TagFilterProps {
  activeTag: Tag;
  onTagChange: (tag: Tag) => void;
}

export function TagFilter({ activeTag, onTagChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_TAGS.map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 ${
              isActive
                ? (TAG_COLORS[tag] ?? 'bg-indigo-100 text-indigo-700')
                : (TAG_INACTIVE_COLORS[tag] ?? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400')
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

export function TagBadge({ tag }: { tag: string }) {
  const colorClass = TAG_COLORS[tag] ?? 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400';
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${colorClass}`}>
      {tag}
    </span>
  );
}
