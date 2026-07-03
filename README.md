<div align="center">
  <h1>✦ Daily shadcn ✦</h1>
  <p><strong>A desktop side-panel productivity experiment.<br>Built with shadcn/ui, Tauri v2 &mdash; now archived.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/status-archived-cc2936?style=flat-square" alt="Archived">
    <img src="https://img.shields.io/badge/version-1.2.1-4F8CFF?style=flat-square" alt="Version">
    <img src="https://img.shields.io/badge/stack-React%2019-61dafb?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/stack-Tauri%20v2-ffc131?style=flat-square&logo=tauri" alt="Tauri">
    <img src="https://img.shields.io/badge/stack-Rust-f74c00?style=flat-square&logo=rust" alt="Rust">
    <img src="https://img.shields.io/badge/stack-HeroUI%20v2-18181B?style=flat-square" alt="HeroUI">
    <img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="MIT">
  </p>
</div>

<br>

> **⚠️ This project has been archived.**  
> Daily was an experimental exploration into Tauri v2 desktop development with three concurrent UI framework implementations. The experiment has concluded. No further development, issues, or pull requests will be addressed.

---

## ❧ Sunset Notice

Daily began as a question: _What if a desktop side-panel could be built with modern web tech, feel native, and ship in under 10 MB?_  

Three forks, four months, 100+ commits, and 96 code-audit findings later, the question has been answered — and the experiment is complete.  

The repositories remain publicly available for reference, learning, and forking. The final release (v1.2.1) contains all accumulated fixes, including security hardening, WCAG contrast compliance, Acrylic/glass effect corrections, and full test coverage.

---

## ✦ What It Does

Daily provides a compact, always-available sidebar for quick notes, clipboard history, and global search — summoned by a configurable hotkey (`Alt+Space` by default).

| Feature | Description |
|---|---|
| **Quick Notes** | Create, edit, archive, and search notes from any application |
| **Clipboard History** | Auto-captures clipboard entries with star/filter/delete |
| **Global Search** | ⌘/Ctrl+F to search across all notes and clipboard entries |
| **System Tray** | Lives in the system tray; shown/hidden via hotkey |
| **Acrylic Glass** | Windows 11 Acrylic effect via DWM (Phase 0.1 fix) |
| **i18n Ready** | Internationalization framework in place (en-US default) |
| **Autostart** | Optional launch on system startup |

---

## ✦ Tech Stack

```
frontend     React 19 · TypeScript · shadcn/ui · Tailwind v3 · Zustand · i18next
desktop      Tauri v2 · Rust
build        Vite · Rolldown · PostCSS · cargo tauri build
test         Vitest · @testing-library/react · jsdom
artifacts    MSI · NSIS · portable .exe
```

---

## ✦ Architecture

```
┌─────────────────────────────────────────────┐
│            shadcn/ui + Tailwind v3           │
│   Shell · NoteEditor · ClipboardList · etc   │
├─────────────────────────────────────────────┤
│         Zustand Stores · IPC Bridge         │
├─────────────────────────────────────────────┤
│            Tauri v2 Rust Backend             │
│  SQLite · Global Shortcut · System Tray     │
└─────────────────────────────────────────────┘
```

---

## ✦ Fork Comparison

Daily was developed across **three UI framework forks** for comparison:

| Fork | UI Framework | Status |
|---|---|---|
| **daily-shadcn** | [shadcn/ui](https://ui.shadcn.com) + Tailwind v3 | ✅ Final release |
| [daily-mantine](https://github.com/REDrighthand05/daily-mantine) | [Mantine v7](https://mantine.dev) | ✅ Final release |
| [daily-shadcn](https://github.com/REDrighthand05/daily-shadcn) | [shadcn/ui](https://ui.shadcn.com) + Tailwind v3 | ✅ Final release |

All three share the same Tauri v2 + Rust backend. The UI layer alone differentiates them, making this an interesting case study in framework comparison for desktop applications.

---

## ✦ Final Release

**v1.2.1** includes the complete Phase 0–1.3 refactoring:

- ✅ Acrylic/glass effect fix (OS-level DWM, Phase 0.1)
- ✅ Responsive layout with CSS Container Queries (Phase 0.2)
- ✅ WCAG AA text contrast compliance (Phase 0.3)
- ✅ Security hardening against path traversal & unvalidated IPC (Phase 1.1)
- ✅ 10 Store tests, all passing (Phase 1.2)
- ✅ One-click build scripts (Phase 1.3)
- ✅ Full code audit: 96 findings, 6 Critical resolved

**[⬇ Download the final release](https://github.com/REDrighthand05/daily-shadcn/releases/tag/v1.2.1)**

---

## ✦ Reflections

> "The purpose of prototyping is not to build the product — it's to answer the questions that product development depends on."

Daily taught us that Tauri v2 is production-ready for small desktop utilities, that Acrylic effects require careful coordination between DWM and CSS, and that HeroUI, Mantine, and shadcn each bring distinct tradeoffs to the desktop.

The code is here. Fork it, learn from it, build something better.

---

## ✦ License

[MIT](LICENSE) © 2026 REDrighthand05