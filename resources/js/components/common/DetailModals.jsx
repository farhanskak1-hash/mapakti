import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { 
  X, 
  Calendar, 
  MapPin, 
  User, 
  Award, 
  Tag, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  Mail, 
  Users, 
  Camera, 
  Clock, 
  DollarSign, 
  Sparkles,
  Share2,
  ZoomIn
} from 'lucide-react';

export const DetailModals = () => {
  const {
    selectedNews, setSelectedNews,
    selectedActivity, setSelectedActivity,
    selectedMember, setSelectedMember,
    selectedDiklatsar, setSelectedDiklatsar,
    lightboxImage, setLightboxImage,
    registerForActivity
  } = useData();

  // Activity Registration Form State (FR-08)
  const [actRegForm, setActRegForm] = useState({
    participantName: '',
    identityNumber: '',
    institution: '',
    phone: '',
    email: ''
  });
  const [actRegSuccess, setActRegSuccess] = useState(false);

  const handleActRegSubmit = (e) => {
    e.preventDefault();
    if (!selectedActivity) return;
    const ok = registerForActivity(selectedActivity.id, actRegForm);
    if (ok) {
      setActRegSuccess(true);
      setActRegForm({
        participantName: '',
        identityNumber: '',
        institution: '',
        phone: '',
        email: ''
      });
      setTimeout(() => setActRegSuccess(false), 4000);
    }
  };

  return (
    <>
      {/* 1. NEWS ARTICLE READER MODAL (FR-09) */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-y-auto text-slate-100">
            {/* Sticky Header with Close */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 uppercase tracking-wider">
                {selectedNews.category}
              </span>
              <button
                onClick={() => setSelectedNews(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cover Image */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
              <img
                src={selectedNews.coverImageUrl}
                alt={selectedNews.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F5C400]" />
                    {selectedNews.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#F5C400]" />
                    {selectedNews.author}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedNews.title}
                </h2>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-medium text-slate-300 italic border-l-4 border-l-[#F5C400]">
                "{selectedNews.summary}"
              </div>

              <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </div>

              {/* Tags */}
              {selectedNews.tags && selectedNews.tags.length > 0 && (
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-slate-500" />
                  {selectedNews.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. ACTIVITY & EXPEDITION DETAIL MODAL + FORM PENDAFTARAN (FR-07, FR-08) */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-y-auto text-slate-100">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                  {selectedActivity.type}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  selectedActivity.status === 'Akan Datang'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/60'
                    : selectedActivity.status === 'Sedang Berlangsung'
                    ? 'bg-amber-950 text-amber-300 border border-amber-700/60 animate-pulse'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {selectedActivity.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Info */}
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {selectedActivity.name}
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#F5C400]" />
                    <span>Jadwal: {selectedActivity.startDate} s/d {selectedActivity.endDate}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-[#F5C400]" />
                    <span>Lokasi: {selectedActivity.location}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                    <User className="w-4 h-4 text-[#F5C400]" />
                    <span>PIC: {selectedActivity.pic}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5">
                    <DollarSign className="w-4 h-4 text-[#F5C400]" />
                    <span>Estimasi Anggaran: {selectedActivity.budget}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Deskripsi Kegiatan</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {selectedActivity.description}
                </p>
              </div>

              {/* Committee & Reports */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#F5C400]" />
                    Susunan Kepanitiaan
                  </h5>
                  <p className="text-slate-400">{selectedActivity.committeeSummary}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <h5 className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#F5C400]" />
                    Laporan / Catatan Lapangan
                  </h5>
                  <p className="text-slate-400">{selectedActivity.reportSummary}</p>
                </div>
              </div>

              {/* Documentation Images Preview */}
              {selectedActivity.documentationImages && selectedActivity.documentationImages.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#F5C400]" />
                    Dokumentasi Foto
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedActivity.documentationImages.map((img, i) => (
                      <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black">
                        <img src={img} alt="Dokumentasi" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REGISTRATION SECTION (FR-08) */}
              <div className="pt-6 border-t border-slate-800">
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#102A56]/60 to-slate-950 border border-[#F5C400]/40">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#F5C400]" />
                        Pendaftaran Peserta Kegiatan
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Kuota: {selectedActivity.registeredCount || 0} / {selectedActivity.maxParticipants || 'Tak Terbatas'} Peserta Terdaftar
                      </p>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      selectedActivity.isRegistrationOpen
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                    }`}>
                      {selectedActivity.isRegistrationOpen ? 'Pendaftaran Dibuka' : 'Pendaftaran Ditutup'}
                    </span>
                  </div>

                  {selectedActivity.isRegistrationOpen ? (
                    <div>
                      {actRegSuccess ? (
                        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Pendaftaran Berhasil Terkirim!</span>
                            <p className="mt-0.5 text-emerald-300">Data Anda telah masuk ke sistem panitia. Sampai jumpa di lokasi kegiatan.</p>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleActRegSubmit} className="space-y-3 mt-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                                Nama Lengkap Peserta *
                              </label>
                              <input
                                type="text"
                                required
                                value={actRegForm.participantName}
                                onChange={(e) => setActRegForm({ ...actRegForm, participantName: e.target.value })}
                                placeholder="Contoh: Budi Santoso"
                                className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                                Nomor Identitas (NIM / NIK) *
                              </label>
                              <input
                                type="text"
                                required
                                value={actRegForm.identityNumber}
                                onChange={(e) => setActRegForm({ ...actRegForm, identityNumber: e.target.value })}
                                placeholder="Contoh: 642210088"
                                className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                                Fakultas / Instansi *
                              </label>
                              <input
                                type="text"
                                required
                                value={actRegForm.institution}
                                onChange={(e) => setActRegForm({ ...actRegForm, institution: e.target.value })}
                                placeholder="Contoh: Fakultas Teknik UPS"
                                className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                                No. WhatsApp Aktif *
                              </label>
                              <input
                                type="tel"
                                required
                                value={actRegForm.phone}
                                onChange={(e) => setActRegForm({ ...actRegForm, phone: e.target.value })}
                                placeholder="Contoh: 08123456789"
                                className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                                Alamat Email *
                              </label>
                              <input
                                type="email"
                                required
                                value={actRegForm.email}
                                onChange={(e) => setActRegForm({ ...actRegForm, email: e.target.value })}
                                placeholder="nama@email.com"
                                className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Kirim Pendaftaran Peserta</span>
                          </button>
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>
                        Pendaftaran saat ini sedang ditutup oleh administrator karena kuota telah terpenuhi atau batas waktu registrasi telah berakhir.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PUBLIC MEMBER PROFILE MODAL (FR-04) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#F5C400] shadow-xl">
                <img
                  src={selectedMember.photoUrl}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                  {selectedMember.membershipStatus}
                </span>
                <h3 className="text-xl font-black text-white mt-2">{selectedMember.name}</h3>
                <p className="text-xs font-mono text-[#F5C400] mt-0.5">NIA: {selectedMember.nia}</p>
              </div>

              <div className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2.5 text-xs text-slate-300">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Angkatan Diksar</span>
                  <span className="font-semibold text-white">{selectedMember.generation}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Fakultas</span>
                  <span className="font-semibold text-white">{selectedMember.faculty}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-500">Spesialisasi Divisi</span>
                  <span className="font-semibold text-[#F5C400]">{selectedMember.specializationDivision}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500">Rekam Jejak</span>
                  <span className="font-semibold text-slate-200 text-right">{selectedMember.achievements}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * Kontak pribadi anggota dirahasiakan sesuai ketentuan privasi data organisasi.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. DIKLATSAR BATCH HISTORY MODAL (FR-11) */}
      {selectedDiklatsar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDiklatsar(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-xl text-xs font-black bg-[#F5C400] text-[#102A56]">
                  DIKSAR {selectedDiklatsar.batchNumber}
                </span>
                <div>
                  <h3 className="text-xl font-black text-white">{selectedDiklatsar.batchName}</h3>
                  <p className="text-xs text-slate-400">Tahun Kelulusan: {selectedDiklatsar.year}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Lokasi Lapangan:</span>
                  <span className="font-bold text-white mt-0.5 block">{selectedDiklatsar.location}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Kader Lulus:</span>
                  <span className="font-bold text-[#F5C400] mt-0.5 block">{selectedDiklatsar.graduatedCount} Rimbawan</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Catatan Sejarah & Pengembaraan
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  {selectedDiklatsar.historyNotes}
                </p>
              </div>

              {selectedDiklatsar.photos && selectedDiklatsar.photos.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#F5C400]" />
                      Galeri Kenangan Angkatan
                    </h4>
                    <span className="text-[11px] text-slate-400 font-medium bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700/50">
                      {selectedDiklatsar.photos.length} Foto Tersimpan
                    </span>
                  </div>
                  <div className={`grid gap-3 ${selectedDiklatsar.photos.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'}`}>
                    {selectedDiklatsar.photos.map((photo, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          setLightboxImage({
                            imageUrl: photo,
                            title: `Galeri Kenangan ${selectedDiklatsar.batchName} (${i + 1}/${selectedDiklatsar.photos.length})`
                          })
                        }
                        className="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black cursor-pointer hover:border-[#F5C400]/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                        title="Klik untuk melihat foto resolusi penuh"
                      >
                        <img
                          src={photo}
                          alt={`Foto Kenangan ${selectedDiklatsar.batchName} ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 backdrop-blur-[1px]">
                          <ZoomIn className="w-4 h-4 text-[#F5C400]" />
                          <span className="text-[11px] font-bold text-white drop-shadow">Perbesar</span>
                        </div>
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-bold text-slate-200 backdrop-blur-xs">
                          #{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. LIGHTBOX IMAGE VIEWER (FR-10) */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-[#F5C400] transition-colors"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black shadow-2xl max-h-[75vh] w-full flex items-center justify-center">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center w-full">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                {lightboxImage.category}
              </span>
              <h3 className="text-base font-bold text-white mt-1.5">{lightboxImage.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{lightboxImage.description}</p>
              <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-center gap-3">
                <span>{lightboxImage.date}</span>
                <span>•</span>
                <span>{lightboxImage.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
