import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import { Newspaper, Plus, Edit2, Trash2, Eye, EyeOff, Calendar, X } from 'lucide-react';

export const AdminNews = () => {
  const { news, setNews, toggleNewsDraft, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'DIKLATSAR',
    author: 'Humas MAPAKTI',
    publishedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    summary: '',
    content: '',
    coverImageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80',
    tags: ['MAPAKTI', 'Ekspedisi'],
    isDraft: false
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Ekspedisi',
      author: 'Humas MAPAKTI',
      publishedDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      summary: '',
      content: '',
      coverImageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      tags: ['MAPAKTI', 'Rimba'],
      isDraft: false
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
      setNews((prev) =>
        prev.map((n) => (n.id === editingItem.id ? { ...n, ...formData } : n))
      );
      addAuditLog('UPDATE', 'Berita & Publikasi', `Memperbarui artikel: "${formData.title}"`);
      addToast({ type: 'success', title: 'Berita Diperbarui', message: `Artikel "${formData.title}" berhasil disimpan.` });
    } else {
      const newItem = {
        id: `news-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...formData
      };
      setNews((prev) => [newItem, ...prev]);
      addAuditLog('CREATE', 'Berita & Publikasi', `Membuat berita baru: "${formData.title}" (${formData.isDraft ? 'DRAFT' : 'PUBLISHED'})`);
      addToast({ type: 'success', title: 'Berita Dibuat', message: `Artikel "${formData.title}" berhasil dibuat.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Hapus artikel berita: "${title}"?`)) {
      setNews((prev) => prev.filter((n) => n.id !== id));
      addAuditLog('DELETE', 'Berita & Publikasi', `Menghapus berita: "${title}"`);
      addToast({ type: 'info', title: 'Berita Dihapus', message: `Artikel "${title}" telah dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Newspaper className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Berita & Publikasi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tulis warta, kelola draft sebelum terbit, dan atur status tayang publik artikel.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Judul & Kategori</th>
                <th className="px-4 py-3.5">Penulis</th>
                <th className="px-4 py-3.5">Tanggal Terbit</th>
                <th className="px-4 py-3.5">Status Publikasi</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {news.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-white max-w-sm">
                    <div className="line-clamp-1">{item.title}</div>
                    <span className="text-[10px] text-[#F5C400] font-semibold">{item.category}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">
                    {item.author}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                    {item.publishedDate}
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleNewsDraft(item.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                        item.isDraft
                          ? 'bg-amber-950 text-amber-400 border border-amber-800 hover:bg-amber-900'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                      }`}
                      title="Klik untuk ubah status draft / publish"
                    >
                      {item.isDraft ? 'DRAFT (Belum Tayang)' : 'PUBLISHED (Tayang)'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit News */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Berita' : 'Tulis Berita Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Judul artikel yang menarik"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kategori Artikel</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="DIKLATSAR">DIKLATSAR</option>
                    <option value="Konservasi">Konservasi</option>
                    <option value="Ekspedisi">Ekspedisi</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Organisasi">Organisasi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Penulis</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <ImageUploadInput
                  value={formData.coverImageUrl}
                  onChange={(url) => setFormData({ ...formData, coverImageUrl: url })}
                  label="Cover Gambar Artikel Berita"
                  hint="Unggah foto utama sampul warta dari berkas lokal"
                  aspectRatio="aspect-video"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Ringkasan Singkat (Summary) *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk preview kartu berita"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Isi Artikel Lengkap *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tuliskan isi warta secara terperinci..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              {/* Draft Status Switch (FR-09) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Simpan Sebagai Draft</span>
                  <span className="text-[11px] text-slate-400">
                    Jika diaktifkan, artikel hanya tersimpan di panel admin dan tidak tampil di website publik.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isDraft}
                    onChange={(e) => setFormData({ ...formData, isDraft: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
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
                  Simpan Artikel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
