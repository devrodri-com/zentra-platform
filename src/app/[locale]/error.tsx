"use client";

type PublicShellErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function PublicShellError({ reset }: PublicShellErrorProps) {
  return (
    <main className="status-page" id="main-content">
      <p className="eyebrow">ZENTRA</p>
      <h1>Experience unavailable</h1>
      <p>An unexpected error occurred. / Ocurrió un error inesperado.</p>
      <button className="button button--primary" type="button" onClick={reset}>
        Try again / Reintentar
      </button>
    </main>
  );
}
