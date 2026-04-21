import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for PromptVault (aitrendinsights.com) — how we collect, use, and protect your data.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = 'April 21, 2026';
const SITE_NAME = 'PromptVault';
const SITE_DOMAIN = 'www.aitrendinsights.com';
const CONTACT_EMAIL = 'contact@aitrendinsights.com';

export default function PrivacyPage() {
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
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">Privacy Policy</h1>
          <p className="mb-8 text-sm text-neutral-400 dark:text-neutral-500">Last updated: {LAST_UPDATED}</p>

          <div className="prose prose-neutral max-w-none dark:prose-invert space-y-8 text-neutral-700 dark:text-neutral-300">

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">1. Introduction</h2>
              <p className="leading-7">Welcome to <strong>{SITE_NAME}</strong> ("{SITE_DOMAIN}"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 leading-7">
                <li><strong>Account information:</strong> When you sign in with Google, we receive your name, email address, and profile picture from Google OAuth.</li>
                <li><strong>Usage data:</strong> We collect anonymized data on how you interact with prompts (views, copies, likes) to improve the service.</li>
                <li><strong>Log data:</strong> Our servers automatically record information such as your IP address, browser type, and pages visited.</li>
                <li><strong>Cookies:</strong> We use cookies and similar tracking technologies for authentication, preferences (e.g. dark mode), and analytics.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 leading-7">
                <li>To provide and maintain the {SITE_NAME} service</li>
                <li>To authenticate you via Google OAuth</li>
                <li>To track prompt engagement (likes, views, copies)</li>
                <li>To improve content and user experience</li>
                <li>To comply with legal obligations</li>
                <li>To display personalized advertising via Google AdSense</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">4. Google AdSense & Advertising</h2>
              <p className="leading-7">We use <strong>Google AdSense</strong> to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to this website and other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline dark:text-indigo-400">Google Ads Settings</a>. We also participate in the Google Analytics service to help understand site usage.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">5. Third-Party Services</h2>
              <ul className="list-disc pl-6 space-y-2 leading-7">
                <li><strong>Google OAuth</strong> — for sign-in authentication</li>
                <li><strong>Supabase</strong> — for database and file storage</li>
                <li><strong>Google Analytics</strong> — for anonymized usage analytics</li>
                <li><strong>Google AdSense</strong> — for displaying advertisements</li>
              </ul>
              <p className="leading-7 mt-3">Each third-party service has its own privacy policy governing their data use.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">6. Data Retention</h2>
              <p className="leading-7">We retain your account data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">7. Your Rights</h2>
              <p className="leading-7">Depending on your location, you may have rights to access, correct, or delete your personal data. To exercise these rights, please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline dark:text-indigo-400">{CONTACT_EMAIL}</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">8. Children&apos;s Privacy</h2>
              <p className="leading-7">Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">9. Changes to This Policy</h2>
              <p className="leading-7">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">10. Contact Us</h2>
              <p className="leading-7">If you have questions about this Privacy Policy, please contact us at:<br />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline dark:text-indigo-400">{CONTACT_EMAIL}</a>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
