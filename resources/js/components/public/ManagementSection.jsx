import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Users, ShieldCheck, Award, Calendar, ChevronRight, Camera, Maximize2 } from 'lucide-react';

export const ManagementSection = () => {
  const { periods, setLightboxImage } = useData();
  const [selectedPeriodId, setSelectedPeriodId] = useState(() => {
    const active = periods.find((p) => p.status === 'Aktif');
    return active ? active.id : periods[0]?.id || '';
  });

  const activePeriod = periods.find((p) => p.id === selectedPeriodId) || periods[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> Struktur Organisasi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Struktur Kepengurusan MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Jajaran Dewan Pengurus Harian dan Koordinator Bidang yang mengemban amanah roda organisasi per periode masa bakti.
          </p>
        </div>
      </div>

      {/* Periode Selector Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Arsip Periode Masa Bakti:
        </div>
        <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
          {periods.map((period) => {
            const isSelected = period.id === activePeriod?.id;
            const isAktif = period.status === 'Aktif';
            const isPersiapan = period.status === 'Persiapan';

            return (
              <button
                key={period.id}
                onClick={() => setSelectedPeriodId(period.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#F5C400] text-[#102A56] shadow-lg shadow-[#F5C400]/20 ring-2 ring-[#F5C400]'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{period.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isAktif
                      ? isSelected
                        ? 'bg-[#102A56] text-[#F5C400]'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : isPersiapan
                      ? isSelected
                        ? 'bg-[#102A56] text-sky-300'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                      : isSelected
                      ? 'bg-slate-900/80 text-slate-200'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {period.status}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Period Theme Motto & Group Photo */}
      {activePeriod && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5C400] text-[#102A56]">
                  {activePeriod.status === 'Aktif'
                    ? 'Pengurus Aktif'
                    : activePeriod.status === 'Persiapan'
                    ? 'Masa Persiapan'
                    : 'Demisioner'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activePeriod.startYear && activePeriod.endYear ? `${activePeriod.startYear} - ${activePeriod.endYear}` : ''}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{activePeriod.name}</h3>
              {activePeriod.theme && (
                <p className="text-sm text-slate-300 italic">"{activePeriod.theme}"</p>
              )}
            </div>
            <div className="text-xs text-slate-400 font-mono bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              Total Pengurus: <span className="font-bold text-[#F5C400]">{activePeriod.members?.length || 0}</span> Personil
            </div>
          </div>

          {/* Group Photo Showcase (Resolusi Full HD & Zoom Lightbox) */}
          {activePeriod.groupPhotoUrl && (
            <div
              onClick={() => setLightboxImage && setLightboxImage(activePeriod.groupPhotoUrl)}
              className="relative rounded-3xl overflow-hidden border border-slate-800 group shadow-2xl cursor-pointer bg-slate-950"
              title="Klik untuk melihat foto dalam ukuran penuh / HD"
            >
              <div className="w-full flex items-center justify-center bg-slate-950">
                <img
                  src={activePeriod.groupPhotoUrl}
                  alt={`Foto Bersama Dewan Pengurus ${activePeriod.name}`}
                  className="w-full h-auto max-h-[560px] object-contain sm:object-cover group-hover:scale-[1.01] transition-transform duration-700"
                  loading="eager"
                />
              </div>

              {/* Overlay Label & Zoom Indicator */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex items-end justify-between p-4 sm:p-6 pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-lg">
                  <Camera className="w-4 h-4 text-[#F5C400]" />
                  <span>Foto Bersama Dewan Pengurus {activePeriod.name}</span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F5C400] bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F5C400]/40 shadow-lg group-hover:bg-[#F5C400] group-hover:text-[#102A56] transition-colors pointer-events-auto">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Perbesar HD</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Members Grid */}
      {activePeriod && (
        <div>
          {activePeriod.members?.length === 0 ? (
            <div className="text-center py-16 rounded-3xl bg-slate-900 border border-slate-800 space-y-2">
              <Users className="w-12 h-12 text-slate-600 mx-auto" />
              <div className="text-base font-bold text-slate-300">Struktur Pengurus Belum Diinput</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Susunan pengurus untuk {activePeriod.name} sedang dalam proses pendataan oleh pengurus organisasi.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {activePeriod.members?.map((member) => (
                <div
                  key={member.id}
                  className="group rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
                >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#102A56]/90 border border-[#F5C400]/40 text-[#F5C400] text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                      {member.division}
                    </div>
                  </div>

                  <div className="p-5 space-y-2 text-center">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-[#F5C400] border border-slate-700">
                      {member.position}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#F5C400] transition-colors leading-tight">
                      {member.name}
                    </h4>
                    {member.nia && (
                      <div className="text-[11px] font-mono text-slate-400">
                        {member.nia}
                      </div>
                    )}
                    <p className="text-xs text-slate-400">{member.faculty}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
