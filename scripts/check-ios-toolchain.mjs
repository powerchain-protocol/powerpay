import { execFileSync } from 'node:child_process';
import process from 'node:process';

if (process.platform !== 'darwin') {
  console.log('iOS toolchain check skipped: iOS Simulator requires macOS + Xcode.');
  process.exit(0);
}

function run(cmd, args = []) {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error) {
    const stderr = error?.stderr?.toString?.().trim() || error?.message || String(error);
    throw new Error(`${cmd} ${args.join(' ')} failed:\n${stderr}`);
  }
}

try {
  const developerDir = run('xcode-select', ['-p']);
  const xcodeVersion = run('xcodebuild', ['-version']);
  const simctl = run('xcrun', ['--find', 'simctl']);
  run('xcrun', ['simctl', 'list', 'devices', 'available']);
  console.log(`Xcode developer directory: ${developerDir}`);
  console.log(xcodeVersion);
  console.log(`simctl: ${simctl}`);
  console.log('iOS Simulator toolchain check passed.');
} catch (error) {
  console.error(String(error?.message || error));
  console.error(`\nRepair checklist:\n  1. Install/open full Xcode (not only Command Line Tools).\n  2. sudo xcode-select -s /Applications/Xcode.app/Contents/Developer\n  3. sudo xcodebuild -runFirstLaunch\n  4. sudo xcodebuild -license accept\n  5. In Xcode > Settings > Components/Platforms, install an iOS Simulator runtime.\n  6. Re-run: pnpm ios:doctor`);
  process.exit(1);
}
