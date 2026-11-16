import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Newspaper, Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const NewsSection = () => {
  const { news, setSelectedNews } = useData();
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Strict: Only show non-draft articles to the public (FR-09)
  const publishedArticles = news.filter((item) => {
    if (item.isDraft) return false;
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" /> Portal Publikasi & Warta Rimba
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Berita & Publikasi MAPAKTI
          </h1>
          <p className="text-sm sm:text-base text-slate-200">
            Kabar terbaru seputar ekspedisi rimba, advokasi konservasi, prestasi, dan agenda keorganisasian.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-4 overflow-x-auto">
        {['Semua', 'DIKLATSAR', 'Konservasi', 'Prestasi', 'Ekspedisi'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              selectedCategory === cat
                ? 'bg-[#F5C400] text-[#102A56]'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publishedArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedNews(article)}
            className="group cursor-pointer rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={article.coverImageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#102A56]/90 border border-[#F5C400]/50 text-[#F5C400] text-[10px] font-black uppercase">
                  {article.category}
                </div>
              </div>

              <div className="px-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>{article.publishedDate}</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
                <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#F5C400] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-[#F5C400]">
              <span>Baca Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
