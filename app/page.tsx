"use client";

import { useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      setError(`Request failed: ${detail}`);
    } finally {
      setIsLoading(false);
    }
  }

  const submitDisabled = isLoading || !title.trim() || !company.trim();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[700px] flex-col px-6 py-16">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Title Decoder
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          What does someone with this LinkedIn title actually do? Paste a title
          and company, get a real explanation.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Job Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Storyteller Engineer"
            autoComplete="off"
            className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs uppercase tracking-wider text-slate-400">
            Company Name
          </span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Pika Labs"
            autoComplete="off"
            className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </label>

        <button
          type="submit"
          disabled={submitDisabled}
          className="mt-2 self-start rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
        >
          {isLoading ? "Thinking..." : "Decode"}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="mt-8 rounded-md border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </div>
      )}

      {result && (
        <section className="prose prose-invert mt-10 max-w-none prose-headings:font-semibold prose-headings:text-slate-50 prose-strong:text-slate-100 prose-p:text-slate-200 prose-li:text-slate-200">
          <ReactMarkdown>{result}</ReactMarkdown>
        </section>
      )}
    </main>
  );
}
