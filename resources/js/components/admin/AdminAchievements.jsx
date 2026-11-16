import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import { Trophy, Plus, Edit2, Trash2, X, Award } from 'lucide-react';

export const AdminAchievements = () => {
  const { achievements, setAchievements, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Rock Climbing',
    level: 'Tingkat Jawa Tengah',
    year: new Date().getFullYear(),
    recipient: '',
    certificateImageUrl: '',
    description: ''
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Rock Climbing',
      level: 'Tingkat Jawa Tengah',
      year: new Date().getFullYear(),
      recipient: 'Tim Atlet MAPAKTI',
      certificateImageUrl: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80',
      description: ''
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
      setAchievements((prev) =>
        prev.map((a) => (a.id === editingItem.id ? { ...a, ...formData } : a))
      );
      addAuditLog('UPDATE', 'Prestasi', `Memperbarui prestasi: "${formData.title}"`);
      addToast({ type: 'success', title: 'Prestasi Diperbarui', message: `Data prestasi "${formData.title}" berhasil disimpan.` });
    } else {
      const newItem = { id: `ach-${Date.now()}`, ...formData };
      setAchievements((prev) => [newItem, ...prev]);
      addAuditLog('CREATE', 'Prestasi', `Menambahkan rekor prestasi: "${formData.title}"`);
      addToast({ type: 'success', title: 'Prestasi Ditambahkan', message: `Data prestasi "${formData.title}" berhasil disimpan.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Hapus prestasi: "${title}"?`)) {
      setAchievements((prev) => prev.filter((a) => a.id !== id));
      addAuditLog('DELETE', 'Prestasi', `Menghapus prestasi: "${title}"`);
      addToast({ type: 'info', title: 'Prestasi Dihapus', message: `Prestasi "${title}" telah dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Rekor Prestasi & Penghargaan
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Data torehan prestasi kejuaraan alam bebas, lomba panjat dinding, dan penghargaan konservasi.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Prestasi Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-5 space-y-3 flex flex-col justify-between hover:border-[#F5C400]/40 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#102A56] text-[#F5C400]">
                  {ach.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{ach.level} • {ach.year}</span>
              </div>

              <h3 className="font-bold text-white text-base leading-snug">{ach.title}</h3>
              <div className="text-xs text-[#F5C400]">Penerima: {ach.recipient}</div>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{ach.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(ach)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400]"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(ach.id, ach.title)}
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
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul Penghargaan / Kejuaraan *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kategori</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Contoh: Rock Climbing"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tingkat / Tahun</label>
                  <input
                    type="text"
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="Tingkat Nasional"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Penerima / Delegasi *</label>
                <input
                  type="text"
                  required
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  placeholder="Contoh: Rangga Aditya Pratama / Tim SAR"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <ImageUploadInput
                  value={formData.certificateImageUrl}
                  onChange={(url) => setFormData({ ...formData, certificateImageUrl: url })}
                  label="Foto Sertifikat / Trofi Penghargaan"
                  hint="Unggah foto piagam, sertifikat, atau trofi kejuaraan"
                  aspectRatio="aspect-video"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deskripsi & Keterangan</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Simpan Prestasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
