"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Root error boundary — must render its own html/body.
 * Keep minimal: no product shell dependency.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Companion root error:", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.5,
          padding: "2rem",
          background: "#fafbfc",
          color: "#181c24",
        }}
      >
        <main>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ color: "#525b6a", maxWidth: "36rem" }}>
            The Companion failed to load. You can try again. Silence and flat
            presentation remain the complete product when enhancements fail.
          </p>
          <p>
            <button type="button" onClick={reset}>
              Try again
            </button>
          </p>
        </main>
      </body>
    </html>
  );
}
