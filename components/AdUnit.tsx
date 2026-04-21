'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  className?: string;
  label?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Google AdSense ad unit.
 * Replace the data-ad-client value with your own publisher ID (ca-pub-XXXXXXXX).
 */
export function AdUnit({
  slot,
  format = 'auto',
  className = '',
  label = true,
}: AdUnitProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch { /* ignore */ }
  }, []);

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {label && (
        <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-neutral-300 dark:text-neutral-600">
          Advertisement
        </p>
      )}
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-REPLACE_WITH_YOUR_PUBLISHER_ID"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
