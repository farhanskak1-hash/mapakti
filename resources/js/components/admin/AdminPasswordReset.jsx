import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Save,
  HelpCircle
} from 'lucide-react';

export const AdminPasswordReset = () => {
  const { settings, updateAdminCredentials, auditLogs } = useData();

  const currentConfiguredEmail = settings.adminAccount?.email || 'admin@mapakti.tegal';
  const lastUpdated = settings.adminAccount?.updatedAt || 'Bawaan Sistem';

  const [email, setEmail] = useState(currentConfiguredEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Sync email if settings updates
  React.useEffect(() => {
    if (settings.adminAccount?.email) {
      setEmail(settings.adminAccount.email);
    }
  }, [settings.adminAccount?.email]);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const hasMinLength = newPassword.length >= 6;
  const hasMixedCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumberOrSpecial = /[\d\W]/.test(newPassword);

  let strengthScore = 0;
  if (hasMinLength) strengthScore += 1;
  if (hasMixedCase) strengthScore += 1;
  if (hasNumberOrSpecial) strengthScore += 1;

  const strengthLabels = ['Sangat Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
  const strengthColors = ['bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-emerald-400'];

  const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!currentPassword) {
      setErrorMsg('Harap masukkan kata sandi saat ini untuk verifikasi keamanan.');
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Kata sandi baru minimal harus terdiri dari 6 karakter.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi baru tidak cocok. Harap periksa kembali.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = updateAdminCredentials({
        currentPassword,
        newEmail: email,
        newPassword
      });

      if (result.success) {
        setSuccessMsg('Kata sandi dan email administrator berhasil diperbarui dan tersimpan di database!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMsg(result.message || 'Gagal memperbarui kredensial. Periksa kata sandi saat ini.');
      }
    } catch (err) {
      setErrorMsg('Terjadi kesalahan saat menyimpan ke database: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const securityLogs = auditLogs
    .filter((log) => log.module === 'Keamanan' || log.module === 'Keamanan Akun')
    .slice(0, 5);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102A56] border border-[#F5C400]/40 text-[#F5C400] text-xs font-bold uppercase tracking-wider mb-2">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Keamanan Akses Administrator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            Pengaturan Ulang Kata Sandi & Kredensial
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Kelola alamat email akses login dan perbarui kata sandi akun administrator MAPAKTI.
            Perubahan disimpan langsung ke database server dan akan berlaku pada login berikutnya.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs">
          <Clock className="w-4 h-4 text-[#F5C400]" />
          <div>
            <div className="text-[10px] text-slate-500 uppercase font-semibold">Pembaruan Terakhir</div>
            <div className="font-mono text-slate-200 text-[11px] font-bold">{lastUpdated}</div>
          </div>
        </div>
      </div>

      {/* Status Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#102A56]/40 to-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#F5C400]/10 border border-[#F5C400]/30 flex items-center justify-center text-[#F5C400] flex-shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Akun Administrator Aktif:</div>
            <div className="text-sm font-black text-white font-mono">{currentConfiguredEmail}</div>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Tersinkronisasi ke Database</span>
        </div>
      </div>

      {/* Main Grid: Form and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#F5C400]" />
              Formulir Perubahan Kata Sandi & Email
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Masukkan kata sandi lama Anda untuk verifikasi identitas, kemudian tentukan kredensial baru.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Alamat Email Administrator
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mapakti.tegal"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Email ini digunakan untuk masuk ke panel admin MAPAKTI.
              </p>
            </div>

            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi Saat Ini <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showCurrentPass ? 'text' : 'password'}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Masukkan kata sandi lama Anda"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPass(!showCurrentPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                >
                  {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Wajib diisi untuk memverifikasi bahwa Anda adalah pemegang akun resmi.
              </p>
            </div>

            {/* Divider */}
            <div className="pt-2 border-t border-slate-800"></div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Kata Sandi Baru <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass(!showNewPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                >
                  {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicators */}
              {newPassword && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Kekuatan Sandi:</span>
                    <span className="font-bold text-white">{strengthLabels[strengthScore]}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full rounded-full transition-all ${strengthScore >= 1 ? strengthColors[strengthScore] : 'bg-transparent'} flex-1`}></div>
                    <div className={`h-full rounded-full transition-all ${strengthScore >= 2 ? strengthColors[strengthScore] : 'bg-transparent'} flex-1`}></div>
                    <div className={`h-full rounded-full transition-all ${strengthScore >= 3 ? strengthColors[strengthScore] : 'bg-transparent'} flex-1`}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1">
                    <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <CheckCircle2 className="w-3 h-3" /> Min. 6 karakter
                    </div>
                    <div className={`flex items-center gap-1 ${hasMixedCase ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <CheckCircle2 className="w-3 h-3" /> Huruf besar & kecil
                    </div>
                    <div className={`flex items-center gap-1 ${hasNumberOrSpecial ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <CheckCircle2 className="w-3 h-3" /> Angka / simbol
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Konfirmasi Kata Sandi Baru <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirmPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                >
                  {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && (
                <div className="mt-1 text-[10px]">
                  {passwordsMatch ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Kata sandi cocok
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3 h-3" /> Kata sandi belum cocok
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#F5C400]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Menyimpan ke Database...' : 'Simpan Perubahan Kredensial'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Info & Security Guidance (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Security Recommendations */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm border-b border-slate-800 pb-3">
              <HelpCircle className="w-4 h-4 text-[#F5C400]" />
              <span>Panduan Keamanan Akun</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#102A56] text-[#F5C400] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">1</span>
                <span><strong>Simpan Kredensial Baru:</strong> Catat email dan sandi baru Anda di tempat aman seperti password manager sebelum keluar (logout).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#102A56] text-[#F5C400] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">2</span>
                <span><strong>Sinkronisasi Database:</strong> Kredensial langsung tersimpan di basis data server, sehingga perubahan berlaku di seluruh perangkat dan browser.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#102A56] text-[#F5C400] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">3</span>
                <span><strong>Privasi Kredensial:</strong> Jangan membagikan kata sandi kepada anggota biasa yang tidak bertugas sebagai admin pengurus website.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#102A56] text-[#F5C400] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">4</span>
                <span><strong>Rotasi Sandi Berkala:</strong> Lakukan pembaruan kata sandi secara berkala atau setiap pergantian periode kepengurusan MAPAKTI.</span>
              </li>
            </ul>
          </div>

          {/* Recent Security Logs */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#F5C400]" /> Log Aktivitas Akses
              </span>
              <span className="text-[10px] text-slate-500">Terbaru</span>
            </div>

            <div className="space-y-2">
              {securityLogs.length === 0 ? (
                <div className="text-xs text-slate-500 py-3 text-center">Belum ada riwayat tercatat</div>
              ) : (
                securityLogs.map((log) => (
                  <div key={log.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-1 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-semibold">{log.action}</span>
                      <span className="text-[9px] text-slate-500">{log.timestamp}</span>
                    </div>
                    <div className="text-slate-400 text-[10px] leading-tight truncate">{log.details}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
