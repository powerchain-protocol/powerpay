import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const allowedMarkdown = new Set(["README.md", "CHANGELOG.md", "RELEASE_NOTES.md"]);
const entries = await readdir(root, { withFileTypes: true });
const markdown = entries
  .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
  .map((entry) => entry.name)
  .sort();
const unexpected = markdown.filter((name) => !allowedMarkdown.has(name));
const missing = [...allowedMarkdown].filter((name) => !markdown.includes(name));

if (unexpected.length || missing.length) {
  console.error("PowerPay root documentation policy failed.");
  if (unexpected.length) console.error(`Unexpected root Markdown: ${unexpected.join(", ")}`);
  if (missing.length) console.error(`Missing canonical root Markdown: ${missing.join(", ")}`);
  console.error(`Move engineering reports under ${path.join("docs", "reports")} or status evidence under ${path.join("docs", "status")}.`);
  process.exit(1);
}

console.log(`PowerPay root documentation policy passed (${markdown.length} canonical Markdown files).`);
