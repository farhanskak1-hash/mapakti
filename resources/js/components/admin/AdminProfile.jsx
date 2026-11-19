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
  Compass
} from 'lucide-react';

export const AdminProfile = () => {
  const { profile, setProfile, addAuditLog, addToast } = useData();

  const [activeTab, setActiveTab] = useState('visi-misi');

  const [formData, setFormData] = useState({
    history: profile?.history || '',
    vision: profile?.vision || '',
    missions: profile?.missions ? [...profile.missions] : [],
    codeOfEthics: profile?.codeOfEthics ? [...profile.codeOfEthics] : [],
    logoUrl: profile?.logoUrl || '/images/logo-mapakti.png',
    symbolMeaning: profile?.symbolMeaning ? [...profile.symbolMeaning] : []
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
    e.preventDefault();

    setProfile((prev) => ({
      ...prev,
      ...formData
    }));

    addAuditLog('UPDATE', 'Profil Organisasi', 'Memperbarui Sejarah, Visi Misi, Lambang, dan Kode Etik Organisasi');
    addToast({
      type: 'success',
      title: 'Profil Berhasil Disimpan',
      message: 'Perubahan data profil organisasi telah diperbarui ke database dan langsung tampil di website.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Menu Profil Organisasi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola teks sejarah, visi & misi, lambang resmi, makna filosofi, dan kode etik pecinta alam.
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
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs">
        {[
          { id: 'visi-misi', label: 'Visi & Misi', icon: Target },
          { id: 'sejarah', label: 'Sejarah Organisasi', icon: BookOpen },
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
        {/* TAB 1: VISI & MISI */}
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

        {/* TAB 2: SEJARAH ORGANISASI */}
        {activeTab === 'sejarah' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
              <BookOpen className="w-4 h-4" /> Narasi Lengkap Sejarah Pendirian & Perjalanan Organisasi
            </div>
            <p className="text-xs text-slate-400">
              Gunakan paragraf yang rapi. Teks ini akan langsung tampil di halaman Sejarah Profil MAPAKTI.
            </p>
            <textarea
              rows={12}
              value={formData.history}
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              placeholder="Tuliskan sejarah organisasi di sini..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#F5C400] leading-relaxed shadow-inner"
            />
          </div>
        )}

        {/* TAB 3: LAMBANG & MAKNA FILOSOFIS */}
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

        {/* TAB 4: KODE ETIK PECINTA ALAM */}
        {activeTab === 'kode-etik' && (
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                <Heart className="w-4 h-4" /> Butir-Butir Kode Etik Pecinta Alam Indonesia ({formData.codeOfEthics.length})
              </div>
              <button
                type="button"
                onClick={handleAddEthic}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-[#F5C400] font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Butir Kode Etik</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.codeOfEthics.map((ke, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                  <span className="w-7 h-7 rounded-lg bg-[#102A56] text-[#F5C400] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#F5C400]/40">
                    {idx + 1}
                  </span>
                  <textarea
                    rows={2}
                    value={ke}
                    onChange={(e) => handleUpdateEthic(idx, e.target.value)}
                    placeholder={`Butir kode etik ke-${idx + 1}...`}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveEthic(idx)}
                    className="p-2 text-slate-500 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors mt-0.5"
                    title="Hapus Butir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="p-4 rounded-2xl bg-[#0b1424] border border-[#F5C400]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Info className="w-4 h-4 text-[#F5C400]" />
            <span>Setiap perubahan yang disimpan akan langsung tersinkronkan ke database server.</span>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
