import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Compass, Edit2, CheckCircle2, X } from 'lucide-react';

export const AdminDivisions = () => {
  const { divisions, setDivisions, addAuditLog, addToast } = useData();
  const [editingDiv, setEditingDiv] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', shortDesc: '', tagline: '', coverImage: '' });

  const handleOpenEdit = (d) => {
    setEditingDiv(d);
    setFormData({
      name: d.name,
      code: d.code,
      shortDesc: d.shortDesc,
      tagline: d.tagline,
      coverImage: d.coverImage
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingDiv) return;

    setDivisions((prev) =>
      prev.map((d) => (d.id === editingDiv.id ? { ...d, ...formData } : d))
    );

    addAuditLog('UPDATE', 'Divisi', `Memperbarui informasi Divisi ${formData.name}`);
    addToast({ type: 'success', title: 'Divisi Diperbarui', message: `Data divisi ${formData.name} berhasil disimpan.` });
    setEditingDiv(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-[#F5C400]" />
          Pengelolaan Informasi 3 Divisi MAPAKTI
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Kelola deskripsi operasional, program kerja divisi, dan dokumentasi foto untuk 3 pilar divisi MAPAKTI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divisions.map((div) => (
          <div
            key={div.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden p-5 flex flex-col justify-between space-y-4 hover:border-[#F5C400]/40 transition-colors"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <img src={div.coverImage} alt={div.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#102A56] text-[#F5C400] text-xs font-black">
                  {div.code}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base leading-snug">{div.name}</h3>
                <p className="text-xs text-[#F5C400] italic mt-0.5">"{div.tagline}"</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{div.shortDesc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500">Tugas Pokok:</span>
                <ul className="text-[11px] text-slate-400 space-y-1">
                  {div.mainTasks?.slice(0, 2).map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5 truncate">
                      <span className="text-[#F5C400]">•</span>
                      <span className="truncate">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleOpenEdit(div)}
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Informasi Divisi</span>
            </button>
          </div>
        ))}
      </div>

      {/* Edit Division Modal */}
      {editingDiv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Edit Divisi: {editingDiv.name}</h3>
              <button onClick={() => setEditingDiv(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Divisi</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Semboyan / Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={3}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">URL Cover Foto</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDiv(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F5C400] text-[#102A56] font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
