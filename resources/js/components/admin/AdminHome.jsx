import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  LayoutDashboard,
  Layers,
  Sparkles,
  User,
  BarChart3,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Info,
  Sliders,
  Flame,
  ArrowRight
} from 'lucide-react';

export const AdminHome = () => {
  const { settings, setSettings, addAuditLog, addToast } = useData();

  const [activeTab, setActiveTab] = useState('hero-slides');

  const [formData, setFormData] = useState({
    heroHeadline: settings.heroHeadline || 'EKSPLORASI ALAM, KELOLA KELESTARIAN',
    heroSubheadline:
      settings.heroSubheadline ||
      'Wadah pembentukan karakter tangguh, berwawasan ekologis, dan berintegritas tinggi di alam terbuka.',
    announcementTicker: settings.announcementTicker || '',

    // Hero Slides
    heroSlides:
      settings.heroSlides && settings.heroSlides.length > 0
        ? settings.heroSlides
        : [
            {
              id: 'slide-1',
              title: 'Menembus Batas di Atap Slamet 3.428 MDPL',
              subtitle: 'Ekspedisi pendakian rimba gunung, navigasi darat ilmiah, dan manajemen ketahanan alam bebas.',
              imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
              badge: 'Divisi Hutan Gunung'
            }
          ],

    // Sambutan Ketua Umum
    chairmanName: settings.chairmanName || 'M. Bayu Dirgantara',
    chairmanTitle: settings.chairmanTitle || 'Ketua Umum MAPAKTI Masa Bakti 2024/2025',
    chairmanNia: settings.chairmanNia || 'MPK-XXII-2021-118',
    chairmanGreeting: settings.chairmanGreeting || '',
    chairmanPhotoUrl: settings.chairmanPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',

    // Stats Counters
    stats: {
      activeMembers: settings.stats?.activeMembers || '350',
      membersLabel: settings.stats?.membersLabel || 'Kader Rimbawan',
      expeditions: settings.stats?.expeditions || '48',
      expeditionsLabel: settings.stats?.expeditionsLabel || 'Ekspedisi Sukses',
      achievements: settings.stats?.achievements || '18',
      achievementsLabel: settings.stats?.achievementsLabel || 'Rekor Prestasi'
    }
  });

  // Slide Handlers
  const handleAddSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      title: 'Judul Slide Baru',
      subtitle: 'Deskripsi singkat mengenai ekspedisi atau kegiatan alam bebas...',
      imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1600&q=80',
      badge: 'Ekspedisi MAPAKTI'
    };
    setFormData((prev) => ({
      ...prev,
      heroSlides: [...prev.heroSlides, newSlide]
    }));
  };

  const handleUpdateSlide = (index, field, val) => {
    const updated = [...formData.heroSlides];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, heroSlides: updated }));
  };

  const handleRemoveSlide = (index) => {
    if (formData.heroSlides.length <= 1) {
      alert('Minimal harus ada 1 slide banner aktif di beranda.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSettings((prev) => ({
      ...prev,
      ...formData
    }));

    addAuditLog('UPDATE', 'Beranda & Banner Hero', 'Memperbarui Hero Slides, Sambutan Ketua, Pengumuman, dan Statistik Beranda');
    addToast({
      type: 'success',
      title: 'Beranda Diperbarui',
      message: 'Perubahan konten halaman utama (beranda) berhasil disimpan ke database.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Menu Beranda & Hero Banner
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola slide gambar banner utama, headline depan, warta berjalan, sambutan ketua umum, dan counter statistik.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 self-start sm:self-auto transform active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Seluruh Beranda</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'hero-slides', label: 'Slide Banner Hero (Foto & Teks)', icon: Layers },
          { id: 'headline', label: 'Headline & Ticker Pengumuman', icon: Sparkles },
          { id: 'sambutan', label: 'Sambutan Ketua Umum', icon: User },
          { id: 'statistik', label: 'Counter Statistik', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 shadow-sm'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#F5C400]" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: HERO SLIDES BANNER */}
        {activeTab === 'hero-slides' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#F5C400]" />
                  Daftar Slide Banner Utama ({formData.heroSlides.length} Slide)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Setiap slide dapat memiliki gambar resolusi tinggi (bisa upload file langsung ke database atau paste link internet).
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddSlide}
                className="px-3.5 py-2 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] border border-[#F5C400]/40 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Slide Banner</span>
              </button>
            </div>

            <div className="space-y-6">
              {formData.heroSlides.map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative group hover:border-[#F5C400]/40 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="px-3 py-1 rounded-xl bg-[#102A56] text-[#F5C400] font-black text-xs border border-[#F5C400]/40">
                      SLIDE #{idx + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveSlide(idx)}
                      className="px-3 py-1 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                      title="Hapus Slide Ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Slide</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Left: Input Text Details */}
                    <div className="lg:col-span-7 space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">Badge Kategori</label>
                          <input
                            type="text"
                            value={slide.badge}
                            onChange={(e) => handleUpdateSlide(idx, 'badge', e.target.value)}
                            placeholder="Contoh: Divisi Hutan Gunung"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-300 mb-1">Judul Slide</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => handleUpdateSlide(idx, 'title', e.target.value)}
                            placeholder="Judul banner..."
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Subjudul / Deskripsi Pendukung</label>
                        <textarea
                          rows={3}
                          value={slide.subtitle}
                          onChange={(e) => handleUpdateSlide(idx, 'subtitle', e.target.value)}
                          placeholder="Deskripsi singkat slide..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400] leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Right: Image Upload Input */}
                    <div className="lg:col-span-5">
                      <ImageUploadInput
                        value={slide.imageUrl}
                        onChange={(url) => handleUpdateSlide(idx, 'imageUrl', url)}
                        label={`Foto Banner Slide #${idx + 1}`}
                        hint="Upload foto (disimpan di DB) atau gunakan link internet (resolusi min. 1600x900 disarankan)"
                        aspectRatio="aspect-video"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: HEADLINE & TICKER */}
        {activeTab === 'headline' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                <Sparkles className="w-4 h-4" /> Headline Utama Halaman Beranda
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Headline Judul Besar
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white font-bold focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Sub-headline / Deskripsi Singkat
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubheadline}
                  onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5C400] leading-relaxed"
                />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                <Sliders className="w-4 h-4" /> Running Ticker (Teks Berjalan di Header Atas)
              </div>
              <p className="text-xs text-slate-400">
                Teks pengumuman penting yang berjalan (marquee ticker) pada bilah utilitas paling atas situs.
              </p>
              <textarea
                rows={3}
                value={formData.announcementTicker}
                onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                placeholder="PENGUMUMAN: Pendaftaran DIKLATSAR resmi dibuka!..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>
        )}

        {/* TAB 3: SAMBUTAN KETUA UMUM */}
        {activeTab === 'sambutan' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
              <User className="w-4 h-4" /> Sambutan Resmi Ketua Umum
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Nama Lengkap Ketua Umum</label>
                    <input
                      type="text"
                      value={formData.chairmanName}
                      onChange={(e) => setFormData({ ...formData, chairmanName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">NIA (Nomor Induk Anggota)</label>
                    <input
                      type="text"
                      value={formData.chairmanNia}
                      onChange={(e) => setFormData({ ...formData, chairmanNia: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Jabatan & Masa Bakti</label>
                  <input
                    type="text"
                    value={formData.chairmanTitle}
                    onChange={(e) => setFormData({ ...formData, chairmanTitle: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Teks Sambutan Lengkap</label>
                  <textarea
                    rows={8}
                    value={formData.chairmanGreeting}
                    onChange={(e) => setFormData({ ...formData, chairmanGreeting: e.target.value })}
                    placeholder="Tuliskan teks sambutan resmi di sini..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F5C400] leading-relaxed"
                  />
                </div>
              </div>

              {/* Upload Foto Ketua Umum */}
              <div className="lg:col-span-5">
                <ImageUploadInput
                  value={formData.chairmanPhotoUrl}
                  onChange={(url) => setFormData({ ...formData, chairmanPhotoUrl: url })}
                  label="Foto Resmi Ketua Umum"
                  hint="Upload foto potret resmi (disimpan di DB) atau gunakan link internet (aspek 3:4 atau 1:1)"
                  aspectRatio="aspect-[3/4]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATISTIK COUNTER */}
        {activeTab === 'statistik' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
              <BarChart3 className="w-4 h-4" /> Counter Angka Statistik Beranda
            </div>
            <p className="text-xs text-slate-400">
              Angka pencapaian yang tampil pada pita statistik di halaman utama.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="block font-semibold text-slate-300">Total Kader / Anggota</label>
                <input
                  type="text"
                  value={formData.stats.activeMembers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, activeMembers: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-[#F5C400]"
                />
                <input
                  type="text"
                  value={formData.stats.membersLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, membersLabel: e.target.value }
                    })
                  }
                  placeholder="Label: Kader Rimbawan"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 focus:outline-none"
                />
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="block font-semibold text-slate-300">Total Ekspedisi Alam Bebas</label>
                <input
                  type="text"
                  value={formData.stats.expeditions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, expeditions: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-[#F5C400]"
                />
                <input
                  type="text"
                  value={formData.stats.expeditionsLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, expeditionsLabel: e.target.value }
                    })
                  }
                  placeholder="Label: Ekspedisi Sukses"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 focus:outline-none"
                />
              </div>

              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-2">
                <label className="block font-semibold text-slate-300">Total Rekor Prestasi</label>
                <input
                  type="text"
                  value={formData.stats.achievements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, achievements: e.target.value }
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-[#F5C400]"
                />
                <input
                  type="text"
                  value={formData.stats.achievementsLabel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, achievementsLabel: e.target.value }
                    })
                  }
                  placeholder="Label: Rekor Prestasi"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="p-4 rounded-2xl bg-[#0b1424] border border-[#F5C400]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Info className="w-4 h-4 text-[#F5C400]" />
            <span>Perubahan beranda langsung tersinkronkan ke database server secara otomatis.</span>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Beranda</span>
          </button>
        </div>
      </form>
    </div>
  );
};
