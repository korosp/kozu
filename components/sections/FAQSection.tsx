'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Apakah KarlX AI benar-benar gratis?', a: 'Ya! Paket Free bisa kamu pakai selamanya tanpa biaya. Upgrade ke Pro hanya kalau butuh fitur lebih lengkap.' },
  { q: 'Model AI apa yang dipakai?', a: 'KarlX AI menggunakan GPT-4o dari OpenAI, model terbaru dan terpintar yang tersedia saat ini.' },
  { q: 'Apakah KarlX AI bisa analisis gambar?', a: 'Ya! Kamu bisa upload gambar, screenshot, atau foto dan KarlX AI akan menganalisis isinya secara detail.' },
  { q: 'Apakah data saya aman?', a: 'Semua data dienkripsi end-to-end. Kami tidak pernah menjual atau membagikan data kamu ke pihak ketiga.' },
  { q: 'Bagaimana cara upgrade ke Pro?', a: 'Klik tombol Upgrade di halaman harga, lalu ikuti instruksi pembayaran. Akses Pro aktif langsung setelah pembayaran.' },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold">Pertanyaan yang sering muncul</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-black/5 dark:border-white/5 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-[#00d4ff] transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm opacity-60 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
