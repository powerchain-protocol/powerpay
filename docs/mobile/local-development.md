# PowerPay local Expo development

## Web

PowerPay intentionally supports Expo Web. The mobile workspace pins the required universal web runtime:

- `react-native-web@^0.21.2`
- `react-dom@19.2.3`
- `@expo/metro-runtime@^57.0.14`

The Expo config explicitly enables `web.bundler = "metro"` and lists `ios`, `android`, and `web` platforms.

After pulling dependency changes:

```bash
pnpm install
pnpm web:clear
```

Equivalent Expo-compatible dependency repair:

```bash
pnpm --filter @powerpay/mobile exec expo install react-native-web react-dom @expo/metro-runtime
```

Then verify:

```bash
pnpm check:expo
pnpm expo:doctor
```

## iOS development modes

Use the lightweight Expo/Simulator launcher for ordinary development:

```bash
pnpm ios
```

Use the native build only when native project compilation is required:

```bash
pnpm ios:native
```

Both simulator modes require full Xcode and an installed iOS Simulator runtime.

Before starting iOS, run:

```bash
pnpm ios:doctor
```

If `xcrun simctl` fails, verify the local developer directory:

```bash
xcode-select -p
xcodebuild -version
xcrun --find simctl
xcrun simctl list devices available
```

Typical repair on macOS:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
sudo xcodebuild -license accept
```

Then open Xcode and install an iOS Simulator runtime under Xcode Settings > Components/Platforms if none is installed.

## Android

```bash
pnpm --filter @powerpay/mobile android
```

For a native Android build:

```bash
pnpm --filter @powerpay/mobile android:native
```

## Cache reset

After changing Expo platform dependencies or config:

```bash
pnpm --filter @powerpay/mobile start:clear
```

Do not use `EXPO_NO_WEB_SETUP=1` to hide missing web dependencies in this repository; web is an intentional supported platform.

## Expo SDK 57 release line

The PowerPay mobile workspace is pinned to the current SDK 57 runtime packages used by this release:

- `expo@57.0.17`
- `expo-router@57.0.17`
- `expo-camera@57.0.4`
- `@expo/cli@57.0.18`

Do not change only one Expo package manually. After dependency installation, use `expo install --check` / `expo-doctor` to keep the native module set aligned.

For a non-destructive Simulator restart:

```bash
pnpm ios:simulator:restart
```

This shuts down running simulator devices, restarts the Simulator app and lists available devices. It does not erase simulator contents.
