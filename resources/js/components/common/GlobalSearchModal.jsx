import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Search, X, Calendar, Newspaper, Users, Award, Image as ImageIcon, MapPin, Compass, ArrowRight } from 'lucide-react';

export const GlobalSearchModal = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    news,
    activities,
    divisions,
    programs,
    achievements,
    gallery,
    members,
    alumni,
    setCurrentSection,
    setSelectedNews,
    setSelectedActivity,
    setSelectedMember,
    setLightboxImage
  } = useData();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return null;

    // 1. Berita (hanya published)
    const matchingNews = news
      .filter((n) => !n.isDraft && (n.title.toLowerCase().includes(q) || n.summary.toLowerCase().includes(q)))
      .map((n) => ({ type: 'berita', title: n.title, sub: n.publishedDate, item: n, icon: Newspaper }));

    // 2. Kegiatan & Ekspedisi
    const matchingActivities = activities
      .filter((a) => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.location.toLowerCase().includes(q))
      .map((a) => ({ type: 'kegiatan', title: a.name, sub: `${a.location} • ${a.startDate}`, item: a, icon: Calendar }));

    // 3. Divisi
    const matchingDivisions = divisions
      .filter((d) => d.name.toLowerCase().includes(q) || d.shortDesc.toLowerCase().includes(q))
      .map((d) => ({ type: 'divisi', title: d.name, sub: d.code, item: d, icon: Compass }));

    // 4. Prestasi
    const matchingAchievements = achievements
      .filter((ac) => ac.title.toLowerCase().includes(q) || ac.description.toLowerCase().includes(q))
      .map((ac) => ({ type: 'prestasi', title: ac.title, sub: `${ac.level} (${ac.year})`, item: ac, icon: Award }));

    // 5. Galeri
    const matchingGallery = gallery
      .filter((g) => g.title.toLowerCase().includes(q) || g.location.toLowerCase().includes(q))
      .map((g) => ({ type: 'galeri', title: g.title, sub: `${g.category} - ${g.location}`, item: g, icon: ImageIcon }));

    // 6. Anggota (HANYA YANG PUBLISHED SESUAI FR-04 & FR-17)
    const matchingMembers = members
      .filter((m) => m.isPublished && (m.name.toLowerCase().includes(q) || m.nia.toLowerCase().includes(q) || m.specializationDivision.toLowerCase().includes(q)))
      .map((m) => ({ type: 'anggota', title: m.name, sub: `NIA: ${m.nia} • ${m.specializationDivision}`, item: m, icon: Users }));

    // 7. Alumni (HANYA YANG PUBLISHED SESUAI FR-13 & FR-17)
    const matchingAlumni = alumni
      .filter((al) => al.isPublished && (al.name.toLowerCase().includes(q) || al.currentCareer.toLowerCase().includes(q)))
      .map((al) => ({ type: 'alumni', title: al.name, sub: `${al.batchNumber} • ${al.currentCareer}`, item: al, icon: Users }));

    return [
      ...matchingNews,
      ...matchingActivities,
      ...matchingDivisions,
      ...matchingAchievements,
      ...matchingGallery,
      ...matchingMembers,
      ...matchingAlumni
    ];
  }, [query, news, activities, divisions, achievements, gallery, members, alumni]);

  if (!searchModalOpen) return null;

  const handleSelectResult = (result) => {
    setSearchModalOpen(false);
    setQuery('');

    if (result.type === 'berita') {
      setSelectedNews(result.item);
    } else if (result.type === 'kegiatan') {
      setSelectedActivity(result.item);
    } else if (result.type === 'divisi') {
      setCurrentSection('divisi');
    } else if (result.type === 'prestasi') {
      setCurrentSection('prestasi');
    } else if (result.type === 'galeri') {
      setLightboxImage(result.item);
    } else if (result.type === 'anggota') {
      setSelectedMember(result.item);
    } else if (result.type === 'alumni') {
      setCurrentSection('alumni');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-800 p-4 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-[#F5C400]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita, kegiatan, ekspedisi, divisi, galeri, anggota publik..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {!query && (
            <div className="py-12 text-center text-slate-500 text-xs">
              <Search className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p>Ketik kata kunci untuk mencari di seluruh portal publik MAPAKTI.</p>
              <p className="mt-1 text-[11px] text-slate-600">
                Pencarian aman: Informasi pribadi anggota yang berstatus privat tidak akan ditampilkan.
              </p>
            </div>
          )}

          {query && searchResults && searchResults.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs">
              <p className="font-semibold text-slate-300">Tidak ada hasil yang cocok</p>
              <p className="mt-1 text-slate-500">Coba gunakan kata kunci umum seperti "Slamet", "Climbing", "Mangrove", "Diksar".</p>
            </div>
          )}

          {searchResults && searchResults.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Ditemukan {searchResults.length} Hasil
              </div>
              {searchResults.map((res, idx) => {
                const IconComponent = res.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectResult(res)}
                    className="w-full text-left p-3 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group border border-transparent hover:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#F5C400] transition-colors">
                          {res.title}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {res.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Pencarian Global MAPAKTI</span>
          <span className="text-[#F5C400]">Privasi Data Terjamin</span>
        </div>
      </div>
    </div>
  );
};
