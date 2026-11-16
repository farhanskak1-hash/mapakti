import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link as LinkIcon, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';

/**
 * Resizes and compresses an image client-side to ensure sharp quality
 * while preventing localStorage quota overflow.
 */
export const compressImageFile = (file, maxWidth = 1000, maxHeight = 1000, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));
    if (!file.type.startsWith('image/')) {
      return reject(new Error('File yang dipilih bukan berkas gambar'));
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca berkas'));
    reader.readAsDataURL(file);
  });
};

export const ImageUploadInput = ({
  value = '',
  onChange,
  label = 'Foto / Gambar',
  hint = 'Mendukung format JPG, PNG, WebP (otomatis dioptimasi)',
  aspectRatio = 'aspect-video', // e.g. aspect-square, aspect-video, aspect-[4/5]
  required = false
}) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file) => {
    setIsProcessing(true);
    setErrorMessage('');
    try {
      const dataUrl = await compressImageFile(file);
      if (onChange) onChange(dataUrl);
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat mengunggah');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleClear = () => {
    if (onChange) onChange('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-semibold text-slate-300 text-xs">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        <div className="flex items-center gap-1 text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2 py-0.5 rounded font-bold transition-colors ${
              activeTab === 'upload'
                ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Upload File
          </button>
          <span className="text-slate-600">|</span>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2 py-0.5 rounded font-bold transition-colors ${
              activeTab === 'url'
                ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tautan URL
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {value ? (
            <div className="relative group rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
              <div className={`${aspectRatio} w-full max-h-56 bg-black flex items-center justify-center overflow-hidden`}>
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay action buttons */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs flex items-center gap-1.5 shadow-lg transform active:scale-95 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Ganti Foto</span>
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg transform active:scale-95 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Hapus</span>
                </button>
              </div>

              <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Foto Siap Digunakan
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#F5C400] hover:underline font-bold"
                >
                  Pilih Lainnya
                </button>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl cursor-pointer text-center transition-all ${
                isDragOver
                  ? 'border-[#F5C400] bg-[#102A56]/20'
                  : 'border-slate-700 hover:border-[#F5C400]/60 bg-slate-950/60 hover:bg-slate-900/40'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] border border-[#F5C400]/30 flex items-center justify-center shadow-md">
                  {isProcessing ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#F5C400]" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {isProcessing ? 'Mengoptimasi Gambar...' : 'Klik untuk Pilih Foto dari Perangkat'}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    atau seret (drag & drop) file foto ke area ini
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isProcessing}
                  className="mt-1 px-4 py-1.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Pilih Berkas Foto</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="relative">
            <input
              type="url"
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              placeholder="https://contoh.com/foto-anda.jpg"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
            />
            <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          </div>

          {value && (
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-32 flex items-center justify-center">
              <img
                src={value}
                alt="Preview URL"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <button
                type="button"
                onClick={handleClear}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600/90 text-white hover:bg-rose-600 shadow"
                title="Hapus URL"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="text-[11px] text-rose-400 font-semibold">{errorMessage}</div>
      )}

      <p className="text-[10px] text-slate-500">{hint}</p>
    </div>
  );
};
