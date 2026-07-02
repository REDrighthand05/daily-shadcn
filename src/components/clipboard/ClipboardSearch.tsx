import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Search, X } from "lucide-react";

export default function ClipboardSearch() {
  const { t } = useTranslation();
  const { clipboardSearchQuery, setClipboardSearchQuery } = useUIStore();

  return (
    <div className="cb-search">
      <Search size={14} className="cb-search-icon" />
      <input
        value={clipboardSearchQuery}
        onChange={(e) => setClipboardSearchQuery(e.target.value)}
        placeholder={t("clipboard.search")}
        className="cb-search-input"
      />
      {clipboardSearchQuery && (
        <button className="cb-search-clear" onClick={() => setClipboardSearchQuery("")}>
          <X size={12} />
        </button>
      )}
    </div>
  );
}