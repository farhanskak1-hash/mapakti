import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Calendar, MapPin, User, DollarSign, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export const ActivitiesSection = () => {
  const { activities, setSelectedActivity } = useData();
  const [filterType, setFilterType] = useState('Semua');

  const filteredActivities = activities.filter((act) => {
    if (filterType === 'Semua') return true;
    if (filterType === 'Mendatang') return act.status === 'Akan Datang';
    if (filterType === 'Riwayat') return act.status === 'Selesai';
    return act.type === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" /> Agenda & Arsip Kegiatan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Kegiatan, Ekspedisi & Pengabdian
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Daftar kegiatan mendatang dan riwayat ekspedisi yang telah dilaksanakan oleh MAPAKTI Universitas Pancasakti Tegal.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
        {['Semua', 'Mendatang', 'Riwayat', 'Ekspedisi', 'Pelatihan', 'Bakti Sosial & Konservasi'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              filterType === tab
                ? 'bg-[#F5C400] text-[#102A56]'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid of Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between space-y-5 hover:border-[#F5C400]/40 transition-all hover:shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40">
                  {act.type}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  act.isRegistrationOpen
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {act.isRegistrationOpen ? 'Pendaftaran Dibuka' : act.status}
                </span>
              </div>

              <h3
                onClick={() => setSelectedActivity(act)}
                className="text-lg font-black text-white hover:text-[#F5C400] transition-colors cursor-pointer leading-snug"
              >
                {act.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {act.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>{act.startDate} {act.endDate !== act.startDate ? `s/d ${act.endDate}` : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span className="truncate">{act.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>PIC: {act.pic}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedActivity(act)}
              className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-200 hover:text-[#F5C400] font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>Lihat Detail {act.isRegistrationOpen && '& Daftar Peserta'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
