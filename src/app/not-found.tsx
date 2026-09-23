import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-950">404</h1>
        <p className="text-lg font-medium text-neutral-700">Page not found</p>
        <p className="text-sm text-neutral-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-xs hover:bg-neutral-50 focus:ring-2 focus:ring-neutral-950 focus:outline-hidden"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}

