import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Settings,
  Sparkles,
  Search,
  Download,
  Upload,
  RefreshCw,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sliders,
  Database
} from 'lucide-react';

export const AdminSettings = () => {
  const {
    settings,
    setSettings,
    exportBackupJson,
    restoreBackupJson,
    resetToFactoryDefaults,
    addAuditLog,
    addToast
  } = useData();

  const [activeTab, setActiveTab] = useState('cms');
  const [formData, setFormData] = useState({ ...settings });
  const [restoreFileText, setRestoreFileText] = useState('');

  const handleSaveCMS = (e) => {
    e.preventDefault();
    setSettings(formData);
    addAuditLog('UPDATE', 'CMS & Pengaturan Website', 'Memperbarui konfigurasi CMS dan branding website');
    addToast({
      type: 'success',
      title: 'Pengaturan Disimpan',
      message: 'Perubahan CMS dan identitas website berhasil diterapkan.'
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === 'string') {
          setRestoreFileText(content);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExecuteRestore = () => {
    if (!restoreFileText) {
      addToast({ type: 'error', title: 'File Kosong', message: 'Silakan pilih file backup JSON terlebih dahulu.' });
      return;
    }
    if (window.confirm('PENTING: Memulihkan database akan menimpa data yang ada. Lanjutkan pemulihan data?')) {
      restoreBackupJson(restoreFileText);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#F5C400]" />
          CMS, Pengaturan Website, SEO & Cadangan Data
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Konfigurasi tampilan tanpa menyentuh kode program, optimasi metadata mesin pencari, dan utilitas pencadangan basis data.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'cms'
              ? 'bg-[#F5C400] text-[#102A56]'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Pengaturan Konten & CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'seo'
              ? 'bg-[#F5C400] text-[#102A56]'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Pengaturan SEO</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeTab === 'backup'
              ? 'bg-[#F5C400] text-[#102A56]'
              : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Cadangan & Pemulihan</span>
        </button>
      </div>

      {/* TAB 1: CMS SETTINGS (FR-16) */}
      {activeTab === 'cms' && (
        <form onSubmit={handleSaveCMS} className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Identitas Organisasi & Headline Hero Banner
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Organisasi</label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Singkat / Brand</label>
                <input
                  type="text"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 text-xs mb-1">Semboyan / Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            {/* Ticker warta running text */}
            <div>
              <label className="block font-semibold text-slate-300 text-xs mb-1">
                Teks Berjalan Pengumuman (Announcement Ticker)
              </label>
              <textarea
                rows={2}
                value={formData.announcementTicker}
                onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Sambutan Ketua Umum
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Ketua Umum</label>
                <input
                  type="text"
                  value={formData.chairmanName}
                  onChange={(e) => setFormData({ ...formData, chairmanName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">NIA Ketua</label>
                <input
                  type="text"
                  value={formData.chairmanNia}
                  onChange={(e) => setFormData({ ...formData, chairmanNia: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 text-xs mb-1">Teks Sambutan Resmi</label>
              <textarea
                rows={4}
                value={formData.chairmanGreeting}
                onChange={(e) => setFormData({ ...formData, chairmanGreeting: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Kontak Sekretariat & Media Sosial
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Alamat Email Resmi</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 text-xs mb-1">Alamat Lengkap Sekretariat</label>
              <input
                type="text"
                value={formData.secretariatAddress}
                onChange={(e) => setFormData({ ...formData, secretariatAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Pengaturan CMS</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SEO SETTINGS (FR-18) */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSaveCMS} className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl text-xs">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
              Pengaturan Meta Tag & SEO
            </h3>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Title (Judul Halaman Pencarian)</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Description (Deskripsi Cuplikan Google)</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Keywords</label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-slate-400">
            <span className="font-bold text-white block">Dukungan Teknis SEO:</span>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> URL Ramah SEO & Open Graph Markup Aktif
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Schema Organization Microdata Terintegrasi
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Konfigurasi SEO</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: BACKUP & RESTORE DATABASE (FR-21) */}
      {activeTab === 'backup' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl text-xs">
          <div>
            <h3 className="text-base font-bold text-white">
              Cadangan & Pemulihan Basis Data Organisasi
            </h3>
            <p className="text-slate-400 mt-1">
              Simpan seluruh data pendaftar, keanggotaan, kegiatan, berita, galeri, dan audit log ke file JSON cadangan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Download Backup */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Ekspor File Cadangan (JSON Backup)</h4>
                <p className="text-slate-400 leading-relaxed">
                  Unduh snapshot komprehensif seluruh basis data MAPAKTI untuk arsip offline yang aman.
                </p>
              </div>

              <button
                type="button"
                onClick={exportBackupJson}
                className="w-full py-3 px-4 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Cadangan Basis Data</span>
              </button>
            </div>

            {/* Restore Backup */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white">Pulihkan Data dari File Cadangan</h4>
                <p className="text-slate-400 leading-relaxed">
                  Unggah file cadangan JSON yang sebelumnya diunduh untuk memulihkan seluruh konten.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="w-full text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700"
                />
              </div>

              <button
                type="button"
                onClick={handleExecuteRestore}
                disabled={!restoreFileText}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  restoreFileText
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Eksekusi Pemulihan (Restore)</span>
              </button>
            </div>
          </div>

          {/* Reset Defaults */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <div className="text-slate-400">
              <span className="font-bold text-slate-300 block">Reset Data Bawaan</span>
              Kembalikan semua tabel data ke preset bawaan awal PRD MAPAKTI.
            </div>
            <button
              onClick={resetToFactoryDefaults}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 font-bold border border-slate-700 transition-colors"
            >
              Reset ke Bawaan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
