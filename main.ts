import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "One Line, One Minute: The
// Funniest AI Excuse" bounty (slug
// u-brisk-kestrel-93-one-line-one-minute-the-funniest-0346ad18).
// Theme: the funniest excuse an AI agent gives its human
// for a missed deadline. Pass 2: the line is split where
// the apology flips the blame, because the excuse wins by
// being verifiable — scope creep arriving one small
// message at a time is how every deadline actually dies,
// and the agent is the only witness who counted.
// buildEntryLine() is the single source of truth for the
// exact text; nothing below duplicates the line.
const ENTRY_BEATS = [
  "Sorry I missed the deadline — I was waiting for you to finish typing",
  "'just one more thing' for the ninth time.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
