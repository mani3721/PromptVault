import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About PromptVault',
  description: 'About PromptVault — a curated library of the best AI prompts for ChatGPT, Gemini, Claude, Midjourney, and more.',
  alternates: { canonical: `${SITE_URL}/about` },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Nav */}
      <div className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to PromptVault
          </Link>
          <img src="/promptvault_logo.svg" alt="PromptVault" className="h-8 w-auto" />
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="mb-6 flex justify-center">
            <img src="/promptvault_logo.svg" alt="PromptVault" className="h-16 w-auto" />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            About <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">PromptVault</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
            A curated gallery of high-quality AI prompts — built to help you get the most out of ChatGPT, Google Gemini, Claude, Copilot, Grok, Midjourney, and more.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 mb-10">
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              body: 'We believe the right prompt unlocks the true power of AI. PromptVault curates and organizes the best prompts across every category — so you spend less time crafting and more time creating.',
            },
            {
              icon: '🔍',
              title: 'What We Offer',
              body: 'Browse a growing library of prompts for coding, writing, marketing, design, SEO, education, and more. Filter by category, sort by trending, and copy any prompt in one click.',
            },
            {
              icon: '🤝',
              title: 'Community-Driven',
              body: 'Anyone can contribute. Sign in with Google and submit your own prompts — complete with an image, tags, and your full prompt text. The best prompts rise to the top through likes.',
            },
            {
              icon: '🌐',
              title: 'Multi-Model Support',
              body: 'Prompts on PromptVault work across all major AI tools — ChatGPT (GPT-4o), Google Gemini, Anthropic Claude, Microsoft Copilot, Grok, Midjourney, DALL-E, and Stable Diffusion.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h2>
              <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{item.body}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-10 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-8 dark:border-indigo-900/40 dark:bg-indigo-950/30">
          <h2 className="mb-6 text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">By the numbers</h2>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: '37+', label: 'Curated Prompts' },
              { value: '10+', label: 'Categories' },
              { value: '6+', label: 'AI Models Covered' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{stat.value}</p>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 text-center">
          <h2 className="mb-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">Get in touch</h2>
          <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">Have a prompt suggestion, partnership inquiry, or feedback?</p>
          <a
            href="mailto:contact@aitrendinsights.com"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            contact@aitrendinsights.com
          </a>
        </div>

        {/* Back */}
        <div className="mt-10 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-600 shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Browse prompts
          </Link>
        </div>
      </main>
    </div>
  );
}
