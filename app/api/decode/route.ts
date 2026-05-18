import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "@/lib/prompt";

export const runtime = "nodejs";

type DecodeBody = {
  title?: unknown;
  company?: unknown;
};

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server misconfigured: ANTHROPIC_API_KEY is not set." },
      { status: 500 },
    );
  }

  let body: DecodeBody;
  try {
    body = (await request.json()) as DecodeBody;
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";

  if (!title || !company) {
    return NextResponse.json(
      { error: "Both 'title' and 'company' are required." },
      { status: 400 },
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Job title: ${title}\nCompany: ${company}`,
        },
      ],
    });

    const result = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n\n")
      .trim();

    if (!result) {
      return NextResponse.json(
        { error: "Claude returned an empty response. Try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ result });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Claude API request failed: ${detail}` },
      { status: 502 },
    );
  }
}
