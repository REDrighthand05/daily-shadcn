import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";
import { useUIStore } from "../../stores/useUIStore";
import { X } from "lucide-react";

export default function CategoryFilter() {
  const { t } = useTranslation();
  const { tags, notes } = useAppStore();
  const { selectedTagId, setSelectedTagId } = useUIStore();

  const tagCounts = new Map<string, number>();
  notes.forEach((n) => n.tags.forEach((tId) => {
    tagCounts.set(tId, (tagCounts.get(tId) || 0) + 1);
  }));

  return (
    <div className="flex flex-wrap gap-1 px-3 py-1.5 border-b border-border">
      <button
        className={`inline-flex items-center gap-1 bg-transparent border border-border rounded-[10px] px-2 py-[1px] text-[11px] cursor-pointer text-muted-foreground transition-all ${!selectedTagId ? "bg-accent text-white border-accent" : ""} ${!selectedTagId ? "" : "hover:bg-accent"}`}
        onClick={() => setSelectedTagId(null)}
      >
        {t("notes.all")} ({notes.length})
      </button>
      {tags
        .filter((t) => (tagCounts.get(t.id) || 0) > 0)
        .map((tag) => (
          <button
            key={tag.id}
            className={`inline-flex items-center gap-1 bg-transparent border border-border rounded-[10px] px-2 py-[1px] text-[11px] cursor-pointer text-muted-foreground transition-all ${selectedTagId === tag.id ? "bg-accent text-white border-accent" : "hover:bg-accent"}`}
            onClick={() => setSelectedTagId(tag.id === selectedTagId ? null : tag.id)}
          >
            <span className="w-[5px] h-[5px] rounded-full inline-block shrink-0" style={{ backgroundColor: tag.color || "#888" }} />
            {tag.name} ({tagCounts.get(tag.id) || 0})
            {selectedTagId === tag.id && <X size={10} className="align-middle" />}
          </button>
        ))}
    </div>
  );
}
