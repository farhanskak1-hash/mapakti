import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import { Flame, Plus, Edit2, Trash2, Calendar, Target, DollarSign, X } from 'lucide-react';

export const AdminWorkPrograms = () => {
  const { programs, setPrograms, addAuditLog, addToast } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingProg, setEditingProg] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    divisionOrField: 'Divisi Hutan Gunung',
    targetAudience: '',
    timeline: '',
    output: '',
    budgetEstimated: '',
    status: 'Rencana',
    imageUrl: ''
  });

  const handleOpenAdd = () => {
    setEditingProg(null);
    setFormData({
      name: '',
      divisionOrField: 'Divisi Hutan Gunung',
      targetAudience: 'Mahasiswa & Anggota MAPAKTI',
      timeline: 'Semester Genap 2025',
      output: 'Peningkatan kapasitas teknis dan pengabdian alam',
      budgetEstimated: 'Rp 5.000.000',
      status: 'Rencana',
      imageUrl: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProg(p);
    setFormData({ ...p });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProg) {
      setPrograms((prev) =>
        prev.map((item) => (item.id === editingProg.id ? { ...item, ...formData } : item))
      );
      addAuditLog('UPDATE', 'Program Kerja', `Memperbarui proker: ${formData.name}`);
      addToast({ type: 'success', title: 'Proker Diperbarui', message: `Program ${formData.name} berhasil disimpan.` });
    } else {
      const newP = { id: `proker-${Date.now()}`, ...formData };
      setPrograms((prev) => [newP, ...prev]);
      addAuditLog('CREATE', 'Program Kerja', `Menambahkan proker baru: ${formData.name}`);
      addToast({ type: 'success', title: 'Proker Ditambahkan', message: `Program ${formData.name} berhasil dibuat.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus program kerja: ${name}?`)) {
      setPrograms((prev) => prev.filter((p) => p.id !== id));
      addAuditLog('DELETE', 'Program Kerja', `Menghapus proker ${name}`);
      addToast({ type: 'info', title: 'Proker Dihapus', message: `Program kerja ${name} dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Program Kerja Organisasi
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Program kerja tingkat organisasi dengan monitoring target sasaran, jadwal waktu, dan status pelaksanaan.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Kerja</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Nama Program Kerja</th>
                <th className="px-4 py-3.5">Penanggung Jawab</th>
                <th className="px-4 py-3.5">Target Waktu</th>
                <th className="px-4 py-3.5">Estimasi Biaya</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {programs.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-white max-w-xs">
                    <div>{p.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal truncate mt-0.5">{p.output}</div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300">
                    {p.divisionOrField}
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                    {p.timeline}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[#F5C400] font-bold whitespace-nowrap">
                    {p.budgetEstimated}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      p.status === 'Terlaksana'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : p.status === 'Sedang Berjalan'
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400]"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
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
                {editingProg ? 'Edit Program Kerja' : 'Tambah Program Kerja Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Program Kerja *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Bidang / Divisi Penanggung Jawab</label>
                  <input
                    type="text"
                    required
                    value={formData.divisionOrField}
                    onChange={(e) => setFormData({ ...formData, divisionOrField: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Target Waktu Pelaksanaan</label>
                  <input
                    type="text"
                    required
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Estimasi Anggaran</label>
                  <input
                    type="text"
                    value={formData.budgetEstimated}
                    onChange={(e) => setFormData({ ...formData, budgetEstimated: e.target.value })}
                    placeholder="Rp 10.000.000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status Proker</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="Rencana">Rencana</option>
                    <option value="Sedang Berjalan">Sedang Berjalan</option>
                    <option value="Terlaksana">Terlaksana</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Sasaran Peserta / Tujuan</label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Output Program</label>
                <textarea
                  rows={2}
                  value={formData.output}
                  onChange={(e) => setFormData({ ...formData, output: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <ImageUploadInput
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  label="Foto Poster / Dokumentasi Proker (Opsional)"
                  hint="Upload foto dari perangkat (disimpan langsung ke database) atau gunakan link internet"
                  aspectRatio="aspect-video"
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
                  Simpan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
