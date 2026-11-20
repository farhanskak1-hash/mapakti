import React, { useState, useMemo, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { sortGenerations } from '../../utils/romanNumerals';
import {
  Users,
  Search,
  ShieldCheck,
  Award,
  Sparkles,
  Eye,
  Lock,
  ArrowRight,
  Compass,
  Calendar,
  Layers,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide
} from 'lucide-react';

export const MembersSection = () => {
  const { members, setSelectedMember } = useData();

  const [searchQuery, setSearchQuery] = useState('');

  // Mode pengurutan angkatan: 'desc' (Angkatan terbaru ke terlama: XXIV -> I) atau 'asc' (I -> XXIV)
  // Default 'desc' agar selalu mengutamakan dan menampilkan angkatan paling baru di urutan terdepan
  const [sortOrder, setSortOrder] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mapakti_gen_sort_order_v2');
      if (stored === 'asc' || stored === 'desc') return stored;
    }
    return 'desc';
  });

  const toggleSortOrder = () => {
    const nextOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(nextOrder);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('mapakti_gen_sort_order_v2', nextOrder);
      } catch (e) {}
    }
  };

  // Ekstrak seluruh angkatan unik dari anggota yang dipublikasikan, diurutkan akurat berdasarkan angka Romawi
  const availableGenerations = useMemo(() => {
    const published = members.filter((m) => m.isPublished && m.generation && m.generation.trim());
    const gens = Array.from(new Set(published.map((m) => m.generation.trim())));
    return sortGenerations(gens, sortOrder);
  }, [members, sortOrder]);

  // Direct selection per Angkatan (no "Semua" option)
  const [selectedGeneration, setSelectedGeneration] = useState('');

  // Auto-select the first (newest) Angkatan when list is available
  useEffect(() => {
    if (availableGenerations.length > 0 && (!selectedGeneration || !availableGenerations.includes(selectedGeneration))) {
      setSelectedGeneration(availableGenerations[0]);
    }
  }, [availableGenerations, selectedGeneration]);

  // Filter members by selected Angkatan and search query
  const displayedMembers = useMemo(() => {
    return members.filter((m) => {
      if (!m.isPublished) return false;

      // Filter directly by selected angkatan
      const matchGen = selectedGeneration ? m.generation?.trim() === selectedGeneration : true;

      // Filter by search query (name, NIA, faculty, division)
      const matchSearch = searchQuery.trim() === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.nia.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.faculty && m.faculty.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (m.specializationDivision && m.specializationDivision.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchGen && matchSearch;
    });
  }, [members, selectedGeneration, searchQuery]);

  // Helper for status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Anggota Muda':
        return {
          pill: 'bg-sky-500/25 text-sky-300 border-sky-400/40',
          dot: 'bg-sky-400',
          icon: <Sparkles className="w-3 h-3 text-sky-300" />,
          label: 'Anggota Muda'
        };
      case 'Anggota Luar Biasa':
        return {
          pill: 'bg-purple-500/25 text-purple-300 border-purple-400/40',
          dot: 'bg-purple-400',
          icon: <Award className="w-3 h-3 text-purple-300" />,
          label: 'Anggota Luar Biasa'
        };
      case 'Anggota Tetap':
      default:
        return {
          pill: 'bg-emerald-500/25 text-emerald-300 border-emerald-400/40',
          dot: 'bg-emerald-400',
          icon: <ShieldCheck className="w-3 h-3 text-emerald-300" />,
          label: 'Anggota Tetap'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider shadow-md">
            <Users className="w-3.5 h-3.5" /> Direktori Anggota Per Angkatan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Data Anggota MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            Daftar resmi kader rimbawan MAPAKTI Universitas Pancasakti Tegal yang disajikan langsung per angkatan lengkap dengan status keanggotaan resmi (Anggota Tetap, Anggota Muda, atau Anggota Luar Biasa).
          </p>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-4 shadow-sm">
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

      {/* Primary Navigation: Langsung Per Angkatan (Tanpa Pilihan 'Semua') */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#F5C400]">
            <Layers className="w-4 h-4" />
            <span>Pilih Angkatan:</span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Tombol Pengubah Urutan Angkatan (Romawi Terkini -> Terlama atau Sebaliknya) */}
            <button
              type="button"
              onClick={toggleSortOrder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-[#F5C400]/60 text-xs font-medium text-slate-300 hover:text-white transition-all shadow-sm active:scale-95"
              title="Klik untuk mengubah urutan nomor angkatan"
            >
              {sortOrder === 'desc' ? (
                <>
                  <ArrowDownWideNarrow className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>Urutan: <strong className="text-[#F5C400] font-bold">Terbaru → Terlama</strong></span>
                </>
              ) : (
                <>
                  <ArrowUpNarrowWide className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>Urutan: <strong className="text-[#F5C400] font-bold">Terlama (Angkatan I) → Terbaru</strong></span>
                </>
              )}
            </button>

            <span className="text-xs text-slate-400">
              Total {availableGenerations.length} Angkatan Terdaftar
            </span>
          </div>
        </div>

        {availableGenerations.length === 0 ? (
          <div className="p-6 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
            Belum ada data angkatan yang dipublikasikan.
          </div>
        ) : (
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {availableGenerations.map((gen) => {
              const count = members.filter((m) => m.isPublished && m.generation?.trim() === gen).length;
              const isActive = selectedGeneration === gen;
              return (
                <button
                  key={gen}
                  onClick={() => setSelectedGeneration(gen)}
                  className={`px-5 py-3 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2.5 shadow-sm transform active:scale-95 ${
                    isActive
                      ? 'bg-[#F5C400] text-[#102A56] shadow-lg shadow-[#F5C400]/25 ring-2 ring-[#F5C400]/60 scale-105'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Users className={`w-3.5 h-3.5 ${isActive ? 'text-[#102A56]' : 'text-[#F5C400]'}`} />
                  <span>{gen}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-[#102A56] text-[#F5C400]' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count} Anggota
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Search Bar inside Selected Angkatan */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari nama, NIA, atau divisi di ${selectedGeneration || 'angkatan ini'}...`}
            className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">
            Menampilkan: <strong className="text-[#F5C400]">{displayedMembers.length}</strong> Orang Anggota
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-[#102A56] text-[#F5C400] font-bold text-[11px] border border-[#F5C400]/30">
            {selectedGeneration || 'Semua Angkatan'}
          </span>
        </div>
      </div>

      {/* Members Grid per Angkatan */}
      {displayedMembers.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-slate-900 border border-slate-800 text-slate-400 text-xs space-y-2">
          <Users className="w-12 h-12 mx-auto text-slate-600 mb-2" />
          <p className="font-bold text-slate-200 text-base">Tidak ada data anggota di angkatan ini</p>
          <p className="text-slate-400">
            {searchQuery ? 'Coba sesuaikan kata kunci pencarian Anda.' : 'Pilih tab angkatan lain di atas untuk melihat daftar kader.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMembers.map((member) => {
            const badge = getStatusBadge(member.membershipStatus);

            return (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo with Overlay Status Badge */}
                  <div className="relative aspect-[4/5] bg-black overflow-hidden">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    {/* Prominent Status Badge on Top of Photo */}
                    <div className="absolute top-3 left-3">
                      <div className={`px-2.5 py-1 rounded-xl border backdrop-blur-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg ${badge.pill}`}>
                        {badge.icon}
                        <span>{member.membershipStatus}</span>
                      </div>
                    </div>

                    {/* Angkatan Pill on Bottom of Photo */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-[#F5C400] bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-[#F5C400]/30 font-bold">
                        {member.nia}
                      </span>
                    </div>
                  </div>

                  {/* Member Details */}
                  <div className="px-5 space-y-2">
                    <h3 className="font-black text-white text-base leading-snug group-hover:text-[#F5C400] transition-colors">
                      {member.name}
                    </h3>

                    {/* Dedicated Membership Status Pill */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Status:</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.pill}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        {member.membershipStatus}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-medium">{member.faculty || 'Fakultas Mahasiswa'}</div>
                    <div className="text-[11px] text-slate-500 font-normal">{member.generation}</div>
                  </div>
                </div>

                {/* Footer Card */}
                <div className="p-5 pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-[#F5C400] transition-colors">
                  <span className="truncate max-w-[180px]">{member.specializationDivision}</span>
                  <div className="flex items-center gap-1 text-[11px] text-[#F5C400]">
                    <span>Biodata</span>
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
