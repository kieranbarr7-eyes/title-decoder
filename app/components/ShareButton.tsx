"use client";

import { useState, type RefObject } from "react";
import { generateShareImage } from "../lib/generateShareImage";

type Props = {
  targetRef: RefObject<HTMLDivElement | null>;
  title: string;
  entryNumber: number;
};

const SITE_URL = "https://title-decoder.vercel.app";

export function ShareButton({ targetRef, title, entryNumber }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(false);

  async function handleClick() {
    if (!targetRef.current || isGenerating) return;
    setIsGenerating(true);
    setError(false);

    try {
      await generateShareImage(
        targetRef.current,
        `title-decoder-no-${entryNumber}.png`,
      );

      const lowerTitle = title.toLowerCase();
      const text = `decoded this one with title-decoder.vercel.app · what does "${lowerTitle}" actually mean?`;
      const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(SITE_URL)}`;
      window.open(intentUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Share image generation failed:", err);
      setError(true);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={isGenerating}
        className="small-caps rounded-[3px] border border-vermillion bg-white px-[9px] py-1 font-mono text-[11px] text-vermillion transition hover:bg-[#FDF0F0] disabled:cursor-not-allowed disabled:border-ink-muted disabled:bg-white disabled:text-ink-muted disabled:hover:bg-white"
        style={{ letterSpacing: "0.15em" }}
        aria-label="Share this entry to X"
      >
        {isGenerating ? "↗ generating..." : "↗ share"}
      </button>
      {error && (
        <span
          role="alert"
          className="mt-1.5 font-mono text-[10px] text-vermillion"
        >
          Couldn&apos;t generate share image — try again?
        </span>
      )}
    </div>
  );
}
