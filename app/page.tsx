"use client";

import { useEffect, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { AvatarMascot } from "./components/AvatarMascot";

type Section = { label: string; body: string };

function parseSections(md: string): Section[] {
  const labelRe = /^\*\*([^*]+)\*\*\s*$/;
  const lines = md.split("\n");
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const line of lines) {
    const m = labelRe.exec(line.trim());
    if (m) {
      if (current) {
        sections.push({ label: current.label, body: current.body.trim() });
      }
      current = { label: m[1].trim(), body: "" };
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    }
  }
  if (current) {
    sections.push({ label: current.label, body: current.body.trim() });
  }
  return sections;
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [submittedCompany, setSubmittedCompany] = useState("");
  const [stampNumber, setStampNumber] = useState<string | null>(null);

  useEffect(() => {
    setStampNumber(String(Math.floor(Math.random() * 990) + 10));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/decode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, company }),
      });

      const data: { result?: string; error?: string } = await response.json();

      if (!response.ok || !data.result) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data.result);
      setSubmittedTitle(title.trim());
      setSubmittedCompany(company.trim());
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      setError(`Request failed: ${detail}`);
    } finally {
      setIsLoading(false);
    }
  }

  const submitDisabled = isLoading || !title.trim() || !company.trim();
  const sections = result ? parseSections(result) : [];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[700px] flex-col px-6 py-12">
      <header className="flex items-start justify-between gap-6 border-b border-rule pb-6">
        <div>
          <div
            className="font-mono text-[11px] uppercase text-ink"
            style={{ letterSpacing: "0.3em" }}
          >
            title decoder
          </div>
          <div className="mt-1.5 font-serif text-[13px] italic text-ink-muted">
            a working encyclopedia for modern job titles.
          </div>
        </div>
        <div
          className="small-caps shrink-0 rotate-[-5deg] border border-accent px-2.5 py-1 font-mono text-[11px] text-accent"
          style={{ letterSpacing: "0.12em" }}
        >
          entry № {stampNumber ?? "—"} · decoded
        </div>
      </header>

      <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
        <label className="flex flex-col gap-2">
          <span
            className="small-caps font-mono text-[11px] text-ink-muted"
            style={{ letterSpacing: "0.18em" }}
          >
            job title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="storyteller engineer"
            autoComplete="off"
            className="border-0 border-b border-accent/50 bg-paper-light px-2 py-2 font-serif text-[16px] text-ink placeholder-ink-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/60"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span
            className="small-caps font-mono text-[11px] text-ink-muted"
            style={{ letterSpacing: "0.18em" }}
          >
            company name
          </span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="pika labs"
            autoComplete="off"
            className="border-0 border-b border-accent/50 bg-paper-light px-2 py-2 font-serif text-[16px] text-ink placeholder-ink-muted/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/60"
          />
        </label>

        <button
          type="submit"
          disabled={submitDisabled}
          className="small-caps mt-2 self-start border border-accent bg-transparent px-5 py-2 font-mono text-[12px] text-accent transition hover:bg-accent hover:text-paper disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent disabled:hover:text-accent"
          style={{ letterSpacing: "0.2em" }}
        >
          {isLoading ? "decoding…" : "decode"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mt-8 border border-red-900/60 bg-red-950/30 px-4 py-3 font-serif text-[14px] text-red-200"
        >
          {error}
        </div>
      )}

      {result && (
        <article className="mt-14">
          <div className="flex items-start gap-5">
            <AvatarMascot />
            <div className="flex-1 pt-1">
              <h1 className="font-serif text-[32px] leading-tight text-ink">
                {submittedTitle}
              </h1>
              <div className="mt-1.5 font-mono text-[11px] text-ink-muted">
                <span className="italic text-accent">noun</span>
                <span> · </span>
                <span>{submittedCompany}</span>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="my-8 text-center font-mono text-[16px] text-accent/70"
            style={{ letterSpacing: "0.6em" }}
          >
            ❦ ❦ ❦
          </div>

          {sections.length === 0 ? (
            <div className="font-serif text-[15px] leading-[1.62] text-ink">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {sections.map((section, i) => (
                <section key={i}>
                  <div
                    className="small-caps font-mono text-[11px] text-accent"
                    style={{ letterSpacing: "0.22em" }}
                  >
                    ↳ {section.label}
                  </div>
                  <div className="mt-3 flex gap-4">
                    <span className="w-5 shrink-0 pt-[2px] font-mono text-[14px] leading-[1.62] text-accent tabular-nums">
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => (
                            <p className="mb-3 font-serif text-[15px] leading-[1.62] text-ink last:mb-0">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="my-2 list-disc space-y-1.5 pl-5 marker:text-accent">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="font-serif text-[15px] leading-[1.62] text-ink">
                              {children}
                            </li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold text-ink">
                              {children}
                            </strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic text-ink-muted">{children}</em>
                          ),
                        }}
                      >
                        {section.body}
                      </ReactMarkdown>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          )}
        </article>
      )}
    </main>
  );
}
