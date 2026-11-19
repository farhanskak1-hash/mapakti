import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Database,
  Globe
} from 'lucide-react';

/**
 * Resizes and compresses an image client-side to ensure sharp quality
 * while preventing database / payload overflow.
 * Directly produces a DataURL (Base64) stored inside the database JSON.
 */
export const compressImageFile = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('Tidak ada berkas yang dipilih'));
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Berkas yang dipilih bukan gambar (JPG, PNG, WebP, SVG)'));
    }

    // For SVG: keep as vector DataURL
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => reject(new Error('Gagal membaca berkas SVG'));
      reader.readAsDataURL(file);
      return;
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

        // Preserve transparency for PNG
        const isPng = file.type === 'image/png';
        if (!isPng) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        const mimeType = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Gagal memproses berkas gambar'));
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
  hint = 'Mendukung upload langsung ke database (JPG, PNG, WebP) atau link gambar dari internet',
  aspectRatio = 'aspect-video', // e.g. aspect-square, aspect-video, aspect-[4/5]
  required = false
}) => {
  const isBase64 = value && value.startsWith('data:image/');
  const isHttpUrl = value && (value.startsWith('http://') || value.startsWith('https://'));

  const [activeTab, setActiveTab] = useState(isHttpUrl ? 'url' : 'upload'); // 'upload' | 'url'
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
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <label className="block font-semibold text-slate-300 text-xs">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        <div className="flex items-center gap-1 text-[11px] bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3 h-3 text-[#F5C400]" />
            <span>Upload ke Database</span>
          </button>
          <span className="text-slate-700">|</span>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3 h-3 text-[#F5C400]" />
            <span>Link Gambar Internet</span>
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
              <div className={`${aspectRatio} w-full max-h-56 bg-slate-950 flex items-center justify-center overflow-hidden`}>
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80';
                  }}
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
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Gambar Siap Digunakan
                  </span>
                  {isBase64 && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold flex items-center gap-1">
                      <Database className="w-2.5 h-2.5" /> Simpan di Database
                    </span>
                  )}
                  {isHttpUrl && (
                    <span className="px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-700/60 text-[10px] font-bold flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5" /> Link Internet
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[#F5C400] hover:underline font-bold"
                >
                  Upload File Baru
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
                    {isProcessing ? 'Mengoptimasi Gambar untuk Database...' : 'Klik untuk Pilih Foto dari Laptop / HP'}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Gambar otomatis dikompres dan disimpan langsung ke database
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isProcessing}
                  className="mt-1 px-4 py-2 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
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
              placeholder="https://contoh.com/foto-anda.jpg atau https://images.unsplash.com/..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#F5C400] shadow-inner"
            />
            <LinkIcon className="w-4 h-4 text-[#F5C400] absolute left-3 top-3" />
          </div>

          {value && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-36 flex items-center justify-center">
              <img
                src={value}
                alt="Preview URL"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-blue-950/90 text-blue-300 border border-blue-600/60 text-[10px] font-bold flex items-center gap-1">
                <Globe className="w-3 h-3" /> Tautan Internet Aktif
              </div>
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
