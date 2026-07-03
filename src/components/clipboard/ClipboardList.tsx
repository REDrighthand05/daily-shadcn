import { useEffect, useState, useRef } from "react";
import { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { useUIStore } from "../../stores/useUIStore";
import type { ClipboardEntry as CEntry } from "../../types";
import ClipboardEntryComponent from "./ClipboardEntry";
import ClipboardSearch from "./ClipboardSearch";
import ClipboardDetail from "./ClipboardDetail";
import { Trash2 } from "lucide-react";
import { clipboardPoll } from "../../bridge/ipc";
import { Button } from "@heroui/react";

export default function ClipboardList() {
  const { t } = useTranslation();
  const {
    clipboardEntries,
    loadClipboardEntries, addClipboardEntry,
    deleteClipboardEntry, clearClipboardHistory, starClipboardEntry,
  } = useAppStore();
  const { clipboardSearchQuery } = useUIStore();
  const [detailEntry, setDetailEntry] = useState<CEntry | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadClipboardEntries();
    pollRef.current = setInterval(async () => {
      try {
        const entry = await clipboardPoll();
        if (entry) addClipboardEntry(entry);
      } catch {}
    }, 2000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Hooks MUST be before any conditional return (Rules of Hooks)
  const parentRef = useRef<HTMLDivElement>(null);
  const filtered = useMemo(() => clipboardSearchQuery
    ? clipboardEntries.filter((e) =>
        e.content.toLowerCase().includes(clipboardSearchQuery.toLowerCase())
      )
    : clipboardEntries, [clipboardEntries, clipboardSearchQuery]);

  const virtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  // Now safe to conditionally return
  if (detailEntry) {
    return (
      <ClipboardDetail
        entry={detailEntry}
        onBack={() => setDetailEntry(null)}
        onDelete={async (id) => { await deleteClipboardEntry(id); setDetailEntry(null); }}
        onStar={(id, s) => starClipboardEntry(id, s)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 text-xs text-foreground-400 border-b border-divider">
        <span className="text-[11px]">{filtered.length}</span>
        <Button
          size="sm"
          variant="ghost"
          color="danger"
          className="h-6 min-w-0 text-xs px-2 gap-1"
          startContent={<Trash2 size={12} />}
          onClick={() => { if (confirm(t("clipboard.clearConfirm"))) clearClipboardHistory(); }}
          title="Clear history"
        >
          Clear
        </Button>
      </div>
      <ClipboardSearch />
      <div className="flex-1 overflow-y-auto" ref={parentRef}>
        <div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map((vItem) => {
            const entry = filtered[vItem.index];
            return (
              <div key={entry.id} style={{
                position: 'absolute', top: 0, left: 0, width: '100%',
                height: `${vItem.size}px`,
                transform: `translateY(${vItem.start}px)`
              }}>
                <ClipboardEntryComponent
                  entry={entry}
                  onDelete={deleteClipboardEntry}
                  onStar={starClipboardEntry}
                  onClick={setDetailEntry}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}