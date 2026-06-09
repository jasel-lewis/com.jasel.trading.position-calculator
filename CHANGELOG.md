# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-09

### Added
- Initial release of the Position Calculator, an Electron desktop app for sizing trades.
- Inputs: Cash Available, Entry, Stop Loss, Risk (%), Risk:Reward, and Leverage, with type-filtered numeric entry and inline validation (Cash Available and Risk:Reward must be greater than zero; Entry must be greater than Stop Loss).
- Primary outputs — **Position Size** and the **Take Profit** price — each with a one-click copy-to-clipboard button that confirms with a check icon and an indigo highlight.
- Secondary, informational read-outs — **Actual Risk** (%) and **Actual Cash Risk** ($) — reflecting risk once leverage is applied. These are excluded from the tab order.
- Outputs recompute from a single debounced snapshot (300 ms after the last edit), keeping validation and results in sync. Each read-out settles as soon as the inputs its own formula needs are valid.
