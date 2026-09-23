'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service (e.g., Sentry) in future phases
    console.error('Unhandled route error:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
          Something went wrong
        </h1>
        <p className="text-sm text-neutral-600">
          An unexpected error occurred. Please try again.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-neutral-800 focus:ring-2 focus:ring-neutral-950 focus:outline-hidden"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
}

