import React from 'react';
import { useData } from '../../context/DataContext';
import { Logo } from './Logo';
import { Instagram, Youtube, Facebook } from './SocialIcons';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  Compass,
  ArrowUp,
  Sparkles
} from 'lucide-react';

export const Footer = () => {
  const { setCurrentSection, setShowLoginModal, settings, divisions } = useData();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navTo = (sec) => {
    setCurrentSection(sec);
    if (typeof window !== 'undefined') {
      window.location.hash = sec === 'home' ? '' : sec;
    }
    scrollToTop();
  };

  return (
    <footer className="bg-[#0b1424] text-slate-400 border-t border-slate-800 text-xs">
      {/* Upper Footer: Highlights */}
      <div className="border-b border-slate-800/80 bg-slate-950/40 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" lightText={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              Mahasiswa Pencinta Alam Universitas Pancasakti Tegal (MAPAKTI). Kawah candradimuka penempaan integritas,
              mental petualangan alam bebas, dan konservasi lingkungan hidup sejak 1984.
            </p>
            <div className="text-[11px] text-[#F5C400] font-semibold italic">
              "{settings.tagline}"
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.socialMedia?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-[#F5C400] hover:border-[#F5C400]/40 transition-colors"
                title="Instagram MAPAKTI"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialMedia?.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-400/40 transition-colors"
                title="YouTube MAPAKTI"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.socialMedia?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-400/40 transition-colors"
                title="Facebook MAPAKTI"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#F5C400]" /> Navigasi Portal
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => navTo('home')} className="hover:text-[#F5C400] transition-colors">
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => navTo('profil')} className="hover:text-[#F5C400] transition-colors">
                  Profil, Sejarah & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={() => navTo('kepengurusan')} className="hover:text-[#F5C400] transition-colors">
                  Struktur Kepengurusan
                </button>
              </li>
              <li>
                <button onClick={() => navTo('anggota')} className="hover:text-[#F5C400] transition-colors">
                  Data Anggota Publik
                </button>
              </li>
              <li>
                <button onClick={() => navTo('proker')} className="hover:text-[#F5C400] transition-colors">
                  Program Kerja Organisasi
                </button>
              </li>
              <li>
                <button onClick={() => navTo('kegiatan')} className="hover:text-[#F5C400] transition-colors">
                  Kegiatan & Ekspedisi
                </button>
              </li>
              <li>
                <button onClick={() => navTo('daftar-anggota')} className="hover:text-[#F5C400] text-[#F5C400] font-bold transition-colors">
                  Pendaftaran Calon Anggota
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: 3 Divisi MAPAKTI */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" /> 3 Divisi Operasional
            </h4>
            <ul className="space-y-2 text-slate-400">
              {divisions.map((div) => (
                <li key={div.id}>
                  <button onClick={() => navTo('divisi')} className="hover:text-[#F5C400] transition-colors text-left truncate block max-w-full">
                    {div.name}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-slate-800/80">
                <button onClick={() => navTo('diklatsar')} className="hover:text-[#F5C400] transition-colors">
                  Sejarah & Dokumentasi DIKLATSAR
                </button>
              </li>
              <li>
                <button onClick={() => navTo('prestasi')} className="hover:text-[#F5C400] transition-colors">
                  Rekor Prestasi & Penghargaan
                </button>
              </li>
              <li>
                <button onClick={() => navTo('alumni')} className="hover:text-[#F5C400] transition-colors">
                  Direktori Alumni Terdaftar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak Sekretariat */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#F5C400]" /> Sekretariat Resmi
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {settings.secretariatAddress}
            </p>
            <div className="space-y-1.5 pt-1 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#F5C400]" />
                <span>{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-[#F5C400]" />
                <span>{settings.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowLoginModal(true)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-[#102A56] border border-slate-800 hover:border-[#F5C400]/40 text-slate-300 hover:text-[#F5C400] font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#F5C400]" />
                <span>Login Administrator</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="py-4 px-4 sm:px-6 bg-[#080d17]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MAPAKTI Universitas Pancasakti Tegal. Hak Cipta Dilindungi.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Standar PRD v1.0</span>
            <span>•</span>
            <span>Privasi Data Aman</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#F5C400] hover:underline font-semibold"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
