import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Lock, Search, ShieldCheck, Clock, User, FileText } from 'lucide-react';

export const AdminAuditLogs = () => {
  const { auditLogs } = useData();
  const [search, setSearch] = useState('');
  const [filterAction, setFilterAction] = useState('Semua');

  const filteredLogs = auditLogs.filter((log) => {
    const matchSearch =
      log.module.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase());

    const matchAction = filterAction === 'Semua' || log.action === filterAction;

    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#F5C400]" />
            Audit Log Aktivitas Keamanan
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Riwayat pencatatan rekam jejak aktivitas pengubahan data sensitif, publikasi anggota, dan aksi administratif.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Total Log Tercatat: <span className="font-bold text-[#F5C400]">{auditLogs.length}</span> Entri
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari modul, deskripsi aksi, atau user..."
            className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['Semua', 'CREATE', 'UPDATE', 'DELETE', 'PRIVACY_TOGGLE', 'LOGIN', 'BACKUP'].map((act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                filterAction === act
                  ? 'bg-[#F5C400] text-[#102A56]'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Waktu Kejadian</th>
                <th className="px-4 py-3.5">Aktor / User</th>
                <th className="px-4 py-3.5">Jenis Aksi</th>
                <th className="px-4 py-3.5">Modul Sistem</th>
                <th className="px-5 py-3.5">Rincian Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-[11px]">
              {filteredLogs.map((log) => {
                const isDelete = log.action === 'DELETE';
                const isCreate = log.action === 'CREATE';
                const isPrivacy = log.action === 'PRIVACY_TOGGLE';

                return (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 text-slate-400 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="px-4 py-3.5 text-slate-300">
                      {log.user}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isDelete
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : isCreate
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : isPrivacy
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#F5C400] font-sans font-semibold">
                      {log.module}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-sans text-xs">
                      {log.details}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
