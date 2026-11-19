import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Settings,
  Sparkles,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Database,
  Download,
  Upload,
  RefreshCw,
  Layers,
  ArrowRight,
  BookOpen,
  UserPlus,
  MapPin,
  KeyRound,
  ShieldCheck,
  Users,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Trophy,
  Award,
  Flame,
  Compass
} from 'lucide-react';

export const AdminSettings = () => {
  const {
    settings,
    setSettings,
    setAdminCurrentTab,
    isDbConnected,
    exportBackupJson,
    restoreBackupJson,
    resetToFactoryDefaults,
    addAuditLog,
    addToast
  } = useData();

  const [activeTab, setActiveTab] = useState('seo');

  // Form state khusus SEO & Pengaturan Global Website
  const [formData, setFormData] = useState({
    metaTitle: settings?.metaTitle || 'MAPAKTI UPS Tegal — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal',
    metaDescription: settings?.metaDescription || 'Website Resmi MAPAKTI Universitas Pancasakti Tegal. Wadah pembentukan karakter tangguh, berwawasan ekologis, dan berintegritas tinggi di alam terbuka.',
    metaKeywords: settings?.metaKeywords || 'MAPAKTI, Mahasiswa Pencinta Alam, UPS Tegal, Diklatsar, Ekspedisi Slamet, Konservasi, Panjat Tebing, Hutan Gunung',
    organizationName: settings?.organizationName || 'MAPAKTI — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal',
    shortName: settings?.shortName || 'MAPAKTI UPS Tegal',
    tagline: settings?.tagline || 'Lestari Alamku, Jaya MAPAKTI-ku',
    establishedYear: settings?.establishedYear || '1984',
    baseCampus: settings?.baseCampus || 'Universitas Pancasakti Tegal',
    announcementTicker: settings?.announcementTicker || '',
    footerCopyright: settings?.footerCopyright || '© 1984 - 2026 MAPAKTI Universitas Pancasakti Tegal. All Rights Reserved.'
  });

  const [restoreFileText, setRestoreFileText] = useState('');

  // Handle Save SEO & Global
  const handleSaveSeo = (e) => {
    e?.preventDefault();

    const updatedSettings = {
      ...settings,
      ...formData
    };
    setSettings(updatedSettings);

    addAuditLog('UPDATE', 'Pengaturan SEO & Global', 'Memperbarui konfigurasi SEO, metadata, dan teks global website');
    addToast({
      type: 'success',
      title: 'Pengaturan SEO Berhasil Disimpan',
      message: 'Metadata search engine, judul situs, dan pengaturan global telah diperbarui.'
    });
  };

  // Handle File Upload for Restore
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setRestoreFileText(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleExecuteRestore = () => {
    if (!restoreFileText) {
      addToast({
        type: 'error',
        title: 'File Kosong',
        message: 'Silakan pilih file cadangan JSON yang valid terlebih dahulu.'
      });
      return;
    }

    const success = restoreBackupJson(restoreFileText);
    if (success) {
      setRestoreFileText('');
      addToast({
        type: 'success',
        title: 'Pemulihan Berhasil',
        message: 'Seluruh database telah dipulihkan dari cadangan.'
      });
    }
  };

  const contentShortcuts = [
    {
      id: 'beranda',
      title: 'Beranda & Banner Hero',
      desc: 'Edit slide foto beranda, statistik counters (51+ Anggota, 3 Divisi, dll), dan Sambutan Ketua Umum.',
      icon: Layers,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'profil',
      title: 'Profil & Kode Etik',
      desc: 'Edit naskah Kode Etik Gladian IV 1974, Visi, Misi, Sejarah MAPAKTI 1984, dan Makna Lambang.',
      icon: BookOpen,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'pendaftaran-anggota',
      title: 'Pendaftaran (GForm & CP)',
      desc: 'Buka/tutup pendaftaran calon anggota, atur link Google Form, dan kelola nomor WhatsApp narahubung.',
      icon: UserPlus,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'kontak',
      title: 'Kontak & Sekretariat',
      desc: 'Perbarui alamat sekretariat MAPAKTI di kampus UPS, jam operasional, telepon, dan tautan sosial media.',
      icon: MapPin,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    {
      id: 'pengaturan-sandi',
      title: 'Pengaturan Sandi Admin',
      desc: 'Ubah kata sandi akun admin pengurus secara langsung dan sinkronkan dengan database cloud.',
      icon: KeyRound,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      id: 'periode',
      title: 'Kepengurusan & Periode',
      desc: 'Kelola bagan struktur organisasi pengurus aktif masa bakti dan arsip kepengurusan lampau.',
      icon: ShieldCheck,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      id: 'anggota',
      title: 'Master Data Anggota',
      desc: 'Kelola data seluruh anggota, angkatan DIKLATSAR, NIA, nomor rimba, dan status keaktifan.',
      icon: Users,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
    },
    {
      id: 'divisi',
      title: 'Informasi 3 Divisi',
      desc: 'Edit profil Divisi Hutan Gunung, Rock Climbing, dan Konservasi Sumber Daya Alam.',
      icon: Compass,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'proker',
      title: 'Program Kerja',
      desc: 'Kelola jadwal proker, target waktu, status pelaksanaan, dan penanggung jawab divisi.',
      icon: Flame,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    },
    {
      id: 'kegiatan',
      title: 'Kegiatan & Ekspedisi',
      desc: 'Publikasi kegiatan lapangan, ekspedisi pendakian, bakti sosial, dan pendaftaran peserta.',
      icon: Calendar,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    },
    {
      id: 'berita',
      title: 'Berita & Publikasi',
      desc: 'Kelola artikel jurnalistik, berita kegiatan, liputan prestasi, dan rilis pers resmi MAPAKTI.',
      icon: Newspaper,
      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    },
    {
      id: 'galeri',
      title: 'Galeri Foto Kegiatan',
      desc: 'Unggah dokumentasi foto kegiatan lapangan, alam bebas, tebing, dan aksi konservasi.',
      icon: ImageIcon,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    },
    {
      id: 'prestasi',
      title: 'Rekor Prestasi',
      desc: 'Pencatatan prestasi lomba panjat dinding, navigasi darat, dan penghargaan pecinta alam.',
      icon: Trophy,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 'diklatsar',
      title: 'Sejarah DIKLATSAR',
      desc: 'Dokumentasi riwayat angkatan pendidikan dan latihan dasar MAPAKTI dari masa ke masa.',
      icon: Award,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Page Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#102A56] border border-[#F5C400]/40 flex items-center justify-center text-[#F5C400] shadow-md shadow-[#F5C400]/10">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
                Pengaturan SEO & Backup Data
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Kelola konfigurasi meta pencarian (SEO), identitas global web, serta pencadangan & pemulihan database.
              </p>
            </div>
          </div>
        </div>

        {activeTab === 'seo' && (
          <button
            onClick={handleSaveSeo}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5C400] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-[#102A56] font-black text-sm shadow-lg shadow-[#F5C400]/20 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Pengaturan SEO</span>
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'seo'
              ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>SEO & Metadata Google</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'backup'
              ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Database Cloud & Cadangan Data</span>
        </button>

        <button
          onClick={() => setActiveTab('shortcuts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
            activeTab === 'shortcuts'
              ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Direktori Pintasan Menu ({contentShortcuts.length})</span>
        </button>
      </div>

      {/* TAB 1: SEO & METADATA */}
      {activeTab === 'seo' && (
        <form onSubmit={handleSaveSeo} className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#F5C400]" />
                Metadata Search Engine Optimization (SEO)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Informasi ini dibaca oleh Google, Bing, Facebook, WhatsApp, dan perayap web saat tautan dibagikan.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Meta Title (Judul Tab Browser & Pencarian)
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="MAPAKTI UPS Tegal — Mahasiswa Pencinta Alam..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                />
                <p className="text-[11px] text-slate-500 mt-1">Disarankan 50-60 karakter agar tampil sempurna di Google.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Meta Description (Ringkasan Cuplikan Mesin Pencari)
                </label>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Website Resmi MAPAKTI Universitas Pancasakti Tegal..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                />
                <p className="text-[11px] text-slate-500 mt-1">Disarankan 140-160 karakter untuk pratinjau cuplikan pencarian.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Meta Keywords (Kata Kunci Tag Pencarian)
                </label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                  placeholder="MAPAKTI, Pecinta Alam, UPS Tegal, Diklatsar, Ekspedisi"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                />
                <p className="text-[11px] text-slate-500 mt-1">Pisahkan setiap kata kunci dengan tanda koma (,).</p>
              </div>
            </div>
          </div>

          {/* Pengaturan Identitas Global */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5C400]" />
                Identitas Global & Teks Berjalan
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Teks identitas utama yang tampil di seluruh header, footer, dan bar navigasi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nama Resmi Organisasi
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Nama Singkat / Brand
                </label>
                <input
                  type="text"
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Semboyan / Motto / Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Tahun Berdiri & Basis Kampus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.establishedYear}
                    onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                    placeholder="1984"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                  />
                  <input
                    type="text"
                    value={formData.baseCampus}
                    onChange={(e) => setFormData({ ...formData, baseCampus: e.target.value })}
                    placeholder="UPS Tegal"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Pengumuman Berjalan (Announcement Ticker)
              </label>
              <input
                type="text"
                value={formData.announcementTicker}
                onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                placeholder="Kosongkan jika tidak ada pengumuman mendesak..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Teks ini akan berjalan di bilah bagian atas halaman utama jika diisi.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Teks Hak Cipta Footer
              </label>
              <input
                type="text"
                value={formData.footerCopyright}
                onChange={(e) => setFormData({ ...formData, footerCopyright: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5C400] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-[#102A56] font-black text-sm shadow-lg shadow-[#F5C400]/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Seluruh Pengaturan SEO</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: DATABASE CLOUD & CADANGAN */}
      {activeTab === 'backup' && (
        <div className="space-y-6">
          {/* Status Koneksi Database */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  Status Sinkronisasi Database
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Penyimpanan utama website terhubung secara real-time ke cloud database dan tersinkronisasi otomatis dengan penyimpanan browser.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-xs font-bold text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Database Cloud Online</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-bold text-white">Database Aman & Aktif</p>
                <p className="text-slate-400">
                  Semua perubahan data (anggota, berita, kegiatan, sandi, kode etik) disimpan langsung ke database dan di-cache lokal. Anda dapat mengunduh cadangan sewaktu-waktu di bawah ini.
                </p>
              </div>
            </div>
          </div>

          {/* Ekspor & Impor JSON */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ekspor JSON */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Unduh Cadangan Database (JSON)
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Unduh seluruh database website MAPAKTI termasuk Master Anggota, Pengurus Periode, Berita, Galeri, Diklatsar, Prestasi, dan Pengaturan dalam satu berkas JSON terenkripsi.
                </p>
              </div>

              <button
                onClick={exportBackupJson}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Ekspor & Unduh Berkas JSON</span>
              </button>
            </div>

            {/* Impor JSON */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                  <Upload className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Pulihkan dari Berkas JSON
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Unggah berkas cadangan JSON yang telah diunduh sebelumnya untuk mengembalikan seluruh konten website ke kondisi saat cadangan dibuat.
                </p>
              </div>

              <div className="space-y-3 mt-4">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                />
                <button
                  onClick={handleExecuteRestore}
                  disabled={!restoreFileText}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                    restoreFileText
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Jalankan Pemulihan Database</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reset ke Pengaturan Standar */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-1">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Reset ke Data Standar Awal (Factory Reset)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tindakan ini akan mengembalikan seluruh data organisasi ke kondisi standar awal instalasi. Sangat disarankan untuk mengunduh cadangan JSON terlebih dahulu sebelum melakukan reset.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh data website ke kondisi awal instalasi? Tindakan ini tidak dapat dibatalkan kecuali Anda memiliki file backup JSON.')) {
                        resetToFactoryDefaults();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Seluruh Data ke Standar Awal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DIREKTORI PINTASAN MENU KONTEN */}
      {activeTab === 'shortcuts' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#F5C400]" />
              Direktori Pintasan Editor Konten
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Setiap bagian konten website MAPAKTI memiliki menu khusus yang terintegrasi langsung dengan database. Klik salah satu kartu di bawah untuk langsung menuju editor tersebut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contentShortcuts.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => setAdminCurrentTab(item.id)}
                  className="group bg-slate-900 hover:bg-[#102A56]/40 border border-slate-800 hover:border-[#F5C400]/40 rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${item.color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#F5C400] group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#F5C400] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-300 inline-flex items-center gap-1 pt-2 border-t border-slate-800/60">
                    Buka Editor Menu &rarr;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
