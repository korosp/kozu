import { MessageSquare, Image, Code2, FileText, History, Lock } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'Chat Cerdas',
    desc: 'Tanya apa saja, jawaban muncul dalam hitungan detik. Dukung konteks percakapan panjang.',
  },
  {
    icon: Image,
    title: 'Analisis Gambar',
    desc: 'Upload foto atau screenshot, KarlX AI bisa mendeskripsikan, membaca teks, dan menganalisis isinya.',
  },
  {
    icon: Code2,
    title: 'Code Editor',
    desc: 'Tulis, debug, dan jelaskan kode langsung dalam chat. Support 50+ bahasa pemrograman.',
  },
  {
    icon: FileText,
    title: 'Buat Dokumen',
    desc: 'Dari email, artikel, essay, hingga laporan bisnis — semua bisa dibuat dalam hitungan detik.',
  },
  {
    icon: History,
    title: 'Riwayat Chat',
    desc: 'Semua percakapan tersimpan otomatis. Bisa diedit, dilanjutkan, dan diakses kapan saja.',
  },
  {
    icon: Lock,
    title: 'Aman & Privat',
    desc: 'Data kamu terenkripsi end-to-end. Tidak pernah dibagikan ke pihak ketiga.',
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono mb-4">
            FITUR UNGGULAN
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Semua yang kamu butuhkan,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#0284c7]">
              satu tempat
            </span>
          </h2>
          <p className="opacity-50 max-w-xl mx-auto">
            Tidak perlu pindah-pindah aplikasi. KarlX AI punya semua tools yang kamu butuhkan.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-black/5 dark:border-white/5
                         bg-white dark:bg-white/3 hover:border-[#00d4ff]/30
                         hover:shadow-[0_0_30px_rgba(0,212,255,0.05)]
                         transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center mb-4
                              group-hover:bg-[#00d4ff]/20 transition-colors duration-300">
                <Icon size={20} className="text-[#00d4ff]" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm opacity-50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
