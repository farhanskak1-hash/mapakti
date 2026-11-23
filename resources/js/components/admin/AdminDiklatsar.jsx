import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput, compressImageFile } from '../common/ImageUploadInput';
import { compareGenerations } from '../../utils/romanNumerals';
import { 
  Award, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  MapPin, 
  Users, 
  Calendar, 
  Camera, 
  Upload, 
  Link as LinkIcon, 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  ImageIcon
} from 'lucide-react';

export const AdminDiklatsar = () => {
  const { diklatsarEvents, setDiklatsarEvents, updateDiklatsar, selectedDiklatsar, setSelectedDiklatsar, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState('info'); // 'info' | 'photos'
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    batchNumber: 'XXVI',
    batchName: 'Angkatan Darpa Anargya',
    year: '2025',
    location: 'Lereng Gunung Slamet',
    graduatedCount: 13,
    historyNotes: 'DARPA ANARGYA merupakan nama Angkatan XXVI UKM MAPAKTI yang memiliki arti Kebanggaan yang Tak Terhingga Nilainya.',
    coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    photos: []
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      batchNumber: '',
      batchName: '',
      year: new Date().getFullYear().toString(),
      location: '',
      graduatedCount: 0,
      historyNotes: '',
      coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      photos: []
    });
    setActiveTab('info');
    setUrlInput('');
    setShowModal(true);
  };

  const handleOpenEdit = (item, initialTab = 'info') => {
    setEditingItem(item);
    setFormData({
      ...item,
      photos: Array.isArray(item.photos) ? [...item.photos] : []
    });
    setActiveTab(initialTab);
    setUrlInput('');
    setShowModal(true);
  };

  // Upload satu atau banyak foto sekaligus dengan kompresi Full HD
  const handleFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setIsProcessing(true);
    const addedPhotos = [];
    let errorCount = 0;

    for (const file of files) {
      try {
        const { dataUrl } = await compressImageFile(file, 1440, 960, 0.84);
        addedPhotos.push(dataUrl);
      } catch (err) {
        console.error('Gagal memproses gambar:', err);
        errorCount++;
      }
    }

    if (addedPhotos.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...(prev.photos || []), ...addedPhotos]
      }));
      addToast({
        type: 'success',
        title: 'Foto Galeri Ditambahkan',
        message: `${addedPhotos.length} foto Full HD berhasil ditambahkan ke Galeri Kenangan.`
      });
    }

    if (errorCount > 0) {
      addToast({
        type: 'error',
        title: 'Sebagian Berkas Gagal',
        message: `${errorCount} berkas gagal diproses. Pastikan format gambar valid (JPG, PNG, WebP).`
      });
    }

    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Tambah foto via URL gambar
  const handleAddUrlPhoto = (e) => {
    if (e) e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    setFormData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), trimmed]
    }));
    setUrlInput('');
    addToast({
      type: 'success',
      title: 'Foto Ditambahkan',
      message: 'Foto dari URL berhasil dimasukkan ke galeri kenangan.'
    });
  };

  // Hapus satu foto dari galeri
  const handleRemovePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
    addToast({
      type: 'info',
      title: 'Foto Dihapus',
      message: 'Foto telah dihapus dari galeri kenangan.'
    });
  };

  // Pindahkan urutan foto (kiri / kanan)
  const handleMovePhoto = (index, direction) => {
    const current = [...(formData.photos || [])];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length) return;

    const temp = current[index];
    current[index] = current[targetIndex];
    current[targetIndex] = temp;

    setFormData((prev) => ({ ...prev, photos: current }));
  };

  // Kosongkan seluruh foto galeri
  const handleClearAllPhotos = () => {
    if (window.confirm('Kosongkan seluruh foto di galeri kenangan angkatan ini?')) {
      setFormData((prev) => ({ ...prev, photos: [] }));
      addToast({
        type: 'info',
        title: 'Galeri Dikosongkan',
        message: 'Seluruh foto galeri kenangan telah dibersihkan.'
      });
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanData = {
      ...formData,
      photos: Array.isArray(formData.photos) ? formData.photos : []
    };

    if (editingItem) {
      updateDiklatsar((prev) =>
        prev.map((d) => (d.id === editingItem.id ? { ...d, ...cleanData } : d))
      );
      if (selectedDiklatsar?.id === editingItem.id) {
        setSelectedDiklatsar({ ...selectedDiklatsar, ...cleanData });
      }
      addAuditLog('UPDATE', 'DIKLATSAR', `Memperbarui arsip & galeri DIKLATSAR: ${cleanData.batchName}`);
      addToast({
        type: 'success',
        title: 'Data & Galeri Disimpan',
        message: `Riwayat dan galeri kenangan ${cleanData.batchName} berhasil disimpan.`
      });
    } else {
      const newItem = { id: `dks-${Date.now()}`, ...cleanData };
      updateDiklatsar((prev) => [newItem, ...prev]);
      addAuditLog('CREATE', 'DIKLATSAR', `Menambahkan arsip DIKLATSAR: ${cleanData.batchName}`);
      addToast({
        type: 'success',
        title: 'Arsip Ditambahkan',
        message: `Arsip & galeri ${cleanData.batchName} berhasil disimpan.`
      });
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus catatan angkatan ${name}?`)) {
      updateDiklatsar((prev) => prev.filter((d) => d.id !== id));
      if (selectedDiklatsar?.id === id) {
        setSelectedDiklatsar(null);
      }
      addAuditLog('DELETE', 'DIKLATSAR', `Menghapus catatan ${name}`);
      addToast({ type: 'info', title: 'Data Dihapus', message: `Catatan ${name} telah dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-[#F5C400]" />
            Manajemen Sejarah & Dokumentasi DIKLATSAR
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Catatan sejarah pengembaraan angkatan dan galeri kenangan pembaiatan slayer.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Riwayat Angkatan</span>
        </button>
      </div>

      {/* Grid List Angkatan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...diklatsarEvents]
          .sort((a, b) => compareGenerations(a.batchNumber, b.batchNumber, 'desc'))
          .map((d) => (
            <div
              key={d.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden p-5 space-y-4 hover:border-[#F5C400]/40 transition-colors flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                  <img src={d.coverImage} alt={d.batchName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-xl bg-[#F5C400] text-[#102A56] text-xs font-black shadow-md">
                    DIKSAR {d.batchNumber}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-xl bg-black/80 backdrop-blur-sm text-slate-200 text-[11px] font-bold flex items-center gap-1.5 border border-slate-700/60">
                    <Camera className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span>{d.photos?.length || 0} Foto Galeri</span>
                  </span>
                </div>

                <div>
                  <div className="text-xs text-slate-400">Tahun {d.year} • {d.graduatedCount} Lulusan</div>
                  <h3 className="font-bold text-white text-lg mt-0.5">{d.batchName}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span>{d.location}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mt-2">{d.historyNotes}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(d, 'photos')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#F5C400]/20 border border-slate-700/60 hover:border-[#F5C400]/50 text-slate-300 hover:text-[#F5C400] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Kelola foto galeri kenangan angkatan ini"
                >
                  <Camera className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>Galeri ({d.photos?.length || 0})</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(d, 'info')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Edit data & catatan sejarah"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(d.id, d.batchName)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Hapus riwayat angkatan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl sm:max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F5C400]" />
                  {editingItem ? `Edit Riwayat & Galeri: ${formData.batchName || 'Angkatan'}` : 'Tambah Riwayat DIKLATSAR Baru'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kelola data angkatan, catatan sejarah pengembaraan, dan foto galeri kenangan pembaiatan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-slate-800 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('info')}
                className={`pb-3 px-4 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
                  activeTab === 'info'
                    ? 'text-[#F5C400] border-b-2 border-[#F5C400]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Informasi & Sejarah</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('photos')}
                className={`pb-3 px-4 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
                  activeTab === 'photos'
                    ? 'text-[#F5C400] border-b-2 border-[#F5C400]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>📷 Galeri Kenangan Angkatan</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    (formData.photos?.length || 0) > 0
                      ? 'bg-[#F5C400] text-[#102A56]'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {formData.photos?.length || 0}
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* TAB 1: DATA ANGKATAN & CATATAN SEJARAH */}
              {activeTab === 'info' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Nomor Angkatan (Romawi) *</label>
                      <input
                        type="text"
                        required
                        value={formData.batchNumber}
                        onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                        placeholder="Contoh: XXVI"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Tahun Kelulusan *</label>
                      <input
                        type="text"
                        required
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="2025"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Nama Sandi Angkatan *</label>
                    <input
                      type="text"
                      required
                      value={formData.batchName}
                      onChange={(e) => setFormData({ ...formData, batchName: e.target.value })}
                      placeholder="Contoh: Angkatan Darpa Anargya"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Lokasi Lapangan</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Contoh: Lereng Gunung Slamet"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Jumlah Kader Lulus</label>
                      <input
                        type="number"
                        value={formData.graduatedCount}
                        onChange={(e) => setFormData({ ...formData, graduatedCount: parseInt(e.target.value) || 0 })}
                        placeholder="13"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                      />
                    </div>
                  </div>

                  <div>
                    <ImageUploadInput
                      value={formData.coverImage}
                      onChange={(url) => setFormData({ ...formData, coverImage: url })}
                      label="Foto Sampul / Cover Riwayat Angkatan"
                      hint="Upload foto dari perangkat (otomatis Full HD tajam) atau masukkan link URL gambar"
                      aspectRatio="aspect-video"
                      maxWidth={1920}
                      maxHeight={1200}
                      quality={0.90}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Catatan Sejarah & Pengembaraan</label>
                    <textarea
                      rows={4}
                      value={formData.historyNotes}
                      onChange={(e) => setFormData({ ...formData, historyNotes: e.target.value })}
                      placeholder="Tuliskan filosofi sandi angkatan, rute navigasi, tantangan pengembaraan, dan nilai kepecintaalaman..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                    />
                  </div>

                  {/* Banner Shortcut to Gallery */}
                  <div className="p-3.5 rounded-2xl bg-[#102A56]/60 border border-[#F5C400]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Camera className="w-5 h-5 text-[#F5C400] flex-shrink-0" />
                      <div>
                        <div className="font-bold text-white text-xs">Galeri Kenangan Angkatan</div>
                        <div className="text-[11px] text-slate-300">
                          {formData.photos?.length || 0} foto tersimpan untuk angkatan ini.
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('photos')}
                      className="px-3 py-1.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Buka Kelola Galeri</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: GALERI KENANGAN ANGKATAN */}
              {activeTab === 'photos' && (
                <div className="space-y-4">
                  {/* Info Header */}
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-300 space-y-1">
                    <div className="font-bold text-white flex items-center gap-2 text-xs">
                      <Sparkles className="w-4 h-4 text-[#F5C400]" />
                      Pengelolaan Galeri Kenangan Angkatan
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tambahkan foto kenangan DIKLATSAR seperti pembaiatan slayer, penjelajahan rimba belantara, bivak survival, dan momen kebersamaan. Foto otomatis dikompres ke Full HD tajam tanpa resiko kehabisan ruang penyimpanan.
                    </p>
                  </div>

                  {/* Upload Box & Controls */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFilesSelected}
                      className="hidden"
                    />

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Big Upload Button */}
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-3 px-4 rounded-xl border-2 border-dashed border-[#F5C400]/50 hover:border-[#F5C400] bg-[#F5C400]/5 hover:bg-[#F5C400]/10 text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 text-[#F5C400] animate-spin" />
                            <span className="text-xs text-[#F5C400]">Memproses & Mengompres Foto HD...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-[#F5C400] group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold text-slate-200">Upload Foto dari Komputer / HP</span>
                            <span className="text-[10px] bg-[#F5C400] text-[#102A56] px-2 py-0.5 rounded font-black">
                              Bisa Banyak Foto
                            </span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* URL Input Form */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <LinkIcon className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                          <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddUrlPhoto();
                              }
                            }}
                            placeholder="Atau tempel link gambar (https://...)"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddUrlPhoto}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-[#F5C400] hover:text-[#102A56] text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah URL</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photos Grid Header */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-[#F5C400]" />
                        Foto Galeri ({formData.photos?.length || 0})
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        (Urutan foto sesuai yang tampil di jendela informasi)
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        title="Simpan foto yang baru diunggah langsung ke database"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Simpan Galeri</span>
                      </button>
                      {formData.photos && formData.photos.length > 1 && (
                        <button
                          type="button"
                          onClick={handleClearAllPhotos}
                          className="text-[11px] text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Kosongkan</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Photos Grid List */}
                  {formData.photos && formData.photos.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {formData.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="group relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-black shadow-md hover:border-[#F5C400]/60 transition-all"
                        >
                          <img
                            src={photo}
                            alt={`Foto Galeri ${i + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* Index Badge */}
                          <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-xs text-[10px] font-black text-[#F5C400] border border-slate-700/60">
                            #{i + 1}
                          </span>

                          {/* Action Toolbar on Hover */}
                          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 p-2">
                            {/* Move Left */}
                            <button
                              type="button"
                              disabled={i === 0}
                              onClick={() => handleMovePhoto(i, 'left')}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#F5C400] hover:text-[#102A56] text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                              title="Pindahkan ke urutan sebelumnya"
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>

                            {/* Preview Zoom */}
                            <button
                              type="button"
                              onClick={() => setPreviewPhoto(photo)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-200 hover:text-[#F5C400] transition-colors cursor-pointer"
                              title="Lihat ukuran besar"
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(i)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-200 hover:text-rose-400 transition-colors cursor-pointer"
                              title="Hapus foto ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Move Right */}
                            <button
                              type="button"
                              disabled={i === formData.photos.length - 1}
                              onClick={() => handleMovePhoto(i, 'right')}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#F5C400] hover:text-[#102A56] text-slate-200 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                              title="Pindahkan ke urutan berikutnya"
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-slate-950/50 border border-dashed border-slate-800 text-center space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-slate-400 flex items-center justify-center mx-auto">
                        <Camera className="w-6 h-6 text-[#F5C400]" />
                      </div>
                      <div className="font-bold text-slate-300 text-xs">Belum Ada Foto Galeri Kenangan</div>
                      <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                        Klik tombol <strong>Upload Foto dari Komputer / HP</strong> di atas untuk menambahkan foto dokumentasi angkatan ini.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400">
                  {formData.photos?.length || 0} foto kenangan dalam antrian simpan
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold shadow-md transition-colors cursor-pointer"
                  >
                    Simpan Riwayat & Galeri
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Photo Preview Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <button
              onClick={() => setPreviewPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/80 border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[80vh] overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-2xl">
              <img
                src={previewPhoto}
                alt="Pratinjau Foto Galeri"
                className="max-h-[80vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
