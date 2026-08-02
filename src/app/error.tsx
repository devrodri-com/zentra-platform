"use client";

type FoundationErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function FoundationError({ reset }: FoundationErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg rounded-2xl bg-surface p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Foundation unavailable</h1>
        <p className="mt-4 text-muted">An unexpected local application error occurred.</p>
        <button
          className="mt-6 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
          type="button"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </main>
  );
}
