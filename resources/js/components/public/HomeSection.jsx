import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import {
  Compass,
  Flame,
  Award,
  Users,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  TreePine,
  ShieldCheck,
  Newspaper,
  Image as ImageIcon,
  UserPlus
} from 'lucide-react';

export const HomeSection = () => {
  const {
    settings,
    divisions,
    activities,
    news,
    gallery,
    members,
    achievements,
    setCurrentSection,
    setSelectedNews,
    setSelectedActivity,
    setLightboxImage
  } = useData();

  // Hero Slider
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = settings.heroSlides || [];

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setSlideIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[slideIndex] || slides[0];

  // Statistics
  const publicMembersCount = members.filter((m) => m.isPublished).length;
  const publishedNews = news.filter((n) => !n.isDraft).slice(0, 3);
  const upcomingActivities = activities.slice(0, 3);
  const previewGallery = gallery.slice(0, 6);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SLIDER SECTION (NFR-02) */}
      <section className="relative h-[600px] sm:h-[660px] lg:h-[720px] w-full bg-[#0b1424] overflow-hidden select-none">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-105 transform scale-105 transition-transform duration-7000"
            />
            {/* Dark Vignettes & Brand Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-[#12161f]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1424]/95 via-[#0b1424]/60 to-transparent" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102A56]/90 border border-[#F5C400]/60 text-[#F5C400] text-xs font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
                <Flame className="w-4 h-4 text-[#F5C400] animate-pulse" />
                <span>{currentSlide?.badge || 'Mahasiswa Pencinta Alam UPS Tegal'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-xl">
                {currentSlide?.title || settings.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow">
                {currentSlide?.subtitle || settings.heroSubheadline}
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={() => { setCurrentSection('daftar-anggota'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3.5 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-xl shadow-[#F5C400]/25 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar Calon Anggota</span>
                </button>

                <button
                  onClick={() => { setCurrentSection('kegiatan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#F5C400]" />
                  <span>Agenda Ekspedisi</span>
                </button>

                <button
                  onClick={() => { setCurrentSection('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  <span>Profil Organisasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Authentic MAPAKTI Logo Emblem Right */}
            <div className="hidden lg:flex lg:col-span-4 justify-center items-center">
              <div className="relative group cursor-pointer" onClick={() => { setCurrentSection('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="absolute -inset-6 bg-[#F5C400]/20 rounded-full blur-2xl group-hover:bg-[#F5C400]/35 transition-all duration-700 animate-pulse"></div>
                <img
                  src="/images/logo-mapakti.png"
                  alt="Logo Resmi UKM MAPAKTI UPS Tegal"
                  className="relative z-10 w-64 h-64 xl:w-72 xl:h-72 object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-8 right-6 z-20 flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-[#102A56] text-white border border-slate-700 hover:border-[#F5C400]/40 flex items-center justify-center transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-3 py-1 bg-slate-900/80 border border-slate-700 rounded-full text-xs font-mono text-[#F5C400]">
            {slideIndex + 1} / {slides.length}
          </div>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-[#102A56] text-white border border-slate-700 hover:border-[#F5C400]/40 flex items-center justify-center transition-colors shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. STATISTIK ORGANISASI STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{publicMembersCount + 40}+</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Anggota & Kader</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#F5C400]">{divisions.length}</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Divisi Operasional</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{activities.length + 35}+</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ekspedisi Sukses</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold flex-shrink-0 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-[#F5C400]">{achievements.length}</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Rekor Prestasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN KETUA UMUM & PROFIL SINGKAT (FR-01) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800">
          {/* Photo Card */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#F5C400] to-[#102A56] opacity-30 blur-lg group-hover:opacity-50 transition-opacity" />
              <div className="relative w-64 sm:w-72 aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#F5C400]/60 shadow-2xl bg-slate-950">
                <img
                  src={settings.chairmanPhotoUrl}
                  alt={settings.chairmanName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="text-sm font-black text-white">{settings.chairmanName}</div>
                  <div className="text-[11px] text-[#F5C400] font-mono">{settings.chairmanNia}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Greeting Text */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] border border-[#F5C400]/40 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sambutan Ketua Umum</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Menempa Ksatria Rimba, Mengabdi untuk Kelestarian Semesta
            </h2>

            <blockquote className="text-sm sm:text-base text-slate-300 leading-relaxed italic bg-slate-950/60 p-5 rounded-2xl border-l-4 border-l-[#F5C400] border-y border-r border-slate-800">
              "{settings.chairmanGreeting}"
            </blockquote>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="font-bold text-white text-sm">{settings.chairmanName}</div>
                <div className="text-xs text-[#F5C400]">{settings.chairmanTitle}</div>
              </div>

              <button
                onClick={() => { setCurrentSection('profil'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-white hover:text-[#F5C400] font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
              >
                <span>Pelajari Sejarah & Visi Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SOROTAN 3 DIVISI OPERASIONAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> Pilar Keahlian
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">3 Divisi MAPAKTI</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Bidang kompetensi teknis penjelajahan alam bebas dan pengabdian konservasi lingkungan hidup.
            </p>
          </div>

          <button
            onClick={() => { setCurrentSection('divisi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-[#F5C400] hover:underline flex items-center gap-1"
          >
            <span>Lihat Rincian & Dokumentasi Semua Divisi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {divisions.map((div) => (
            <div
              key={div.id}
              onClick={() => { setCurrentSection('divisi'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group cursor-pointer rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={div.coverImage}
                    alt={div.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#102A56]/90 border border-[#F5C400]/50 text-[#F5C400] text-[10px] font-black">
                    {div.code}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#F5C400] transition-colors leading-snug">
                    {div.name.split('(')[0]}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-3 mt-1.5 leading-relaxed">
                    {div.shortDesc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-[#F5C400]">
                <span>Eksplorasi</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AGENDA EKSPEDISI & KEGIATAN TERBARU (FR-07, FR-08) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 text-xs font-bold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" /> Agenda Rimba
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Kegiatan & Ekspedisi</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Agenda penjelajahan alam, pelatihan teknis, serta aksi konservasi yang akan datang dan arsip riwayat kegiatan.
            </p>
          </div>

          <button
            onClick={() => { setCurrentSection('kegiatan'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-[#F5C400] hover:underline flex items-center gap-1"
          >
            <span>Seluruh Arsip Kegiatan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingActivities.map((act) => (
            <div
              key={act.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                    {act.type}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    act.isRegistrationOpen
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {act.isRegistrationOpen ? 'Daftar Dibuka' : 'Selesai'}
                  </span>
                </div>

                <h3 className="font-bold text-white text-base leading-snug hover:text-[#F5C400] transition-colors cursor-pointer" onClick={() => setSelectedActivity(act)}>
                  {act.name}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-slate-400 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span>{act.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span className="truncate">{act.location}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedActivity(act)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-200 hover:text-[#F5C400] font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Lihat Detail {act.isRegistrationOpen && '& Daftar'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BERITA & WARTA RIMBA (FR-09) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5" /> Publikasi & Berita
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Kabar MAPAKTI Terbaru</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Publikasi resmi, liputan ekspedisi, prestasi atlet, dan artikel kelestarian alam.
            </p>
          </div>

          <button
            onClick={() => { setCurrentSection('berita'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-[#F5C400] hover:underline flex items-center gap-1"
          >
            <span>Semua Berita</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publishedNews.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.coverImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#102A56]/90 border border-[#F5C400]/50 text-[#F5C400] text-[10px] font-black uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="px-5 space-y-2">
                  <div className="text-[11px] text-slate-500">{item.publishedDate} • Oleh {item.author}</div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#F5C400] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#F5C400]">
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GALERI CUPLIKAN FOTO (FR-10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 text-xs font-bold uppercase tracking-wider mb-2">
              <ImageIcon className="w-3.5 h-3.5" /> Dokumentasi Rimba
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Galeri Foto Kegiatan</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Rekaman jejak langkah eksplorasi dan aksi nyata pelestarian alam dari lensa MAPAKTI.
            </p>
          </div>

          <button
            onClick={() => { setCurrentSection('galeri'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-xs font-bold text-[#F5C400] hover:underline flex items-center gap-1"
          >
            <span>Buka Seluruh Galeri Foto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {previewGallery.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setLightboxImage(photo)}
              className="group cursor-pointer relative aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-black hover:border-[#F5C400]/60 transition-all shadow-md"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 text-center">
                <span className="text-[10px] font-bold text-[#F5C400] line-clamp-1">{photo.title}</span>
                <span className="text-[9px] text-slate-300">{photo.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. CALL TO ACTION: PENDAFTARAN CALON ANGGOTA BARU (FR-14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Penerimaan Calon Anggota
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Siapkah Kamu Menjadi Bagian dari Ksatria Pencinta Alam?
            </h2>

            <p className="text-sm text-slate-200 leading-relaxed">
              Bergabunglah bersama keluarga besar MAPAKTI Universitas Pancasakti Tegal. Temukan persaudaraan sejati, pelajari keterampilan navigasi rimba hutan gunung, rock climbing, konservasi sumber daya alam, serta abdikan baktimu bagi bumi pertiwi.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => { setCurrentSection('daftar-anggota'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3.5 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Isi Formulir Pendaftaran Sekarang</span>
              </button>

              <button
                onClick={() => { setCurrentSection('diklatsar'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors"
              >
                <span>Pelajari Sejarah DIKLATSAR</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
