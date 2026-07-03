# Daily 全量代码审计报告

**审计日期**: 2026-07-04
**审计范围**: Rust 后端 · 前端组件 · CSS/样式 · Store/Bridge/类型
**审计方式**: 逐文件手写计算审计
**审计 Agent**: Arendt (Rust) · Zeno (Frontend) · Kant (CSS) · Hooke (Store)

---

## 发现汇总

| 审计域 | Critical | High | Medium | Low | Info | 合计 |
|--------|----------|------|--------|-----|------|------|
| Rust 后端 | 3 | 6 | 6 | 6 | 5 | 26 |
| 前端组件 | 1 | 4 | 7 | 8 | 5 | 25 |
| CSS/样式 | 1 | 2 | 5 | 5 | 3 | 16 |
| Store/Bridge | 1 | 11 | 7 | 5 | 5 | 29 |
| **合计** | **6** | **23** | **25** | **24** | **18** | **96** |

## Critical 级发现

1. **Rust CR-01** batch_export 路径遍历无防护 — 可写任意文件
2. **Rust CR-02** save_settings IPC 零校验
3. **Rust CR-03** save_note IPC 零校验
4. **Frontend CR-01** ClipboardList Rules of Hooks 违规 — React 可能崩溃
5. **CSS CR-01** Acrylic 被 #root 背景层覆盖（backdrop-filter 是 DOM 层模糊，非 DWM 替代品）
6. **Store CR-01** 测试引用不存在的 store 字段，覆盖率趋近于零

## 详细报告

| 审计域 | 报告文件 |
|--------|---------|
| Rust 后端 (26 findings) | audit-rust.md |
| 前端组件 (25 findings) | audit-frontend.md |
| CSS/样式 (16 findings) | audit-css.md |
| Store/Bridge/类型 (29 findings) | audit-store.md |

## 按严重度排序的修复建议

**应立即修复 (P0 - Critical):**
- batch_export 加 canonicalize + 白名单检查
- ClipboardList 修复 Hook 调用顺序
- Acrylic 效果评估：是否需要减少 #root 背景不透明度
- 修正测试文件以匹配实际 store 接口

**本周修复 (P1 - High):**
- save_note / save_settings 加输入校验
- 修复 App.tsx + Shell.tsx 双重 loadAll 调用
- NoteEditor 加防抖写入
- NoteEditor 击键去抖
- 补全国际化缺失 key

**本月修复 (P2 - Medium):**
- 解决 Tailwind v3/v4 配置冲突
- 剪贴板轮询加配置开关
- 修复 LanguagePicker 中文编码
- 搜索去重、防抖、卸载清理