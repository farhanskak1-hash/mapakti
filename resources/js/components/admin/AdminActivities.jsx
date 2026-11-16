import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Users,
  CheckCircle2,
  Clock,
  X,
  MapPin,
  DollarSign,
  UserCheck,
  UserX
} from 'lucide-react';

export const AdminActivities = () => {
  const {
    activities,
    setActivities,
    activityRegistrations,
    setActivityRegistrations,
    toggleActivityRegistration,
    addAuditLog,
    addToast
  } = useData();

  const [showModal, setShowModal] = useState(false);
  const [editingAct, setEditingAct] = useState(null);
  const [selectedActivityForParticipants, setSelectedActivityForParticipants] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'Ekspedisi',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    pic: '',
    committeeSummary: '',
    budget: '',
    status: 'Akan Datang',
    isRegistrationOpen: true,
    maxParticipants: 30,
    reportSummary: '',
    posterUrl: ''
  });

  const handleOpenAdd = () => {
    setEditingAct(null);
    setFormData({
      name: '',
      type: 'Ekspedisi',
      description: '',
      location: 'Gunung Slamet via Guci',
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      pic: 'Gilang Ramadhan',
      committeeSummary: 'Panitia Divisi Hutan Gunung',
      budget: 'Rp 6.000.000',
      status: 'Akan Datang',
      isRegistrationOpen: true,
      maxParticipants: 25,
      reportSummary: 'Briefing perlengkapan dan logistik lapangan',
      posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (act) => {
    setEditingAct(act);
    setFormData({
      ...act,
      posterUrl: act.posterUrl || (act.documentationImages?.[0] || '')
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAct) {
      setActivities((prev) =>
        prev.map((item) => (item.id === editingAct.id ? { ...item, ...formData } : item))
      );
      addAuditLog('UPDATE', 'Kegiatan & Ekspedisi', `Memperbarui kegiatan: ${formData.name}`);
      addToast({ type: 'success', title: 'Kegiatan Diperbarui', message: `Kegiatan ${formData.name} berhasil disimpan.` });
    } else {
      const newAct = {
        id: `act-${Date.now()}`,
        ...formData,
        registeredCount: 0,
        documentationImages: []
      };
      setActivities((prev) => [newAct, ...prev]);
      addAuditLog('CREATE', 'Kegiatan & Ekspedisi', `Menambahkan kegiatan baru: ${formData.name}`);
      addToast({ type: 'success', title: 'Kegiatan Dibuat', message: `Kegiatan ${formData.name} berhasil ditambahkan.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus kegiatan: ${name}?`)) {
      setActivities((prev) => prev.filter((a) => a.id !== id));
      addAuditLog('DELETE', 'Kegiatan & Ekspedisi', `Menghapus kegiatan: ${name}`);
      addToast({ type: 'info', title: 'Kegiatan Dihapus', message: `Kegiatan ${name} telah dihapus.` });
    }
  };

  const handleToggleAttendance = (regId, currentStatus) => {
    const nextStatus = currentStatus === 'Hadir' ? 'Belum Hadir' : 'Hadir';
    setActivityRegistrations((prev) =>
      prev.map((r) => (r.id === regId ? { ...r, attendanceStatus: nextStatus } : r))
    );
    addToast({
      type: 'info',
      title: 'Presensi Diperbarui',
      message: `Status kehadiran diubah menjadi: ${nextStatus}`
    });
  };

  const currentActivityParticipants = activityRegistrations.filter(
    (r) => selectedActivityForParticipants && r.activityId === selectedActivityForParticipants.id
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Kegiatan & Peserta Terdaftar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola agenda kegiatan, status pembukaan pendaftaran online, dan data kehadiran (presensi) peserta.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kegiatan Baru</span>
        </button>
      </div>

      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Nama Kegiatan</th>
                <th className="px-4 py-3.5">Jadwal & Lokasi</th>
                <th className="px-4 py-3.5">PIC / Biaya</th>
                <th className="px-4 py-3.5">Pendaftaran Online</th>
                <th className="px-4 py-3.5">Peserta</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {activities.map((act) => {
                const regsCount = activityRegistrations.filter((r) => r.activityId === act.id).length;

                return (
                  <tr key={act.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-white max-w-xs">
                      <div>{act.name}</div>
                      <span className="text-[10px] text-slate-500 font-normal px-1.5 py-0.5 rounded bg-slate-800 mt-0.5 inline-block">
                        {act.type} • {act.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      <div>{act.startDate}</div>
                      <div className="text-[11px] text-slate-500">{act.location}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="text-slate-300">{act.pic}</div>
                      <div className="font-mono text-[#F5C400] text-[11px] font-bold">{act.budget}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => toggleActivityRegistration(act.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                          act.isRegistrationOpen
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                            : 'bg-rose-950 text-rose-400 border border-rose-800 hover:bg-rose-900'
                        }`}
                      >
                        {act.isRegistrationOpen ? 'Pendaftaran DIBUKA' : 'Pendaftaran DITUTUP'}
                      </button>
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        onClick={() => setSelectedActivityForParticipants(act)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-200 hover:text-[#F5C400] border border-slate-700 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5 text-[#F5C400]" />
                        <span>{regsCount} Peserta</span>
                      </button>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(act)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400]"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(act.id, act.name)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Manage Participants & Attendance (FR-08) */}
      {selectedActivityForParticipants && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#F5C400] tracking-wider block">
                  Presensi & Peserta Kegiatan
                </span>
                <h3 className="text-base font-bold text-white">{selectedActivityForParticipants.name}</h3>
              </div>
              <button
                onClick={() => setSelectedActivityForParticipants(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {currentActivityParticipants.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  Belum ada peserta yang mendaftar online untuk kegiatan ini.
                </div>
              ) : (
                currentActivityParticipants.map((p) => {
                  const isPresent = p.attendanceStatus === 'Hadir';

                  return (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="font-bold text-white">{p.participantName}</div>
                        <div className="text-[11px] text-slate-400">
                          Identitas: {p.identityNumber} • {p.institution}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          WA: {p.phone} • {p.email} • Daftar: {p.registeredAt}
                        </div>
                      </div>

                      {/* Presensi Toggle (FR-08) */}
                      <button
                        onClick={() => handleToggleAttendance(p.id, p.attendanceStatus)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                          isPresent
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                            : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                        }`}
                      >
                        {isPresent ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                        <span>{p.attendanceStatus}</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add/Edit Activity */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingAct ? 'Edit Data Kegiatan' : 'Tambah Kegiatan / Ekspedisi Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Kegiatan *</label>
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
                  <label className="block font-semibold text-slate-300 mb-1">Jenis Kegiatan</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="Ekspedisi">Ekspedisi</option>
                    <option value="Pelatihan">Pelatihan</option>
                    <option value="Bakti Sosial & Konservasi">Bakti Sosial & Konservasi</option>
                    <option value="Peringatan Hari Bumi">Peringatan Hari Bumi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Status Kegiatan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="Akan Datang">Akan Datang</option>
                    <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tanggal Mulai *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tanggal Selesai *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lokasi Kegiatan *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Penanggung Jawab (PIC)</label>
                  <input
                    type="text"
                    value={formData.pic}
                    onChange={(e) => setFormData({ ...formData, pic: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Estimasi Anggaran</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="Rp 5.000.000"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Buka Pendaftaran Publik</label>
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isRegistrationOpen}
                        onChange={(e) => setFormData({ ...formData, isRegistrationOpen: e.target.checked })}
                        className="rounded bg-slate-900 border-slate-700 text-[#F5C400] focus:ring-[#F5C400]"
                      />
                      <span className="text-slate-300">Izinkan publik mendaftar online</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Deskripsi Kegiatan</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div>
                <ImageUploadInput
                  value={formData.posterUrl}
                  onChange={(url) => setFormData({ ...formData, posterUrl: url })}
                  label="Poster / Foto Utama Kegiatan"
                  hint="Unggah poster agenda atau dokumentasi visual kegiatan"
                  aspectRatio="aspect-video"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Laporan / Ringkasan Evaluasi Lapangan</label>
                <textarea
                  rows={2}
                  value={formData.reportSummary}
                  onChange={(e) => setFormData({ ...formData, reportSummary: e.target.value })}
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
                  Simpan Kegiatan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
