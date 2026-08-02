export function FoundationMessage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section
        className="w-full max-w-2xl rounded-2xl bg-surface p-10 text-center shadow-sm sm:p-14"
        aria-labelledby="foundation-title"
      >
        <p className="text-sm font-medium tracking-[0.18em] text-muted uppercase">
          Technical development baseline
        </p>
        <h1
          id="foundation-title"
          className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          ZENTRA Platform Foundation
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted">
          This isolated repository currently contains only the reproducible platform foundation.
        </p>
      </section>
    </main>
  );
}
