# Changelog

All notable changes to Daily will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [1.1.0] - 2026-07-03

### Changed

- Full UI migration to **shadcn/ui** component library
- Shell.tsx: Tailwind v3 utility classes + cn() pattern
- TitleBar.tsx: shadcn Button with Tailwind layout
- CollapsibleSection.tsx: custom component with Tailwind transitions
- All remaining components: shadcn Button, Card, Input, Dialog, Badge, Switch, Checkbox
- Global.css: Tailwind v3 directives + CSS variables for dark theme
- vite.config.ts: @tailwindcss/vite removed, postcss for v3
- tsconfig.app.json: path aliases for @/
- main.tsx: global.css import

### Added

- tailwindcss v3, postcss, autoprefixer
- shadcn/ui components: button, card, input, dialog, dropdown-menu, badge, sheet, separator, switch, checkbox, scroll-area, tooltip, sonner
- @/lib/utils.ts with cn() helper
- components.json shadcn config
## [1.0.0] - 2026-07-03

### Added

- Fork from daily-app with shadcn/ui component library integration
- Initial Vite + React + TypeScript + Tauri v2 project structure
- System tray icon with Show / Settings / Quit context menu
- Clipboard history with full-text search (SQLite-backed)
- Quick notes with Markdown preview and export (HTML/Markdown)
- Global search overlay (Ctrl+Shift+F)
- i18n support (zh-CN / en-US)
- Acrylic window effects (Windows 11)
- Auto-updater framework (placeholder)
- Error boundary + diagnostics panel
- Backend command modules: backup, clipboard, diagnostics, export, markdown, notes, search, settings, tags
- Zustand state management (appStore + uiStore)

## [0.1.0] - 2026-07-02

### Added

- System tray icon with Show / Settings / Quit context menu
## [1.1.1] - 2026-07-04

### Fixed

- **Acrylic 毛玻璃彻底修复** — 删除 Rust 后端 set_background_color() 调用，该调用在 WebView 软件层写入实色覆盖，完全遮蔽了 OS 层 DWM Acrylic 效果。现在由 	auri.conf.json 的 windowEffects: ["acrylic"] 直接控制，CSS --window-alpha 变量控制透明度

### Added

- **CSS 安全色层** — #root::before 伪元素叠加 gba(0,0,0,0.25) 安全层，确保任何桌面壁纸上文字对比度 ≥ 4.5:1
- **Surface elevation 层级** — 新增 .surface-elevated 和 .surface-dialog 类，编辑器/弹窗使用更高不透明度保障可读性

### Changed

- window.rs: 无用的 	heme 参数已标记为 _theme，消除 Rust 编译 warning
- global.css: 增加 Acrylic 双层背景策略的注释说明