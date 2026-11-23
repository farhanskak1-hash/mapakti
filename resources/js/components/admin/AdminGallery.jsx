import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import { Image as ImageIcon, Plus, Trash2, Edit2, X, ZoomIn } from 'lucide-react';

export const AdminGallery = () => {
  const { gallery, setGallery, updateGallery, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'Hutan Gunung',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    location: 'Gunung Slamet',
    description: 'Dokumentasi perjalanan ekspedisi lapangan'
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const item = { id: `gal-${Date.now()}`, ...newPhoto };
    updateGallery((prev) => [item, ...prev]);
    addAuditLog('CREATE', 'Galeri Foto', `Menambahkan foto baru: "${newPhoto.title}"`);
    addToast({ type: 'success', title: 'Foto Ditambahkan', message: `Foto "${newPhoto.title}" berhasil diunggah.` });
    setShowModal(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Hapus foto: "${title}"?`)) {
      updateGallery((prev) => prev.filter((g) => g.id !== id));
      addAuditLog('DELETE', 'Galeri Foto', `Menghapus foto: "${title}"`);
      addToast({ type: 'info', title: 'Foto Dihapus', message: `Foto "${title}" telah dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Galeri Media & Dokumentasi Foto
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Unggah dokumentasi foto kegiatan organisasi dan atur kategori divisi.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Foto Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((photo) => (
          <div
            key={photo.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden p-3 space-y-3 group hover:border-[#F5C400]/40 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#102A56] text-[#F5C400]">
                  {photo.category}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-white text-xs line-clamp-1">{photo.title}</h4>
                <div className="text-[10px] text-slate-500 mt-0.5">{photo.date} • {photo.location}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => handleDelete(photo.id, photo.title)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                title="Hapus Foto"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Add Photo */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Upload / Tambah Foto Galeri</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul Foto *</label>
                <input
                  type="text"
                  required
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="Contoh: Upacara Kemerdekaan di Puncak Slamet"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kategori Divisi</label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="Hutan Gunung">Hutan Gunung</option>
                    <option value="Rock Climbing">Rock Climbing</option>
                    <option value="Konservasi Sumber Daya Alam">Konservasi Sumber Daya Alam</option>
                    <option value="Diklatsar">Diklatsar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lokasi</label>
                  <input
                    type="text"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <ImageUploadInput
                  value={newPhoto.imageUrl}
                  onChange={(url) => setNewPhoto({ ...newPhoto, imageUrl: url })}
                  label="Unggah Berkas Foto Galeri"
                  hint="Unggah dokumentasi foto kegiatan lapangan menggunakan tombol"
                  aspectRatio="aspect-video"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Keterangan Foto</label>
                <textarea
                  rows={2}
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
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
                  Simpan Foto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
