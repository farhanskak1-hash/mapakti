import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Users, Search, ShieldCheck, Filter, ArrowRight, Eye, Lock } from 'lucide-react';

export const MembersSection = () => {
  const { members, setSelectedMember } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');

  // Filter ONLY published members
  const publicMembers = useMemo(() => {
    return members.filter((m) => {
      if (!m.isPublished) return false; // Strict privacy rule

      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.nia.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.generation.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDiv = selectedDivision === 'Semua' || m.specializationDivision.includes(selectedDivision);
      const matchStatus = selectedStatus === 'Semua' || m.membershipStatus === selectedStatus;

      return matchSearch && matchDiv && matchStatus;
    });
  }, [members, searchQuery, selectedDivision, selectedStatus]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Direktori Anggota Terverifikasi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Data Anggota MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Daftar kader dan anggota resmi MAPAKTI Universitas Pancasakti Tegal yang informasinya diizinkan untuk dipublikasikan.
          </p>
        </div>
      </div>

      {/* Privacy Notice Banner (NFR-04) */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Kebijakan Privasi Data Anggota:</span>
            <p className="text-[11px] text-slate-400">
              Informasi kontak pribadi (telepon dan surel) tidak ditampilkan kepada publik demi keamanan dan privasi data anggota.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
          Privasi Terlindungi
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama anggota, NIA, angkatan diksar..."
            className="w-full bg-slate-900 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* Division Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['Semua', 'Hutan Gunung', 'Rock Climbing', 'Konservasi Sumber Daya Alam'].map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedDivision === div
                  ? 'bg-[#F5C400] text-[#102A56]'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {div}
            </button>
          ))}
        </div>
      </div>

      {/* Membership Status Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800/80">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-2 hidden sm:inline">
          Status:
        </span>
        {['Semua', 'Anggota Tetap', 'Anggota Luar Biasa', 'Anggota Muda'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedStatus === status
                ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/50 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Members Grid */}
      {publicMembers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
          <Users className="w-10 h-10 mx-auto mb-2 text-slate-600" />
          <p className="font-bold text-slate-300 text-sm">Tidak ada anggota publik ditemukan</p>
          <p className="mt-1">Coba sesuaikan kata kunci pencarian atau filter divisi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {publicMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[4/5] bg-black overflow-hidden">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-[#102A56]/90 border border-[#F5C400]/40 text-[#F5C400] text-[10px] font-bold uppercase tracking-wider">
                    {member.membershipStatus}
                  </div>
                </div>

                <div className="px-5 space-y-1.5">
                  <div className="text-[11px] font-mono text-[#F5C400]">{member.nia}</div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#F5C400] transition-colors">
                    {member.name}
                  </h3>
                  <div className="text-xs text-slate-400">{member.generation}</div>
                  <div className="text-[11px] text-slate-500">{member.faculty}</div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#F5C400]">
                <span>{member.specializationDivision}</span>
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
