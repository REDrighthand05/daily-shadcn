# Daily 重构白皮书 · 公司级完整报告

**编制日期**: 2026-07-03  
**编制团队**: Architect Alpha（架构）· Architect Beta（UI/UX）· Architect Gamma（工程化）· Architect Delta（产品策略）  
**密级**: 内部 · 版本: v1.0

---

## 目录

1. [架构重构白皮书](#1-架构重构白皮书)
2. [UI/UX 重构白皮书](#2-uiux-重构白皮书)
3. [工程化重构白皮书](#3-工程化重构白皮书)
4. [产品演进白皮书](#4-产品演进白皮书)
5. [综合建议与行动清单](#5-综合建议与行动清单)

---

## 1. 架构重构白皮书

### 1.1 当前架构评估

Daily 项目采用 **"一核三壳"** 架构策略：一套完整的后端内核（Tauri v2 Rust 层 + Zustand 状态管理层 + i18next 国际化层 + Vite/Rolldown 构建管线）作为共享基底，三个分支（daily-hero、daily-shadcn、daily-mantine）各自独立实现 UI 表现层。

```
+-----------------------------+-----------------------------+-----------------------------+
|          HeroUI v2          |         shadcn/ui          |         Mantine v7          |
+-----------------------------+-----------------------------+-----------------------------+
|                               共享内核层 (Shared Kernel)                                |
|      Zustand Stores      |      i18n      |     IPC Bridge     |     Hooks     |
+--------------------------------------------------------------------------------------+
|                              Tauri v2 桌面层 (Desktop Layer)                           |
|   Rust Core   |   Commands x9   |   SQLite DB   |   Window Manager   |
+--------------------------------------------------------------------------------------+
```

**优势：**
- 框架实验平台，天然适合对比不同 UI 框架在 Tauri 生态下的实际表现
- 隔离风险，UI 层变更不波及后端逻辑
- 三个分支独立交付，互不阻塞

**瓶颈：**
- 维护成本线性增长：8 子组件 × 3 分支 = 24 份独立实现，重复率达 200%
- 共享边界模糊：IPC 层与 UI 耦合严重
- 缺乏统一设计令牌：Tailwind 分支与 Mantine 的 CSS-in-JS 体系未对齐
- 测试覆盖薄弱：共享内核层仅 1 个基础测试用例

### 1.2 主流桌面应用架构趋势

| 维度 | Electron | Tauri | Slint | Neutralino.js |
|------|----------|-------|-------|---------------|
| 渲染引擎 | Chromium Full | 系统 WebView | Skia+QPainter | 系统 WebView |
| 安装包大小 | 120-250 MB | 3-15 MB | 2-10 MB | 3-8 MB |
| 内存基线 | ~120 MB | ~30 MB | ~10 MB | ~25 MB |
| 前端自由度 | 任何 Web 栈 | 任何 Web 栈 | Slint 专用语言 | 任何 Web 栈 |
| Rust 集成 | napi-rs | 原生（核心语言） | 原生 | 无 |

**趋势判断：** Tauri v2 已从 "小而美" 进化为生产就绪框架。Hybrid 三层混构（原生壳 + Web 逻辑 + Rust 计算）是主流方向，Spacedrive、Zed 等行业标杆已验证。

### 1.3 重构的最高可能形态

若不计成本，可进化为：

1. **插件化组件系统** — UI 组件注册为独立插件包，通过插件注册表按需切换 UI 品牌
2. **Design Token 统一体系** — 跨框架统一变量命名，自动生成各框架专属主题
3. **增量编译跨分支热更新** — TurboRepo 缓存 + Vite Rolldown 条件编译
4. **多 WebView 微前端** — Tauri v2 多 WebView 能力实现插件隔离
5. **跨平台统一渲染** — 一套业务逻辑 + 主题令牌 + n 个平台适配器

### 1.4 分阶段重构路径

**Phase 0 — 紧急修复（当前至第 2 周）**
| 任务 | 收益 | 工作量 |
|---|---|---|
| 修复 light mode 暗色 bug（window.rs 背景色） | 消除可用性阻断 | 0.5 天 |
| 统一 CSS 变量定义 | 消除视觉异常 | 0.5 天 |
| Zustand Store 拆分 | 降低单体风险 | 2 天 |
| 组件目录对齐 | 消除 Diff 噪声 | 1 天 |
| 代码质量基线 | 持续保障 | 0.5 天 |

**Phase 1 — 共享内核收敛（第 3-6 周）**
| 任务 | 收益 | 工作量 |
|---|---|---|
| 提取 ui-adapters 层 | 复用度提升 60% | 2 周 |
| 确立 Design Token 体系 | 主题一致性 100% | 1 周 |
| src-tauri symlink 统一 | 消除 Rust 重复维护 | 0.5 天 |
| Playwright E2E 参数化测试 | 回归自动化 | 1 周 |

**Phase 2 — 按需加载与构建优化（第 7-10 周）**
| 任务 | 收益 | 工作量 |
|---|---|---|
| 共享 Vite 缓存 | 构建时间降 70% | 3 天 |
| React.lazy 代码分割 | 首屏 JS 减 40% | 3 天 |
| 条件编译 tree-shake | 产物降至 1x | 2 天 |
| 虚拟滚动 | 1 万条笔记保持 60fps | 1 周 |

**Phase 3 — 终极形态（第 11-16 周）**
| 任务 | 收益 | 工作量 |
|---|---|---|
| Component Plugin Registry | 三叉戟合并为单仓库 | 2 周 |
| Design Token 自动代码生成 | 新框架接入从 2 周降为 2 天 | 2 周 |
| WASM 高性能模块 | 搜索性能提升 10x | 2 周 |
| 主题包市场 | 社区定制化 | 1 周 |

### 1.5 ROI 分析

| 阶段 | 投入 | ROI |
|---|---|---|
| Phase 0 | 4.5 人天 | ★★★★★ |
| Phase 1 | 4.5 人周 | ★★★★☆ |
| Phase 2 | 3 人周 | ★★★★☆ |
| Phase 3 | 8-10 人周 | ★★☆☆☆ （延后至 DAU > 1 万） |

---

## 2. UI/UX 重构白皮书

### 2.1 核心诊断：三方案共同根因

**所有三个 fork 的 Acrylic 毛玻璃均未正确生效。根本原因不在前端，而在 Rust 后端：**

```rust
// lib.rs:99-102  —— 罪魁祸首
let alpha = (settings.opacity * 255.0) as u8;
let _ = window.set_background_color(Some((0, 0, 0, alpha).into()));
```

`set_background_color()` 写入的是 WebView 软件层背景，直接绘制在 DWM Acrylic 表面之上，等效于在透明玻璃上刷油漆。尽管 `tauri.conf.json` 正确配置了 `"windowEffects": { "effects": ["acrylic"] }`，OS 层的 Acrylic 效果被覆盖后不可见。

**各分支表象差异的根因：**

| Fork | 用户反馈 | 根因 |
|---|---|---|
| daily-hero | 按钮变白方块 | HeroUI 组件自带 white/light 背景层，阻断 Acrylic 传递 |
| daily-mantine | 和谐深色但无毛玻璃 | Mantine 深色主题固体色值覆盖 Acrylic，看似和谐实为固体深色 |
| daily-shadcn | 一片黑背景 | shadcn/ui 极度依赖固体纯黑背景色链，透明度层为零 |

### 2.2 国际主流桌面 UI 渲染趋势

| 系统 | 技术 | 关键特性 |
|---|---|---|
| Windows 11 Fluent Design | **Mica** / **Acrylic** | Mica: 单层壁纸采样 + 色调混合，适合应用背景。Acrylic: 多层实时模糊 + 噪点纹理，适合弹出层 |
| macOS | **Material (vibrancy)** | NSVisualEffectView 提供深/浅 vibrancy |
| Material Design 3 | **Dynamic Color** | 壁纸提取 Monet 配色 + Elevation 层级 |

**核心结论：** Windows 桌面高品质渲染方案是 **Mica 做背景 + Acrylic 做浮层**，依赖 DWM 窗口合成层，CSS `backdrop-filter` 仅作为降级回退。

### 2.3 工程修复路径

**四步修复：**

1. **删除 `set_background_color()`** — 让 OS Acrylic 穿透 WebView
2. **修复 `tauri.conf.json` 重复 `windowEffects` 键** — 加载正确配置
3. **CSS 透明度体系重组** — body 用 `transparent`，`#root` 用 `background-color: hsl(... / var(--window-alpha, 0.7))` + `backdrop-filter: blur(20px)`
4. **用 `window.setEffects()` 做动态控制** — 替代当前频繁 set_background_color 的闪烁方案

### 2.4 响应式布局

```
窗口 ≥ 600px:                    窗口 < 600px:
┌──────────┬────────────────┐    ┌──────────────────┐
│ Note List│  Note Editor   │    │    Note Editor    │
│ 160-240px│  flex: 1       │    │  full width       │
└──────────┴────────────────┘    └──────────────────┘
```

使用 CSS Container Queries 而非 JS resize 监听。

### 2.5 对比度审计

| 颜色对 | 当前对比度 | WCAG AA |
|---|---|---|
| `--text-primary: #e8e8e8` on bg | ≈ 6.2:1 | ✅ |
| `--text-secondary: #a0a0a0` on bg | ≈ 3.8:1 | ❌ |
| `--text-muted: #666666` on bg | ≈ 2.1:1 | ❌ |

**修复方案：** 双层背景策略（安全色层 + Acrylic）、不使用 `--text-muted` 做正文颜色、引入 surface-elevation 不透明度层级。

### 2.6 P0 行动项

| 优先级 | 行动项 |
|---|---|
| P0 | 删除 `lib.rs` 中 `set_background_color` 调用 |
| P0 | 修复 `tauri.conf.json` 重复 `windowEffects` 键 |
| P0 | 重构 CSS 透明度体系，移除 body `backdrop-filter` |
| P1 | 引入 Container Queries 响应式布局 |
| P1 | 添加深色安全背景保障对比度 |
| P2 | 三分支合并为单一方案 |
| P2 | 接入 WCAG AA 自动审计 (axe-core) |

---

## 3. 工程化重构白皮书

### 3.1 当前工程化水平

| 维度 | 状态 | 严重程度 |
|---|---|---|
| 测试覆盖率 | **零** — 仅 1 个 20 行测试文件 | 🔴 高危 |
| CI/CD | **有文件无流程** — .github/workflows 闲置 | 🟡 中危 |
| 安全 | **严重** — PAT 明文内嵌在 4 个仓库 remote URL | 🔴 严重 |
| 版本管理 | **碎片化** — 独立仓库、无统一版本同步 | 🟡 中危 |
| 代码质量 | Rust warnings 未清理，Cargo.toml 元数据为空 | 🟢 低危 |

### 3.2 推荐 Monorepo 迁移

```yaml
daily-monorepo/
├── apps/
│   ├── daily-hero/        # → UI 分支 1
│   ├── daily-mantine/     # → UI 分支 2
│   └── daily-shadcn/      # → UI 分支 3
├── packages/
│   ├── shared-core/       # → Rust 核心 + IPC 类型
│   ├── shared-ui/         # → 共享 UI 组件
│   └── config-typescript/ # → 共享 TS 配置
├── pnpm-workspace.yaml
└── turbo.json
```
工具链：Turborepo + pnpm workspace + Changesets

### 3.3 本地发布管道

| 阶段 | 触发方式 | 执行内容 |
|---|---|---|
| pre-commit | git hook | `cargo check` + `tsc -b` + `oxlint` |
| 版本 bump | `pnpm changeset version` | 更新 CHANGELOG、Cargo.toml、tauri.conf.json |
| 构建+签名 | `scripts/build-all.ps1 -Sign` | 依次构建三个 fork，Authenticode 签名 |
| Release 发布 | `scripts/publish-release.ps1` | GitHub Release + 上传 MSI/NSIS |

### 3.4 测试分层引入

| 层级 | 内容 | 投入 | 时间点 |
|---|---|---|---|
| Layer 1 | Zustand Store 测试 | ~1 小时 | 当日 |
| Layer 2 | 纯函数 & 工具函数 | 2-3 小时 | 本周 |
| Layer 3 | React 组件测试 | ~6 小时 | 下周起 |
| Layer 4 | Rust 集成测试 | 持续积累 | 持续 |

### 3.5 安全：即时措施

1. **立即撤销并替换 PAT** — 使用 gh auth login 或 fine-grained PAT
2. **创建 .env.local 模板** — 移除所有硬编码凭证
3. **.gitignore 加固** — 添加 .env、*.local、IDE 目录、证书文件
4. **月度安全审计** — cargo audit + pnpm audit + git secrets

---

## 4. 产品演进白皮书

### 4.1 产品形态定位

Daily 是一款**轻量级桌面侧面板工具**，核心场景是即时笔记 + 剪贴板历史 + 全局搜索快捷面板，当前完成度约 60%。

| Fork | 适合场景 |
|---|---|
| daily-hero | 追求无障碍、高性能的桌面侧边栏 |
| daily-mantine | 追求开箱即用组件的快速原型验证 |
| daily-shadcn | **推荐主干** — 社区生态最大、可定制性最强 |

### 4.2 发布形态分析

| 形态 | 适合性 | 理由 |
|---|---|---|
| **Tauri v2 原生桌面** | ★★★★★ | 已有完整配置，系统托盘+全局快捷键+Acrylic+自动启动是核心差异点 |
| **PWA / Web App** | ★★★☆☆ | 辅助入口，手机端 quick capture |
| **Windows Widgets** | ★★★☆☆ | 仅限 Win11，生态不确定性大 |
| **Web Components** | ★★☆☆☆ | 远期 embedded 场景储备 |
| **通用框架无关轮子** | ★☆☆☆☆ | 本质是应用产品而非库 |

**结论：Tauri v2 原生桌面为主，PWA 为副，Web Component 为远期储备。**

### 4.3 行业对标

| 项目 | 架构 | GitHub |
|---|---|---|
| Logseq | ClojureScript + React + Electron | [logseq/logseq](https://github.com/logseq/logseq) |
| Obsidian | React + Electron | [obsidianmd/obsidian-releases](https://github.com/obsidianmd/obsidian-releases) |
| AFFiNE | React + Rust (正从 Electron 迁移 Tauri) | [toeverything/AFFiNE](https://github.com/toeverything/AFFiNE) |
| Spacedrive | Tauri + Rust | [spacedriveapp/spacedrive](https://github.com/spacedriveapp/spacedrive) |
| Zed | Rust + GPUI | [zed-industries/zed](https://github.com/zed-industries/zed) |
| Excalidraw | React + Web Components | [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) |

### 4.4 6 个月路线图

```yaml
Month 1:  合并三分支 → shadcn 主干，P0 修复，v1.0.0-alpha
Month 2:  架构加固，Zustand 拆分，Playwright E2E，Tauri updater
Month 3:  双向链接 + 轻量知识图谱，对标 Logseq block reference
Month 4:  PWA 辅助入口，云同步雏形 (WebDAV)
Month 5:  插件系统 + SDK，社区示例主题包
Month 6:  v2.0 发布，虚拟列表，国际化全覆盖，winget/choco/scoop
```

### 4.5 变现建议

**Open Core 模式：** 核心笔记/剪贴板免费，云同步 + AI 功能付费。早期通过 GitHub Sponsors + Open Collective 支持。

---

## 5. 综合建议与行动清单

### 立即执行（P0）

- [ ] 删除 `lib.rs` 中 `set_background_color()` — 释放 Acrylic
- [ ] 修复 `tauri.conf.json` 重复 windowEffects 键
- [ ] 撤销并替换 GitHub PAT（安全性严重问题）
- [ ] .gitignore 加固，创建 .env.local 模板
- [ ] CSS 透明度体系重组

### 本周（Phase 0 剩余）

- [ ] 统一 CSS 变量定义
- [ ] Zustand Store 拆分
- [ ] 三个分支组件目录对齐
- [ ] Layer 1+2 测试引入

### 本月（Phase 1 启动）

- [ ] 确立 ui-adapters 层设计方案
- [ ] 决定三分支合并策略（推荐 shadcn 主干）
- [ ] 建立 build-all.ps1 一键构建脚本
- [ ] 建立本地 Release 发布管道

### 远期（Phase 2-3）

- [ ] Monorepo + Turborepo 迁移
- [ ] Component Plugin Registry
- [ ] WASM 高性能模块
- [ ] 主题包市场

---

*本白皮书由 4 位架构师协同完成，基于 D:\codexs_workspace\daily\reports\ 下的四份分报告整合而成。*
