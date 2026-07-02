import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Search, X } from "lucide-react";

export default function NoteSearch() {
  const { t } = useTranslation();
  const { searchQuery, setSearchQuery } = useUIStore();

  return (
    <div className="search-bar">
      <Search size={14} className="search-icon" />
      <input
        type="text"
        placeholder={t("notes.search")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button className="search-clear" onClick={() => setSearchQuery("")}>
          <X size={14} />
        </button>
      )}
    </div>
  );
}
