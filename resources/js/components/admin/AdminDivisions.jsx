import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  Compass,
  Edit2,
  CheckCircle2,
  X,
  Plus,
  Trash2,
  Save,
  Layers,
  Wrench,
  Check,
  RotateCcw
} from 'lucide-react';
import { initialDivisions } from '../../data/initialData';

export const AdminDivisions = () => {
  const { divisions, setDivisions, addAuditLog, addToast } = useData();
  const [editingDiv, setEditingDiv] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    shortDesc: '',
    tagline: '',
    coverImage: '',
    logoUrl: '',
    mainTasks: [],
    equipment: []
  });

  const [taskInput, setTaskInput] = useState('');
  const [equipInput, setEquipInput] = useState('');

  const handleOpenEdit = (d) => {
    setIsNew(false);
    setEditingDiv(d);
    setFormData({
      name: d.name || '',
      code: d.code || '',
      shortDesc: d.shortDesc || '',
      tagline: d.tagline || '',
      coverImage: d.coverImage || '',
      logoUrl: d.logoUrl || '',
      mainTasks: d.mainTasks ? [...d.mainTasks] : [],
      equipment: d.equipment ? [...d.equipment] : []
    });
    setTaskInput('');
    setEquipInput('');
  };

  const handleOpenAdd = () => {
    setIsNew(true);
    const newId = `div-${Date.now()}`;
    setEditingDiv({ id: newId });
    setFormData({
      name: '',
      code: 'DIV',
      shortDesc: '',
      tagline: '',
      coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      logoUrl: '',
      mainTasks: ['Pelatihan operasional lapangan', 'Eksplorasi dan pemetaan jalur'],
      equipment: ['Tenda Dome', 'Kompas Bidik', 'Tali Kernmantle']
    });
    setTaskInput('');
    setEquipInput('');
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      mainTasks: [...prev.mainTasks, taskInput.trim()]
    }));
    setTaskInput('');
  };

  const handleRemoveTask = (idx) => {
    setFormData((prev) => ({
      ...prev,
      mainTasks: prev.mainTasks.filter((_, i) => i !== idx)
    }));
  };

  const handleAddEquip = () => {
    if (!equipInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      equipment: [...prev.equipment, equipInput.trim()]
    }));
    setEquipInput('');
  };

  const handleRemoveEquip = (idx) => {
    setFormData((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((_, i) => i !== idx)
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editingDiv) return;

    if (isNew) {
      const newDiv = { id: editingDiv.id, ...formData };
      setDivisions((prev) => [...prev, newDiv]);
      addAuditLog('CREATE', 'Divisi', `Menambahkan divisi baru: ${formData.name}`);
      addToast({
        type: 'success',
        title: 'Divisi Ditambahkan',
        message: `Divisi ${formData.name} berhasil dibuat dan disimpan ke database.`
      });
    } else {
      setDivisions((prev) =>
        prev.map((d) => (d.id === editingDiv.id ? { ...d, ...formData } : d))
      );
      addAuditLog('UPDATE', 'Divisi', `Memperbarui informasi Divisi ${formData.name}`);
      addToast({
        type: 'success',
        title: 'Divisi Diperbarui',
        message: `Data divisi ${formData.name} berhasil disimpan ke database.`
      });
    }

    setEditingDiv(null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Yakin ingin menghapus divisi ${name}?`)) {
      setDivisions((prev) => prev.filter((d) => d.id !== id));
      addAuditLog('DELETE', 'Divisi', `Menghapus divisi ${name}`);
      addToast({
        type: 'info',
        title: 'Divisi Dihapus',
        message: `Divisi ${name} telah dihapus.`
      });
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan 3 divisi ke setelan default awal?')) {
      setDivisions(initialDivisions);
      addToast({
        type: 'info',
        title: 'Divisi Direset',
        message: '3 Divisi MAPAKTI dikembalikan ke setelan awal.'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Menu 3 Divisi MAPAKTI
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola foto cover divisi, deskripsi operasional, semboyan, tugas pokok, dan perlengkapan khas divisi.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Reset ke 3 Divisi Standar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset 3 Divisi</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transform active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Divisi Baru</span>
          </button>
        </div>
      </div>

      {/* Grid of Divisions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {divisions.map((div) => (
          <div
            key={div.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden p-5 flex flex-col justify-between space-y-4 hover:border-[#F5C400]/40 transition-colors shadow-xl"
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
                <img
                  src={div.coverImage}
                  alt={div.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-[#102A56] text-[#F5C400] text-xs font-black border border-[#F5C400]/40 shadow">
                  {div.code}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base leading-snug">{div.name}</h3>
                <p className="text-xs text-[#F5C400] italic mt-0.5">"{div.tagline}"</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{div.shortDesc}</p>
              </div>

              {div.mainTasks && div.mainTasks.length > 0 && (
                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500">Tugas Pokok:</span>
                  <ul className="text-[11px] text-slate-400 space-y-1">
                    {div.mainTasks.slice(0, 3).map((t, i) => (
                      <li key={i} className="flex items-start gap-1.5 truncate">
                        <span className="text-[#F5C400]">•</span>
                        <span className="truncate">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => handleOpenEdit(div)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400] text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Divisi & Foto</span>
              </button>
              {divisions.length > 3 && (
                <button
                  onClick={() => handleDelete(div.id, div.name)}
                  className="p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 transition-colors"
                  title="Hapus Divisi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingDiv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#F5C400]" />
                {isNew ? 'Tambah Divisi Baru' : `Edit Divisi: ${formData.name}`}
              </h3>
              <button onClick={() => setEditingDiv(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-300 mb-1">Nama Lengkap Divisi</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Divisi Hutan Gunung"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Kode Singkatan</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="Contoh: DHG"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Semboyan / Tagline Divisi</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Semboyan khas divisi..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deskripsi Singkat Operasional</label>
                <textarea
                  rows={3}
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Fokus bidang eksplorasi..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400] leading-relaxed"
                />
              </div>

              {/* Upload Foto Cover Divisi via ImageUploadInput */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUploadInput
                  value={formData.coverImage}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  label="Cover Foto Divisi"
                  hint="Upload foto dari komputer/HP (disimpan ke database) atau gunakan link internet"
                  aspectRatio="aspect-video"
                />
              </div>

              {/* Tugas Pokok Editor */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="block font-semibold text-slate-300">Daftar Tugas Pokok Divisi</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Tambah tugas pokok..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTask();
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                  <button
                    type="button"
                    onClick={handleAddTask}
                    className="px-3.5 py-2 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] border border-[#F5C400]/40 font-bold"
                  >
                    Tambah
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.mainTasks.map((task, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                    >
                      <span>{task}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTask(i)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Perlengkapan Khas Editor */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="block font-semibold text-slate-300">Peralatan Khas Divisi</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={equipInput}
                    onChange={(e) => setEquipInput(e.target.value)}
                    placeholder="Tambah perlengkapan..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddEquip();
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                  <button
                    type="button"
                    onClick={handleAddEquip}
                    className="px-3.5 py-2 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] border border-[#F5C400]/40 font-bold"
                  >
                    Tambah
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                    >
                      <span>{eq}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEquip(i)}
                        className="text-slate-500 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingDiv(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black uppercase tracking-wider shadow-md"
                >
                  Simpan Divisi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
