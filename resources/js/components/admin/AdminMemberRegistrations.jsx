import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  UserPlus,
  ExternalLink,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageCircle,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Layers,
  FileSpreadsheet
} from 'lucide-react';

export const AdminMemberRegistrations = () => {
  const {
    settings,
    setSettings,
    memberRegistrations,
    setMemberRegistrations,
    addAuditLog,
    addToast
  } = useData();

  // Local Form State
  const [formData, setFormData] = useState({
    registrationIsOpen: settings.registrationIsOpen !== false,
    registrationTitle: settings.registrationTitle || 'Pendaftaran Calon Anggota & DIKLATSAR MAPAKTI',
    registrationSubtitle:
      settings.registrationSubtitle ||
      'Terbuka bagi seluruh mahasiswa aktif Universitas Pancasakti Tegal yang bertekad menempa diri di kawah candradimuka pecinta alam.',
    registrationGformUrl: settings.registrationGformUrl || 'https://forms.gle/mapakti-diklatsar-reg',
    registrationGuideText:
      settings.registrationGuideText ||
      'Silakan isi formulir online resmi melalui Google Form berikut ini, kemudian konfirmasikan ke salah satu kontak narahubung (Contact Person) panitia penerimaan.',
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
          ]
  });

  const [saving, setSaving] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  // Contact Person Management
  const handleAddContact = () => {
    const newCp = {
      id: `cp-${Date.now()}`,
      name: '',
      role: 'Panitia Pendaftaran',
      phone: '',
      whatsapp: ''
    };
    setFormData((prev) => ({
      ...prev,
      registrationContactPersons: [...prev.registrationContactPersons, newCp]
    }));
  };

  const handleUpdateContact = (index, field, value) => {
    const updated = [...formData.registrationContactPersons];
    updated[index] = { ...updated[index], [field]: value };
    // Auto-sync whatsapp if user fills phone
    if (field === 'phone' && !updated[index].whatsapp) {
      updated[index].whatsapp = value.replace(/[^0-9]/g, '');
    }
    setFormData((prev) => ({ ...prev, registrationContactPersons: updated }));
  };

  const handleRemoveContact = (index) => {
    setFormData((prev) => ({
      ...prev,
      registrationContactPersons: prev.registrationContactPersons.filter((_, i) => i !== index)
    }));
  };

  // Requirement Points Management
  const handleAddRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      registrationRequirements: [...prev.registrationRequirements, '']
    }));
  };

  const handleUpdateRequirement = (index, value) => {
    const updated = [...formData.registrationRequirements];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, registrationRequirements: updated }));
  };

  const handleRemoveRequirement = (index) => {
    setFormData((prev) => ({
      ...prev,
      registrationRequirements: prev.registrationRequirements.filter((_, i) => i !== index)
    }));
  };

  // Save Settings
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSettings((prev) => ({
        ...prev,
        ...formData
      }));
      addAuditLog('UPDATE', 'Pengaturan Pendaftaran', 'Memperbarui tautan Google Form dan Narahubung');
      if (addToast) {
        addToast('Pengaturan pendaftaran Google Form & Narahubung berhasil disimpan!', 'success');
      }
      setSaving(false);
    }, 400);
  };

  // Clear legacy archive in localStorage if requested
  const handleClearArchive = () => {
    if (window.confirm('Hapus seluruh arsip data pendaftaran lama di penyimpanan lokal?')) {
      setMemberRegistrations([]);
      addAuditLog('DELETE', 'Pendaftaran', 'Menghapus arsip pendaftaran lama dari database');
      if (addToast) addToast('Arsip pendaftaran lama telah dibersihkan.', 'info');
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400]/10 text-[#F5C400] text-xs font-bold border border-[#F5C400]/20 mb-2">
            <UserPlus className="w-3.5 h-3.5" /> Pendaftaran Eksternal (Google Form)
          </div>
          <h2 className="text-2xl font-black text-white">Pengaturan Pendaftaran Calon Anggota</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Pendaftaran calon anggota diarahkan langsung ke Google Form resmi dan WhatsApp Narahubung, sehingga data tidak disimpan di database website agar sistem tetap ringan dan aman.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-xl shadow-[#F5C400]/20 flex items-center justify-center gap-2 transition-transform transform active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
        </button>
      </div>

      {/* Status Banner */}
      <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${
              formData.registrationIsOpen
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Status Pendaftaran Publik</div>
            <div className="text-xs text-slate-400">
              {formData.registrationIsOpen
                ? 'Pendaftaran sedang DIBUKA untuk umum di front-end'
                : 'Pendaftaran sedang DITUTUP sementara'}
            </div>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.registrationIsOpen}
            onChange={(e) => setFormData({ ...formData, registrationIsOpen: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#F5C400]"></div>
          <span className="ml-3 text-xs font-bold text-white">
            {formData.registrationIsOpen ? 'DIBUKA' : 'DITUTUP'}
          </span>
        </label>
      </div>

      {/* Main Grid: Google Form Link & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Google Form URL & Information Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-[#F5C400]" />
                <span>Tautan Google Form Resmi</span>
              </h3>
              <a
                href={formData.registrationGformUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#F5C400] hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Uji Tautan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  URL / Tautan Google Form *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.registrationGformUrl}
                    onChange={(e) => setFormData({ ...formData, registrationGformUrl: e.target.value })}
                    placeholder="https://forms.gle/..."
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                  <a
                    href={formData.registrationGformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1 border border-slate-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Buka</span>
                  </a>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Masukkan link share Google Form Anda (bisa link pendek https://forms.gle/... atau tautan penuh docs.google.com).
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Judul Halaman Pendaftaran
                </label>
                <input
                  type="text"
                  value={formData.registrationTitle}
                  onChange={(e) => setFormData({ ...formData, registrationTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Subjudul / Pengantar
                </label>
                <textarea
                  rows={2}
                  value={formData.registrationSubtitle}
                  onChange={(e) => setFormData({ ...formData, registrationSubtitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl p-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Petunjuk Pengisian Form
                </label>
                <textarea
                  rows={3}
                  value={formData.registrationGuideText}
                  onChange={(e) => setFormData({ ...formData, registrationGuideText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl p-3 text-sm text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Persyaratan Pendaftaran */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F5C400]" />
                <span>Poin-Poin Persyaratan Calon Anggota</span>
              </h3>
              <button
                onClick={handleAddRequirement}
                className="text-xs text-[#F5C400] hover:underline flex items-center gap-1 font-semibold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Poin</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.registrationRequirements.map((req, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-950 text-[#F5C400] text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleUpdateRequirement(i, e.target.value)}
                    placeholder="Tulis persyaratan..."
                    className="flex-1 bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={() => handleRemoveRequirement(i)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Person (Narahubung) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#F5C400]" />
                <span>Narahubung (Contact Person)</span>
              </h3>
              <button
                onClick={handleAddContact}
                className="px-3 py-1.5 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] text-xs font-bold border border-[#F5C400]/30 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kontak</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Narahubung ditampilkan di front-end agar calon anggota dapat konfirmasi atau berkonsultasi via WhatsApp / telepon.
            </p>

            <div className="space-y-4">
              {formData.registrationContactPersons.map((cp, idx) => (
                <div
                  key={cp.id || idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F5C400]">Kontak #{idx + 1}</span>
                    <button
                      onClick={() => handleRemoveContact(idx)}
                      className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Nama Narahubung
                      </label>
                      <input
                        type="text"
                        value={cp.name}
                        onChange={(e) => handleUpdateContact(idx, 'name', e.target.value)}
                        placeholder="Contoh: Bayu Dirgantara"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        Jabatan / Posisi
                      </label>
                      <input
                        type="text"
                        value={cp.role}
                        onChange={(e) => handleUpdateContact(idx, 'role', e.target.value)}
                        placeholder="Contoh: Ketua Umum / Divisi Diklat"
                        className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          No. Telepon / HP
                        </label>
                        <input
                          type="text"
                          value={cp.phone}
                          onChange={(e) => handleUpdateContact(idx, 'phone', e.target.value)}
                          placeholder="085876543210"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                          WhatsApp (62...)
                        </label>
                        <input
                          type="text"
                          value={cp.whatsapp}
                          onChange={(e) => handleUpdateContact(idx, 'whatsapp', e.target.value)}
                          placeholder="6285876543210"
                          className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arsip Data Lama (Optional) */}
          {memberRegistrations.length > 0 && (
            <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-300">
                  Arsip Formulir Lama: <span className="text-white">{memberRegistrations.length} data</span>
                </div>
                <button
                  onClick={() => setShowArchive(!showArchive)}
                  className="text-xs text-[#F5C400] hover:underline"
                >
                  {showArchive ? 'Sembunyikan' : 'Tampilkan'}
                </button>
              </div>

              {showArchive && (
                <div className="space-y-3 pt-2">
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {memberRegistrations.map((r) => (
                      <div key={r.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                        <div className="font-bold text-white">{r.fullName} ({r.nim})</div>
                        <div className="text-slate-400">{r.faculty} • {r.phone}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleClearArchive}
                    className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs border border-rose-500/20 flex items-center justify-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Bersih Arsip Lama</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
