import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Search, X } from "lucide-react";

export default function NoteSearch() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useUIStore();

  return (
    <div className="flex items-center px-3 py-2 gap-3 border-b border-border">
      <Search size={14} className="text-muted-foreground shrink-0" />
      <input
        type="text"
        placeholder={t("notes.search")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 border-none bg-transparent py-1 text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
      />
      {searchQuery && (
        <button className="text-muted-foreground shrink-0 hover:text-foreground bg-transparent border-none cursor-pointer p-0 flex" onClick={() => setSearchQuery("")}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
