import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { globalSearch } from "../../bridge/ipc";
import type { SearchResultItem } from "../../types";
import { Search, FileText, Clipboard, X } from "lucide-react";

export default function SearchOverlay() {
  const { t } = useTranslation();
  const {
    globalSearchOpen, globalSearchQuery, globalSearchResults,
    closeGlobalSearch, setGlobalSearchQuery, setGlobalSearchResults, setActiveTab,
  } = useUIStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!globalSearchOpen) return;
    setSelectedIdx(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [globalSearchOpen]);

  useEffect(() => {
    if (!globalSearchOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeGlobalSearch(); return; }
      if (e.key === "ArrowDown") {
        setSelectedIdx((i) => Math.min(i + 1, globalSearchResults.length - 1));
        e.preventDefault();
      }
      if (e.key === "ArrowUp") {
        setSelectedIdx((i) => Math.max(i - 1, 0));
        e.preventDefault();
      }
      if (e.key === "Enter" && globalSearchResults[selectedIdx]) {
        navigate(globalSearchResults[selectedIdx]);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [globalSearchOpen, globalSearchResults, selectedIdx]);

  if (!globalSearchOpen) return null;

  const doSearch = (q: string) => {
    setGlobalSearchQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) { setGlobalSearchResults([]); return; }
    debounceRef.current = setTimeout(async () => {
      const results = await globalSearch(q);
      setGlobalSearchResults(results);
    }, 250);
  };

  const navigate = (item: SearchResultItem) => {
    closeGlobalSearch();
    if (item.source === "note") setActiveTab("notes");
    else if (item.source === "clipboard") setActiveTab("clipboard");
  };

  const noteResults = globalSearchResults.filter((r) => r.source === "note");
  const clipResults = globalSearchResults.filter((r) => r.source === "clipboard");

  return (
    <div className="fixed inset-0 bg-black/40 z-[1000] flex justify-center pt-[60px]" onClick={closeGlobalSearch}>
      <div className="w-[90%] max-w-[400px] max-h-[80vh] bg-background rounded-xl border border-border shadow-lg flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-3 py-2 border-b border-border">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            className="flex-1 border-none bg-transparent text-sm outline-none text-foreground"
            value={globalSearchQuery}
            onChange={(e) => doSearch(e.target.value)}
            placeholder={t("search.placeholder")}
          />
          <button className="bg-transparent border-none cursor-pointer text-muted-foreground p-1 flex rounded hover:bg-accent hover:text-foreground" onClick={closeGlobalSearch}>
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[60vh] py-1">
          {noteResults.length > 0 && (
            <div className="py-1">
              <div className="flex items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-wider">
                <FileText size={12} /> {t("search.notes", { count: noteResults.length })}
              </div>
              {noteResults.map((r, i) => (
                <div
                  key={r.id}
                  className={`search-result-item ${selectedIdx === i ? "selected" : ""}`}
                  onClick={() => navigate(r)}
                >
                  <div className="text-[13px] font-medium text-foreground mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{r.title || "Untitled"}</div>
                  <div className="text-[11px] text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">{r.snippet}</div>
                </div>
              ))}
            </div>
          )}
          {clipResults.length > 0 && (
            <div className="py-1">
              <div className="flex items-center gap-1 px-3 py-1 text-[11px] text-muted-foreground uppercase tracking-wider">
                <Clipboard size={12} /> {t("search.clipboard", { count: clipResults.length })}
              </div>
              {clipResults.map((r, i) => (
                <div
                  key={r.id}
                  className={`search-result-item ${selectedIdx === noteResults.length + i ? "selected" : ""}`}
                  onClick={() => navigate(r)}
                >
                  <div className="text-[13px] font-medium text-foreground mb-0.5 overflow-hidden text-ellipsis whitespace-nowrap">{r.title}</div>
                  <div className="text-[11px] text-muted-foreground overflow-hidden text-ellipsis whitespace-nowrap">{r.snippet}</div>
                </div>
              ))}
            </div>
          )}
          {globalSearchQuery.length >= 2 && globalSearchResults.length === 0 && (
            <div className="p-5 text-center text-muted-foreground text-[13px]">{t("search.noResults")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
