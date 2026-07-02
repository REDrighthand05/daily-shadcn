import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { RotateCcw, Trash2, AlertTriangle } from "lucide-react";

export default function TrashBin() {
  const { t } = useTranslation();
  const { notes, restoreNote, deleteNote, purgeTrash } = useAppStore();

  const deleted = notes.filter((n) => n.deleted_at !== null)
    .sort((a, b) => (b.deleted_at || 0) - (a.deleted_at || 0));

  const handlePurge = () => {
    if (confirm(t("notes.purgeConfirm"))) {
      purgeTrash();
    }
  };

  if (deleted.length === 0) {
    return (
      <div className="p-5 text-center text-muted-foreground text-[13px]">
        <p>{t("notes.trashEmpty")}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-1.5 text-xs text-muted-foreground border-b border-border">
        <span>{t("notes.deletedCount", { count: deleted.length })}</span>
        <button className="bg-transparent border border-destructive text-destructive rounded-md px-2 py-0.5 text-[11px] cursor-pointer flex items-center gap-1 hover:bg-destructive hover:text-destructive-foreground" onClick={handlePurge} title={t("notes.purgeAll")}>
          <AlertTriangle size={12} /> Purge all
        </button>
      </div>
      <div>
        {deleted.map((note) => (
          <div key={note.id} className="flex items-center justify-between px-3 py-1.5 border-b border-border text-xs">
            <span className="text-muted-foreground flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
              {note.content.slice(0, 50) || t("notes.empty")}
            </span>
            <div className="flex gap-1">
              <button className="bg-transparent border-none p-[3px] rounded cursor-pointer text-muted-foreground flex hover:bg-accent hover:text-foreground" onClick={() => restoreNote(note.id)} title={t("notes.restore")}>
                <RotateCcw size={12} />
              </button>
              <button className="bg-transparent border-none p-[3px] rounded cursor-pointer text-muted-foreground flex hover:bg-accent hover:text-foreground" onClick={() => deleteNote(note.id)} title={t("notes.deletePermanent")}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
