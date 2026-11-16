import React from 'react';
import { useData } from '../../context/DataContext';
import { Award, Camera, MapPin, Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export const DiklatsarSection = () => {
  const { diklatsarEvents, setSelectedDiklatsar } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Kawah Candradimuka
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Sejarah & Dokumentasi DIKLATSAR
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Pendidikan dan Pelatihan Dasar (DIKLATSAR) merupakan kawah candradimuka penempaan mental, fisik, etika lingkungan, dan loyalitas rimbawan sejati MAPAKTI.
          </p>
        </div>
      </div>

      {/* Scope Disclaimer (FR-11 / 5.2) */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A56] text-[#F5C400] flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white">Catatan Ruang Lingkup:</span>
            <p className="text-[11px] text-slate-400">
              Modul ini menyajikan informasi riwayat sejarah dan dokumentasi foto angkatan DIKLATSAR. (Tidak mencakup pendaftaran atau penilaian kelulusan internal).
            </p>
          </div>
        </div>
      </div>

      {/* Diklatsar Batch Timeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diklatsarEvents.map((diksar) => (
          <div
            key={diksar.id}
            onClick={() => setSelectedDiklatsar(diksar)}
            className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] bg-black overflow-hidden">
                <img
                  src={diksar.coverImage}
                  alt={diksar.batchName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-[#F5C400] text-[#102A56] text-xs font-black">
                  DIKSAR {diksar.batchNumber}
                </div>
              </div>

              <div className="px-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Tahun: {diksar.year}</span>
                  <span className="text-[#F5C400] font-bold">{diksar.graduatedCount} Kader Lulus</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-[#F5C400] transition-colors">
                  {diksar.batchName}
                </h3>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>{diksar.location}</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed pt-1">
                  {diksar.historyNotes}
                </p>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#F5C400]">
              <span>Buka Catatan Sejarah & Galeri</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
