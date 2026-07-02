import { useState } from "react";
import TagChip from "./TagChip";
import { useAppStore } from "../../stores/appStore";
import type { Tag } from "../../types";
import { Plus } from "lucide-react";

interface Props {
  onToggle: (tagId: string) => void;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default function TagPicker({ onToggle }: Props) {
  const { tags, saveTag } = useAppStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const handleAdd = async () => {
    const name = newName.trim();
    if (!name) return;
    const tag: Tag = { id: generateId(), name, color: undefined };
    await saveTag(tag);
    setNewName("");
    setShowAdd(false);
  };

  return (
    <div className="px-3 py-1.5 border-b border-border bg-background">
      <div className="flex flex-wrap gap-[3px] items-center">
        {tags.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            onClick={() => onToggle(tag.id)}
            size="sm"
          />
        ))}
        <button className="bg-transparent border border-dashed border-border rounded-lg w-5 h-5 flex items-center justify-center cursor-pointer text-muted-foreground p-0 hover:bg-accent" onClick={() => setShowAdd(!showAdd)} title="New tag">
          <Plus size={12} />
        </button>
      </div>
      {showAdd && (
        <div className="mt-1">
          <input
            autoFocus
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
            placeholder="Tag name..."
            className="w-full box-border px-1.5 py-1.5 border border-border rounded-md text-xs bg-muted text-foreground outline-none"
          />
        </div>
      )}
    </div>
  );
}
