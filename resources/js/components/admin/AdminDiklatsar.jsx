import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import { compareGenerations } from '../../utils/romanNumerals';
import { Award, Plus, Edit2, Trash2, X, MapPin, Users, Calendar } from 'lucide-react';

export const AdminDiklatsar = () => {
  const { diklatsarEvents, setDiklatsarEvents, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    batchNumber: 'XXV',
    batchName: 'Angkatan Surya Rimba',
    year: '2024',
    location: 'Hutan Pendidikan Guci & Lereng Slamet',
    graduatedCount: 25,
    historyNotes: 'Pendidikan dasar pengembaraan rimba dan pendakian orientasi navigasi darat.',
    coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    photos: []
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      batchNumber: 'XXV',
      batchName: 'Angkatan Surya Rimba',
      year: '2024',
      location: 'Hutan Wisata Guci & Lereng Slamet',
      graduatedCount: 20,
      historyNotes: 'Pengembaraan rute navigasi darat sepanjang 40 km.',
      coverImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      photos: []
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingItem) {
      setDiklatsarEvents((prev) =>
        prev.map((d) => (d.id === editingItem.id ? { ...d, ...formData } : d))
      );
      addAuditLog('UPDATE', 'DIKLATSAR', `Memperbarui arsip DIKLATSAR: ${formData.batchName}`);
      addToast({ type: 'success', title: 'Data Diperbarui', message: `Arsip ${formData.batchName} berhasil disimpan.` });
    } else {
      const newItem = { id: `dks-${Date.now()}`, ...formData };
      setDiklatsarEvents((prev) => [newItem, ...prev]);
      addAuditLog('CREATE', 'DIKLATSAR', `Menambahkan arsip DIKLATSAR: ${formData.batchName}`);
      addToast({ type: 'success', title: 'Arsip Ditambahkan', message: `Arsip ${formData.batchName} berhasil disimpan.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus catatan angkatan ${name}?`)) {
      setDiklatsarEvents((prev) => prev.filter((d) => d.id !== id));
      addAuditLog('DELETE', 'DIKLATSAR', `Menghapus catatan ${name}`);
      addToast({ type: 'info', title: 'Data Dihapus', message: `Catatan ${name} telah dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
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
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Riwayat Angkatan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...diklatsarEvents]
          .sort((a, b) => compareGenerations(a.batchNumber, b.batchNumber, 'desc'))
          .map((d) => (
          <div
            key={d.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden p-5 space-y-4 hover:border-[#F5C400]/40 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                <img src={d.coverImage} alt={d.batchName} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2.5 py-1 rounded-xl bg-[#F5C400] text-[#102A56] text-xs font-black">
                  DIKSAR {d.batchNumber}
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

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(d)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(d.id, d.batchName)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Riwayat DIKLATSAR' : 'Tambah Riwayat DIKLATSAR Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nomor Angkatan (Romawi) *</label>
                  <input
                    type="text"
                    required
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    placeholder="Contoh: XXIV"
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
                    placeholder="2024"
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
                  placeholder="Contoh: Angkatan Tapak Rimba"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lokasi Lapangan</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Jumlah Kader Lulus</label>
                  <input
                    type="number"
                    value={formData.graduatedCount}
                    onChange={(e) => setFormData({ ...formData, graduatedCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <ImageUploadInput
                  value={formData.coverImage}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  label="Foto Cover Dokumentasi / Pembaiatan"
                  hint="Upload foto dari perangkat (disimpan langsung ke database) atau gunakan link internet"
                  aspectRatio="aspect-video"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Catatan Sejarah Pengembaraan</label>
                <textarea
                  rows={4}
                  value={formData.historyNotes}
                  onChange={(e) => setFormData({ ...formData, historyNotes: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F5C400] text-[#102A56] font-bold"
                >
                  Simpan Riwayat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
