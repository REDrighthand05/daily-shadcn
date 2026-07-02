import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Archive, Trash2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ArchiveToggle() {
  const { t } = useTranslation();
  const { showArchived, showDeleted, setShowArchived, setShowDeleted } = useUIStore();

  const mode = showDeleted ? "trash" : showArchived ? "archive" : "active";

  return (
    <div className="flex border-b border-border">
      <button
        className={cn("flex-1 flex items-center justify-center gap-1 bg-transparent border-none border-b-2 border-transparent py-1.5 px-1.5 text-[11px] cursor-pointer text-muted-foreground transition-colors hover:text-foreground hover:bg-accent", mode === "active" && "text-primary border-b-primary")}
        onClick={() => { setShowDeleted(false); setShowArchived(false); }}
        title={t("notes.active")}
      >
        <FileText size={12} /> {t("notes.active")}
      </button>
      <button
        className={cn("flex-1 flex items-center justify-center gap-1 bg-transparent border-none border-b-2 border-transparent py-1.5 px-1.5 text-[11px] cursor-pointer text-muted-foreground transition-colors hover:text-foreground hover:bg-accent", mode === "archive" && "text-primary border-b-primary")}
        onClick={() => setShowArchived(true)}
        title={t("notes.archived")}
      >
        <Archive size={12} /> {t("notes.archived")}
      </button>
      <button
        className={cn("flex-1 flex items-center justify-center gap-1 bg-transparent border-none border-b-2 border-transparent py-1.5 px-1.5 text-[11px] cursor-pointer text-muted-foreground transition-colors hover:text-foreground hover:bg-accent", mode === "trash" && "text-primary border-b-primary")}
        onClick={() => setShowDeleted(true)}
        title={t("notes.trash")}
      >
        <Trash2 size={12} /> {t("notes.trash")}
      </button>
    </div>
  );
}
