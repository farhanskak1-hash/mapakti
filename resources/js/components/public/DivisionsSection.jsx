import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Compass, CheckCircle2, Camera, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

export const DivisionsSection = () => {
  const { divisions, setLightboxImage } = useData();
  const [selectedDivId, setSelectedDivId] = useState(divisions[0]?.id || '');

  const activeDiv = divisions.find((d) => d.id === selectedDivId) || divisions[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> 3 Divisi Operasional MAPAKTI
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Divisi Keahlian & Eksplorasi MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Pusat pengembangan keilmuan, keterampilan teknis penjelajahan alam bebas, dan pengabdian konservasi lingkungan hidup.
          </p>
        </div>
      </div>

      {/* Division Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {divisions.map((div) => (
          <button
            key={div.id}
            onClick={() => setSelectedDivId(div.id)}
            className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
              div.id === activeDiv?.id
                ? 'bg-[#102A56] border-[#F5C400] shadow-lg shadow-[#102A56]/40 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <span className={`text-[10px] font-black px-2 py-0.5 rounded w-max mb-2 ${
              div.id === activeDiv?.id ? 'bg-[#F5C400] text-[#102A56]' : 'bg-slate-800 text-slate-300'
            }`}>
              {div.code}
            </span>
            <span className="font-bold text-xs sm:text-sm line-clamp-2">
              {div.name.split('(')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Active Division Showcase */}
      {activeDiv && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-8 p-6 sm:p-10">
          {/* Top Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A56] border border-[#F5C400]/40 text-[#F5C400] text-xs font-bold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5" /> Kode Divisi: {activeDiv.code}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {activeDiv.name}
              </h2>

              <p className="text-sm font-semibold text-[#F5C400] italic">
                "{activeDiv.tagline}"
              </p>

              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                {activeDiv.shortDesc}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-black">
                <img
                  src={activeDiv.coverImage}
                  alt={activeDiv.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Tasks & Operational Functions (FR-05) */}
          <div className="pt-6 border-t border-slate-800 space-y-4">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#F5C400]" />
              Tugas Singkat & Bidang Operasional Divisi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeDiv.mainTasks?.map((task, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#F5C400] flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
