import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { useUIStore } from "../../stores/useUIStore";
import { Settings, StickyNote } from "lucide-react";
import type { Tab } from "../../types";

export default function TitleBar() {
  const { t } = useTranslation();
  const { activeTab, setActiveTab } = useUIStore();

  const tabs: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "notes", icon: <StickyNote size={16} />, label: t("tabs.notes") },
    { id: "settings", icon: <Settings size={16} />, label: t("tabs.settings") },
  ];

  return (
    <div
      data-tauri-drag-region
      className="flex items-center px-4 h-[34px] min-h-[34px] border-b border-border"
    >
      <div className="flex gap-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn("flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground", activeTab === tab.id && "bg-accent text-foreground")}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}



