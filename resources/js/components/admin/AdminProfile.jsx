import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  BookOpen,
  Target,
  ShieldCheck,
  Heart,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Info,
  Compass,
  RotateCcw,
  Eye,
  Building,
  Calendar,
  Layers
} from 'lucide-react';
import { initialProfile } from '../../data/initialData';

export const AdminProfile = () => {
  const { profile, setProfile, updateProfile, settings, setSettings, updateSettings, addAuditLog, addToast } = useData();

  // Tab aktif: default langsung ke 'sejarah' agar admin dapat langsung mengedit Kilas Sejarah & Banner Profil
  const [activeTab, setActiveTab] = useState('sejarah');

  const [formData, setFormData] = useState({
    // Banner Utama Profil
    headerBadge: profile?.headerBadge || initialProfile.headerBadge || 'Profil Resmi Organisasi',
    title: profile?.title || initialProfile.title || 'Sejarah, Visi, Misi & Falsafah MAPAKTI',
    subtitle: profile?.subtitle || initialProfile.subtitle || 'Mengenal jati diri Mahasiswa Pencinta Alam Universitas Pancasakti Tegal sebagai wadah pembinaan generasi muda rimbawan sejak 1984.',

    // Kilas Sejarah (Kartu Kiri)
    historyBadge: profile?.historyBadge || initialProfile.historyBadge || 'Kilas Sejarah',
    historyHeadline: profile?.historyHeadline || initialProfile.historyHeadline || 'Empat Dekade Mengabdi untuk Alam & Almamater',
    historyShortDesc: profile?.historyShortDesc || initialProfile.historyShortDesc || 'Didirikan di Kampus Universitas Pancasakti Tegal dengan semangat Tri Dharma Perguruan Tinggi dan Kode Etik Pecinta Alam Indonesia.',
    establishedYear: profile?.establishedYear || settings?.establishedYear || initialProfile.establishedYear || '1996',
    campusBase: profile?.campusBase || initialProfile.campusBase || 'UPS Tegal',

    // Narasi Lengkap Sejarah (Kartu Kanan)
    history: profile?.history || initialProfile.history || '',

    // Visi & Misi
    vision: profile?.vision || initialProfile.vision || '',
    missions: profile?.missions && profile.missions.length > 0
      ? [...profile.missions]
      : [...initialProfile.missions],

    // Kode Etik Pecinta Alam Gladian IV 1974
    ethicsTitle: profile?.ethicsTitle || initialProfile.ethicsTitle,
    ethicsPreamble: profile?.ethicsPreamble || initialProfile.ethicsPreamble,
    codeOfEthics:
      profile?.codeOfEthics && profile.codeOfEthics.length > 3
        ? [...profile.codeOfEthics]
        : [...initialProfile.codeOfEthics],
    ethicsRatification: profile?.ethicsRatification || initialProfile.ethicsRatification,

    // Lambang & Filosofi
    logoUrl: profile?.logoUrl || initialProfile.logoUrl || '/images/logo-mapakti.png',
    symbolMeaning: profile?.symbolMeaning && profile.symbolMeaning.length > 0
      ? [...profile.symbolMeaning]
      : [...initialProfile.symbolMeaning]
  });

  // Handlers for Missions
  const handleAddMission = () => {
    setFormData((prev) => ({
      ...prev,
      missions: [...prev.missions, '']
    }));
  };

  const handleUpdateMission = (index, val) => {
    const updated = [...formData.missions];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, missions: updated }));
  };

  const handleRemoveMission = (index) => {
    setFormData((prev) => ({
      ...prev,
      missions: prev.missions.filter((_, i) => i !== index)
    }));
  };

  // Handlers for Code of Ethics
  const handleAddEthic = () => {
    setFormData((prev) => ({
      ...prev,
      codeOfEthics: [...prev.codeOfEthics, '']
    }));
  };

  const handleUpdateEthic = (index, val) => {
    const updated = [...formData.codeOfEthics];
    updated[index] = val;
    setFormData((prev) => ({ ...prev, codeOfEthics: updated }));
  };

  const handleRemoveEthic = (index) => {
    setFormData((prev) => ({
      ...prev,
      codeOfEthics: prev.codeOfEthics.filter((_, i) => i !== index)
    }));
  };

  const handleResetOfficialEthics = () => {
    if (window.confirm('Kembalikan seluruh teks Kode Etik ke versi resmi Gladian IV Ujung Pandang 1974?')) {
      setFormData((prev) => ({
        ...prev,
        ethicsTitle: initialProfile.ethicsTitle,
        ethicsPreamble: initialProfile.ethicsPreamble,
        codeOfEthics: [...initialProfile.codeOfEthics],
        ethicsRatification: initialProfile.ethicsRatification
      }));
      addToast({
        type: 'info',
        title: 'Kode Etik Direset',
        message: 'Teks dikembalikan ke naskah resmi Gladian IV Ujung Pandang 1974.'
      });
    }
  };

  // Reset Sejarah & Kilas ke Default
  const handleResetHistoryDefaults = () => {
    if (window.confirm('Kembalikan teks Judul Banner, Kilas Sejarah, dan Narasi ke setelan default awal?')) {
      setFormData((prev) => ({
        ...prev,
        headerBadge: initialProfile.headerBadge,
        title: initialProfile.title,
        subtitle: initialProfile.subtitle,
        historyBadge: initialProfile.historyBadge,
        historyHeadline: initialProfile.historyHeadline,
        historyShortDesc: initialProfile.historyShortDesc,
        establishedYear: initialProfile.establishedYear,
        campusBase: initialProfile.campusBase,
        history: initialProfile.history
      }));
      addToast({
        type: 'info',
        title: 'Sejarah Direset',
        message: 'Teks banner dan kilas sejarah dikembalikan ke data default.'
      });
    }
  };

  // Handlers for Symbol Meanings
  const handleAddSymbol = () => {
    setFormData((prev) => ({
      ...prev,
      symbolMeaning: [
        ...prev.symbolMeaning,
        { label: 'Unsur Lambang Baru', desc: 'Filosofi dan arti makna unsur lambang.' }
      ]
    }));
  };

  const handleUpdateSymbol = (index, field, val) => {
    const updated = [...formData.symbolMeaning];
    updated[index] = { ...updated[index], [field]: val };
    setFormData((prev) => ({ ...prev, symbolMeaning: updated }));
  };

  const handleRemoveSymbol = (index) => {
    setFormData((prev) => ({
      ...prev,
      symbolMeaning: prev.symbolMeaning.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const updatedProfile = {
      ...profile,
      ...formData
    };

    updateProfile(updatedProfile);

    // Sinkronkan tahun pendirian ke settings jika diedit agar konsisten di seluruh web
    if (formData.establishedYear && formData.establishedYear !== settings?.establishedYear) {
      updateSettings((prev) => ({
        ...prev,
        establishedYear: formData.establishedYear
      }));
    }

    addAuditLog('UPDATE', 'Profil Organisasi', 'Memperbarui Sejarah, Kilas Profil, Visi Misi, Lambang, dan Kode Etik Organisasi');
    addToast({
      type: 'success',
      title: 'Profil Berhasil Disimpan',
      message: 'Perubahan teks profil, kilas sejarah, dan visi-misi telah disimpan dan langsung aktif di website.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Menu Profil & Sejarah Organisasi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola judul banner profil, kilas sejarah, narasi perjalanan, visi & misi, serta lambang resmi organisasi.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 self-start sm:self-auto transform active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Seluruh Profil</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs scrollbar-thin">
        {[
          { id: 'sejarah', label: 'Sejarah & Kilas Profil', icon: BookOpen },
          { id: 'visi-misi', label: 'Visi & Misi', icon: Target },
          { id: 'lambang', label: 'Lambang & Makna Filosofis', icon: Compass },
          { id: 'kode-etik', label: 'Kode Etik Pecinta Alam', icon: Heart }
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
        {/* ============================================================== */}
        {/* TAB 1: SEJARAH & KILAS PROFIL (SESUAI DOKUMEN TAMPILAN GAMBAR) */}
        {/* ============================================================== */}
        {activeTab === 'sejarah' && (
          <div className="space-y-6">
            {/* Bagian 1: Banner Header Profil */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                  <Layers className="w-4 h-4" /> 1. Header Banner Halaman Profil (Atas)
                </div>
                <button
                  type="button"
                  onClick={handleResetHistoryDefaults}
                  className="text-xs text-slate-400 hover:text-[#F5C400] flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Kembalikan Default</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Label Badge Kuning (Atas Judul)
                  </label>
                  <input
                    type="text"
                    value={formData.headerBadge}
                    onChange={(e) => setFormData({ ...formData, headerBadge: e.target.value })}
                    placeholder="Contoh: Profil Resmi Organisasi"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Judul Utama Banner (Heading 1)
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Contoh: Sejarah, Visi, Misi & Falsafah MAPAKTI"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subjudul / Paragraf Pengantar Banner
                </label>
                <textarea
                  rows={2}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Deskripsi pengantar jati diri organisasi..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F5C400] leading-relaxed"
                />
              </div>
            </div>

            {/* Bagian 2: Kartu Kilas Sejarah & Narasi (Grid 2 Kolom) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Kolom Kiri: Kartu Kilas Sejarah */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                  <Calendar className="w-4 h-4" /> 2. Kartu Kilas Sejarah (Sisi Kiri)
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Label Kategori (Kuning)
                  </label>
                  <input
                    type="text"
                    value={formData.historyBadge}
                    onChange={(e) => setFormData({ ...formData, historyBadge: e.target.value })}
                    placeholder="Contoh: Kilas Sejarah"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Judul Headline Kilas
                  </label>
                  <input
                    type="text"
                    value={formData.historyHeadline}
                    onChange={(e) => setFormData({ ...formData, historyHeadline: e.target.value })}
                    placeholder="Contoh: Empat Dekade Mengabdi untuk Alam & Almamater"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#F5C400]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Deskripsi Ringkas Kilas
                  </label>
                  <textarea
                    rows={3}
                    value={formData.historyShortDesc}
                    onChange={(e) => setFormData({ ...formData, historyShortDesc: e.target.value })}
                    placeholder="Ringkasan singkat sejarah pendirian..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F5C400] leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Tahun Pendirian
                    </label>
                    <input
                      type="text"
                      value={formData.establishedYear}
                      onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                      placeholder="Contoh: 1984 atau 1996"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-[#F5C400] font-black focus:outline-none focus:border-[#F5C400]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Basis Kampus
                    </label>
                    <input
                      type="text"
                      value={formData.campusBase}
                      onChange={(e) => setFormData({ ...formData, campusBase: e.target.value })}
                      placeholder="Contoh: UPS Tegal"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#F5C400]"
                    />
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Narasi Lengkap Sejarah Organisasi */}
              <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                  <BookOpen className="w-4 h-4" /> 3. Narasi Lengkap Cerita Sejarah (Sisi Kanan)
                </div>
                <p className="text-xs text-slate-400">
                  Tuliskan uraian narasi lengkap sejarah pendirian dan perjalanan organisasi (pisahkan paragraf dengan Enter).
                </p>
                <textarea
                  rows={13}
                  value={formData.history}
                  onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  placeholder="Tuliskan cerita sejarah organisasi di sini..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5C400] leading-relaxed shadow-inner"
                />
              </div>
            </div>

            {/* Bagian 4: Pratinjau Tampilan Langsung (Live Visual Preview) */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <Eye className="w-4 h-4" /> Pratinjau Langsung Tampilan Website (Realtime Preview)
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Sesuai visual front-end
                </span>
              </div>

              {/* Mockup Preview persis gambar */}
              <div className="rounded-2xl bg-[#0b101b] border border-slate-800/80 p-5 sm:p-6 space-y-6">
                {/* Header Preview */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-6 shadow-xl">
                  <div className="max-w-2xl space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5C400] text-[#102A56] text-[10px] font-black uppercase tracking-wider">
                      <BookOpen className="w-3 h-3" /> {formData.headerBadge || 'Profil Resmi Organisasi'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {formData.title || 'Sejarah, Visi, Misi & Falsafah MAPAKTI'}
                    </h2>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {formData.subtitle}
                    </p>
                  </div>
                </div>

                {/* 2-Column Cards Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase text-[#F5C400] tracking-wider block">
                      {formData.historyBadge || 'Kilas Sejarah'}
                    </span>
                    <h4 className="text-base font-black text-white leading-snug">
                      {formData.historyHeadline || 'Empat Dekade Mengabdi untuk Alam & Almamater'}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {formData.historyShortDesc}
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Tahun Pendirian</span>
                        <span className="font-bold text-[#F5C400]">{formData.establishedYear || '1996'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Basis Kampus</span>
                        <span className="font-bold text-white">{formData.campusBase || 'UPS Tegal'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {formData.history}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: VISI & MISI */}
        {/* ============================================================== */}
        {activeTab === 'visi-misi' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                <Target className="w-4 h-4" /> Visi MAPAKTI
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Pernyataan Visi Utama Organisasi
                </label>
                <textarea
                  rows={3}
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  placeholder="Masukkan pernyataan visi..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-[#F5C400] leading-relaxed shadow-inner"
                />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Butir-Butir Misi Strategis ({formData.missions.length})
                </div>
                <button
                  type="button"
                  onClick={handleAddMission}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-[#F5C400] font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Butir Misi</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.missions.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                    <span className="w-6 h-6 rounded-lg bg-[#102A56] text-[#F5C400] text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-1 border border-[#F5C400]/30">
                      {idx + 1}
                    </span>
                    <textarea
                      rows={2}
                      value={m}
                      onChange={(e) => handleUpdateMission(idx, e.target.value)}
                      placeholder={`Butir misi ke-${idx + 1}...`}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMission(idx)}
                      className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors mt-1"
                      title="Hapus Misi"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: LAMBANG & MAKNA FILOSOFIS */}
        {/* ============================================================== */}
        {activeTab === 'lambang' && (
          <div className="space-y-6">
            {/* Upload Logo Lambang Resmi */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
                <Compass className="w-4 h-4" /> Gambar Lambang Resmi Organisasi
              </div>
              <p className="text-xs text-slate-400">
                Pilih berkas foto logo (bisa upload langsung ke database atau paste link gambar dari internet).
              </p>

              <ImageUploadInput
                value={formData.logoUrl}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                label="Berkas Gambar Lambang Resmi MAPAKTI"
                hint="Mendukung upload langsung file PNG transparan, JPG, WebP atau link internet"
                aspectRatio="aspect-square"
              />
            </div>

            {/* Butir-Butir Makna Lambang */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Makna & Filosofi Unsur Lambang ({formData.symbolMeaning.length})
                </div>
                <button
                  type="button"
                  onClick={handleAddSymbol}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-[#F5C400] font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Unsur Lambang</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.symbolMeaning.map((sym, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-lg bg-[#102A56] text-[#F5C400] text-xs font-bold flex items-center justify-center border border-[#F5C400]/40">
                        {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSymbol(idx)}
                        className="text-slate-500 hover:text-rose-400 p-1 rounded-lg"
                        title="Hapus Unsur"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nama / Label Unsur</label>
                      <input
                        type="text"
                        value={sym.label}
                        onChange={(e) => handleUpdateSymbol(idx, 'label', e.target.value)}
                        placeholder="Contoh: Bintang 8 Penjuru"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">Makna Filosofis</label>
                      <textarea
                        rows={3}
                        value={sym.desc}
                        onChange={(e) => handleUpdateSymbol(idx, 'desc', e.target.value)}
                        placeholder="Uraian makna filosofis unsur..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: KODE ETIK PECINTA ALAM */}
        {/* ============================================================== */}
        {activeTab === 'kode-etik' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                  <Heart className="w-4 h-4" /> Kode Etik Pecinta Alam Indonesia
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Naskah sakral ikrar pecinta alam Indonesia hasil Gladian IV Ujung Pandang 1974.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetOfficialEthics}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-[#F5C400] border border-slate-700 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Naskah Otentik 1974</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Judul Kode Etik</label>
              <input
                type="text"
                value={formData.ethicsTitle}
                onChange={(e) => setFormData({ ...formData, ethicsTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-bold focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mukadimah / Hakekat Pembukaan</label>
              <textarea
                rows={5}
                value={formData.ethicsPreamble}
                onChange={(e) => setFormData({ ...formData, ethicsPreamble: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs text-white focus:outline-none focus:border-[#F5C400] leading-relaxed shadow-inner"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  7 Butir Ikrar Kode Etik ({formData.codeOfEthics.length} Butir)
                </label>
                <button
                  type="button"
                  onClick={handleAddEthic}
                  className="px-3 py-1 rounded-xl bg-slate-800 text-[#F5C400] text-xs font-bold border border-slate-700 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Tambah Butir</span>
                </button>
              </div>

              {formData.codeOfEthics.map((ke, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-[#102A56] text-[#F5C400] text-xs font-bold flex items-center justify-center flex-shrink-0 border border-[#F5C400]/40">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={ke}
                    onChange={(e) => handleUpdateEthic(idx, e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveEthic(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400"
                    title="Hapus Butir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Pengesahan Dokumen Otentik (Footer)
              </label>
              <textarea
                rows={4}
                value={formData.ethicsRatification}
                onChange={(e) => setFormData({ ...formData, ethicsRatification: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-[#F5C400] leading-relaxed shadow-inner"
              />
            </div>
          </div>
        )}

        {/* Bottom Floating/Fixed Save Action */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Perubahan profil otomatis tersimpan ke IndexedDB dan tersinkronisasi ke server.
          </p>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Seluruh Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
