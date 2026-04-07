'use client';

import { useEffect, useRef, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { useTheme } from './ThemeProvider';
import config from '@/config';

interface HeaderProps {
  onAuthChange?: (user: User | null) => void;
}

export function Header({ onAuthChange }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Bootstrap auth state and listen for changes
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      onAuthChange?.(user);
      setLoadingAuth(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      onAuthChange?.(u);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignIn = async () => {
    setSigningIn(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${config.domainName}/api/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    await supabase.auth.signOut();
  };

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? '';
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl dark:border-neutral-800/80 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/promptvault_logo.svg"
            alt="PromptVault"
            className="h-15 w-auto dark:brightness-90 dark:contrast-110"
            draggable={false}
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-all hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>

          {/* Auth button / user menu */}
          {loadingAuth ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          ) : user ? (
            /* Logged-in: avatar + dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium text-neutral-700 transition-all hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-700"
                  />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                    {initials || '?'}
                  </span>
                )}
                <span className="hidden max-w-[100px] truncate sm:block">
                  {displayName.split(' ')[0]}
                </span>
                <svg
                  className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg shadow-neutral-200/50 dark:border-neutral-700 dark:bg-neutral-900 dark:shadow-neutral-900/50">
                  {/* User info */}
                  <div className="border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                    <p className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100 truncate">
                      {displayName}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  {/* Status */}
                  <div className="px-4 py-2.5">
                    <div className="flex items-center gap-2 text-[12px] text-emerald-600 dark:text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Signed in with Google
                    </div>
                  </div>
                  {/* Sign out */}
                  <div className="border-t border-neutral-100 p-1.5 dark:border-neutral-800">
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium text-neutral-600 transition-all hover:bg-neutral-50 hover:text-red-600 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-red-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged-out: Google Sign-in button */
            <button
              onClick={handleSignIn}
              disabled={signingIn}
              className="flex h-9 items-center gap-2 rounded-lg bg-neutral-900 pl-3 pr-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-700 disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              {signingIn ? (
                <>
                  <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  {/* Google G icon */}
                  <svg className="h-3.5 w-3.5 flex-none" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path fill="#4285F4" d="M30.363 16.337c0-.987-.088-1.925-.238-2.837H16v5.637h8.087c-.362 1.85-1.424 3.413-3 4.476v3.75h4.826c2.825-2.613 4.45-6.463 4.45-11.026"/>
                    <path fill="#34A853" d="M16 31c4.05 0 7.438-1.35 9.913-3.637l-4.826-3.75c-1.35.9-3.062 1.45-5.087 1.45-3.912 0-7.225-2.638-8.413-6.2H2.612v3.862C5.075 27.625 10.137 31 16 31"/>
                    <path fill="#FBBC05" d="M7.588 18.863A8.7 8.7 0 017.112 16c0-1 .175-1.963.476-2.863V9.275H2.612a14.83 14.83 0 000 13.45z"/>
                    <path fill="#EA4335" d="M16 6.938c2.212 0 4.188.762 5.75 2.25l4.275-4.276C23.438 2.487 20.05 1 16 1 10.137 1 5.075 4.375 2.612 9.275l4.975 3.862c1.188-3.562 4.5-6.2 8.413-6.2z"/>
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
