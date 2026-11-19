import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Save,
  CheckCircle2,
  Info,
  ExternalLink
} from 'lucide-react';
import { Instagram, Youtube, Facebook } from '../common/SocialIcons';

export const AdminContact = () => {
  const { settings, setSettings, addAuditLog, addToast } = useData();

  const [formData, setFormData] = useState({
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
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setSettings((prev) => ({
      ...prev,
      ...formData
    }));

    addAuditLog('UPDATE', 'Kontak & Sekretariat', 'Memperbarui informasi kontak, alamat, hotline, dan media sosial');
    addToast({
      type: 'success',
      title: 'Kontak Diperbarui',
      message: 'Informasi kontak sekretariat berhasil disimpan ke database.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Menu Kontak & Sekretariat
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola alamat fisik sekretariat, nomor hotline WhatsApp, email resmi, jam operasional, dan akun media sosial.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 self-start sm:self-auto transform active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Kontak</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Alamat & Operasional */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4" /> Lokasi & Alamat Sekretariat
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Alamat Lengkap Sekretariat Kampus
            </label>
            <textarea
              rows={3}
              value={formData.secretariatAddress}
              onChange={(e) => setFormData({ ...formData, secretariatAddress: e.target.value })}
              placeholder="Contoh: Gedung PKM Lt. 1, Universitas Pancasakti Tegal..."
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3.5 text-xs text-white focus:outline-none focus:border-[#F5C400]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F5C400]" />
                Jam Piket / Operasional
              </label>
              <input
                type="text"
                value={formData.operationalHours}
                onChange={(e) => setFormData({ ...formData, operationalHours: e.target.value })}
                placeholder="Senin - Sabtu: 10:00 - 21:00 WIB"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#F5C400]" />
                Email Resmi Organisasi
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sekretariat@mapakti.or.id"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>
        </div>

        {/* Telepon & WhatsApp Hotline */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
            <Phone className="w-4 h-4" /> Kanal Komunikasi Hotline
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nomor Telepon Tampilan
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+62 858-7654-3210"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Nomor WhatsApp (Format: 628xxxx)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="6285876543210"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>
        </div>

        {/* Tautan Media Sosial */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-[#F5C400] text-xs font-bold uppercase tracking-wider border-b border-slate-800 pb-3">
            <Globe className="w-4 h-4" /> Tautan Media Sosial Resmi
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Instagram className="w-4 h-4 text-[#F5C400]" />
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.socialMedia.instagram}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, instagram: e.target.value }
                  })
                }
                placeholder="https://instagram.com/mapakti_upstegal"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-[#F5C400]" />
                YouTube Channel URL
              </label>
              <input
                type="url"
                value={formData.socialMedia.youtube}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, youtube: e.target.value }
                  })
                }
                placeholder="https://youtube.com/@mapakti_official"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Facebook className="w-4 h-4 text-[#F5C400]" />
                Facebook Page URL
              </label>
              <input
                type="url"
                value={formData.socialMedia.facebook}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, facebook: e.target.value }
                  })
                }
                placeholder="https://facebook.com/mapakti.upstegal"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#F5C400]" />
                TikTok URL
              </label>
              <input
                type="url"
                value={formData.socialMedia.tiktok}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, tiktok: e.target.value }
                  })
                }
                placeholder="https://tiktok.com/@mapakti_upstegal"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="p-4 rounded-2xl bg-[#0b1424] border border-[#F5C400]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Info className="w-4 h-4 text-[#F5C400]" />
            <span>Perubahan kontak langsung sinkron ke halaman depan dan footer website.</span>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Kontak</span>
          </button>
        </div>
      </form>
    </div>
  );
};
