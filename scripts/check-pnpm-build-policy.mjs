import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const workspacePath = path.join(root, 'pnpm-workspace.yaml');
const source = fs.readFileSync(workspacePath, 'utf8');

const requiredApprovals = [
  'bigint-buffer@1.1.5',
  'browser-tabs-lock@1.3.0',
  'bufferutil@4.1.0',
  'core-js@3.47.0',
  'esbuild@0.28.1',
  'esbuild@0.28.2',
  'msgpackr-extract@3.0.4',
  'utf-8-validate@6.0.6',
  'workerd@1.20260704.1',
  'workerd@1.20260826.1',
];

const failures = [];

if (!/^strictDepBuilds:\s*true\s*$/m.test(source)) {
  failures.push('strictDepBuilds must remain true');
}

if (/^dangerouslyAllowAllBuilds:\s*true\s*$/m.test(source)) {
  failures.push('dangerouslyAllowAllBuilds must not be enabled');
}

if (!/^allowBuilds:\s*$/m.test(source)) {
  failures.push('allowBuilds map is missing');
}

for (const dependency of requiredApprovals) {
  const escaped = dependency.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matcher = new RegExp(`^\\s{2}${escaped}:\\s*true\\s*$`, 'm');
  if (!matcher.test(source)) {
    failures.push(`missing exact build approval: ${dependency}`);
  }
}

if (failures.length > 0) {
  console.error('pnpm build policy check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`pnpm build policy OK (${requiredApprovals.length} exact approvals; strict fail-closed mode enabled)`);
