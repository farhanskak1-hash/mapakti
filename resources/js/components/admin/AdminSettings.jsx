import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  Settings,
  Sparkles,
  Save,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Sliders,
  Database,
  Image as ImageIcon,
  User,
  Heart,
  Phone,
  Plus,
  Trash2,
  RefreshCw,
  Download,
  Upload,
  Layers,
  BarChart3,
  ExternalLink,
  UserPlus,
  MessageCircle,
  KeyRound
} from 'lucide-react';
import { AdminPasswordReset } from './AdminPasswordReset';

export const AdminSettings = () => {
  const {
    settings,
    setSettings,
    profile,
    setProfile,
    isDbConnected,
    exportBackupJson,
    restoreBackupJson,
    resetToFactoryDefaults,
    addAuditLog,
    addToast
  } = useData();

  const [activeTab, setActiveTab] = useState('hero');

  // Combined Form State for Settings and Profile
  const [formData, setFormData] = useState({
    // Hero & General Branding
    logoUrl: settings.logoUrl || '/images/logo-mapakti.png',
    organizationName: settings.organizationName || 'MAPAKTI — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal',
    shortName: settings.shortName || 'MAPAKTI UPS Tegal',
    tagline: settings.tagline || 'Lestari Alamku, Jaya MAPAKTI-ku',
    establishedYear: settings.establishedYear || '1984',
    baseCampus: settings.baseCampus || 'Universitas Pancasakti Tegal',
    heroHeadline: settings.heroHeadline || 'EKSPLORASI ALAM, KELOLA KELESTARIAN',
    heroSubheadline: settings.heroSubheadline || 'Wadah pembentukan karakter tangguh, berwawasan ekologis, dan berintegritas tinggi di alam terbuka.',
    announcementTicker: settings.announcementTicker || '',

    // Hero Slides (Array)
    heroSlides: settings.heroSlides && settings.heroSlides.length > 0 ? settings.heroSlides : [
      {
        id: 'slide-1',
        title: 'Menembus Batas di Atap Slamet 3.428 MDPL',
        subtitle: 'Ekspedisi pendakian rimba gunung, navigasi darat ilmiah, dan manajemen ketahanan alam bebas Divisi Hutan Gunung.',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        badge: 'Divisi Hutan Gunung'
      },
      {
        id: 'slide-2',
        title: 'Tegaknya Semangat di Tebing Karst Vertikal',
        subtitle: 'Penguasaan teknik tali-temali, safety rigging, dan pemanjatan tebing alam maupun dinding artifisial Divisi Rock Climbing.',
        imageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1600&q=80',
        badge: 'Divisi Rock Climbing'
      },
      {
        id: 'slide-3',
        title: 'Menghijaukan Pesisir Pantura & Hutan Lereng',
        subtitle: 'Aksi nyata rehabilitasi 5.000 bibit mangrove dan pelestarian keanekaragaman hayati Divisi Konservasi Sumber Daya Alam.',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80',
        badge: 'Divisi Konservasi Sumber Daya Alam'
      }
    ],

    // Stats Counters
    stats: {
      activeMembers: settings.stats?.activeMembers || '350',
      membersLabel: settings.stats?.membersLabel || 'Kader Rimbawan',
      expeditions: settings.stats?.expeditions || '48',
      expeditionsLabel: settings.stats?.expeditionsLabel || 'Ekspedisi Sukses',
      achievements: settings.stats?.achievements || '18',
      achievementsLabel: settings.stats?.achievementsLabel || 'Rekor Prestasi'
    },

    // Sambutan Ketua Umum
    chairmanName: settings.chairmanName || 'M. Bayu Dirgantara',
    chairmanTitle: settings.chairmanTitle || 'Ketua Umum MAPAKTI Masa Bakti 2024/2025',
    chairmanNia: settings.chairmanNia || 'MPK-XXII-2021-118',
    chairmanHeadline: settings.chairmanHeadline || 'Menempa Ksatria Rimba, Mengabdi untuk Kelestarian Semesta',
    chairmanGreeting: settings.chairmanGreeting || 'Salam Lestari! Selamat datang di website resmi MAPAKTI Universitas Pancasakti Tegal...',
    chairmanPhotoUrl: settings.chairmanPhotoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',

    // Kontak & Medsos
    secretariatAddress: settings.secretariatAddress || '',
    phone: settings.phone || '',
    whatsappNumber: settings.whatsappNumber || '',
    email: settings.email || '',
    operationalHours: settings.operationalHours || 'Senin - Sabtu: 10:00 - 21:00 WIB',
    socialMedia: {
      instagram: settings.socialMedia?.instagram || 'https://instagram.com/mapakti_upstegal',
      youtube: settings.socialMedia?.youtube || 'https://youtube.com/@mapakti_official',
      facebook: settings.socialMedia?.facebook || 'https://facebook.com/mapakti.upstegal',
      tiktok: settings.socialMedia?.tiktok || 'https://tiktok.com/@mapakti_upstegal'
    },
    footerCopyright: settings.footerCopyright || '© 1984 - 2026 MAPAKTI Universitas Pancasakti Tegal. All Rights Reserved.',

    // Pendaftaran Calon Anggota (Google Form & Narahubung)
    registrationIsOpen: settings.registrationIsOpen !== false,
    registrationTitle: settings.registrationTitle || 'Pendaftaran Calon Anggota & DIKLATSAR MAPAKTI',
    registrationSubtitle:
      settings.registrationSubtitle ||
      'Terbuka bagi seluruh mahasiswa aktif Universitas Pancasakti Tegal yang bertekad menempa diri di kawah candradimuka pecinta alam.',
    registrationGformUrl: settings.registrationGformUrl || 'https://forms.gle/mapakti-diklatsar-reg',
    registrationGuideText:
      settings.registrationGuideText ||
      'Silakan isi formulir online resmi melalui tautan Google Form di bawah ini, kemudian konfirmasikan ke salah satu kontak narahubung (Contact Person) panitia.',
    registrationContactPersons:
      settings.registrationContactPersons && settings.registrationContactPersons.length > 0
        ? settings.registrationContactPersons
        : [
            {
              id: 'cp-1',
              name: 'Bayu Dirgantara',
              role: 'Ketua Umum MAPAKTI',
              phone: '085876543210',
              whatsapp: '6285876543210'
            },
            {
              id: 'cp-2',
              name: 'Rian Setiawan',
              role: 'Koordinator Pendaftaran & Diklat',
              phone: '081234567890',
              whatsapp: '6281234567890'
            }
          ],
    registrationRequirements:
      settings.registrationRequirements && settings.registrationRequirements.length > 0
        ? settings.registrationRequirements
        : [
            'Mahasiswa aktif Universitas Pancasakti Tegal (Semua Fakultas & Program Studi)',
            'Memiliki minat, integritas, dan komitmen tinggi terhadap kelestarian alam dan petualangan alam bebas',
            'Sehat jasmani dan rohani untuk kegiatan lapangan',
            'Mengisi formulir pendaftaran resmi melalui Google Form panitia',
            'Mengikuti seluruh rangkaian pengarahan (Technical Meeting) dan Pendidikan & Latihan Dasar (DIKLATSAR)'
          ],

    // SEO
    metaTitle: settings.metaTitle || 'MAPAKTI UPS Tegal — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal',
    metaDescription: settings.metaDescription || 'Website Resmi MAPAKTI Universitas Pancasakti Tegal.',
    metaKeywords: settings.metaKeywords || 'MAPAKTI, Mahasiswa Pencinta Alam, UPS Tegal, Diklatsar, Ekspedisi Slamet'
  });

  // Profile State (Visi, Misi, Sejarah, Kode Etik)
  const [profileData, setProfileData] = useState({
    history: profile?.history || '',
    vision: profile?.vision || '',
    missions: profile?.missions ? [...profile.missions] : [],
    codeOfEthics: profile?.codeOfEthics ? [...profile.codeOfEthics] : []
  });

  const [restoreFileText, setRestoreFileText] = useState('');

  // Handle Master Save for Front-End Content
  const handleSaveAll = (e) => {
    e?.preventDefault();

    // 1. Save Settings
    const updatedSettings = {
      ...settings,
      ...formData
    };
    setSettings(updatedSettings);

    // 2. Save Profile
    if (profileData) {
      setProfile({
        ...profile,
        ...profileData
      });
    }

    addAuditLog('UPDATE', 'Editor Tampilan Front-End', 'Memperbarui tampilan & konten front-end website secara visual');
    addToast({
      type: 'success',
      title: 'Tampilan Front-End Diperbarui',
      message: 'Seluruh teks, slide, foto, dan konten berhasil diterapkan ke halaman depan!'
    });
  };

  // Helper for Hero Slides
  const handleSlideChange = (index, field, value) => {
    const updated = [...formData.heroSlides];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, heroSlides: updated });
  };

  // Helper for Missions
  const handleAddMission = () => {
    setProfileData({ ...profileData, missions: [...profileData.missions, ''] });
  };

  const handleMissionChange = (index, value) => {
    const updated = [...profileData.missions];
    updated[index] = value;
    setProfileData({ ...profileData, missions: updated });
  };

  const handleRemoveMission = (index) => {
    const updated = profileData.missions.filter((_, i) => i !== index);
    setProfileData({ ...profileData, missions: updated });
  };

  // Helper for Registration Contacts
  const handleAddRegContact = () => {
    const newCp = {
      id: `cp-${Date.now()}`,
      name: '',
      role: 'Panitia Pendaftaran',
      phone: '',
      whatsapp: ''
    };
    setFormData((prev) => ({
      ...prev,
      registrationContactPersons: [...(prev.registrationContactPersons || []), newCp]
    }));
  };

  const handleRegContactChange = (index, field, value) => {
    const updated = [...(formData.registrationContactPersons || [])];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'phone' && !updated[index].whatsapp) {
      updated[index].whatsapp = value.replace(/[^0-9]/g, '');
    }
    setFormData((prev) => ({ ...prev, registrationContactPersons: updated }));
  };

  const handleRemoveRegContact = (index) => {
    setFormData((prev) => ({
      ...prev,
      registrationContactPersons: (prev.registrationContactPersons || []).filter((_, i) => i !== index)
    }));
  };

  // Helper for Registration Requirements
  const handleAddRegRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      registrationRequirements: [...(prev.registrationRequirements || []), '']
    }));
  };

  const handleRegRequirementChange = (index, value) => {
    const updated = [...(formData.registrationRequirements || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, registrationRequirements: updated }));
  };

  const handleRemoveRegRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      registrationRequirements: (prev.registrationRequirements || []).filter((_, i) => i !== index)
    }));
  };

  // Helper for Backup & Restore
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
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-[#F5C400]" />
            Editor Tampilan Front-End & CMS (Tanpa Koding)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ubah seluruh tulisan, foto slide banner, sambutan ketua umum, visi misi, statistik, dan kontak di halaman depan secara langsung.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-2.5 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#F5C400]/20 flex items-center gap-2 transform active:scale-95 transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Semua Perubahan</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-thin">
        {[
          { id: 'hero', label: '1. Beranda & Hero Slider', icon: Layers },
          { id: 'sambutan', label: '2. Sambutan Ketua Umum', icon: User },
          { id: 'profil', label: '3. Profil, Visi & Misi', icon: Heart },
          { id: 'pendaftaran', label: '4. Pendaftaran (GForm & Kontak)', icon: UserPlus },
          { id: 'kontak', label: '5. Kontak & Footer', icon: Phone },
          { id: 'seo', label: '6. SEO & Metadata', icon: Globe },
          { id: 'database', label: '7. Cadangan & Cloud Aiven', icon: Database },
          { id: 'sandi', label: '8. Kata Sandi Admin', icon: KeyRound }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/50 shadow-md ring-1 ring-[#F5C400]/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO BANNER, RUNNING TICKER & STATS */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <ImageIcon className="w-4 h-4" />
              Logo Resmi Website & Brand Identitas
            </h3>
            <p className="text-xs text-slate-400">
              Logo ini akan tampil di seluruh bilah header, footer, mobile drawer, dan panel admin. Anda dapat mengunggah berkas foto langsung ke database atau menggunakan link URL internet.
            </p>
            <div className="max-w-md">
              <ImageUploadInput
                value={formData.logoUrl}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                label="Logo Resmi MAPAKTI"
                hint="Mendukung format PNG transparan, JPG, WebP, atau SVG"
                aspectRatio="aspect-square"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <Sparkles className="w-4 h-4" />
              Headline & Teks Pengumuman Berjalan
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Headline Utama Hero Banner
                </label>
                <input
                  type="text"
                  value={formData.heroHeadline}
                  onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                  placeholder="Contoh: EKSPLORASI ALAM, KELOLA KELESTARIAN"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Sub-Headline (Keterangan di Bawah Judul Utama)
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubheadline}
                  onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Teks Berjalan Pengumuman (Running Ticker di Header Paling Atas)
                </label>
                <textarea
                  rows={2}
                  value={formData.announcementTicker}
                  onChange={(e) => setFormData({ ...formData, announcementTicker: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>
            </div>
          </div>

          {/* Hero Slides Editor with Image Upload */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
                  <ImageIcon className="w-4 h-4" />
                  Pengelola 3 Slide Banner Beranda (Teks & Upload Gambar)
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Setiap slide banner beranda dapat diganti tulisan dan fotonya menggunakan tombol upload gambar.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {formData.heroSlides.map((slide, idx) => (
                <div key={slide.id || idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#102A56] text-[#F5C400] text-[10px] font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span>Slide {idx + 1} — {slide.badge || 'Banner'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-3">
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Badge Kategori</label>
                        <input
                          type="text"
                          value={slide.badge}
                          onChange={(e) => handleSlideChange(idx, 'badge', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-[#F5C400] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Judul Slide</label>
                        <input
                          type="text"
                          value={slide.title}
                          onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white focus:border-[#F5C400] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-300 mb-1">Deskripsi Singkat Slide</label>
                        <textarea
                          rows={2}
                          value={slide.subtitle}
                          onChange={(e) => handleSlideChange(idx, 'subtitle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <ImageUploadInput
                        label={`Foto Gambar Slide ${idx + 1}`}
                        value={slide.imageUrl}
                        onChange={(url) => handleSlideChange(idx, 'imageUrl', url)}
                        helperText="Upload gambar beresolusi tinggi (disarankan format lanskap 16:9)."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Counter Strip */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <BarChart3 className="w-4 h-4" />
              Angka Statistik di Strip Beranda (Counter KPI)
            </h3>
            <p className="text-[11px] text-slate-400">
              Angka dan label yang tampil di kotak ringkasan beranda tepat di bawah hero slide banner.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block font-bold text-slate-300">Total Anggota & Kader</label>
                <input
                  type="text"
                  value={formData.stats.activeMembers}
                  onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, activeMembers: e.target.value } })}
                  placeholder="350+"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.stats.membersLabel}
                  onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, membersLabel: e.target.value } })}
                  placeholder="Kader Rimbawan"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-400 text-[11px]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block font-bold text-slate-300">Total Ekspedisi Sukses</label>
                <input
                  type="text"
                  value={formData.stats.expeditions}
                  onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, expeditions: e.target.value } })}
                  placeholder="48+"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.stats.expeditionsLabel}
                  onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, expeditionsLabel: e.target.value } })}
                  placeholder="Ekspedisi Sukses"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-400 text-[11px]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block font-bold text-slate-300">Total Rekor Prestasi</label>
                <input
                  type="text"
                  value={formData.stats.achievements}
                  onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, achievements: e.target.value } })}
                  placeholder="18"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
                <input
                  type="text"
                  value={formData.stats.achievementsLabel}
                  onChange={(e) => setFormData({ ...formData, stats: { ...formData.stats, achievementsLabel: e.target.value } })}
                  placeholder="Rekor Prestasi"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-slate-400 text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SAMBUTAN KETUA UMUM */}
      {activeTab === 'sambutan' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <User className="w-4 h-4" />
              Konten Sambutan Ketua Umum di Halaman Depan
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Kelola teks pidato sambutan, biodata pimpinan, dan upload foto resmi Ketua Umum.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            {/* Left Col: Photo Upload */}
            <div className="lg:col-span-5 space-y-3">
              <ImageUploadInput
                label="Foto Resmi Ketua Umum"
                value={formData.chairmanPhotoUrl}
                onChange={(url) => setFormData({ ...formData, chairmanPhotoUrl: url })}
                helperText="Upload foto formal potret/portrait Ketua Umum."
              />
            </div>

            {/* Right Col: Details */}
            <div className="lg:col-span-7 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nama Lengkap Ketua Umum</label>
                  <input
                    type="text"
                    value={formData.chairmanName}
                    onChange={(e) => setFormData({ ...formData, chairmanName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nomor Induk Anggota (NIA)</label>
                  <input
                    type="text"
                    value={formData.chairmanNia}
                    onChange={(e) => setFormData({ ...formData, chairmanNia: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Jabatan / Masa Bakti</label>
                <input
                  type="text"
                  value={formData.chairmanTitle}
                  onChange={(e) => setFormData({ ...formData, chairmanTitle: e.target.value })}
                  placeholder="Contoh: Ketua Umum MAPAKTI Masa Bakti 2024/2025"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul / Headline Sambutan</label>
                <input
                  type="text"
                  value={formData.chairmanHeadline}
                  onChange={(e) => setFormData({ ...formData, chairmanHeadline: e.target.value })}
                  placeholder="Contoh: Menempa Ksatria Rimba, Mengabdi untuk Kelestarian Semesta"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Isi Lengkap Teks Sambutan</label>
                <textarea
                  rows={6}
                  value={formData.chairmanGreeting}
                  onChange={(e) => setFormData({ ...formData, chairmanGreeting: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white leading-relaxed focus:outline-none focus:border-[#F5C400]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PROFIL, VISI, MISI & KODE ETIK */}
      {activeTab === 'profil' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <Heart className="w-4 h-4" />
              Sejarah, Visi, Misi & Kode Etik Pecinta Alam
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Konten yang tampil pada halaman "Profil Organisasi" dan bagian Kode Etik.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tahun Pendirian Organisasi</label>
                <input
                  type="text"
                  value={formData.establishedYear}
                  onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Kampus Basis / Naungan</label>
                <input
                  type="text"
                  value={formData.baseCampus}
                  onChange={(e) => setFormData({ ...formData, baseCampus: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Sejarah Lengkap Organisasi</label>
              <textarea
                rows={5}
                value={profileData.history}
                onChange={(e) => setProfileData({ ...profileData, history: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white leading-relaxed focus:border-[#F5C400] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Visi Organisasi</label>
              <textarea
                rows={3}
                value={profileData.vision}
                onChange={(e) => setProfileData({ ...profileData, vision: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white leading-relaxed focus:border-[#F5C400] focus:outline-none"
              />
            </div>

            {/* Missions List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300">Daftar Misi Organisasi</label>
                <button
                  type="button"
                  onClick={handleAddMission}
                  className="px-3 py-1 rounded-lg bg-[#102A56] hover:bg-[#163872] text-[#F5C400] text-[11px] font-bold border border-[#F5C400]/40 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Tambah Butir Misi</span>
                </button>
              </div>

              <div className="space-y-2">
                {profileData.missions.map((misi, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-[#F5C400] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={misi}
                      onChange={(e) => handleMissionChange(idx, e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:border-[#F5C400] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveMission(idx)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PENDAFTARAN (GFORM & CONTACT PERSON) */}
      {activeTab === 'pendaftaran' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
                <UserPlus className="w-4 h-4" />
                Pengaturan Pendaftaran Calon Anggota (Google Form & Narahubung)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pendaftaran calon anggota dialihkan ke Google Form & WhatsApp Narahubung agar tidak masuk ke database.
              </p>
            </div>

            {/* Toggle Status Buka/Tutup */}
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 self-start">
              <span className="text-xs font-bold text-slate-300">Status Pendaftaran:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.registrationIsOpen}
                  onChange={(e) => setFormData({ ...formData, registrationIsOpen: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5C400]"></div>
                <span className="ml-2 text-xs font-bold text-[#F5C400]">
                  {formData.registrationIsOpen ? 'DIBUKA' : 'DITUTUP'}
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-5 text-xs">
            {/* Google Form Link */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block font-bold text-slate-200 uppercase tracking-wider">
                  Link / URL Google Form Resmi *
                </label>
                {formData.registrationGformUrl && (
                  <a
                    href={formData.registrationGformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F5C400] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>Uji Link Google Form</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                value={formData.registrationGformUrl}
                onChange={(e) => setFormData({ ...formData, registrationGformUrl: e.target.value })}
                placeholder="https://forms.gle/..."
                className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3.5 py-2.5 text-white font-mono"
              />
              <p className="text-[11px] text-slate-500">
                Pendaftar yang mengeklik tombol di website akan langsung diarahkan ke tautan Google Form ini.
              </p>
            </div>

            {/* Judul & Deskripsi Pendaftaran */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul Halaman Pendaftaran</label>
                <input
                  type="text"
                  value={formData.registrationTitle}
                  onChange={(e) => setFormData({ ...formData, registrationTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Subjudul Pengantar</label>
                <input
                  type="text"
                  value={formData.registrationSubtitle}
                  onChange={(e) => setFormData({ ...formData, registrationSubtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Petunjuk Singkat di Bawah Form</label>
              <textarea
                rows={2}
                value={formData.registrationGuideText}
                onChange={(e) => setFormData({ ...formData, registrationGuideText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white"
              />
            </div>

            {/* Kelola Narahubung (Contact Person) */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#F5C400]" />
                  Daftar Narahubung (Contact Person)
                </span>
                <button
                  onClick={handleAddRegContact}
                  className="px-3 py-1 bg-[#102A56] text-[#F5C400] rounded-xl font-bold border border-[#F5C400]/30 hover:bg-[#163872] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Narahubung</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.registrationContactPersons?.map((cp, idx) => (
                  <div key={cp.id || idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#F5C400]">Narahubung #{idx + 1}</span>
                      <button
                        onClick={() => handleRemoveRegContact(idx)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold mb-1">Nama</label>
                        <input
                          type="text"
                          value={cp.name}
                          onChange={(e) => handleRegContactChange(idx, 'name', e.target.value)}
                          placeholder="Bayu Dirgantara"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold mb-1">Jabatan / Divisi</label>
                        <input
                          type="text"
                          value={cp.role}
                          onChange={(e) => handleRegContactChange(idx, 'role', e.target.value)}
                          placeholder="Ketua Umum"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold mb-1">No. HP / Telepon</label>
                        <input
                          type="text"
                          value={cp.phone}
                          onChange={(e) => handleRegContactChange(idx, 'phone', e.target.value)}
                          placeholder="085876543210"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold mb-1">WhatsApp (62...)</label>
                        <input
                          type="text"
                          value={cp.whatsapp}
                          onChange={(e) => handleRegContactChange(idx, 'whatsapp', e.target.value)}
                          placeholder="6285876543210"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kelola Persyaratan */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5C400]" />
                  Poin Persyaratan Calon Anggota
                </span>
                <button
                  onClick={handleAddRegRequirement}
                  className="px-3 py-1 bg-[#102A56] text-[#F5C400] rounded-xl font-bold border border-[#F5C400]/30 hover:bg-[#163872] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Poin</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.registrationRequirements?.map((req, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 text-[#F5C400] font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleRegRequirementChange(i, e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white text-xs"
                    />
                    <button
                      onClick={() => handleRemoveRegRequirement(i)}
                      className="text-rose-400 hover:text-rose-300 p-1.5 hover:bg-rose-500/10 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KONTAK, MEDSOS & FOOTER */}
      {activeTab === 'kontak' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <Phone className="w-4 h-4" />
              Kontak Sekretariat, Jam Buka, Media Sosial & Footer
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Informasi ini tampil di halaman Kontak, kartu footer, dan tombol WhatsApp publik.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nomor Telepon Hotline</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 858-7654-3210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nomor WhatsApp (Angka saja dengan 62)</label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
                  placeholder="6285876543210"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Alamat Email Resmi</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sekretariat@mapakti.or.id"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Jam Operasional Sekretariat</label>
                <input
                  type="text"
                  value={formData.operationalHours}
                  onChange={(e) => setFormData({ ...formData, operationalHours: e.target.value })}
                  placeholder="Senin - Sabtu: 10:00 - 21:00 WIB"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Alamat Lengkap Sekretariat</label>
              <textarea
                rows={2}
                value={formData.secretariatAddress}
                onChange={(e) => setFormData({ ...formData, secretariatAddress: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-[#F5C400] focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-3">
              <label className="block font-bold text-white uppercase tracking-wider text-[11px] text-[#F5C400]">
                Link Media Sosial Resmi
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="block font-semibold text-slate-400 mb-1">Instagram URL</span>
                  <input
                    type="text"
                    value={formData.socialMedia.instagram}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <span className="block font-semibold text-slate-400 mb-1">YouTube URL</span>
                  <input
                    type="text"
                    value={formData.socialMedia.youtube}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, youtube: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <span className="block font-semibold text-slate-400 mb-1">TikTok URL</span>
                  <input
                    type="text"
                    value={formData.socialMedia.tiktok}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, tiktok: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <span className="block font-semibold text-slate-400 mb-1">Facebook URL</span>
                  <input
                    type="text"
                    value={formData.socialMedia.facebook}
                    onChange={(e) => setFormData({
                      ...formData,
                      socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block font-semibold text-slate-300 mb-1">Teks Hak Cipta Footer</label>
              <input
                type="text"
                value={formData.footerCopyright}
                onChange={(e) => setFormData({ ...formData, footerCopyright: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SEO & METADATA */}
      {activeTab === 'seo' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <Globe className="w-4 h-4" />
              Optimasi Mesin Pencari (SEO) & Judul Browser
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Pengaturan ini mengontrol bagaimana website MAPAKTI tampil di hasil pencarian Google dan saat dibagikan ke media sosial.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Title (Judul Tab Browser)</label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Description (Deskripsi Cuplikan Google)</label>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-[#F5C400] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta Keywords (Kata Kunci)</label>
              <input
                type="text"
                value={formData.metaKeywords}
                onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:border-[#F5C400] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DATABASE AIVEN & BACKUP */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          {/* Aiven Cloud Status Card */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
              <Database className="w-4 h-4" />
              Status Sinkronisasi Cloud Aiven MySQL
            </h3>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span>Aiven MySQL Cluster Active</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Host: <code className="text-slate-300">mysql-35bbd811-mapakti-website.c.aivencloud.com:27773</code>
                  </div>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                Online & Tersinkronisasi
              </div>
            </div>
          </div>

          {/* Backup & Restore Utility */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 text-[#F5C400]">
                <Download className="w-4 h-4" />
                Pencadangan & Pemulihan Data (Backup & Restore)
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Unduh salinan cadangan seluruh data website dalam satu file JSON untuk keamanan arsip mandiri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-white block">1. Unduh Cadangan Lengkap</span>
                <p className="text-slate-400 text-[11px]">
                  Simpan seluruh isi database anggota, kegiatan, berita, slide, dan pengaturan ke laptop Anda.
                </p>
                <button
                  type="button"
                  onClick={exportBackupJson}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-white hover:text-[#F5C400] font-bold border border-slate-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-white block">2. Pulihkan dari File Cadangan</span>
                <p className="text-slate-400 text-[11px]">
                  Unggah file cadangan JSON untuk mengembalikan kondisi data website.
                </p>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="text-[11px] text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700"
                />
                {restoreFileText && (
                  <button
                    type="button"
                    onClick={handleExecuteRestore}
                    className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors"
                  >
                    Terapkan Pemulihan Data
                  </button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <div className="text-[11px] text-slate-500">
                Opsi darurat untuk mengembalikan seluruh konten website ke data contoh bawaan MAPAKTI.
              </div>
              <button
                type="button"
                onClick={resetToFactoryDefaults}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-950/80 text-slate-400 hover:text-rose-400 font-bold text-xs border border-slate-800 hover:border-rose-500/40 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset ke Data Bawaan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: PENGATURAN KATA SANDI ADMIN */}
      {activeTab === 'sandi' && (
        <div className="pt-2">
          <AdminPasswordReset />
        </div>
      )}

      {/* Floating / Bottom Master Save Action Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Perubahan yang disimpan akan otomatis aktif di halaman publik dan tersimpan di database Aiven MySQL.</span>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-6 py-2.5 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#F5C400]/20 flex items-center gap-2 transform active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Semua Perubahan</span>
        </button>
      </div>
    </div>
  );
};
