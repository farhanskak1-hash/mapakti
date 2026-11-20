import React from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Target, ShieldCheck, Heart, Flag, Sparkles, CheckCircle2 } from 'lucide-react';

export const ProfileSection = () => {
  const { profile, settings } = useData();

  const headerBadge = profile?.headerBadge || 'Profil Resmi Organisasi';
  const title = profile?.title || 'Sejarah, Visi, Misi & Falsafah MAPAKTI';
  const subtitle = profile?.subtitle || 'Mengenal jati diri Mahasiswa Pencinta Alam Universitas Pancasakti Tegal sebagai wadah pembinaan generasi muda rimbawan sejak 1984.';

  const historyBadge = profile?.historyBadge || 'Kilas Sejarah';
  const historyHeadline = profile?.historyHeadline || 'Empat Dekade Mengabdi untuk Alam & Almamater';
  const historyShortDesc = profile?.historyShortDesc || 'Didirikan di Kampus Universitas Pancasakti Tegal dengan semangat Tri Dharma Perguruan Tinggi dan Kode Etik Pecinta Alam Indonesia.';
  const establishedYear = profile?.establishedYear || settings?.establishedYear || '1996';
  const campusBase = profile?.campusBase || 'UPS Tegal';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> {headerBadge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            {subtitle}
          </p>
        </div>
      </div>

      {/* 1. SEJARAH SINGKAT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase text-[#F5C400] tracking-wider block">
              {historyBadge}
            </span>
            <h3 className="text-xl font-black text-white leading-snug">
              {historyHeadline}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {historyShortDesc}
            </p>
            <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Tahun Pendirian</span>
                <span className="font-bold text-[#F5C400]">{establishedYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Basis Kampus</span>
                <span className="font-bold text-white">{campusBase}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed whitespace-pre-line">
          {profile?.history}
        </div>
      </section>

      {/* 2. VISI & MISI */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Visi */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">Visi Organisasi</h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic bg-slate-950/60 p-5 rounded-2xl border-l-4 border-l-[#F5C400] border-y border-r border-slate-800">
              "{profile.vision}"
            </p>
          </div>
          <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider pt-4 border-t border-slate-800">
            Komitmen Abadi MAPAKTI UPS Tegal
          </div>
        </div>

        {/* Misi */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">Misi Strategis</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {profile.missions.map((m, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-[#F5C400] flex-shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. KODE ETIK PECINTA ALAM INDONESIA */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#070d18] border-2 border-[#F5C400]/40 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F5C400]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#102A56]/40 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F5C400]/30 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center border border-[#F5C400]/40 shadow-lg flex-shrink-0">
              <Heart className="w-6 h-6 text-[#F5C400]" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F5C400]/15 text-[#F5C400] border border-[#F5C400]/40 text-[10px] font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3 h-3" />
                <span>Ikrar Agung Penggiat Alam Bebas</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide uppercase">
                {profile.ethicsTitle || 'KODE ETIK PECINTA ALAM'}
              </h2>
            </div>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="px-3.5 py-1.5 rounded-full bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 text-xs font-black tracking-wider uppercase shadow-md">
              Gladian IV Ujung Pandang 1974
            </span>
            <span className="text-[11px] text-slate-400 mt-1 font-mono">Disahkan 28 Januari 1974</span>
          </div>
        </div>

        {/* Mukadimah / Hakekat Pembukaan */}
        <div className="relative z-10 p-5 sm:p-6 rounded-2xl bg-[#080e1a]/90 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed font-serif italic shadow-inner whitespace-pre-line text-justify sm:text-left">
          {profile.ethicsPreamble || `Pecinta Alam Indonesia sadar bahwa alam beserta isinya adalah ciptaan Tuhan Yang Maha Esa.\nPecinta Alam Indonesia sebagai bagian dari masyarakat Indonesia sadar akan tanggungjawab terhadap Tuhan, Bangsa, dan Tanah Air.\nPecinta Alam Indonesia sadar bahwa segenap Pecinta Alam adalah saudara, sebagai mahluk yang mencintai alam sebagai anugerah Tuhan Yang Maha Esa.\nSesuai dengan hakekat diatas kami dengan kesadaran menyatakan sebagai berikut:`}
        </div>

        {/* 7 Butir Ikrar (Sesuai Gambar Dokumen Gladian IV 1974) */}
        <div className="relative z-10 space-y-2.5">
          {(profile.codeOfEthics || []).map((ke, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-[#102A56]/40 border border-slate-800/80 hover:border-[#F5C400]/40 transition-all flex items-start gap-3.5 group shadow-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] group-hover:bg-[#F5C400] group-hover:text-[#102A56] border border-[#F5C400]/50 font-black text-xs flex items-center justify-center flex-shrink-0 transition-colors shadow-md mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed pt-0.5">
                {ke}
              </p>
            </div>
          ))}
        </div>

        {/* Pengesahan Historis (Footer Sesuai Gambar) */}
        <div className="relative z-10 pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs text-slate-400">
          <div className="italic text-slate-400 max-w-md text-[11px] sm:text-xs">
            "Kode Etik ini menjadi nafas perjuangan, batasan moral, dan ikrar sejati seluruh insan pecinta alam MAPAKTI Universitas Pancasakti Tegal."
          </div>
          <div className="bg-slate-950/90 border border-[#F5C400]/40 p-3.5 sm:p-4 rounded-2xl text-left sm:text-right font-mono text-[11px] sm:text-xs text-slate-300 shadow-md w-full sm:w-auto">
            <div className="text-[#F5C400] font-bold uppercase tracking-wider mb-1 text-[10px]">Dokumen Otentik Pengesahan:</div>
            <div className="whitespace-pre-line leading-relaxed font-semibold">
              {profile.ethicsRatification || `Disahkan dalam\nForum Gladian IV di Ujung Pandang,\nTanggal 28 Januari 1974\nPukul 01.00 WITA`}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAKNA LAMBANG & BENDERA ORGANISASI */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase text-[#F5C400] tracking-wider block">Identitas Visual</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Makna Lambang Resmi MAPAKTI</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Lambang resmi UKM MAPAKTI Universitas Pancasakti Tegal sarat akan filosofi kecintaan alam bebas, nilai-nilai moral penggiat rimba, dan semangat kebangsaan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
          {/* Logo Showcase Left */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0b1424] border border-slate-800 text-center relative overflow-hidden group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F5C400]/20 to-[#102A56]/40 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center">
              <img
                src={profile.logoUrl || settings.logoUrl || '/images/logo-mapakti.png'}
                alt="Logo Resmi UKM MAPAKTI UPS Tegal"
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain filter drop-shadow-[0_4px_20px_rgba(245,196,0,0.35)] transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/logo-mapakti.png';
                }}
              />
              <div className="mt-4">
                <span className="text-base font-black text-[#F5C400] block tracking-wider font-sans">UKM MAPAKTI</span>
                <span className="text-[11px] font-bold text-slate-300 tracking-wider">UNIVERSITAS PANCASAKTI TEGAL</span>
              </div>
            </div>
          </div>

          {/* Meaning Breakdown Right */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.symbolMeaning.map((sym, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-[#F5C400]/50 transition-colors space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold text-xs border border-[#F5C400]/30 flex-shrink-0">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white">{sym.label}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-9">{sym.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
