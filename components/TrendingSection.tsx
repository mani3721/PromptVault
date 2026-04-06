'use client';

import { useState } from 'react';
import { Prompt } from '@/lib/types';
import { TagBadge } from './TagFilter';

interface TrendingCardProps {
  prompt: Prompt;
  onCopy: (prompt: Prompt) => void;
  copiedId: string | null;
}

function TrendingCard({ prompt, onCopy, copiedId }: TrendingCardProps) {
  const isCopied = copiedId === prompt.id;

  return (
    <article className="group relative flex w-[280px] flex-none flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:shadow-neutral-900/60">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={prompt.image}
          alt={prompt.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/90 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            🔥 Trending
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <h3 className="line-clamp-1 text-[13px] font-semibold text-neutral-900 dark:text-neutral-100">
          {prompt.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {prompt.tags.slice(0, 2).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <img
              src={prompt.author.avatar}
              alt={prompt.author.name}
              className="h-4 w-4 rounded-full object-cover"
            />
            <span>{prompt.author.name}</span>
          </div>

          <button
            onClick={() => onCopy(prompt)}
            className={`flex h-7 items-center gap-1 rounded-lg px-2.5 text-xs font-medium transition-all ${
              isCopied
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                : 'bg-neutral-100 text-neutral-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400'
            }`}
          >
            {isCopied ? '✅ Copied' : '📋 Copy'}
          </button>
        </div>
      </div>
    </article>
  );
}

interface TrendingSectionProps {
  prompts: Prompt[];
  isLoggedIn: boolean;
}

export function TrendingSection({ prompts, isLoggedIn: _ }: TrendingSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopiedId(prompt.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  if (prompts.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Trending Prompts
        </h2>
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
          {prompts.length} hot
        </span>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: 'thin' }}>
          {prompts.map((prompt) => (
            <TrendingCard
              key={prompt.id}
              prompt={prompt}
              onCopy={handleCopy}
              copiedId={copiedId}
            />
          ))}
        </div>
        {/* Fade edge */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-50 dark:from-neutral-950" />
      </div>
    </section>
  );
}
