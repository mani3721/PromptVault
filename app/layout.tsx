import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PromptVault — Best AI Prompts for ChatGPT, Gemini, Claude & More",
    template: "%s | PromptVault",
  },
  description:
    "Discover, copy, and use the best AI prompts for ChatGPT, Google Gemini, Claude, Copilot, Grok, and Midjourney. Browse a curated library of prompts for coding, writing, marketing, design, SEO, and more — all free.",
  keywords: [
    // Brand
    "PromptVault",
    "AI prompt library",
    "prompt collection",
    "best AI prompts",
    "free AI prompts",
    "prompt templates",
    "prompt database",
    // ChatGPT
    "ChatGPT prompts",
    "ChatGPT prompt templates",
    "best ChatGPT prompts",
    "ChatGPT prompts for business",
    "ChatGPT prompts for coding",
    "ChatGPT prompts for writing",
    "GPT-4 prompts",
    "GPT-4o prompts",
    "OpenAI prompts",
    // Google Gemini
    "Google Gemini prompts",
    "Gemini AI prompts",
    "Google Bard prompts",
    "Gemini prompts for work",
    // Claude
    "Claude AI prompts",
    "Claude Sonnet prompts",
    "Anthropic Claude prompts",
    "Claude prompts for coding",
    // Microsoft Copilot
    "Microsoft Copilot prompts",
    "Bing Copilot prompts",
    "GitHub Copilot prompts",
    "Copilot prompt templates",
    // Grok
    "Grok AI prompts",
    "xAI Grok prompts",
    // Image AI
    "Midjourney prompts",
    "DALL-E prompts",
    "Stable Diffusion prompts",
    "AI art prompts",
    "image generation prompts",
    // Use cases
    "prompt engineering",
    "prompt engineering guide",
    "AI prompts for marketing",
    "AI prompts for SEO",
    "AI prompts for coding",
    "AI prompts for writing",
    "AI prompts for design",
    "AI prompts for business",
    "AI prompts for productivity",
    "AI prompts for research",
    "AI prompts for education",
    "copy AI prompts",
    "discover AI prompts",
    "trending AI prompts",
  ],
  authors: [{ name: "PromptVault" }],
  creator: "PromptVault",
  publisher: "PromptVault",
  category: "Technology",
  applicationName: "PromptVault",
  openGraph: {
    type: "website",
    siteName: "PromptVault",
    title: "PromptVault — Best AI Prompts for ChatGPT, Gemini, Claude & More",
    description:
      "Discover and copy the best AI prompts for ChatGPT, Google Gemini, Claude, Copilot, and Midjourney. Free curated library covering coding, writing, marketing, SEO, and design.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptVault — Best AI Prompts for ChatGPT, Gemini, Claude & More",
    description:
      "Browse a curated library of high-quality AI prompts. Works with ChatGPT, Google Gemini, Claude, Copilot, Grok, and Midjourney. Copy with one click.",
    creator: "@promptvault",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "hOlZTLKR1HSqaTqYckFvxMfTbJKny-7fBxfOICAfrbU",
  },
  alternates: {
    canonical: "https://promptvault.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSerif.variable} ${monaSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full font-sans">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-11ENTQSETP"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-11ENTQSETP');
          `}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
