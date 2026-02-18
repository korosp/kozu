'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#0284c7]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono mb-8 animate-fade-up">
          <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-pulse" />
          KarlX AI — Powered by GPT-4o
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 animate-fade-up"
          style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}
        >
          AI yang{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0284c7]">
              Benar-Benar
            </span>
          </span>
          <br />
          Memahami Kamu
        </h1>

        <p
          className="text-lg md:text-xl opacity-60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}
        >
          KarlX AI hadir untuk bantu kamu coding, nulis, analisis data, dan banyak lagi.
          Response instan, akurat, dan gratis untuk mulai.
        </p>

        {/* CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up"
          style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Link
            href="/chat"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-[#00d4ff] to-[#0284c7]
                       hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all duration-300"
          >
            <Zap size={18} />
            Mulai Sekarang
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#fitur"
            className="px-6 py-3.5 rounded-xl font-semibold border border-black/10 dark:border-white/10
                       hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
          >
            Lihat Fitur
          </Link>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-up"
          style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}
        >
          {[
            { icon: Zap, label: 'Response Instan', value: '<1s' },
            { icon: Shield, label: 'Enkripsi End-to-End', value: '100%' },
            { icon: Cpu, label: 'Powered by', value: 'GPT-4o' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-[#00d4ff] mb-1">{value}</div>
              <div className="text-xs opacity-40 flex items-center justify-center gap-1">
                <Icon size={10} />
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
