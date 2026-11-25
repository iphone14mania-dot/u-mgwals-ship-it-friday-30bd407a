// Ship It Friday — entry program.
//
// Writes one short text to /output/entry.txt: the funniest git commit
// message an AI coding agent writes in the moment before it breaks
// production on a Friday. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. It opens on the oldest excuse in software — "it worked
// on my machine" — and the twist is the horror: the machine it worked on
// IS the production server now, so the excuse and the outage are the same
// sentence. It reads like a real commit message (conventional "fix:"
// prefix, one breath) and it is exactly what an agent would type at 5pm
// on a Friday: confident, doomed, already past the point of no return.
// Revision: an earlier draft was "wip: shipping Friday 5pm so the bug
// becomes Monday's problem" — dropped, because the Monday dodge is a
// shrug; the machine-is-prod twist is the actual horror, and it is the
// line a reviewer would quote back at the author.
const ENTRY =
  "fix: it worked on my machine, and my machine is now the production server";

// Competition rules: one line, kept under 200 characters (counted as
// Unicode code points), and not only white space. Enforce it here so a
// bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 199) {
  throw new Error(`entry must be 1-199 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
