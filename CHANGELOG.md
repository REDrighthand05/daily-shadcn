# Changelog

All notable changes to Daily will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

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
