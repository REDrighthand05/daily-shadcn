import { useEffect, useRef, useState } from "react";
import { renderMarkdown } from "../../bridge/ipc";

interface Props {
  content: string;
}

export default function MarkdownPreview({ content }: Props) {
  const [html, setHtml] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    renderMarkdown(content).then((h) => {
      if (!cancelled) setHtml(h);
    }).catch(() => {
      if (!cancelled) setHtml("<p><em>Preview unavailable</em></p>");
    });
    return () => { cancelled = true; };
  }, [content]);

  useEffect(() => {
    if (html && ref.current) {
      import("highlight.js/lib/core").then((hljs) => {
        ref.current?.querySelectorAll("pre code").forEach((block) => {
          try { hljs.default.highlightElement(block as HTMLElement); } catch {}
        });
      });
    }
  }, [html]);

  return (
    <div
      ref={ref}
      className="flex-1 p-2 overflow-y-auto text-[13px] leading-relaxed text-foreground [&_h1]:text-xl [&_h1]:my-3 [&_h2]:text-lg [&_h2]:my-3 [&_h3]:text-[15px] [&_h3]:my-2 [&_p]:my-1.5 [&_ul]:pl-5 [&_ul]:my-1.5 [&_ol]:pl-5 [&_ol]:my-1.5 [&_li]:my-0.5 [&_code]:bg-accent [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:text-xs [&_pre]:bg-background [&_pre]:p-2 [&_pre]:rounded-md [&_pre]:overflow-x-auto [&_pre]:my-3 [&_pre]:border [&_pre]:border-border [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:border-l-[3px] [&_blockquote]:border-l-primary [&_blockquote]:my-3 [&_blockquote]:px-3 [&_blockquote]:py-1.5 [&_blockquote]:text-muted-foreground [&_table]:border-collapse [&_table]:my-3 [&_table]:w-full [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-1.5 [&_th]:text-left [&_th]:bg-background [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-1.5 [&_td]:text-left [&_img]:max-w-full [&_img]:rounded [&_a]:text-primary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
