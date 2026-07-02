import type { ClipboardEntry as CEntry } from "../../types";
import { Star, Trash2, Clipboard } from "lucide-react";
import { writeClipboard } from "../../bridge/ipc";


interface Props {
  entry: CEntry;
  onDelete: (id: string) => void;
  onStar: (id: string, starred: boolean) => void;
  onClick: (entry: CEntry) => void;
}

export default function ClipboardEntryComponent({ entry, onDelete, onStar, onClick }: Props) {
  const preview = entry.content.slice(0, 80);

  const handleCopy = async () => {
    try { await writeClipboard(entry.content); } catch (e) { console.error("Clipboard copy failed:", e); }
  };

  const time = new Date(entry.created_at).toLocaleTimeString();

  return (
    <div className="group px-3 py-2 border-b border-border cursor-pointer transition-colors hover:bg-accent" onClick={() => onClick(entry)}>
      <div className="flex justify-between items-start gap-3">
        <span className="text-xs leading-relaxed text-foreground break-all flex-1">{preview}{entry.content.length > 80 ? "..." : ""}</span>
        <div className="flex gap-0.5 opacity-0 shrink-0 transition-opacity group-hover:opacity-100">
          <button className="bg-transparent border-none p-0.5 rounded cursor-pointer text-muted-foreground flex hover:bg-accent hover:text-foreground" onClick={(e) => { e.stopPropagation(); handleCopy(); }} title="Copy">
            <Clipboard size={12} />
          </button>
          <button
            className={`bg-transparent border-none p-0.5 rounded cursor-pointer flex hover:bg-accent hover:text-foreground ${entry.starred ? "starred" : ""}`}
            onClick={(e) => { e.stopPropagation(); onStar(entry.id, !entry.starred); }}
            title={entry.starred ? "Unstar" : "Star"}
          >
            <Star size={12} />
          </button>
          <button className="bg-transparent border-none p-0.5 rounded cursor-pointer text-muted-foreground flex hover:bg-accent hover:text-foreground" onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }} title="Delete">
            <Trash2 size={12} />
          </button>
        </div>
      </div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{time}</div>
    </div>
  );
}


