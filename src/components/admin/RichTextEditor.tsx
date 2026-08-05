import { useEffect, useRef, useState } from 'react';
import {
  Bold, Italic, Underline, List, ListOrdered, Link2, Image as ImageIcon,
  Undo2, Redo2, Table as TableIcon, Maximize2, Minimize2, Code2, Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sanitizeHtml } from '@/lib/cms/sanitize';

type Props = { value: string; onChange: (html: string) => void; placeholder?: string };

const HEADINGS = ['p', 'h2', 'h3', 'h4'] as const;

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const [html, setHtml] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value || '';
  }, [value]);

  const exec = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    push();
  };
  const push = () => onChange(sanitizeHtml(ref.current?.innerHTML ?? ''));

  const insertLink = () => {
    const url = window.prompt('Link URL');
    if (url) exec('createLink', url);
  };
  const insertImage = () => {
    const url = window.prompt('Image URL');
    if (url) exec('insertImage', url);
  };
  const insertVideo = () => {
    const url = window.prompt('Video URL (mp4)');
    if (url) exec('insertHTML', `<video src="${url}" controls playsinline class="w-full rounded-lg"></video>`);
  };
  const insertTable = () => {
    const rows = Number(window.prompt('Rows', '3') || 0);
    const cols = Number(window.prompt('Columns', '3') || 0);
    if (!rows || !cols) return;
    const body = Array.from({ length: rows })
      .map(() => `<tr>${Array.from({ length: cols }).map(() => '<td>&nbsp;</td>').join('')}</tr>`)
      .join('');
    exec('insertHTML', `<table class="w-full border-collapse [&_td]:border [&_td]:p-2"><tbody>${body}</tbody></table>`);
  };

  const Tool = ({ onClick, title, children }: any) => (
    <button type="button" title={title} onClick={onClick}
      className="w-8 h-8 grid place-items-center rounded-md hover:bg-muted text-foreground/80">
      {children}
    </button>
  );

  return (
    <div className={full ? 'fixed inset-0 z-50 bg-background p-6 overflow-auto' : ''}>
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5 bg-muted/40">
          <Tool title="Bold" onClick={() => exec('bold')}><Bold className="w-4 h-4" /></Tool>
          <Tool title="Italic" onClick={() => exec('italic')}><Italic className="w-4 h-4" /></Tool>
          <Tool title="Underline" onClick={() => exec('underline')}><Underline className="w-4 h-4" /></Tool>
          <span className="w-px h-5 bg-border mx-1" />
          <select
            className="h-8 rounded-md bg-transparent text-sm px-1"
            onChange={(e) => exec('formatBlock', e.target.value)}
            defaultValue="p"
            title="Heading style"
          >
            {HEADINGS.map((h) => <option key={h} value={h}>{h === 'p' ? 'Paragraph' : h.toUpperCase()}</option>)}
          </select>
          <span className="w-px h-5 bg-border mx-1" />
          <Tool title="Bullet list" onClick={() => exec('insertUnorderedList')}><List className="w-4 h-4" /></Tool>
          <Tool title="Numbered list" onClick={() => exec('insertOrderedList')}><ListOrdered className="w-4 h-4" /></Tool>
          <Tool title="Table" onClick={insertTable}><TableIcon className="w-4 h-4" /></Tool>
          <span className="w-px h-5 bg-border mx-1" />
          <Tool title="Link" onClick={insertLink}><Link2 className="w-4 h-4" /></Tool>
          <Tool title="Image" onClick={insertImage}><ImageIcon className="w-4 h-4" /></Tool>
          <Tool title="Video" onClick={insertVideo}><Video className="w-4 h-4" /></Tool>
          <span className="w-px h-5 bg-border mx-1" />
          <Tool title="Undo" onClick={() => exec('undo')}><Undo2 className="w-4 h-4" /></Tool>
          <Tool title="Redo" onClick={() => exec('redo')}><Redo2 className="w-4 h-4" /></Tool>
          <div className="ml-auto flex items-center gap-1">
            <Tool title="HTML source" onClick={() => setHtml((v) => !v)}><Code2 className="w-4 h-4" /></Tool>
            <Tool title="Full screen" onClick={() => setFull((v) => !v)}>
              {full ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Tool>
          </div>
        </div>

        {html ? (
          <textarea
            className="w-full p-4 font-mono text-xs bg-background outline-none"
            rows={full ? 24 : 10}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            data-placeholder={placeholder}
            onInput={push}
            onBlur={push}
            className={`prose-cms p-4 outline-none ${full ? 'min-h-[60vh]' : 'min-h-[160px]'} max-w-none`}
          />
        )}
      </div>
      {full && (
        <div className="mt-4 flex justify-end">
          <Button onClick={() => setFull(false)}>Done</Button>
        </div>
      )}
    </div>
  );
}
