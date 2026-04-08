import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPromptById } from '@/queries/prompts.server';
import { CopyPromptButton } from '@/components/CopyPromptButton';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const prompt = await getPromptById(id);
  if (!prompt) return { title: 'Prompt not found' };

  const description = prompt.description || prompt.fullPrompt.slice(0, 155);
  const image = prompt.image || '/opengraph-image';

  return {
    title: prompt.title,
    description,
    keywords: [prompt.title, ...prompt.tags, 'AI prompt', 'PromptVault'],
    alternates: { canonical: `https://promptvault.app/prompts/${id}` },
    openGraph: {
      title: `${prompt.title} | PromptVault`,
      description,
      url: `https://promptvault.app/prompts/${id}`,
      images: [{ url: image, width: 1200, height: 900, alt: prompt.title }],
      type: 'article',
      siteName: 'PromptVault',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${prompt.title} | PromptVault`,
      description,
      images: [image],
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { id } = await params;
  const promptData = await getPromptById(id);
  if (!promptData) notFound();
  const prompt = promptData!;

  const tagColors: Record<string, string> = {
    Coding: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    Creative: 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/50 dark:text-pink-300 dark:border-pink-800',
    Marketing: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-300 dark:border-green-800',
    Writing: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    Design: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
    Business: 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800',
    Research: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800',
    Education: 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800',
    Productivity: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/50 dark:text-orange-300 dark:border-orange-800',
    'AI Art': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    SEO: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800',
    Data: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/50 dark:text-violet-300 dark:border-violet-800',
  };

  const defaultTag = 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:border-neutral-700';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: prompt.title,
    description: prompt.description,
    image: prompt.image,
    author: {
      '@type': 'Person',
      name: prompt.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PromptVault',
      url: 'https://promptvault.app',
    },
    datePublished: prompt.createdAt,
    url: `https://promptvault.app/prompts/${id}`,
    keywords: prompt.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Sticky back nav */}
      <div className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to PromptVault
          </Link>
          <img src="/promptvault_logo.svg" alt="PromptVault" className="h-8 w-auto" />
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Left — content */}
          <div className="flex flex-col gap-6">

            {/* Title + meta */}
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {prompt.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tagColors[tag] ?? defaultTag}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
                {prompt.title}
              </h1>
              {prompt.description && (
                <p className="mt-2 text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {prompt.description}
                </p>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-5 text-sm text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {prompt.likes} likes
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {prompt.views} views
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                {prompt.copies} copies
              </span>
            </div>

            {/* Full prompt box */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  Full Prompt
                </span>
                <CopyPromptButton promptId={prompt.id} fullPrompt={prompt.fullPrompt} />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words p-5 text-sm leading-7 text-neutral-700 dark:text-neutral-300 font-mono">
                {prompt.fullPrompt}
              </pre>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
              {prompt.author.avatar ? (
                <img
                  src={prompt.author.avatar}
                  alt={prompt.author.name}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-neutral-100 dark:ring-neutral-700"
                />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  {prompt.author.name[0]?.toUpperCase() ?? '?'}
                </span>
              )}
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{prompt.author.name}</p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">Prompt author</p>
              </div>
            </div>
          </div>

          {/* Right — image */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm dark:border-neutral-800">
              <img
                src={prompt.image}
                alt={prompt.title}
                className="w-full object-cover"
                style={{ aspectRatio: '3/4' }}
              />
            </div>
          </div>
        </div>

        {/* Back link bottom */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-600 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Explore more prompts
          </Link>
        </div>
      </main>
    </div>
  );
}
