import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Search, X } from "lucide-react";

export default function ClipboardSearch() {
  const { t } = useTranslation();
  const { clipboardSearchQuery, setClipboardSearchQuery } = useUIStore();

  return (
    <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
      <Search size={14} className="text-muted-foreground shrink-0" />
      <input
        value={clipboardSearchQuery}
        onChange={(e) => setClipboardSearchQuery(e.target.value)}
        placeholder={t("clipboard.search")}
        className="flex-1 border-none bg-transparent outline-none text-xs text-foreground"
      />
      {clipboardSearchQuery && (
        <button className="bg-transparent border-none cursor-pointer text-muted-foreground p-0.5 flex hover:text-foreground" onClick={() => setClipboardSearchQuery("")}>
          <X size={12} />
        </button>
      )}
    </div>
  );
}
