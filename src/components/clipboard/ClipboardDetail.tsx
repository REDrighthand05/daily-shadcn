import { useTranslation } from "react-i18next";
import type { ClipboardEntry as CEntry } from "../../types";
import { Star, Trash2, Clipboard, ArrowLeft } from "lucide-react";
import { writeClipboard } from "../../bridge/ipc";


interface Props {
  entry: CEntry;
  onBack: () => void;
  onDelete: (id: string) => void;
  onStar: (id: string, starred: boolean) => void;
}

export default function ClipboardDetail({ entry, onBack, onDelete, onStar }: Props) {
  const { t } = useTranslation();
  const handleCopy = async () => {
    try { await writeClipboard(entry.content); } catch (e) { console.error("Clipboard copy failed:", e); }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <button className="bg-transparent border-none flex items-center gap-1 text-xs cursor-pointer text-muted-foreground hover:text-foreground" onClick={onBack}>
          <ArrowLeft size={14} /> Back
        </button>
        <div className="flex gap-0.5">
          <button className="cb-action-btn" onClick={handleCopy} title={t("clipboard.copy")}>
            <Clipboard size={14} />
          </button>
          <button
            className={`bg-transparent border-none p-0.5 rounded cursor-pointer text-muted-foreground flex hover:bg-accent hover:text-foreground ${entry.starred ? "starred" : ""}`}
            onClick={() => onStar(entry.id, !entry.starred)}
            title={entry.starred ? t("clipboard.unstar") : t("clipboard.star")}
          >
            <Star size={14} />
          </button>
          <button className="cb-action-btn" onClick={() => onDelete(entry.id)} title={t("common.delete")}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <pre className="text-xs leading-relaxed whitespace-pre-wrap break-all text-foreground">{entry.content}</pre>
      </div>
      <div className="px-3 py-2 text-[10px] text-muted-foreground border-t border-border">
        {t("clipboard.contentType")}: {entry.content_type} | {new Date(entry.created_at).toLocaleString()}
      </div>
    </div>
  );
}

