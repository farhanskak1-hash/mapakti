import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  UserPlus,
  ExternalLink,
  MessageCircle,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Info,
  Clock,
  MapPin,
  Copy,
  Check,
  AlertCircle
} from 'lucide-react';

export const RegistrationSection = () => {
  const { settings, addToast } = useData();
  const [copied, setCopied] = useState(false);

  const isOpen = settings.registrationIsOpen !== false;
  const gformUrl = settings.registrationGformUrl || 'https://forms.gle/';

  const contactPersons = (settings.registrationContactPersons && settings.registrationContactPersons.length > 0)
    ? settings.registrationContactPersons
    : [
        {
          id: 'cp-1',
          name: 'Bayu Dirgantara',
          role: 'Ketua Umum MAPAKTI',
          phone: settings.phone || '085876543210',
          whatsapp: settings.whatsappNumber || '6285876543210'
        },
        {
          id: 'cp-2',
          name: 'Rian Setiawan',
          role: 'Koordinator Pendaftaran & Diklat',
          phone: '081234567890',
          whatsapp: '6281234567890'
        }
      ];

  const requirements = (settings.registrationRequirements && settings.registrationRequirements.length > 0)
    ? settings.registrationRequirements
    : [
        'Mahasiswa aktif Universitas Pancasakti Tegal (Semua Fakultas & Program Studi)',
        'Memiliki minat, integritas, dan komitmen tinggi terhadap kelestarian alam dan petualangan alam bebas',
        'Sehat jasmani dan rohani untuk kegiatan lapangan',
        'Mengisi formulir pendaftaran resmi melalui Google Form panitia',
        'Mengikuti seluruh rangkaian pengarahan (Technical Meeting) dan Pendidikan & Latihan Dasar (DIKLATSAR)'
      ];

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(gformUrl);
      setCopied(true);
      if (addToast) addToast('Tautan Google Form berhasil disalin ke clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5" /> Pendaftaran Calon Anggota
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isOpen
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`}></span>
              {isOpen ? 'Pendaftaran Sedang DIBUKA' : 'Pendaftaran Saat Ini DITUTUP'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            {settings.registrationTitle || 'Pendaftaran Calon Anggota & DIKLATSAR MAPAKTI'}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            {settings.registrationSubtitle ||
              'Terbuka bagi seluruh mahasiswa aktif Universitas Pancasakti Tegal yang bertekad menempa diri di kawah candradimuka pecinta alam.'}
          </p>
        </div>
      </div>

      {/* 2. Main Action Cards: Google Form Link & Contact Person */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Google Form Link (Primary Action) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-[#F5C400]/50 shadow-2xl relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#102A56] border border-[#F5C400]/30 text-[#F5C400] flex items-center justify-center font-black">
                  <ExternalLink className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">Formulir Pendaftaran Online</h3>
                  <p className="text-xs text-slate-400">Pengisian formulir resmi via Google Form</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-lg bg-[#F5C400]/10 text-[#F5C400] text-xs font-bold border border-[#F5C400]/20">
                Google Form
              </span>
            </div>

            {isOpen ? (
              <div className="space-y-6">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {settings.registrationGuideText ||
                    'Silakan klik tombol di bawah untuk membuka dan mengisi formulir online resmi pendaftaran calon anggota MAPAKTI melalui Google Form. Tidak perlu mendaftar akun di situs web ini.'}
                </p>

                {/* Primary CTA Button: Buka Google Form */}
                <div className="space-y-3">
                  <a
                    href={gformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F5C400] to-[#ffd700] hover:from-[#e6b800] hover:to-[#f0c800] text-[#102A56] font-black text-sm uppercase tracking-wider shadow-xl shadow-[#F5C400]/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span>Buka Formulir Pendaftaran (Google Form)</span>
                    <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </a>

                  {/* Copy Link Button */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Tautan Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#F5C400]" />
                        <span>Salin Tautan Google Form</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Safe & Direct Note */}
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs text-slate-400 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Praktis & Langsung Terhubung</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Data pendaftaran langsung terekam di Google Form panitia dan tidak disimpan di database website, memastikan keamanan data serta kemudahan rekapitulasi tim kaderisasi.
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Pendaftaran Belum Dibuka</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Pendaftaran calon anggota baru saat ini sedang ditutup. Pantau pengumuman resmi berikutnya atau hubungi kontak person di samping untuk info gelombang pendaftaran selanjutnya.
                </p>
              </div>
            )}
          </div>

          {/* 3. Tahapan Pendaftaran (4 Steps) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5C400]" />
              <span>Alur Pendaftaran Calon Anggota</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] font-black text-xs flex items-center justify-center">
                  1
                </div>
                <div className="font-bold text-white text-xs">Pahami Persyaratan</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pastikan Anda memenuhi kriteria mahasiswa aktif dan komitmen mengikuti seluruh tahapan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] font-black text-xs flex items-center justify-center">
                  2
                </div>
                <div className="font-bold text-white text-xs">Isi Google Form</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Klik tombol Google Form di atas dan lengkapi pertanyaan data diri serta minat divisi.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] font-black text-xs flex items-center justify-center">
                  3
                </div>
                <div className="font-bold text-white text-xs">Konfirmasi ke Contact Person</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Kirim pesan WhatsApp ke narahubung panitia bahwa Anda telah mengisi formulir online.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] font-black text-xs flex items-center justify-center">
                  4
                </div>
                <div className="font-bold text-white text-xs">Technical Meeting & Diklat</div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Hadir dalam pertemuan pengarahan dan bersiap untuk Pendidikan & Latihan Dasar (DIKLATSAR).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Contact Persons / Narahubung & Persyaratan */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contact Person Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#F5C400]" />
                <h3 className="text-lg font-black text-white">Narahubung (Contact Person)</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Silakan hubungi kontak panitia penerimaan untuk konfirmasi formulir atau informasi DIKLATSAR:
              </p>
            </div>

            <div className="space-y-4">
              {contactPersons.map((cp, idx) => {
                const cleanPhone = (cp.phone || '').replace(/[^0-9]/g, '');
                const rawWa = cp.whatsapp || cp.phone || '';
                const cleanWa = rawWa.replace(/[^0-9]/g, '');
                const waUrl = cleanWa
                  ? `https://wa.me/${cleanWa.startsWith('0') ? '62' + cleanWa.slice(1) : cleanWa}?text=${encodeURIComponent(
                      `Salam Lestari! Halo Kak ${cp.name}, saya ingin konfirmasi pendaftaran calon anggota MAPAKTI UPS Tegal.`
                    )}`
                  : '#';

                return (
                  <div
                    key={cp.id || idx}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-[#F5C400]/40 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-white text-sm">{cp.name}</div>
                        <div className="text-xs text-[#F5C400] font-medium">{cp.role}</div>
                      </div>
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{cp.phone}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat WA</span>
                      </a>
                      <a
                        href={`tel:${cleanPhone}`}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Telepon</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sekretariat MAPAKTI Mini Card */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5C400]" />
                <span>Konsultasi Langsung di Sekretariat:</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {settings.secretariatAddress ||
                  'Gedung PKM Lt. 1, Universitas Pancasakti Tegal, Jl. Halmahera KM. 1, Tegal.'}
              </p>
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#F5C400]" />
                <span>{settings.operationalHours || 'Senin - Sabtu: 10:00 - 21:00 WIB'}</span>
              </div>
            </div>
          </div>

          {/* Persyaratan Calon Anggota */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F5C400]" />
              <span>Persyaratan Calon Anggota</span>
            </h3>

            <div className="space-y-2.5">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C400] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
