import React from 'react';
import { useData } from '../../context/DataContext';
import { Trophy, Award, Calendar, User, Sparkles } from 'lucide-react';

export const AchievementsSection = () => {
  const { achievements } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" /> Torehan Kehormatan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Rekor Prestasi & Penghargaan
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Daftar raihan kejuaraan kompetisi rock climbing, navigasi darat rimba, dan penghargaan konservasi lingkungan MAPAKTI.
          </p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4 hover:border-[#F5C400]/50 transition-all shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                  {ach.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
                  {ach.level} • {ach.year}
                </span>
              </div>

              <h3 className="text-xl font-black text-white leading-snug">
                {ach.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-[#F5C400] font-semibold">
                <User className="w-4 h-4" />
                <span>Penerima: {ach.recipient}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {ach.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#F5C400]" />
                Dokumen Sertifikat Terverifikasi
              </span>
              <span className="font-mono text-slate-400">Tahun {ach.year}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
