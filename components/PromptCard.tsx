'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Prompt } from '@/lib/types';
import { TagBadge } from './TagFilter';
import { toggleLike, incrementViews, incrementCopies } from '@/queries/prompts';

interface PromptCardProps {
  prompt: Prompt;
  isLoggedIn: boolean;
  userId?: string;
  initialLiked?: boolean;
}

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function PromptCard({ prompt, isLoggedIn, userId, initialLiked = false }: PromptCardProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(prompt.likes);
  const [copied, setCopied] = useState(false);
  const [viewCount, setViewCount] = useState(prompt.views);
  const cardRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);

  // Sync liked state when the parent updates likedPromptIds
  useEffect(() => {
    setLiked(initialLiked);
  }, [initialLiked]);

  // Increment view once when card enters viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          setViewCount((c) => c + 1);
          incrementViews(prompt.id);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prompt.id]);

  const handleLike = async () => {
    if (!isLoggedIn || !userId) return;
    // Optimistic update
    const nowLiked = !liked;
    setLiked(nowLiked);
    setLikeCount((c: number) => (nowLiked ? c + 1 : Math.max(0, c - 1)));
    // Persist to Supabase
    const result = await toggleLike(prompt.id, userId);
    // Roll back if server disagrees
    if (result !== nowLiked) {
      setLiked(result);
      setLikeCount((c) => (result ? c + 1 : Math.max(0, c - 1)));
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.fullPrompt);
      setCopied(true);
      incrementCopies(prompt.id);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      ref={cardRef}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/60 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:shadow-neutral-900/60"
    >
      {/* Thumbnail */}
      <Link href={`/prompts/${prompt.id}`} className="relative block overflow-hidden">
        <img
          src={prompt.image}
          alt={prompt.title}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ aspectRatio: '3/4' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {prompt.trending && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-orange-600 shadow-sm backdrop-blur-sm dark:bg-neutral-900/80 dark:text-orange-400">
              🔥 Trending
            </span>
          </div>
        )}
      </Link>

      {/* Card content */}
      <div className="flex flex-col gap-3 p-4">
        <Link href={`/prompts/${prompt.id}`}>
          <h3 className="line-clamp-1 text-[15px] font-semibold leading-snug text-neutral-900 transition-colors hover:text-indigo-600 dark:text-neutral-100 dark:hover:text-indigo-400">
            {prompt.title}
          </h3>
        </Link>

        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 line-clamp-3">
          {prompt.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {prompt.tags.slice(0, 3).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <div className="flex items-center gap-1">
            {/* Like button */}
            <button
              onClick={handleLike}
              title={isLoggedIn ? (liked ? 'Unlike' : 'Like') : 'Sign in to like'}
              className={`group/btn flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm transition-all duration-200 ${
                liked
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'
                  : isLoggedIn
                  ? 'text-neutral-500 hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-900/20 dark:hover:text-rose-400'
                  : 'cursor-not-allowed text-neutral-400 opacity-60 dark:text-neutral-500'
              }`}
            >
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${liked ? 'scale-110' : 'group-hover/btn:scale-110'}`}
                fill={liked ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span className="font-medium tabular-nums">{formatNumber(likeCount)}</span>
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={`flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium transition-all duration-200 ${
                copied
                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-300'
              }`}
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* View count */}
          <div className="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="tabular-nums">{formatNumber(viewCount)}</span>
          </div>
        </div>

        {/* Author */}
        {/* <div className="flex items-center gap-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          {prompt.author.avatar ? (
            <img
              src={prompt.author.avatar}
              alt={prompt.author.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
              loading="lazy"
            />
          ) : (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-300 text-[10px] font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400">
              {prompt.author.name[0]?.toUpperCase()}
            </span>
          )}
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {prompt.author.name}
          </span>
        </div> */}
      </div>
    </article>
  );
}
