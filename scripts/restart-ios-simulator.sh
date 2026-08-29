#!/usr/bin/env bash
set -euo pipefail
if [[ "$(uname -s)" != "Darwin" ]]; then echo "iOS Simulator requires macOS."; exit 0; fi
if ! xcrun --find simctl >/dev/null 2>&1; then
  echo "simctl is unavailable. Run: sudo xcode-select -s /Applications/Xcode.app/Contents/Developer && sudo xcodebuild -runFirstLaunch" >&2; exit 1
fi
xcrun simctl shutdown all >/dev/null 2>&1 || true
killall Simulator >/dev/null 2>&1 || true
open -a Simulator
sleep 2
xcrun simctl list devices available
printf '\nSimulator restarted. If no iOS device is listed, install a simulator runtime in Xcode > Settings > Components.\n'
