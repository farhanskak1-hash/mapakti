import React, { useState, useRef, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Logo } from './Logo';
import {
  Phone,
  MapPin,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Search,
  Sparkles,
  UserPlus,
  Compass,
  BookOpen,
  Trophy,
  Users,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Flame,
  Award,
  GraduationCap,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const Header = () => {
  const {
    currentSection,
    setCurrentSection,
    isAdminMode,
    setIsAdminMode,
    isAdminAuthenticated,
    setShowLoginModal,
    setSearchModalOpen,
    settings
  } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  // Helper to handle smooth navigation
  const navigateTo = (section) => {
    setCurrentSection(section);
    if (typeof window !== 'undefined') {
      window.location.hash = section === 'home' ? '' : section;
    }
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hover handlers with slight debounce for silky dropdown UX
  const handleMouseEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setIsAdminMode(!isAdminMode);
    } else {
      setShowLoginModal(true);
    }
  };

  // Check active states
  const isProfileActive = ['profil', 'profile', 'kepengurusan', 'management', 'anggota', 'members'].includes(currentSection);
  const isExplorationActive = ['divisi', 'divisions', 'proker', 'programs', 'kegiatan', 'activities'].includes(currentSection);
  const isPublicationActive = ['berita', 'news', 'galeri', 'gallery', 'diklatsar'].includes(currentSection);
  const isAchievementsActive = ['prestasi', 'achievements'].includes(currentSection);

  // Helper getters for customizable navigation menus
  const navMenus = settings.navMenus || [];
  const getMenu = (id, fallbackLabel) => {
    const m = navMenus.find((item) => item.id === id);
    if (!m) return { label: fallbackLabel, isEnabled: true, badge: '' };
    return m;
  };
  const getSubMenu = (menuId, subId, fallbackLabel, fallbackDesc) => {
    const m = navMenus.find((item) => item.id === menuId);
    const sub = m?.subMenu?.find((s) => s.id === subId);
    if (!sub) return { label: fallbackLabel, desc: fallbackDesc };
    return sub;
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xl">
      {/* 1. TOP UTILITY TICKER & HOTLINE BAR */}
      <div className="bg-[#0b1424] text-slate-300 text-xs py-1.5 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Running Announcement Ticker */}
          <div className="flex items-center gap-2 overflow-hidden w-full md:w-auto">
            <span className="flex-shrink-0 bg-[#F5C400] text-[#102A56] font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#102A56] animate-pulse" /> Warta MAPAKTI
            </span>
            <p className="truncate text-[11px] text-slate-300 font-medium">
              {settings.announcementTicker}
            </p>
          </div>

          {/* Quick Contacts & Admin Portal Button */}
          <div className="flex items-center gap-4 flex-shrink-0 text-[11px]">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F5C400] transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#F5C400]" />
              <span>Sekretariat: {settings.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="hidden lg:flex items-center gap-1 text-slate-400">
              <MapPin className="w-3 h-3 text-[#F5C400]" />
              <span>Kampus 1 UPS Tegal</span>
            </div>

            <button
              onClick={handleAdminClick}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all text-[11px] shadow-sm transform hover:scale-105 active:scale-95 ${
                isAdminAuthenticated && isAdminMode
                  ? 'bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] ring-2 ring-[#F5C400]/40'
                  : 'bg-[#102A56] hover:bg-[#163872] text-[#F5C400] border border-[#F5C400]/50 hover:shadow-md'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5C400]" />
              <span>{isAdminAuthenticated && isAdminMode ? 'Mode Admin Aktif' : 'Portal Pengurus / Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="bg-[#102A56]/95 backdrop-blur-md border-b border-[#F5C400]/20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
          {/* Logo Brand */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center text-left focus:outline-none group transition-transform duration-200 hover:scale-[1.02]"
            title="Kembali ke Beranda Utama"
          >
            <Logo size="md" lightText={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold uppercase tracking-wider">
            {/* Beranda */}
            {getMenu('home', 'Beranda').isEnabled !== false && (
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 relative group ${
                  currentSection === 'home' || currentSection === 'beranda'
                    ? 'text-[#F5C400] bg-white/10 ring-1 ring-[#F5C400]/30 shadow-sm'
                    : 'text-slate-200 hover:text-[#F5C400] hover:bg-white/5'
                }`}
              >
                <span>{getMenu('home', 'Beranda').label}</span>
                {getMenu('home', 'Beranda').badge && (
                  <span className="px-1.5 py-0.2 rounded bg-[#F5C400] text-[#102A56] text-[9px] font-black">
                    {getMenu('home', 'Beranda').badge}
                  </span>
                )}
                {(currentSection === 'home' || currentSection === 'beranda') && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5C400] rounded-full" />
                )}
              </button>
            )}

            {/* Dropdown: Profil Organisasi */}
            {getMenu('profil', 'Profil').isEnabled !== false && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('profil')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => navigateTo('profil')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all relative group ${
                    isProfileActive
                      ? 'text-[#F5C400] bg-white/10 ring-1 ring-[#F5C400]/30 shadow-sm'
                      : 'text-slate-200 hover:text-[#F5C400] hover:bg-white/5'
                  }`}
                >
                  <span>{getMenu('profil', 'Profil').label}</span>
                  {getMenu('profil', 'Profil').badge && (
                    <span className="px-1.5 py-0.2 rounded bg-[#F5C400] text-[#102A56] text-[9px] font-black">
                      {getMenu('profil', 'Profil').badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'profil' ? 'rotate-180 text-[#F5C400]' : 'text-slate-300'
                    }`}
                  />
                  {isProfileActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5C400] rounded-full" />
                  )}
                </button>

                {activeDropdown === 'profil' && (
                  <div
                    className="absolute top-full left-0 w-64 py-2 mt-1 bg-[#0b1424] border border-[#F5C400]/30 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 divide-y divide-slate-800/60"
                    onMouseEnter={() => handleMouseEnter('profil')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => navigateTo('profil')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'profil' || currentSection === 'profile'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('profil', 'sejarah', 'Sejarah & Visi Misi').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('profil', 'sejarah', '', 'Identitas, asas, dan lambang').desc}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => navigateTo('kepengurusan')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'kepengurusan' || currentSection === 'management'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <Users className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('profil', 'kepengurusan', 'Struktur Kepengurusan').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('profil', 'kepengurusan', '', 'Pengurus per periode aktif').desc}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => navigateTo('anggota')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'anggota' || currentSection === 'members'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('profil', 'anggota', 'Data Anggota Publik').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('profil', 'anggota', '', 'Direktori anggota terverifikasi').desc}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dropdown: Eksplorasi (Divisi, Proker, Kegiatan) */}
            {getMenu('eksplorasi', 'Eksplorasi').isEnabled !== false && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('eksplorasi')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => navigateTo('divisi')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all relative group ${
                    isExplorationActive
                      ? 'text-[#F5C400] bg-white/10 ring-1 ring-[#F5C400]/30 shadow-sm'
                      : 'text-slate-200 hover:text-[#F5C400] hover:bg-white/5'
                  }`}
                >
                  <span>{getMenu('eksplorasi', 'Eksplorasi').label}</span>
                  {getMenu('eksplorasi', 'Eksplorasi').badge && (
                    <span className="px-1.5 py-0.2 rounded bg-[#F5C400] text-[#102A56] text-[9px] font-black">
                      {getMenu('eksplorasi', 'Eksplorasi').badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'eksplorasi' ? 'rotate-180 text-[#F5C400]' : 'text-slate-300'
                    }`}
                  />
                  {isExplorationActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5C400] rounded-full" />
                  )}
                </button>

                {activeDropdown === 'eksplorasi' && (
                  <div
                    className="absolute top-full left-0 w-64 py-2 mt-1 bg-[#0b1424] border border-[#F5C400]/30 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 divide-y divide-slate-800/60"
                    onMouseEnter={() => handleMouseEnter('eksplorasi')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => navigateTo('divisi')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'divisi' || currentSection === 'divisions'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <Compass className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('eksplorasi', 'divisi', '3 Divisi Operasional').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('eksplorasi', 'divisi', '', 'Hutan Gunung, RC & KSDA').desc}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => navigateTo('proker')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'proker' || currentSection === 'programs'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <Flame className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('eksplorasi', 'proker', 'Program Kerja').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('eksplorasi', 'proker', '', 'Agenda dan realisasi kegiatan').desc}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => navigateTo('kegiatan')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'kegiatan' || currentSection === 'activities'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <Calendar className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('eksplorasi', 'kegiatan', 'Kegiatan & Ekspedisi').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('eksplorasi', 'kegiatan', '', 'Jadwal & pendaftaran terbuka').desc}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Dropdown: Publikasi (Berita, Galeri, Diklatsar) */}
            {getMenu('publikasi', 'Publikasi').isEnabled !== false && (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('publikasi')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => navigateTo('berita')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all relative group ${
                    isPublicationActive
                      ? 'text-[#F5C400] bg-white/10 ring-1 ring-[#F5C400]/30 shadow-sm'
                      : 'text-slate-200 hover:text-[#F5C400] hover:bg-white/5'
                  }`}
                >
                  <span>{getMenu('publikasi', 'Publikasi').label}</span>
                  {getMenu('publikasi', 'Publikasi').badge && (
                    <span className="px-1.5 py-0.2 rounded bg-[#F5C400] text-[#102A56] text-[9px] font-black">
                      {getMenu('publikasi', 'Publikasi').badge}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'publikasi' ? 'rotate-180 text-[#F5C400]' : 'text-slate-300'
                    }`}
                  />
                  {isPublicationActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5C400] rounded-full" />
                  )}
                </button>

                {activeDropdown === 'publikasi' && (
                  <div
                    className="absolute top-full left-0 w-64 py-2 mt-1 bg-[#0b1424] border border-[#F5C400]/30 rounded-2xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50 divide-y divide-slate-800/60"
                    onMouseEnter={() => handleMouseEnter('publikasi')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => navigateTo('berita')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'berita' || currentSection === 'news'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <Newspaper className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('publikasi', 'berita', 'Warta & Berita Rimba').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('publikasi', 'berita', '', 'Kabar petualangan & opini').desc}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => navigateTo('galeri')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'galeri' || currentSection === 'gallery'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <ImageIcon className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('publikasi', 'galeri', 'Galeri Dokumentasi').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('publikasi', 'galeri', '', 'Foto ekspedisi & kegiatan').desc}</div>
                        </div>
                      </button>
                      <button
                        onClick={() => navigateTo('diklatsar')}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-all flex items-start gap-3 group ${
                          currentSection === 'diklatsar'
                            ? 'bg-[#102A56] text-[#F5C400] border-l-2 border-[#F5C400]'
                            : 'text-slate-200 hover:bg-[#102A56]/60 hover:text-[#F5C400] hover:border-l-2 hover:border-[#F5C400]'
                        }`}
                      >
                        <Award className="w-4 h-4 text-[#F5C400] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-bold">{getSubMenu('publikasi', 'diklatsar', 'Sejarah DIKLATSAR').label}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{getSubMenu('publikasi', 'diklatsar', '', 'Arsip angkatan & pendidikan dasar').desc}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Prestasi Direct Link */}
            {getMenu('prestasi', 'Prestasi').isEnabled !== false && (
              <button
                onClick={() => navigateTo('prestasi')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all relative group ${
                  isAchievementsActive
                    ? 'text-[#F5C400] bg-white/10 ring-1 ring-[#F5C400]/30 shadow-sm'
                    : 'text-slate-200 hover:text-[#F5C400] hover:bg-white/5'
                }`}
              >
                <span>{getMenu('prestasi', 'Prestasi').label}</span>
                {getMenu('prestasi', 'Prestasi').badge && (
                  <span className="px-1.5 py-0.2 rounded bg-[#F5C400] text-[#102A56] text-[9px] font-black">
                    {getMenu('prestasi', 'Prestasi').badge}
                  </span>
                )}
                {isAchievementsActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5C400] rounded-full" />
                )}
              </button>
            )}

            {/* Kontak */}
            {getMenu('kontak', 'Kontak').isEnabled !== false && (
              <button
                onClick={() => navigateTo('kontak')}
                className={`px-3 py-2 rounded-lg transition-all relative group ${
                  currentSection === 'kontak' || currentSection === 'contact'
                    ? 'text-[#F5C400] bg-white/10 ring-1 ring-[#F5C400]/30 shadow-sm'
                    : 'text-slate-200 hover:text-[#F5C400] hover:bg-white/5'
                }`}
              >
                <span>{getMenu('kontak', 'Kontak').label}</span>
                {getMenu('kontak', 'Kontak').badge && (
                  <span className="px-1.5 py-0.2 rounded bg-[#F5C400] text-[#102A56] text-[9px] font-black">
                    {getMenu('kontak', 'Kontak').badge}
                  </span>
                )}
                {(currentSection === 'kontak' || currentSection === 'contact') && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F5C400] rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Action Tools: Search & CTA Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-[#F5C400] border border-slate-700/80 transition-all flex items-center gap-2 text-xs font-semibold hover:border-[#F5C400]/40 shadow-sm"
              title="Pencarian Global Website"
            >
              <Search className="w-4 h-4 text-[#F5C400]" />
              <span className="hidden md:inline">Cari...</span>
            </button>

            {/* CTA Button: Pendaftaran Calon Anggota */}
            {getMenu('daftar-anggota', 'Daftar Anggota').isEnabled !== false && (
              <button
                onClick={() => navigateTo('daftar-anggota')}
                className="flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#F5C400]/25 transition-all transform hover:scale-105 active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>{getMenu('daftar-anggota', 'Daftar Anggota').label}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 hover:text-[#F5C400] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#F5C400]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0b1424] border-t border-slate-800 px-4 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200 max-h-[82vh] overflow-y-auto">
            {/* Group 1: Beranda & Profil */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3 text-[#F5C400]" /> Profil & Informasi Utama
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => navigateTo('home')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'home' || currentSection === 'beranda'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Beranda</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('profil')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'profil' || currentSection === 'profile'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Sejarah & Visi</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('kepengurusan')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'kepengurusan' || currentSection === 'management'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Kepengurusan</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('anggota')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'anggota' || currentSection === 'members'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Data Anggota</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Group 2: Eksplorasi & Operasional */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-[#F5C400]" /> Eksplorasi & Agenda
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => navigateTo('divisi')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between col-span-2 ${
                    currentSection === 'divisi' || currentSection === 'divisions'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>3 Divisi MAPAKTI</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('proker')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'proker' || currentSection === 'programs'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Program Kerja</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('kegiatan')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'kegiatan' || currentSection === 'activities'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Kegiatan & Ekspedisi</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Group 3: Publikasi & Prestasi */}
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#F5C400]" /> Publikasi & Arsip
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-wider">
                <button
                  onClick={() => navigateTo('berita')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'berita' || currentSection === 'news'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Berita Rimba</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('galeri')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'galeri' || currentSection === 'gallery'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Galeri Foto</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('diklatsar')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between ${
                    currentSection === 'diklatsar'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>DIKLATSAR</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
                <button
                  onClick={() => navigateTo('prestasi')}
                  className={`p-3 text-left rounded-xl transition-all flex items-center justify-between col-span-2 ${
                    currentSection === 'prestasi' || currentSection === 'achievements'
                      ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                      : 'bg-slate-900/90 text-white hover:text-[#F5C400] hover:bg-slate-800'
                  }`}
                >
                  <span>Rekor Prestasi</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => navigateTo('kontak')}
                className={`w-full py-3 rounded-xl text-center font-bold text-xs uppercase tracking-wider transition-colors ${
                  currentSection === 'kontak' || currentSection === 'contact'
                    ? 'bg-[#102A56] text-[#F5C400] ring-1 ring-[#F5C400]/40'
                    : 'bg-slate-900 text-slate-200 hover:text-[#F5C400] hover:bg-slate-800'
                }`}
              >
                Kontak Sekretariat
              </button>
              <button
                onClick={() => navigateTo('daftar-anggota')}
                className="w-full py-3.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-center font-black text-xs uppercase tracking-wider text-[#102A56] shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Calon Anggota Baru</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
