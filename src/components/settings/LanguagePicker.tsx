import { useTranslation } from "react-i18next";
import { useAppStore } from "../../stores/appStore";

const LANGUAGES = [
  { code: "en-US", label: "English" },
  { code: "zh-CN", label: "中文" },
];

export default function LanguagePicker() {
 const { i18n } = useTranslation();
  const { updateSettings } = useAppStore();

  const handleChange = async (code: string) => {
    await i18n.changeLanguage(code);
    updateSettings({ language: code });
  };

  return (
    <div className="flex gap-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          className="flex flex-col items-center gap-1 px-3.5 py-1.5 rounded-lg border border-border text-[11px] text-muted-foreground transition-all hover:bg-accent"
          onClick={() => handleChange(lang.code)}
        >
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
