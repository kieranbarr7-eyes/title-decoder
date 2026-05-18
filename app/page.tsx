"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
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

function SectionBody({ body, marker }: { body: string; marker: number }) {
  let injected = false;
  const Marker = (): ReactNode => (
    <span className="mr-[6px] font-mono font-medium text-vermillion">
      {marker}
    </span>
  );

  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => {
          if (!injected) {
            injected = true;
            return (
              <p className="mb-3 text-[14.5px] leading-[1.6] text-ink-body last:mb-0">
                <Marker />
                {children}
              </p>
            );
          }
          return (
            <p className="mb-3 text-[14.5px] leading-[1.6] text-ink-body last:mb-0">
              {children}
            </p>
          );
        },
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1.5 pl-5 marker:text-vermillion">
            {children}
          </ul>
        ),
        li: ({ children }) => {
          if (!injected) {
            injected = true;
            return (
              <li className="text-[14.5px] leading-[1.6] text-ink-body">
                <Marker />
                {children}
              </li>
            );
          }
          return (
            <li className="text-[14.5px] leading-[1.6] text-ink-body">
              {children}
            </li>
          );
        },
        strong: ({ children }) => (
          <strong className="font-semibold text-ink-body">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-ink-muted">{children}</em>
        ),
      }}
    >
      {body}
    </ReactMarkdown>
  );
}

export default function Home() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submittedTitle, setSubmittedTitle] = useState("");
  const [submittedCompany, setSubmittedCompany] = useState("");
  const [entryNumber, setEntryNumber] = useState(1);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("td_entry_number");
      if (stored) {
        const n = parseInt(stored, 10);
        if (Number.isFinite(n) && n > 0) setEntryNumber(n);
      }
    } catch {
      // localStorage unavailable; keep default 1
    }
  }, []);

  function resetToInput() {
    setResult("");
    setError("");
    setSubmittedTitle("");
    setSubmittedCompany("");
    requestAnimationFrame(() => titleInputRef.current?.focus());
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        resetToInput();
        return;
      }

      if (e.key === "Enter") {
        if (!result && !isLoading && title.trim() && company.trim()) {
          e.preventDefault();
          formRef.current?.requestSubmit();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result, isLoading, title, company]);

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
      setEntryNumber((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem("td_entry_number", String(next));
        } catch {
          // ignore
        }
        return next;
      });
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
    <main className="flex min-h-screen items-start justify-center bg-white px-4 py-10 sm:py-16">
      <div className="w-full max-w-[640px] border border-rule bg-white p-6 sm:p-7">
        <header className="flex items-start justify-between gap-4 pb-4">
          <div className="min-w-0">
            <div
              className="small-caps font-mono text-[11px] text-ink"
              style={{ letterSpacing: "0.3em" }}
            >
              title decoder
            </div>
            <div className="mt-1 text-[13px] text-ink-muted">
              a working dictionary for modern job titles.
            </div>
          </div>
          <div
            className="small-caps shrink-0 rounded-[3px] border border-vermillion px-[9px] py-1 font-mono text-[11px] text-vermillion"
            aria-label={`Entry number ${entryNumber}`}
          >
            No.&nbsp;{entryNumber}
          </div>
        </header>

        <hr className="border-t border-rule" />

        {!result ? (
          <div className="pt-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] text-ink-body">Job title</span>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Storyteller Engineer"
                  autoComplete="off"
                  className="rounded border border-rule bg-white px-[14px] py-[10px] text-[14.5px] text-ink-body placeholder-ink-muted/70 focus:border-vermillion focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-[13px] text-ink-body">Company</span>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Pika Labs"
                  autoComplete="off"
                  className="rounded border border-rule bg-white px-[14px] py-[10px] text-[14.5px] text-ink-body placeholder-ink-muted/70 focus:border-vermillion focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={submitDisabled}
                className={`mt-1 self-start rounded-[6px] bg-vermillion px-[18px] py-[10px] text-[14.5px] font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  isLoading ? "animate-pulse" : ""
                }`}
              >
                {isLoading ? "decoding…" : "Decode →"}
              </button>

              <p className="mt-1 font-mono text-[11px] text-ink-muted">
                or press ⌘ + Enter
              </p>
            </form>

            {error && (
              <div
                role="alert"
                className="mt-4 rounded border border-vermillion/40 bg-vermillion/5 px-3 py-2 text-[13px] text-ink-body"
              >
                {error}
              </div>
            )}
          </div>
        ) : (
          <article className="pt-6">
            <div className="flex items-center gap-3">
              <AvatarMascot size={28} />
              <h1
                className="break-words font-serif text-[34px] font-medium lowercase text-ink"
                style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                {submittedTitle.toLowerCase()}
              </h1>
            </div>

            <div
              className="mt-2 font-mono text-[11px] text-ink-muted"
              style={{ paddingLeft: 40, letterSpacing: "0.05em" }}
            >
              <span className="italic text-vermillion">noun</span>
              <span>{" · "}</span>
              <span>{submittedCompany}</span>
            </div>

            <div className="mt-6">
              {sections.length > 0 ? (
                sections.map((section, i) => (
                  <section
                    key={i}
                    className="mt-[1.1rem] border-t border-rule pt-[1.1rem]"
                  >
                    <div
                      className="small-caps mb-2 font-mono text-[11px] font-medium text-vermillion"
                      style={{ letterSpacing: "0.2em" }}
                    >
                      {section.label}
                    </div>
                    <SectionBody body={section.body} marker={i + 1} />
                  </section>
                ))
              ) : (
                <div className="text-[14.5px] leading-[1.6] text-ink-body">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-rule pt-4">
              <button
                type="button"
                onClick={resetToInput}
                className="cursor-pointer font-mono text-[11px] text-ink-muted transition hover:text-ink-body"
              >
                ↻&nbsp;&nbsp;decode another
              </button>
              <kbd
                className="rounded-[3px] border border-rule px-[5px] py-[2px] font-mono text-[11px] text-ink"
                title="Cmd+K on Mac, Ctrl+K on Windows/Linux"
              >
                ⌘K
              </kbd>
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
