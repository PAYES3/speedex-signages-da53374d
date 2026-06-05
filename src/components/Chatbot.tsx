import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

type Msg = { role: 'user' | 'assistant'; content: string };

const STARTER: Msg = {
  role: 'assistant',
  content: "Hi! I'm the Speedex Signages assistant. Ask me about our services, products, or how to request a quote.\nSources: /",
};

function MessageBody({ text }: { text: string }) {
  // Split off "Sources: ..." trailing line if present
  const m = text.match(/^([\s\S]*?)\n?\s*Sources:\s*(.+)$/i);
  const body = m ? m[1].trim() : text;
  const sources = m
    ? m[2]
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter((s) => s.startsWith('/'))
    : [];
  return (
    <>
      <div className="whitespace-pre-wrap">{body}</div>
      {sources.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border/60 flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-muted-foreground">Sources:</span>
          {sources.map((s, i) => (
            <Link key={i} to={s as any} className="text-primary hover:underline font-medium">
              {s}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([STARTER]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 1e9, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/public/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== STARTER) }),
      });
      if (!res.ok || !res.body) {
        if (res.status === 429) throw new Error('Too many requests — please wait a moment.');
        if (res.status === 402) throw new Error('AI quota exhausted. Please contact support.');
        throw new Error('Failed to reach assistant.');
      }
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let i: number;
        while ((i = buf.indexOf('\n')) !== -1) {
          let line = buf.slice(0, i);
          buf = buf.slice(i + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try {
            const p = JSON.parse(json);
            const delta = p.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((m) => {
                const copy = [...m];
                copy[copy.length - 1] = { role: 'assistant', content: acc };
                return copy;
              });
            }
          } catch {
            buf = line + '\n' + buf;
            break;
          }
        }
      }
    } catch (err) {
      setMessages((m) => [...m, { role: 'assistant', content: (err as Error).message }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat"
          className="fixed bottom-44 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground grid place-items-center shadow-[var(--shadow-glow)] hover:scale-110 transition"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[600px] rounded-2xl glass shadow-2xl flex flex-col overflow-hidden border border-border">
          <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Speedex Assistant</p>
              <p className="text-xs opacity-90">Typically replies in seconds</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 hover:bg-white/10 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/40">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-card text-card-foreground rounded-bl-sm border border-border'
                }`}>
                  {m.role === 'assistant'
                    ? (m.content ? <MessageBody text={m.content} /> : (loading ? '…' : ''))
                    : <div className="whitespace-pre-wrap">{m.content}</div>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="w-3 h-3 animate-spin" /> Thinking…
              </div>
            )}
          </div>
          <form onSubmit={send} className="p-3 border-t border-border flex gap-2 bg-card">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, products, careers…"
              className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" disabled={loading} className="w-10 h-10 rounded-full bg-primary text-primary-foreground grid place-items-center disabled:opacity-50">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}