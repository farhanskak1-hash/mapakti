import React, { useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Database,
  Globe,
  Sparkles
} from 'lucide-react';

/**
 * Resizes and compresses an image client-side to ensure sharp HD quality
 * while preventing database / payload overflow.
 * Uses URL.createObjectURL for memory efficiency, supporting large files (5MB - 50MB+).
 * Directly produces an ultra-lightweight DataURL (Base64 JPEG) stored inside the database JSON.
 */
export const compressImageFile = (file, maxWidth = 1440, maxHeight = 960, quality = 0.84) => {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('Tidak ada berkas yang dipilih'));

    const isImageMime = file.type && file.type.startsWith('image/');
    const isImageExt = /\.(jpe?g|png|webp|svg|bmp|gif|avif|heic|heif)$/i.test(file.name || '');
    if (!isImageMime && !isImageExt) {
      return reject(new Error('Berkas yang dipilih bukan format gambar yang didukung (JPG, PNG, WebP, SVG, BMP)'));
    }

    // Untuk SVG: baca sebagai teks / DataURL langsung
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = (e) =>
        resolve({
          dataUrl: e.target.result,
          originalBytes: file.size,
          compressedBytes: e.target.result.length
        });
      reader.onerror = () => reject(new Error('Gagal membaca berkas SVG'));
      reader.readAsDataURL(file);
      return;
    }

    // Gunakan URL.createObjectURL alih-alih FileReader untuk menghemat memori drastis
    // (Bisa memproses foto kamera HP 5MB, 10MB, 20MB, hingga 50MB tanpa membebani RAM browser)
    let blobUrl = null;
    try {
      blobUrl = URL.createObjectURL(file);
    } catch (err) {
      // Fallback jika createObjectURL tidak didukung
    }

    const img = new Image();

    const cleanup = () => {
      if (blobUrl) {
        try {
          URL.revokeObjectURL(blobUrl);
        } catch (e) {}
      }
    };

    img.onload = () => {
      try {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Hitung skala dimensi proporsional agar aspek rasio terjaga
        if (width > maxWidth || height > maxHeight) {
          if (width / maxWidth > height / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        width = Math.max(1, width);
        height = Math.max(1, height);

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { alpha: false });

        // Latar belakang putih bersih
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Smoothing kualitas tinggi
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Ekspor ke JPEG berkualitas tajam Full HD (0.88 - 0.94)
        const targetQuality = Math.min(Math.max(quality || 0.88, 0.70), 0.94);
        const dataUrl = canvas.toDataURL('image/jpeg', targetQuality);

        cleanup();

        resolve({
          dataUrl,
          originalBytes: file.size,
          compressedBytes: Math.round(dataUrl.length * 0.75),
          width,
          height
        });
      } catch (procErr) {
        cleanup();
        reject(new Error('Gagal mengompresi gambar: ' + procErr.message));
      }
    };

    img.onerror = () => {
      cleanup();
      // Fallback FileReader jika createObjectURL diblokir
      const reader = new FileReader();
      reader.onload = (re) => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          try {
            let width = fallbackImg.width;
            let height = fallbackImg.height;
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
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(fallbackImg, 0, 0, width, height);
            const targetQuality = Math.min(Math.max(quality || 0.88, 0.70), 0.94);
            const dataUrl = canvas.toDataURL('image/jpeg', targetQuality);
            resolve({
              dataUrl,
              originalBytes: file.size,
              compressedBytes: Math.round(dataUrl.length * 0.75),
              width,
              height
            });
          } catch (e) {
            reject(new Error('Gagal memproses gambar fallback'));
          }
        };
        fallbackImg.onerror = () => reject(new Error('Format gambar tidak dapat dibaca oleh browser'));
        fallbackImg.src = re.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca berkas gambar'));
      reader.readAsDataURL(file);
    };

    if (blobUrl) {
      img.src = blobUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Gagal membaca berkas'));
      reader.readAsDataURL(file);
    }
  });
};

export const ImageUploadInput = ({
  value = '',
  onChange,
  label = 'Foto / Gambar',
  hint = 'Mendukung upload langsung foto ukuran bebas > 5MB hingga 50MB (JPG, PNG, WebP) atau link gambar dari internet',
  aspectRatio = 'aspect-video', // e.g. aspect-square, aspect-video, aspect-[4/5]
  required = false,
  maxWidth = 1440,
  maxHeight = 960,
  quality = 0.84,
  isGroupPhoto = false
}) => {
  const isBase64 = value && value.startsWith('data:image/');
  const isHttpUrl = value && (value.startsWith('http://') || value.startsWith('https://'));

  const [activeTab, setActiveTab] = useState(isHttpUrl ? 'url' : 'upload'); // 'upload' | 'url'
  const [resolutionMode, setResolutionMode] = useState(isGroupPhoto || maxWidth >= 1200 ? 'hd' : 'standard'); // 'hd' | 'standard'
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingNote, setProcessingNote] = useState('');
  const [uploadStats, setUploadStats] = useState(null);
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
    const originalMb = (file.size / (1024 * 1024)).toFixed(1);
    setProcessingNote(
      file.size > 2 * 1024 * 1024
        ? `Mengoptimasi foto resolusi tinggi (${originalMb} MB) ke kualitas Full HD hemat memori...`
        : 'Memproses foto ke kualitas HD tajam...'
    );

    try {
      const activeMaxWidth = resolutionMode === 'hd' ? Math.max(maxWidth, 1440) : 800;
      const activeMaxHeight = resolutionMode === 'hd' ? Math.max(maxHeight, 960) : 600;
      const activeQuality = resolutionMode === 'hd' ? Math.min(Math.max(quality, 0.82), 0.86) : 0.78;

      const result = await compressImageFile(file, activeMaxWidth, activeMaxHeight, activeQuality);
      const url = typeof result === 'string' ? result : result.dataUrl;

      const origSizeStr =
        file.size >= 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(file.size / 1024)} KB`;

      const compSizeStr = result.compressedBytes
        ? `${Math.round(result.compressedBytes / 1024)} KB`
        : `${Math.round((url.length * 0.75) / 1024)} KB`;

      setUploadStats({
        name: file.name,
        original: origSizeStr,
        compressed: compSizeStr,
        width: result.width,
        height: result.height,
        isHd: (result.width || 0) >= 1200
      });

      if (onChange) onChange(url);
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat mengunggah gambar');
    } finally {
      setIsProcessing(false);
      setProcessingNote('');
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
    setUploadStats(null);
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

      {activeTab === 'upload' && (
        <div className="flex flex-wrap items-center justify-between text-xs py-1 px-1 gap-2">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F5C400]" />
            <span>Kualitas Gambar:</span>
          </span>
          <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5">
            <button
              type="button"
              onClick={() => setResolutionMode('hd')}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
                resolutionMode === 'hd'
                  ? 'bg-[#F5C400] text-[#102A56] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Full HD 1080p (Tajam & Tidak Pecah)</span>
            </button>
            <button
              type="button"
              onClick={() => setResolutionMode('standard')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                resolutionMode === 'standard'
                  ? 'bg-[#102A56] text-[#F5C400] shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Standar (1000px)</span>
            </button>
          </div>
        </div>
      )}

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
              <div className={`${aspectRatio} w-full max-h-80 bg-slate-950 flex items-center justify-center overflow-hidden`}>
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-contain sm:object-cover"
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

              <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Foto Siap Digunakan
                  </span>
                  {uploadStats && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#F5C400]" />
                      <span>{uploadStats.isHd ? 'Full HD 1080p' : 'Standar'} ({uploadStats.width}×{uploadStats.height}px • {uploadStats.compressed})</span>
                    </span>
                  )}
                  {isBase64 && !uploadStats && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 text-[10px] font-bold flex items-center gap-1">
                      <Database className="w-2.5 h-2.5" /> Database
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
                    {isProcessing ? processingNote || 'Mengoptimasi Gambar...' : 'Klik atau Tarik Foto ke Sini'}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Mendukung foto ukuran besar & kamera HP (&gt; 5MB hingga 50MB, JPG, PNG, WebP)
                  </p>
                  <div className="inline-flex items-center gap-1 text-[10px] text-[#F5C400] bg-[#102A56] px-2.5 py-0.5 rounded-full border border-[#F5C400]/30 mt-1">
                    <Sparkles className="w-3 h-3 text-[#F5C400]" /> Bebas ukuran: otomatis dioptimasi HD & hemat kuota
                  </div>
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
