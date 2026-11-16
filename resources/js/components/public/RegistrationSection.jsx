import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { UserPlus, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, Info, Heart } from 'lucide-react';

export const RegistrationSection = () => {
  const { registerNewMember } = useData();

  const [formData, setFormData] = useState({
    fullName: '',
    nim: '',
    faculty: '',
    phone: '',
    reason: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const faculties = [
    'Fakultas Teknik (FT)',
    'Fakultas Keguruan dan Ilmu Pendidikan (FKIP)',
    'Fakultas Ekonomi dan Bisnis (FEB)',
    'Fakultas Hukum (FH)',
    'Fakultas Ilmu Sosial dan Ilmu Politik (FISIP)',
    'Fakultas Perikanan dan Ilmu Kelautan (FPIK)',
    'Program Pascasarjana'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      registerNewMember(formData);
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: '',
        nim: '',
        faculty: '',
        phone: '',
        reason: ''
      });
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <UserPlus className="w-3.5 h-3.5" /> Formulir Calon Anggota
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Pendaftaran Calon Anggota MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Terbuka bagi seluruh mahasiswa aktif Universitas Pancasakti Tegal yang bertekad menempa diri di kawah candradimuka pecinta alam.
          </p>
        </div>
      </div>

      {/* Tahapan & Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h4 className="text-sm font-bold text-white">Isi Formulir Online</h4>
          <p className="text-xs text-slate-400">
            Lengkapi 5 data wajib di formulir bawah ini dengan data yang benar dan aktif.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h4 className="text-sm font-bold text-white">Verifikasi Pengurus</h4>
          <p className="text-xs text-slate-400">
            Pengurus bidang kaderisasi akan memverifikasi data dan menghubungi nomor WhatsApp Anda.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h4 className="text-sm font-bold text-white">DIKLATSAR MAPAKTI</h4>
          <p className="text-xs text-slate-400">
            Mengikuti pembekalan materi ruang di kampus dan aplikasi medan lapangan di alam terbuka.
          </p>
        </div>
      </div>

      {/* Main Registration Form Container */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-6">
        {submitted ? (
          <div className="p-8 rounded-2xl bg-slate-950 border border-emerald-500/60 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Pendaftaran Berhasil Dikirim!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-2 leading-relaxed">
                Terima kasih atas semangatmu. Data formulir pendaftaran calon anggota telah tersimpan di sistem administrator MAPAKTI UPS Tegal.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto">
              Panitia akan menghubungi nomor WhatsApp yang Anda daftarkan untuk jadwal pengarahan awal (Technical Meeting).
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider"
            >
              Kirim Formulir Lain
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-xl font-black text-white">Formulir Pendaftaran Calon Anggota</h3>
              <p className="text-xs text-slate-400 mt-1">
                Seluruh kolom bertanda bintang (*) wajib diisi lengkap sesuai identitas kemahasiswaan UPS Tegal.
              </p>
            </div>

            {/* Field 1: Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Nama Lengkap *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Masukkan nama lengkap sesuai KTM"
                className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Field 2 & 3: NIM & Fakultas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  2. NIM (Nomor Induk Mahasiswa) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  placeholder="Contoh: 642420008"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  3. Fakultas di UPS Tegal *
                </label>
                <select
                  required
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="" disabled>Pilih Fakultas Anda</option>
                  {faculties.map((f, i) => (
                    <option key={i} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 4: Nomor HP */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                4. Nomor HP / WhatsApp Aktif *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Contoh: 085812345678"
                className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Field 5: Alasan Bergabung */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                5. Alasan Bergabung dengan MAPAKTI *
              </label>
              <textarea
                required
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Jelaskan motivasi Anda bergabung, minat divisi (Hutan Gunung, Rock Climbing, Konservasi Sumber Daya Alam), atau harapan Anda di MAPAKTI..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Notice FR-14 & Scope 5.2 */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#F5C400] flex-shrink-0 mt-0.5" />
              <span>
                Sesuai PRD v1.0, calon anggota tidak perlu membuat akun login. Data disimpan secara aman dan seleksi dilakukan secara manual langsung oleh tim pengurus MAPAKTI.
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-2xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-sm uppercase tracking-wider shadow-xl shadow-[#F5C400]/25 transition-all transform active:scale-98 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>{submitting ? 'Memproses Pendaftaran...' : 'Kirim Pendaftaran Calon Anggota'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
