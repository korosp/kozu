'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Send, Paperclip, X, Zap, Plus, Trash2, Copy, Check,
  ChevronLeft, Code2, ImageIcon, Bot, User
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  timestamp: Date;
}

function parseMarkdown(text: string): string {
  return text
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hupl])(.+)$/gm, (m) => m.startsWith('<') ? m : `<p>${m}</p>`);
}

function MessageBubble({ msg, onCopy }: { msg: Message; onCopy: (t: string) => void }) {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === 'user';

  const handleCopy = () => {
    onCopy(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isUser
          ? 'bg-gradient-to-br from-[#00d4ff] to-[#0284c7]'
          : 'bg-white/5 border border-white/10'
      }`}>
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-[#00d4ff]" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {msg.image && (
          <img
            src={msg.image}
            alt="uploaded"
            className="rounded-xl max-w-xs max-h-48 object-cover border border-white/10"
          />
        )}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-[#00d4ff] to-[#0284c7] text-white rounded-tr-sm'
            : 'bg-white/5 dark:bg-white/5 border border-white/10 rounded-tl-sm prose-ai'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{msg.content}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }} />
          )}
        </div>
        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs opacity-30">
            {msg.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          </span>
          {!isUser && (
            <button onClick={handleCopy} className="p-1 rounded hover:bg-white/10 transition-colors">
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="opacity-40" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
        <Bot size={14} className="text-[#00d4ff]" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: 'Halo! Saya **KarlX AI**, asisten kecerdasan buatan siap membantu kamu.\n\nSaya bisa:\n- Menjawab pertanyaan apapun\n- Menganalisis gambar\n- Membantu coding & debug\n- Menulis dan mengedit teks\n\nApa yang ingin kamu tanyakan? 🚀',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<{ base64: string; preview: string } | null>(null);
  const [model, setModel] = useState('gpt-4o');
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImage({ base64, preview: base64 });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text && !image) return;
    if (loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      image: image?.preview,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setImage(null);
    setLoading(true);

    try {
      const apiMessages = messages
        .concat(userMsg)
        .map((m) => ({
          role: m.role,
          content: m.image
            ? [
                { type: 'image_url', image_url: { url: m.image } },
                { type: 'text', text: m.content || 'Apa isi gambar ini?' },
              ]
            : m.content,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, model }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.choices?.[0]?.message?.content ?? 'Maaf, tidak ada respons.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const errMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ Gagal terhubung ke AI.\n\nDetail: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setLoading(false);
    }
  }, [input, image, loading, messages, model]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '0',
      role: 'assistant',
      content: 'Chat dibersihkan. Ada yang bisa saya bantu?',
      timestamp: new Date(),
    }]);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] dark:bg-[#020817]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#020817]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0284c7] flex items-center justify-center">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <div>
              <div className="font-bold text-sm">KarlX AI</div>
              <div className="flex items-center gap-1.5 text-xs opacity-40">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Online
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Model selector */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10
                       bg-white/50 dark:bg-white/5 outline-none cursor-pointer font-mono"
          >
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>

          <button
            onClick={clearChat}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Clear chat"
          >
            <Trash2 size={16} className="opacity-50" />
          </button>

          <button
            onClick={() => {
              setMessages([{
                id: '0',
                role: 'assistant',
                content: 'Chat baru dimulai! Ada yang bisa saya bantu?',
                timestamp: new Date(),
              }]);
            }}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="New chat"
          >
            <Plus size={16} className="opacity-50" />
          </button>

          <ThemeToggle />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} onCopy={copyToClipboard} />
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-black/5 dark:border-white/5 bg-white/80 dark:bg-[#020817]/80 backdrop-blur-xl px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {/* Image preview */}
          {image && (
            <div className="mb-3 relative inline-block">
              <img src={image.preview} alt="preview" className="h-16 w-16 object-cover rounded-xl border border-white/10" />
              <button
                onClick={() => setImage(null)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          )}

          {/* Textarea + actions */}
          <div className="flex items-end gap-2 p-3 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5">
            {/* Attach image */}
            <button
              onClick={() => fileRef.current?.click()}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex-shrink-0"
              title="Upload gambar"
            >
              <ImageIcon size={18} className="opacity-40" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

            {/* Code mode hint */}
            <button
              onClick={() => setInput((v) => v + '```\n\n```')}
              className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex-shrink-0"
              title="Insert code block"
            >
              <Code2 size={18} className="opacity-40" />
            </button>

            {/* Textarea */}
            <textarea
              ref={textRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan... (Enter untuk kirim, Shift+Enter untuk baris baru)"
              rows={1}
              className="flex-1 bg-transparent outline-none resize-none text-sm leading-relaxed max-h-32
                         placeholder:opacity-30 font-sans"
              style={{ minHeight: '24px' }}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = Math.min(el.scrollHeight, 128) + 'px';
              }}
            />

            {/* Send */}
            <button
              onClick={handleSend}
              disabled={loading || (!input.trim() && !image)}
              className={`p-2.5 rounded-xl flex-shrink-0 transition-all duration-200 ${
                loading || (!input.trim() && !image)
                  ? 'opacity-30 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#00d4ff] to-[#0284c7] text-white hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]'
              }`}
            >
              <Send size={16} />
            </button>
          </div>

          <p className="text-center text-xs opacity-20 mt-2 font-mono">
            KarlX AI bisa membuat kesalahan. Verifikasi info penting.
          </p>
        </div>
      </div>
    </div>
  );
}
