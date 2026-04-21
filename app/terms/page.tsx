import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for PromptVault — rules for using aitrendinsights.com.',
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'April 21, 2026';
const SITE_NAME = 'PromptVault';
const SITE_DOMAIN = 'www.aitrendinsights.com';
const CONTACT_EMAIL = 'contact@aitrendinsights.com';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Nav */}
      <div className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to {SITE_NAME}
          </Link>
          <img src="/promptvault_logo.svg" alt={SITE_NAME} className="h-8 w-auto" />
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 shadow-sm sm:px-10 dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Terms of Service</h1>
          <p className="mb-8 text-sm text-neutral-400 dark:text-neutral-500">Last updated: {LAST_UPDATED}</p>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300">

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Acceptance of Terms</h2>
              <p className="leading-7">By accessing or using <strong>{SITE_NAME}</strong> at <strong>{SITE_DOMAIN}</strong>, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. Description of Service</h2>
              <p className="leading-7">{SITE_NAME} is a curated library of AI prompts for tools such as ChatGPT, Google Gemini, Claude, Copilot, and Midjourney. Users can browse, copy, and submit prompts. The service is provided free of charge, supported by advertising.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2 leading-7">
                <li>You may sign in using your Google account via OAuth.</li>
                <li>You are responsible for maintaining the confidentiality of your account.</li>
                <li>You must be at least 13 years of age to use this service.</li>
                <li>We reserve the right to suspend or terminate accounts that violate these terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. User-Submitted Content</h2>
              <p className="leading-7">When you submit a prompt to {SITE_NAME}:</p>
              <ul className="list-disc pl-6 space-y-2 leading-7 mt-2">
                <li>You confirm you have the right to share the content.</li>
                <li>You grant {SITE_NAME} a non-exclusive, royalty-free license to display and distribute the content.</li>
                <li>You must not submit content that is illegal, harmful, misleading, or violates third-party rights.</li>
                <li>We reserve the right to remove any content at our discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Acceptable Use</h2>
              <p className="leading-7">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 leading-7 mt-2">
                <li>Scrape or bulk-download content without permission</li>
                <li>Use the service for spam, phishing, or illegal activities</li>
                <li>Attempt to reverse-engineer or disrupt the platform</li>
                <li>Click on advertisements in a fraudulent manner</li>
                <li>Violate any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Intellectual Property</h2>
              <p className="leading-7">The {SITE_NAME} brand, logo, design, and original content are owned by us and protected by intellectual property laws. AI-generated prompts remain the responsibility of their submitters.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">7. Advertising</h2>
              <p className="leading-7">This site displays advertisements served by Google AdSense. We are not responsible for the content of these advertisements. By using this site, you acknowledge that advertising is part of the free service we provide.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">8. Disclaimer of Warranties</h2>
              <p className="leading-7">The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee the accuracy, completeness, or usefulness of any prompt. Use prompts at your own discretion.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">9. Limitation of Liability</h2>
              <p className="leading-7">To the fullest extent permitted by law, {SITE_NAME} shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">10. Changes to Terms</h2>
              <p className="leading-7">We may modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">11. Contact</h2>
              <p className="leading-7">For questions about these Terms, contact us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline dark:text-indigo-400">{CONTACT_EMAIL}</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
