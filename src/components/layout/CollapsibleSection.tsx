import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function CollapsibleSection({ title, defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button className="flex items-center justify-between w-full bg-transparent border-none p-2 text-xs font-semibold cursor-pointer text-foreground uppercase tracking-wider hover:bg-accent" onClick={() => setOpen(!open)}>
        <span>{title}</span>
        <ChevronDown size={14} className={cn("transition-transform duration-200 text-muted-foreground", open && "rotate-180")} />
      </button>
      <div className={cn("px-2 pb-2", open ? "block" : "hidden")}>
        {children}
      </div>
    </div>
  );
}
