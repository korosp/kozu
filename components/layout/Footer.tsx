import Link from 'next/link';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0284c7] flex items-center justify-center">
            <Zap size={13} className="text-white fill-white" />
          </div>
          <span className="font-bold text-base">
            Karl<span className="text-[#00d4ff]">X</span>
            <span className="text-xs ml-1 opacity-40 font-mono">AI</span>
          </span>
        </div>
        <p className="text-sm opacity-40">© 2025 KarlX AI. All rights reserved.</p>
        <div className="flex gap-6 text-sm opacity-50">
          <Link href="#" className="hover:opacity-100 transition-opacity">Privacy</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Terms</Link>
          <Link href="#" className="hover:opacity-100 transition-opacity">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
