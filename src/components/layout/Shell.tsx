import { cn } from "@/lib/utils";
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
    <div className="flex flex-col h-screen overflow-hidden">
      <React.Suspense fallback={null}><SearchOverlay /></React.Suspense>
      <TitleBar />
      {activeTab === "notes" && (
        <div className="flex flex-col flex-1 overflow-hidden">
          <NoteSearch />
          <div className="flex flex-1 overflow-hidden">
            <NoteList />
            <NoteEditor />
          </div>
        </div>
      )}
      {activeTab === "clipboard" && <ClipboardList />}
      {activeTab === "settings" && <React.Suspense fallback={<div className="flex items-center justify-center p-4 text-muted-foreground">Loading...</div>}><SettingsPage /></React.Suspense>}
      <div className="flex border-t border-border bg-background shrink-0">
        <button
          className={cn("flex-1 flex items-center justify-center gap-1 border-t-2 border-transparent px-2 pb-2 pt-1.5 text-[11px] cursor-pointer text-muted-foreground transition-colors hover:text-foreground hover:bg-accent", activeTab === "notes" && "text-primary border-t-primary")}
          onClick={() => setActiveTab("notes")}
        >
          <FileText size={14} /> {t("tabs.notes")}
        </button>
        <button
          className={cn("flex-1 flex items-center justify-center gap-1 border-t-2 border-transparent px-2 pb-2 pt-1.5 text-[11px] cursor-pointer text-muted-foreground transition-colors hover:text-foreground hover:bg-accent", activeTab === "clipboard" && "text-primary border-t-primary")}
          onClick={() => setActiveTab("clipboard")}
        >
          <Clipboard size={14} /> {t("tabs.clipboard")}
        </button>
        <button
          className={cn("flex-1 flex items-center justify-center gap-1 border-t-2 border-transparent px-2 pb-2 pt-1.5 text-[11px] cursor-pointer text-muted-foreground transition-colors hover:text-foreground hover:bg-accent", activeTab === "settings" && "text-primary border-t-primary")}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={14} /> {t("tabs.settings")}
        </button>
      </div>
    </div>
  );
}



