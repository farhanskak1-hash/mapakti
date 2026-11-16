import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Trash2,
  Eye,
  X,
  MessageCircle,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

export const AdminMemberRegistrations = () => {
  const {
    memberRegistrations,
    setMemberRegistrations,
    addAuditLog,
    addToast
  } = useData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedReg, setSelectedReg] = useState(null);

  const filteredRegistrations = memberRegistrations.filter((r) => {
    const matchSearch =
      r.fullName.toLowerCase().includes(search.toLowerCase()) ||
      r.nim.toLowerCase().includes(search.toLowerCase()) ||
      r.faculty.toLowerCase().includes(search.toLowerCase());

    const matchStatus = filterStatus === 'Semua' || r.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (id, newStatus) => {
    setMemberRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === id) {
          addAuditLog('UPDATE', 'Pendaftaran Calon Anggota', `Mengubah status ${reg.fullName} menjadi ${newStatus}`);
          addToast({
            type: 'info',
            title: 'Status Diperbarui',
            message: `Status pendaftaran ${reg.fullName} kini: ${newStatus}`
          });
          return { ...reg, status: newStatus };
        }
        return reg;
      })
    );
    if (selectedReg && selectedReg.id === id) {
      setSelectedReg((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus data pendaftaran calon anggota: ${name}?`)) {
      setMemberRegistrations((prev) => prev.filter((r) => r.id !== id));
      addAuditLog('DELETE', 'Pendaftaran Calon Anggota', `Menghapus pendaftar ${name}`);
      addToast({
        type: 'info',
        title: 'Data Dihapus',
        message: `Pendaftaran ${name} telah dihapus dari sistem.`
      });
      if (selectedReg && selectedReg.id === id) setSelectedReg(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-[#F5C400]" />
            Pengelolaan Pendaftaran Calon Anggota
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Data calon anggota baru yang mengisi formulir registrasi online dengan 5 atribut wajib.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Pendaftar: <span className="font-bold text-[#F5C400]">{memberRegistrations.length}</span> Orang
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama lengkap, NIM, fakultas..."
            className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['Semua', 'Menunggu Tinjauan', 'Terverifikasi', 'Dihubungi'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-[#F5C400] text-[#102A56]'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Registrations Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Nama Lengkap</th>
                <th className="px-4 py-3.5">NIM & Fakultas</th>
                <th className="px-4 py-3.5">Kontak WhatsApp</th>
                <th className="px-4 py-3.5">Waktu Daftar</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada calon anggota dalam kriteria pencarian ini
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">
                      {reg.fullName}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-mono text-[#F5C400]">{reg.nim}</div>
                      <div className="text-[11px] text-slate-400">{reg.faculty}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <a
                        href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:text-emerald-400 font-mono flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{reg.phone}</span>
                      </a>
                    </td>
                    <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                      {reg.createdAt}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        reg.status === 'Terverifikasi'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : reg.status === 'Dihubungi'
                          ? 'bg-sky-950 text-sky-400 border border-sky-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedReg(reg)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400] transition-colors"
                        title="Lihat Alasan & Detail"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(reg.id, reg.fullName)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal for Selected Registration */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#F5C400] tracking-wider block">
                  Detail Calon Anggota
                </span>
                <h3 className="text-xl font-black text-white">{selectedReg.fullName}</h3>
              </div>
              <button
                onClick={() => setSelectedReg(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">NIM:</span>
                <span className="font-mono font-bold text-white mt-0.5 block">{selectedReg.nim}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block">Fakultas:</span>
                <span className="font-bold text-white mt-0.5 block">{selectedReg.faculty}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-slate-500 block mb-1">Nomor WhatsApp:</span>
              <a
                href={`https://wa.me/${selectedReg.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#F5C400] font-mono font-bold flex items-center gap-1.5 hover:underline"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{selectedReg.phone} (Klik untuk chat panitia)</span>
              </a>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-300 block mb-1">
                Alasan Bergabung dengan MAPAKTI (Field 5):
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                "{selectedReg.reason}"
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 block">Ubah Status Calon:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedReg.id, 'Menunggu Tinjauan')}
                  className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-colors ${
                    selectedReg.status === 'Menunggu Tinjauan'
                      ? 'bg-amber-950 text-amber-300 border-amber-600'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Menunggu
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReg.id, 'Terverifikasi')}
                  className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-colors ${
                    selectedReg.status === 'Terverifikasi'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-600'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Verifikasi
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedReg.id, 'Dihubungi')}
                  className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-colors ${
                    selectedReg.status === 'Dihubungi'
                      ? 'bg-sky-950 text-sky-400 border-sky-600'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Sudah Dihubungi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
