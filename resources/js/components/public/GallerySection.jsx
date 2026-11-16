import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Image as ImageIcon, MapPin, Calendar, ZoomIn, Eye } from 'lucide-react';

export const GallerySection = () => {
  const { gallery, setLightboxImage } = useData();
  const [selectedCat, setSelectedCat] = useState('Semua');

  const filteredGallery = gallery.filter((item) => {
    if (selectedCat === 'Semua') return true;
    return item.category === selectedCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" /> Dokumentasi Kegiatan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Galeri Dokumentasi Foto MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Kumpulan potret jejak petualangan alam bebas, kegiatan konservasi, dan dinamika kebersamaan rimbawan.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
        {['Semua', 'Hutan Gunung', 'Rock Climbing', 'Konservasi Sumber Daya Alam', 'Diklatsar'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              selectedCat === cat
                ? 'bg-[#F5C400] text-[#102A56]'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGallery.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setLightboxImage(photo)}
            className="group cursor-pointer relative aspect-square rounded-3xl overflow-hidden border border-slate-800 bg-black hover:border-[#F5C400]/60 transition-all duration-300 shadow-lg flex flex-col justify-end"
          >
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="relative z-10 p-4 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-[#102A56]/90 text-[#F5C400] border border-[#F5C400]/40">
                {photo.category}
              </span>
              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                {photo.title}
              </h4>
              <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                <span>{photo.date}</span>
                <span className="flex items-center gap-1 text-[#F5C400] font-semibold">
                  <ZoomIn className="w-3 h-3" /> Zoom
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
