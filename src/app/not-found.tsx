import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-lg rounded-2xl bg-surface p-10 text-center shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted">The requested foundation route does not exist.</p>
        <Link
          className="mt-6 inline-flex rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background"
          href="/"
        >
          Return to foundation
        </Link>
      </div>
    </main>
  );
}
