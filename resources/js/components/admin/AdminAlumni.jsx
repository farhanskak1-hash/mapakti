import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import { GraduationCap, Plus, Edit2, Trash2, Eye, Lock, X } from 'lucide-react';

export const AdminAlumni = () => {
  const { alumni, setAlumni, toggleAlumniPublish, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    nia: '',
    batchNumber: 'X (Angkatan Rimba)',
    graduationYear: 2012,
    currentCareer: 'Wiraswasta Outdoor',
    companyOrInstitution: 'Nusantara Rimba',
    testimony: 'MAPAKTI menempa mental dan etika.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    isPublished: true
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      nia: 'MPK-XV-2008-091',
      batchNumber: 'XV',
      graduationYear: 2012,
      currentCareer: 'Konsultan Lingkungan',
      companyOrInstitution: 'PT Bina Ekosistem',
      testimony: 'Jaga selalu persaudaraan rimbawan.',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      isPublished: true
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
      setAlumni((prev) =>
        prev.map((a) => (a.id === editingItem.id ? { ...a, ...formData } : a))
      );
      addAuditLog('UPDATE', 'Data Alumni', `Memperbarui data alumni: ${formData.name}`);
      addToast({ type: 'success', title: 'Data Diperbarui', message: `Data alumni ${formData.name} berhasil disimpan.` });
    } else {
      const newItem = { id: `alm-${Date.now()}`, ...formData };
      setAlumni((prev) => [newItem, ...prev]);
      addAuditLog('CREATE', 'Data Alumni', `Menambahkan alumni: ${formData.name}`);
      addToast({ type: 'success', title: 'Alumni Ditambahkan', message: `Data alumni ${formData.name} berhasil disimpan.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus data alumni ${name}?`)) {
      setAlumni((prev) => prev.filter((a) => a.id !== id));
      addAuditLog('DELETE', 'Data Alumni', `Menghapus alumni: ${name}`);
      addToast({ type: 'info', title: 'Alumni Dihapus', message: `Data alumni ${name} telah dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#F5C400]" />
            Manajemen Data Alumni & Kontrol Publikasi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Data alumni hanya ditampilkan ke website publik bila diaktifkan izin publikasinya.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Data Alumni</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Nama Alumni</th>
                <th className="px-4 py-3.5">NIA & Angkatan</th>
                <th className="px-4 py-3.5">Kiprah / Profesi Saat Ini</th>
                <th className="px-4 py-3.5">Status Publikasi</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {alumni.map((alm) => (
                <tr key={alm.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <img src={alm.photoUrl} alt={alm.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                      <span>{alm.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-mono text-[#F5C400] font-bold">{alm.nia}</div>
                    <div className="text-[11px] text-slate-400">{alm.batchNumber} (Lulus {alm.graduationYear})</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-slate-300 font-semibold">{alm.currentCareer}</div>
                    <div className="text-[11px] text-slate-500">{alm.companyOrInstitution}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleAlumniPublish(alm.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                        alm.isPublished
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                      title="Klik untuk ubah status publikasi"
                    >
                      {alm.isPublished ? <Eye className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-slate-400" />}
                      <span>{alm.isPublished ? 'Publik (Tayang)' : 'Privat (Admin)'}</span>
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(alm)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(alm.id, alm.name)}
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

      {/* Modal Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingItem ? 'Edit Data Alumni' : 'Tambah Data Alumni'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nama Lengkap Alumni *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">NIA *</label>
                  <input
                    type="text"
                    required
                    value={formData.nia}
                    onChange={(e) => setFormData({ ...formData, nia: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Angkatan DIKSAR</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    placeholder="Angkatan V"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tahun Lulus Kampus</label>
                  <input
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || 2010 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Profesi Saat Ini</label>
                  <input
                    type="text"
                    value={formData.currentCareer}
                    onChange={(e) => setFormData({ ...formData, currentCareer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Perusahaan / Instansi</label>
                  <input
                    type="text"
                    value={formData.companyOrInstitution}
                    onChange={(e) => setFormData({ ...formData, companyOrInstitution: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Pesan / Testimoni Alumni</label>
                <textarea
                  rows={2}
                  value={formData.testimony}
                  onChange={(e) => setFormData({ ...formData, testimony: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <ImageUploadInput
                  value={formData.photoUrl}
                  onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                  label="Foto Profil Alumni"
                  hint="Unggah foto profil alumni dari perangkat"
                  aspectRatio="aspect-square"
                />
              </div>

              {/* Publication toggle */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Tampilkan di Direktori Publik</span>
                  <span className="text-[11px] text-slate-400">Izinkan publik melihat rekam jejak alumni ini.</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="w-4 h-4 rounded text-[#F5C400]"
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
                  Simpan Alumni
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
