import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ShieldCheck, Lock, Mail, X, AlertTriangle } from 'lucide-react';
import { Logo } from './Logo';

export const AdminLoginModal = () => {
  const { showLoginModal, setShowLoginModal, loginAdmin } = useData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!showLoginModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(email, password);
    if (!success) {
      setErrorMsg('Email atau kata sandi tidak sesuai. Silakan periksa kembali.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={() => setShowLoginModal(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-6">
          <Logo size="md" lightText={true} />
          <div className="mt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] border border-[#F5C400]/40 text-[#F5C400] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Portal Administrator</span>
            </div>
            <h3 className="text-xl font-black text-white">Login Pengurus Organisasi</h3>
            <p className="text-xs text-slate-400 mt-1">
              Khusus administrator MAPAKTI untuk pengelolaan CMS, data anggota, dan kegiatan.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Administrator
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@mapakti.tegal"
                className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-sm shadow-lg shadow-[#F5C400]/20 transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Masuk ke Panel Administrator</span>
          </button>
        </form>
      </div>
    </div>
  );
};
