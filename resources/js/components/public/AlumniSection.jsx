import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Briefcase, GraduationCap, Quote, Lock } from 'lucide-react';

export const AlumniSection = () => {
  const { alumni } = useData();

  // Strict: Only show alumni with isPublished === true (FR-13 & NFR-04)
  const publicAlumni = alumni.filter((a) => a.isPublished);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" /> Ikatan Alumni Rimbawan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Direktori Alumni MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Jejak langkah pengabdian para alumni MAPAKTI yang kini berkiprah di berbagai sektor profesional, akademisi, dan pelestari lingkungan.
          </p>
        </div>
      </div>

      {/* Privacy Notice Banner (FR-13) */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Ketentuan Tampilan Alumni:</span>
            <p className="text-[11px] text-slate-400">
              Halaman ini hanya menampilkan data alumni yang telah memberikan persetujuan publikasi secara resmi.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
          Izin Publikasi Aktif
        </span>
      </div>

      {/* Alumni Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publicAlumni.map((alm) => (
          <div
            key={alm.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 hover:border-[#F5C400]/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#F5C400] flex-shrink-0 bg-black">
                  <img src={alm.photoUrl} alt={alm.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{alm.name}</h3>
                  <div className="text-xs font-mono text-[#F5C400]">{alm.nia}</div>
                  <div className="text-[11px] text-slate-400">{alm.batchNumber}</div>
                </div>
              </div>

              <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>{alm.currentCareer}</span>
                </div>
                <div className="text-[11px] text-slate-500 pl-5.5">
                  {alm.companyOrInstitution} (Lulus {alm.graduationYear})
                </div>
              </div>

              <blockquote className="text-xs text-slate-300 italic leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border-l-2 border-l-[#F5C400]">
                "{alm.testimony}"
              </blockquote>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
              <span>Status: Alumni Terdaftar</span>
              <span className="text-[#F5C400]">UPS Tegal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
