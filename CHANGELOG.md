# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2026-06-20

### Added
- `scripts/pre-publish-check.mjs` — a Node script run automatically as a `prepublish` hook that verifies the `master` branch is checked out and that the most recent git tag matches the `version` field in `package.json`. If either condition fails it reports the issue(s) and prompts whether to proceed (default: No).

### Changed
- Initial window size set to 780 × 640 (width × height). Size is divided by the primary display's `scaleFactor` at creation time so the window renders at the intended dimensions regardless of Windows DPI scaling.
- Dev Tools no longer opens automatically on launch; it remains accessible via **View → Toggle Developer Tools** or `Ctrl+Shift+I`.

## [1.2.0] - 2026-06-19

### Added
- A `repository` field in `package.json` so the updater can locate published releases.

### Changed
- Revamped the project `README` documenting the features, calculation formulas, and build/publish workflow, with an app screenshot.
- The auto-updater now runs only in packaged builds; it is skipped during development so `npm start` no longer aborts when there is no published release to check against.

## [1.1.1] - 2026-06-09

### Added
- `env-cmd` to load a `GITHUB_TOKEN` from the environment when publishing; the `publish` script now runs `env-cmd electron-forge publish`.

## [1.1.0] - 2026-06-09

### Added
- GitHub release publishing via `@electron-forge/publisher-github`.
- Automatic update checks via `update-electron-app`.

## [1.0.0] - 2026-06-09

### Added
- Initial release of the Position Calculator, an Electron desktop app for sizing trades.
- Inputs: Cash Available, Entry, Stop Loss, Risk (%), Risk:Reward, and Leverage, with type-filtered numeric entry and inline validation (Cash Available and Risk:Reward must be greater than zero; Entry must be greater than Stop Loss).
- Primary outputs — **Position Size** and the **Take Profit** price — each with a one-click copy-to-clipboard button that confirms with a check icon and an indigo highlight.
- Secondary, informational read-outs — **Actual Risk** (%) and **Actual Cash Risk** ($) — reflecting risk once leverage is applied. These are excluded from the tab order.
- Outputs recompute from a single debounced snapshot (300 ms after the last edit), keeping validation and results in sync. Each read-out settles as soon as the inputs its own formula needs are valid.
