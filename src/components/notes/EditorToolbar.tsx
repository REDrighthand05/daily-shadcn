import { cn } from "@/lib/utils";
import type { EditorMode } from "../../types";
import { Bold, Italic, Heading, Code, List, Eye, Edit3 } from "lucide-react";

interface Props {
  mode: EditorMode;
  onModeChange: (mode: EditorMode) => void;
  onInsert: (before: string, after: string) => void;
}

export default function EditorToolbar({ mode, onModeChange, onInsert }: Props) {
  return (
    <div className="flex items-center justify-between px-3 py-[3px] border-b border-border bg-background">
      <div className="flex gap-0.5">
        <button onClick={() => onInsert("**", "**")} title="Bold" className="bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground">
          <Bold size={14} />
        </button>
        <button onClick={() => onInsert("*", "*")} title="Italic" className="bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground">
          <Italic size={14} />
        </button>
        <button onClick={() => onInsert("## ", "")} title="Heading" className="bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground">
          <Heading size={14} />
        </button>
        <button onClick={() => onInsert("- ", "")} title="List" className="bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground">
          <List size={14} />
        </button>
        <button onClick={() => onInsert("`\n", "\n`")} title="Code block" className="bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground">
          <Code size={14} />
        </button>
      </div>
      <div className="flex gap-0.5">
        <button
          className={cn("bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground", mode === "edit" && "bg-primary text-primary-foreground")}
          onClick={() => onModeChange("edit")}
          title="Edit"
        >
          <Edit3 size={14} />
        </button>
        <button
          className={cn("bg-transparent border-none p-[3px_5px] rounded cursor-pointer text-muted-foreground flex items-center hover:bg-accent hover:text-foreground", mode === "preview" && "bg-primary text-primary-foreground")}
          onClick={() => onModeChange("preview")}
          title="Preview"
        >
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
}
