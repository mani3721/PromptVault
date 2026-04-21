'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import { Prompt, SortOption, Tag } from '@/lib/types';
import { getPrompts, getUserLikes } from '@/queries/prompts';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { TagFilter } from '@/components/TagFilter';
import { SortBar } from '@/components/SortBar';
import { PromptCard } from '@/components/PromptCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { TrendingSection } from '@/components/TrendingSection';
import { EmptyState } from '@/components/EmptyState';
import { AddPromptModal } from '@/components/AddPromptModal';
import { AdUnit } from '@/components/AdUnit';

const PAGE_SIZE = 8;

function sortPrompts(prompts: Prompt[], sort: SortOption): Prompt[] {
  return [...prompts].sort((a, b) => {
    if (sort === 'trending') {
      if (a.trending && !b.trending) return -1;
      if (!a.trending && b.trending) return 1;
      return b.likes - a.likes;
    }
    if (sort === 'new') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sort === 'most-copied') {
      return b.copies - a.copies;
    }
    return 0;
  });
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<Tag>('All');
  const [sort, setSort] = useState<SortOption>('trending');
  const [displayedCount, setDisplayedCount] = useState(PAGE_SIZE);
  const [showAddModal, setShowAddModal] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Fetch prompts from Supabase on mount
  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await getPrompts();
      setPrompts(data);
      setIsLoading(false);
    }
    load();
  }, []);

  // Fetch liked prompt IDs whenever user changes
  useEffect(() => {
    if (!user) { setLikedIds(new Set()); return; }
    getUserLikes(user.id).then(setLikedIds);
  }, [user]);

  // Filter + sort
  const filteredPrompts = useMemo(() => {
    let results = prompts;

    if (activeTag !== 'All') {
      results = results.filter((p) => p.tags.includes(activeTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.name.toLowerCase().includes(q)
      );
    }

    return sortPrompts(results, sort);
  }, [prompts, searchQuery, activeTag, sort]);

  const trendingPrompts = useMemo(
    () => prompts.filter((p) => p.trending),
    [prompts]
  );

  const visiblePrompts = filteredPrompts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPrompts.length;

  // Infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setDisplayedCount((c) => c + PAGE_SIZE);
      },
      { rootMargin: '200px' }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // Reset pagination on filter change
  useEffect(() => {
    setDisplayedCount(PAGE_SIZE);
  }, [searchQuery, activeTag, sort]);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveTag('All');
    setSort('trending');
  }, []);

  const handlePromptAdded = useCallback((newPrompt: Prompt) => {
    setPrompts((prev) => [newPrompt, ...prev]);
  }, []);

  const isLoggedIn = !!user;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <Header onAuthChange={setUser} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3 py-1 text-xs font-medium text-indigo-600 dark:border-indigo-800/60 dark:bg-indigo-950/50 dark:text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            {prompts.length} curated prompts
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-neutral-100">
            Discover{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              powerful prompts
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-base text-neutral-500 dark:text-neutral-400">
            A curated gallery of high-quality AI prompts for coding, writing, design, and more.
            Copy with one click.
          </p>

          {/* Add Prompt button — visible only when logged in */}
          {isLoggedIn && (
            <div className="mt-5">
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-500/30 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/30 active:scale-95"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add Prompt
              </button>
            </div>
          )}

          {!isLoggedIn && !isLoading && (
            <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">
              Sign in with Google to add your own prompts.
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mb-8 flex justify-center">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Trending section */}
        {!searchQuery && activeTag === 'All' && !isLoading && trendingPrompts.length > 0 && (
          <TrendingSection prompts={trendingPrompts} isLoggedIn={isLoggedIn} />
        )}

        {/* Filters & sort bar */}
        <div className="mb-6 flex flex-col gap-4">
          <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />
          {!isLoading && (
            <SortBar
              sort={sort}
              onSortChange={setSort}
              totalCount={filteredPrompts.length}
            />
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="mb-5 break-inside-avoid">
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : filteredPrompts.length === 0 ? (
          <EmptyState
            searchQuery={searchQuery}
            activeTag={activeTag}
            onClear={handleClearFilters}
          />
        ) : (
          <>
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
              {visiblePrompts.map((prompt) => (
                <div key={prompt.id} className="mb-5 break-inside-avoid">
                  <PromptCard
                    prompt={prompt}
                    isLoggedIn={isLoggedIn}
                    userId={user?.id}
                    initialLiked={likedIds.has(prompt.id)}
                  />
                </div>
              ))}
            </div>

            {hasMore && (
              <div ref={loadMoreRef} className="mt-10 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="text-xs text-neutral-400 dark:text-neutral-500">Loading more...</span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            )}

            {!hasMore && filteredPrompts.length > PAGE_SIZE && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
                <span className="text-xs text-neutral-400 dark:text-neutral-500">
                  All {filteredPrompts.length} prompts loaded
                </span>
                <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
              </div>
            )}
          </>
        )}
      </main>

      {/* Ad banner — between content and footer */}
      {!isLoading && prompts.length > 0 && (
        <div className="mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 lg:px-8">
          <AdUnit slot="REPLACE_SLOT_ID_1" format="horizontal" />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            {/* Brand */}
            <div className="flex flex-col items-center gap-1 sm:items-start">
              <img
                src="/promptvault_logo.svg"
                alt="PromptVault"
                className="h-10 w-auto opacity-80 dark:brightness-90 dark:contrast-110"
                draggable={false}
              />
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                {prompts.length} prompts · Browse, Copy &amp; Share
              </p>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <a href="/about" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">About</a>
              <a href="/privacy" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Terms of Service</a>
              <a href="mailto:contact@aitrendinsights.com" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Contact</a>
            </nav>
          </div>

          {/* Bottom line */}
          <div className="mt-8 border-t border-neutral-100 pt-6 text-center dark:border-neutral-800">
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              © {new Date().getFullYear()} PromptVault · <a href="https://www.aitrendinsights.com" className="hover:underline">aitrendinsights.com</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Add Prompt Modal */}
      {showAddModal && user && (
        <AddPromptModal
          user={user}
          onClose={() => setShowAddModal(false)}
          onSuccess={handlePromptAdded}
        />
      )}
    </div>
  );
}
