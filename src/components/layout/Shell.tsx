import TitleBar from "./TitleBar";
import NoteList from "../notes/NoteList";
import NoteEditor from "../notes/NoteEditor";
import NoteSearch from "../notes/NoteSearch";
const SettingsPage = React.lazy(() => import("../settings/SettingsPage"));
import ClipboardList from "../clipboard/ClipboardList";
import React from "react";
import { useTranslation } from "react-i18next";
const SearchOverlay = React.lazy(() => import("../search/SearchOverlay"));
import { useAppStore } from "../../stores/appStore";
import { useUIStore } from "../../stores/useUIStore";
import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { FileText, Clipboard, Settings } from "lucide-react";

export default function Shell() {
  const { t } = useTranslation();
  const { loadAll } = useAppStore();
  const { activeTab, setActiveTab } = useUIStore();

  useEffect(() => {
    loadAll();
    const unlisten = listen<string>("navigate", (event) => {
      if (event.payload === "settings") setActiveTab("settings");
    });
    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

    useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const uiState = useUIStore.getState();
      if (uiState.globalSearchOpen) return;
      if (e.key === "/" || ((e.ctrlKey || e.metaKey) && e.key === "f")) {
        e.preventDefault();
        uiState.openGlobalSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="app-container">
      <React.Suspense fallback={null}><SearchOverlay /></React.Suspense>
      <TitleBar />
      {activeTab === "notes" && (
        <div className="notes-panel">
          <NoteSearch />
          <div className="notes-body">
            <NoteList />
            <NoteEditor />
          </div>
        </div>
      )}
      {activeTab === "clipboard" && <ClipboardList />}
      {activeTab === "settings" && <React.Suspense fallback={<div className="loading-panel">Loading...</div>}><SettingsPage /></React.Suspense>}
      <div className="tab-bar">
        <button
          className={`tab-bar-btn ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          <FileText size={14} /> {t("tabs.notes")}
        </button>
        <button
          className={`tab-bar-btn ${activeTab === "clipboard" ? "active" : ""}`}
          onClick={() => setActiveTab("clipboard")}
        >
          <Clipboard size={14} /> {t("tabs.clipboard")}
        </button>
        <button
          className={`tab-bar-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={14} /> {t("tabs.settings")}
        </button>
      </div>
    </div>
  );
}