import type { Tag } from "../../types";
import { X } from "lucide-react";

interface Props {
  tag: Tag;
  onRemove?: () => void;
  onClick?: () => void;
  size?: "sm" | "md";
}

export default function TagChip({ tag, onRemove, onClick, size = "md" }: Props) {
  const baseClass = "inline-flex items-center gap-1 border border-border rounded-[10px] cursor-default text-[11px] transition-colors hover:bg-accent";
  const sizes: Record<string, string> = { sm: "px-1 py-px", md: "text-xs px-2 py-[2px]" };

  return (
    <span
      className={${baseClass} }
      style={tag.color ? { borderColor: tag.color, color: tag.color } : undefined}
      onClick={onClick}
    >
      <span
        className="w-[6px] h-[6px] rounded-full shrink-0"
        style={{ backgroundColor: tag.color || "#888" }}
      />
      {tag.name}
      {onRemove && (
        <button className="bg-transparent border-none cursor-pointer p-0 inline-flex items-center text-inherit opacity-50 hover:opacity-100" onClick={(e) => { e.stopPropagation(); onRemove(); }} title="Remove tag">
          <X size={10} />
        </button>
      )}
    </span>
  );
}
