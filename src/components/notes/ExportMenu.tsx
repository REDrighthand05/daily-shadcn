import type { Note } from "../../types";
import type { ExportFormat } from "../../types";
import { writeFile } from "../../bridge/ipc";
import { Download } from "lucide-react";
import { save } from "@tauri-apps/plugin-dialog";
import { useState } from "react";

interface Props {
  note: Note;
}

export default function ExportMenu({ note }: Props) {
  const [open, setOpen] = useState(false);

  const handleExport = async (format: ExportFormat) => {
    setOpen(false);
    const ext = format === "markdown" ? "md" : "txt";
    const defaultName = note.content.slice(0, 30).replace(/\s+/g, "_") || "note";
    try {
      const path = await save({
        filters: [{ name: format === "markdown" ? "Markdown" : "Text", extensions: [ext] }],
        defaultPath: ${defaultName}.,
      });
      if (path) {
        await writeFile(path, note.content);
      }
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  return (
    <div className="relative inline-block">
      <button className="bg-transparent border-none p-1 rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground" onClick={() => setOpen(!open)} title="Export note">
        <Download size={14} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 min-w-[160px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          <button className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground" onClick={() => handleExport("markdown")}>
            Export as Markdown
          </button>
          <button className="relative flex w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground" onClick={() => handleExport("text")}>
            Export as Text
          </button>
        </div>
      )}
    </div>
  );
}
