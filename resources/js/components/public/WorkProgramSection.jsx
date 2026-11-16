import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Flame, Calendar, Target, DollarSign, CheckCircle2, Clock, CheckCircle } from 'lucide-react';

export const WorkProgramSection = () => {
  const { programs } = useData();
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filteredPrograms = programs.filter((p) => {
    if (filterStatus === 'Semua') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" /> Agenda Strategis
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Program Kerja Organisasi MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Daftar program kerja tingkat organisasi yang dirancang untuk pengembangan kader, pengabdian masyarakat, dan ekspedisi alam bebas.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
        {['Semua', 'Rencana', 'Sedang Berjalan', 'Terlaksana'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              filterStatus === st
                ? 'bg-[#F5C400] text-[#102A56]'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Program Cards Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((prog) => {
          const isDone = prog.status === 'Terlaksana';
          const isOngoing = prog.status === 'Sedang Berjalan';

          return (
            <div
              key={prog.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 hover:border-[#F5C400]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                    {prog.divisionOrField}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    isDone
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : isOngoing
                      ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {prog.status}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white leading-snug">
                  {prog.name}
                </h3>

                <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#F5C400] flex-shrink-0" />
                    <span>Jadwal: {prog.timeline}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="w-3.5 h-3.5 text-[#F5C400] flex-shrink-0 mt-0.5" />
                    <span>Sasaran: {prog.targetAudience}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="text-slate-500 block mb-0.5">Target Output:</span>
                  <span className="text-slate-200 font-semibold">{prog.output}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">Anggaran:</span>
                <span className="font-mono font-bold text-[#F5C400]">{prog.budgetEstimated}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
