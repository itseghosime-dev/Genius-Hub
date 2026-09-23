'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center p-8 text-center font-sans">
        <main className="max-w-md space-y-4">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
            Critical Application Error
          </h1>
          <p className="text-sm text-neutral-600">
            A critical system error has occurred. Please refresh or try again.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-950 focus:outline-hidden"
            >
              Reload application
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

