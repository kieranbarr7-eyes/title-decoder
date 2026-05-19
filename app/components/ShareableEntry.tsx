"use client";

import type { RefObject } from "react";
import ReactMarkdown from "react-markdown";
import { AvatarMascot } from "./AvatarMascot";

type Section = { label: string; body: string };

type Props = {
  innerRef: RefObject<HTMLDivElement | null>;
  title: string;
  company: string;
  entryNumber: number;
  sections: Section[];
};

function MarkdownBody({ body, marker }: { body: string; marker: number }) {
  let injected = false;
  const Marker = () => (
    <span
      className="font-mono font-medium text-vermillion"
      style={{ marginRight: 12 }}
    >
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
              <p
                className="text-ink-body"
                style={{ fontSize: 28, lineHeight: 1.55, marginBottom: 16 }}
              >
                <Marker />
                {children}
              </p>
            );
          }
          return (
            <p
              className="text-ink-body"
              style={{ fontSize: 28, lineHeight: 1.55, marginBottom: 16 }}
            >
              {children}
            </p>
          );
        },
        ul: ({ children }) => (
          <ul
            className="list-disc marker:text-vermillion"
            style={{ marginTop: 8, marginBottom: 8, paddingLeft: 40 }}
          >
            {children}
          </ul>
        ),
        li: ({ children }) => {
          if (!injected) {
            injected = true;
            return (
              <li
                className="text-ink-body"
                style={{ fontSize: 28, lineHeight: 1.55, marginBottom: 8 }}
              >
                <Marker />
                {children}
              </li>
            );
          }
          return (
            <li
              className="text-ink-body"
              style={{ fontSize: 28, lineHeight: 1.55, marginBottom: 8 }}
            >
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

export function ShareableEntry({
  innerRef,
  title,
  company,
  entryNumber,
  sections,
}: Props) {
  // Scale body text down a touch when 4 sections are present so the entry
  // fits in 1200x1200 without cropping.
  const dense = sections.length >= 4;

  return (
    <div
      ref={innerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: -9999,
        top: 0,
        width: 1200,
        height: 1200,
        backgroundColor: "#ffffff",
        pointerEvents: "none",
      }}
    >
      <div
        className="bg-white font-sans"
        style={{
          width: 1200,
          height: 1200,
          padding: 60,
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: 24,
          }}
        >
          <div>
            <div
              className="small-caps font-mono text-ink"
              style={{ fontSize: 22, letterSpacing: "0.3em" }}
            >
              title decoder
            </div>
            <div
              className="text-ink-muted"
              style={{ fontSize: 22, marginTop: 8 }}
            >
              a working dictionary for modern job titles.
            </div>
          </div>
          <div
            className="small-caps font-mono text-vermillion"
            style={{
              border: "2px solid #D62828",
              borderRadius: 5,
              padding: "6px 14px",
              fontSize: 22,
            }}
          >
            No.&nbsp;{entryNumber}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #E5E5E5" }} />

        {/* Title row */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <AvatarMascot size={56} />
          <h1
            className="font-serif font-medium text-ink"
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              textTransform: "lowercase",
              wordBreak: "break-word",
              margin: 0,
            }}
          >
            {title.toLowerCase()}
          </h1>
        </div>

        {/* Meta */}
        <div
          className="font-mono text-ink-muted"
          style={{
            marginTop: 12,
            paddingLeft: 74,
            fontSize: 22,
            letterSpacing: "0.05em",
          }}
        >
          <span className="italic text-vermillion">noun</span>
          <span>{" · "}</span>
          <span>{company}</span>
        </div>

        {/* Sections */}
        <div style={{ marginTop: 16 }}>
          {sections.map((section, i) => (
            <section
              key={i}
              style={{
                marginTop: dense ? 18 : 22,
                paddingTop: dense ? 18 : 22,
                borderTop: "1px solid #E5E5E5",
              }}
            >
              <div
                className="small-caps font-mono font-medium text-vermillion"
                style={{
                  fontSize: 22,
                  letterSpacing: "0.2em",
                  marginBottom: 10,
                }}
              >
                {section.label}
              </div>
              <MarkdownBody body={section.body} marker={i + 1} />
            </section>
          ))}
        </div>

        {/* Baked-in footer */}
        <div
          className="font-mono text-ink-muted"
          style={{
            position: "absolute",
            left: 60,
            right: 60,
            bottom: 40,
            textAlign: "center",
            fontSize: 20,
          }}
        >
          title-decoder.vercel.app&nbsp;&nbsp;·&nbsp;&nbsp;No. {entryNumber}
        </div>
      </div>
    </div>
  );
}
