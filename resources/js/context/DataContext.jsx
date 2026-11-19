import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  initialSiteSettings,
  initialProfile,
  initialDivisions,
  initialPeriods,
  initialMembers,
  initialWorkPrograms,
  initialActivities,
  initialActivityRegistrations,
  initialMemberRegistrations,
  initialNews,
  initialGallery,
  initialDiklatsarEvents,
  initialAchievements,
  initialAlumni,
  initialAuditLogs,
  initialNotifications
} from '../data/initialData';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  // Storage Helper yang kebal terhadap QuotaExceededError & membersihkan storage penuh otomatis
  const safeSetStorage = (key, data) => {
    if (typeof window === 'undefined') return;

    const storageKey = key.startsWith('mapakti_') ? key : `mapakti_${key}`;

    let serialized = '';
    try {
      serialized = typeof data === 'string' ? data : JSON.stringify(data);
    } catch (err) {
      console.warn(`[MAPAKTI Storage] Serialisasi gagal untuk ${storageKey}:`, err);
      return;
    }

    try {
      localStorage.setItem(storageKey, serialized);
    } catch (err) {
      console.warn(`[MAPAKTI Storage] QuotaExceededError pada ${storageKey}. Menjalankan pemulihan cache...`);

      try {
        // Langkah 1: Hapus data cache log, notifikasi, dan alumni yang besar
        localStorage.removeItem('mapakti_audit_logs');
        localStorage.removeItem('mapakti_notifications');
        localStorage.removeItem('mapakti_alumni');

        // Coba simpan kembali
        localStorage.setItem(storageKey, serialized);
        return;
      } catch (retryErr) {
        try {
          // Langkah 2: Jika masih penuh, buat salinan data ringan (lightweight) untuk offline cache
          // dengan mengosongkan gambar Base64 besar (> 3KB) khusus di localStorage.
          // CATATAN PENTING: State React dan database cloud tetap memegang gambar & data asli 100% utuh!
          if (Array.isArray(data)) {
            const sanitized = data.map((item) => {
              if (!item || typeof item !== 'object') return item;
              const copy = { ...item };
              ['photoUrl', 'imageUrl', 'avatarUrl', 'photo', 'image', 'bannerUrl'].forEach((field) => {
                if (
                  typeof copy[field] === 'string' &&
                  copy[field].startsWith('data:image/') &&
                  copy[field].length > 3000
                ) {
                  copy[field] = '';
                }
              });
              return copy;
            });
            localStorage.setItem(storageKey, JSON.stringify(sanitized));
            return;
          } else if (data && typeof data === 'object') {
            const copy = { ...data };
            Object.keys(copy).forEach((field) => {
              if (
                typeof copy[field] === 'string' &&
                copy[field].startsWith('data:image/') &&
                copy[field].length > 3000
              ) {
                copy[field] = '';
              }
            });
            localStorage.setItem(storageKey, JSON.stringify(copy));
            return;
          }
        } catch (sanitizeErr) {
          // Langkah 3: Jangan pernah melempar exception QuotaExceededError ke window / React!
          // Aplikasi tetap berfungsi 100% menggunakan memori browser dan Database Cloud.
          console.warn(`[MAPAKTI Storage] Lewati penyimpanan offline untuk ${storageKey} karena kapasitas browser penuh.`);
        }
      }
    }
  };

  // Helper to load from localStorage with fallback
  const loadStored = (key, fallback) => {
    try {
      const stored = localStorage.getItem(`mapakti_${key}`);
      if (!stored) return fallback;
      const parsed = JSON.parse(stored);
      // Auto-migrate divisions & heroSlides if previous 5-division version was cached
      if (key === 'divisions' && Array.isArray(parsed) && parsed.length !== 3) {
        return fallback;
      }
      if (key === 'settings' && parsed) {
        if (parsed.heroSlides && parsed.heroSlides.length !== 3) {
          parsed.heroSlides = fallback.heroSlides;
        }
        if (!parsed.adminAccount) {
          try {
            const rawAcc = localStorage.getItem('mapakti_admin_account');
            if (rawAcc) parsed.adminAccount = JSON.parse(rawAcc);
          } catch (e) {}
        }
        if (!parsed.adminAccount) {
          parsed.adminAccount = fallback.adminAccount;
        }
        return parsed;
      }
      // Auto-migrate profile if old 3-item stub is cached
      if (key === 'profile' && parsed) {
        if (!parsed.ethicsPreamble || !parsed.codeOfEthics || parsed.codeOfEthics.length <= 3) {
          parsed.ethicsTitle = fallback.ethicsTitle;
          parsed.ethicsPreamble = fallback.ethicsPreamble;
          parsed.codeOfEthics = fallback.codeOfEthics;
          parsed.ethicsRatification = fallback.ethicsRatification;
        }
        return parsed;
      }
      // Auto-migrate members to strictly 3 types: Anggota Tetap, Anggota Luar Biasa, Anggota Muda
      if (key === 'members' && Array.isArray(parsed)) {
        return parsed.map((m) => {
          let status = m.membershipStatus || 'Anggota Tetap';
          if (status.includes('Muda') || status.includes('AM')) status = 'Anggota Muda';
          else if (status.includes('Luar') || status.includes('ALB')) status = 'Anggota Luar Biasa';
          else status = 'Anggota Tetap';
          return {
            ...m,
            membershipStatus: status,
            photoUrl: m.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
          };
        });
      }
      return parsed;
    } catch (e) {
      console.warn(`Failed to read ${key} from storage:`, e);
      return fallback;
    }
  };

  // Helper to get initial state with highest priority to Server DB (via window.__INITIAL_DATA__)
  // Ini memastikan saat ganti browser data langsung sinkron dari server database, bukan reset ke default codingan!
  const getInitial = (key, fallback) => {
    if (typeof window !== 'undefined' && window.__INITIAL_DATA__ && window.__INITIAL_DATA__[key] !== undefined) {
      const val = window.__INITIAL_DATA__[key];
      if (val !== null && val !== undefined) {
        return val;
      }
    }
    return loadStored(key, fallback);
  };

  // Flag untuk mencegah efek awal menimpa database dengan data default saat ganti browser
  const isHydratedRef = useRef(false);

  // State initialization
  const [settings, setSettings] = useState(() => getInitial('settings', initialSiteSettings));
  const [profile, setProfile] = useState(() => getInitial('profile', initialProfile));
  const [divisions, setDivisions] = useState(() => getInitial('divisions', initialDivisions));
  const [periods, setPeriods] = useState(() => getInitial('periods', initialPeriods));
  const [members, setMembers] = useState(() => getInitial('members', initialMembers));
  const [programs, setPrograms] = useState(() => getInitial('programs', initialWorkPrograms));
  const [activities, setActivities] = useState(() => getInitial('activities', initialActivities));
  const [activityRegistrations, setActivityRegistrations] = useState(() => getInitial('act_regs', initialActivityRegistrations));
  const [memberRegistrations, setMemberRegistrations] = useState(() => getInitial('mem_regs', initialMemberRegistrations));
  const [news, setNews] = useState(() => getInitial('news', initialNews));
  const [gallery, setGallery] = useState(() => getInitial('gallery', initialGallery));
  const [diklatsarEvents, setDiklatsarEvents] = useState(() => getInitial('diklatsar', initialDiklatsarEvents));
  const [achievements, setAchievements] = useState(() => getInitial('achievements', initialAchievements));
  const [alumni, setAlumni] = useState(() => getInitial('alumni', initialAlumni));
  const [auditLogs, setAuditLogs] = useState(() => getInitial('audit_logs', initialAuditLogs));
  const [notifications, setNotifications] = useState(() => getInitial('notifications', initialNotifications));

  // Navigation State
  const [currentSection, setCurrentSection] = useState(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const cleanHash = window.location.hash.replace('#', '').trim();
      if (cleanHash) return cleanHash;
    }
    return 'home';
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminCurrentTab, setAdminCurrentTab] = useState('dashboard');

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash.replace('#', '').trim();
        if (hash) {
          setCurrentSection(hash);
        } else {
          setCurrentSection('home');
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('mapakti_admin_auth') === 'true';
  });
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Modals & Detail Viewers
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedDiklatsar, setSelectedDiklatsar] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Database Sync State
  const [isDbConnected, setIsDbConnected] = useState(false);

  // Helper to send updates to Database backend (/api/data)
  const syncToApi = async (key, data) => {
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, data })
      });
      setIsDbConnected(true);
    } catch (e) {
      // Quiet fallback when offline or local without server
    }
  };

  // Initial hydrate from Database via /api/data
  useEffect(() => {
    let active = true;
    async function loadFromDb() {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) {
          console.warn('[MAPAKTI] /api/data returned', res.status, '- fallback to localStorage');
          isHydratedRef.current = true;
          return;
        }
        const resData = await res.json();
        if (active && resData && resData.ok && resData.data) {
          const d = resData.data;
          if (d.settings && typeof d.settings === 'object') {
            setSettings((prev) => {
              let localAcc = prev?.adminAccount;
              if (!localAcc?.isCustom && typeof window !== 'undefined') {
                try {
                  const rawAcc = localStorage.getItem('mapakti_admin_account');
                  if (rawAcc) localAcc = JSON.parse(rawAcc);
                } catch (e) {}
              }

              if (localAcc?.isCustom && !d.settings.adminAccount?.isCustom) {
                const merged = { ...d.settings, adminAccount: localAcc };
                syncToApi('settings', merged);
                return merged;
              }

              return {
                ...d.settings,
                adminAccount: d.settings.adminAccount || localAcc || initialSiteSettings.adminAccount
              };
            });
          }
          if (d.profile) {
            if (!d.profile.ethicsPreamble || !d.profile.codeOfEthics || d.profile.codeOfEthics.length <= 3) {
              d.profile.ethicsTitle = initialProfile.ethicsTitle;
              d.profile.ethicsPreamble = initialProfile.ethicsPreamble;
              d.profile.codeOfEthics = initialProfile.codeOfEthics;
              d.profile.ethicsRatification = initialProfile.ethicsRatification;
            }
            setProfile(d.profile);
          }
          if (d.divisions) setDivisions(d.divisions);
          if (d.periods) setPeriods(d.periods);
          if (d.members) setMembers(d.members);
          if (d.programs) setPrograms(d.programs);
          if (d.activities) setActivities(d.activities);
          if (d.act_regs) setActivityRegistrations(d.act_regs);
          if (d.mem_regs) setMemberRegistrations(d.mem_regs);
          if (d.news) setNews(d.news);
          if (d.gallery) setGallery(d.gallery);
          if (d.diklatsar) setDiklatsarEvents(d.diklatsar);
          if (d.achievements) setAchievements(d.achievements);
          if (d.alumni) setAlumni(d.alumni);
          if (d.audit_logs) setAuditLogs(d.audit_logs);
          if (d.notifications) setNotifications(d.notifications);
          setIsDbConnected(true);
        }
      } catch (err) {
        // Fallback to localStorage without breaking UI
      } finally {
        if (active) {
          // Tandai hidrasi selesai agar perubahan setelah ini disinkronkan ke server
          setTimeout(() => {
            isHydratedRef.current = true;
          }, 100);
        }
      }
    }
    loadFromDb();
    return () => { active = false; };
  }, []);

  // Pembersihan proaktif localStorage saat startup agar tidak melebihi batas kuota browser
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      let totalUsage = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k) totalUsage += (localStorage.getItem(k) || '').length;
      }
      if (totalUsage > 2500000) {
        console.warn(`[MAPAKTI Storage] Cache localStorage cukup besar (${(totalUsage / 1024 / 1024).toFixed(2)} MB). Mengosongkan cache non-kritis...`);
        localStorage.removeItem('mapakti_audit_logs');
        localStorage.removeItem('mapakti_notifications');
        localStorage.removeItem('mapakti_alumni');
      }
    } catch (e) {}
  }, []);

  // Auto-sync state to localStorage and Database (hanya aktif setelah hidrasi selesai, mencegah overwrite saat ganti browser)
  useEffect(() => { safeSetStorage('settings', settings); if (isHydratedRef.current) syncToApi('settings', settings); }, [settings]);
  useEffect(() => { safeSetStorage('profile', profile); if (isHydratedRef.current) syncToApi('profile', profile); }, [profile]);
  useEffect(() => { safeSetStorage('divisions', divisions); if (isHydratedRef.current) syncToApi('divisions', divisions); }, [divisions]);
  useEffect(() => { safeSetStorage('periods', periods); if (isHydratedRef.current) syncToApi('periods', periods); }, [periods]);
  useEffect(() => { safeSetStorage('members', members); if (isHydratedRef.current) syncToApi('members', members); }, [members]);
  useEffect(() => { safeSetStorage('programs', programs); if (isHydratedRef.current) syncToApi('programs', programs); }, [programs]);
  useEffect(() => { safeSetStorage('activities', activities); if (isHydratedRef.current) syncToApi('activities', activities); }, [activities]);
  useEffect(() => { safeSetStorage('act_regs', activityRegistrations); if (isHydratedRef.current) syncToApi('act_regs', activityRegistrations); }, [activityRegistrations]);
  useEffect(() => { safeSetStorage('mem_regs', memberRegistrations); if (isHydratedRef.current) syncToApi('mem_regs', memberRegistrations); }, [memberRegistrations]);
  useEffect(() => { safeSetStorage('news', news); if (isHydratedRef.current) syncToApi('news', news); }, [news]);
  useEffect(() => { safeSetStorage('gallery', gallery); if (isHydratedRef.current) syncToApi('gallery', gallery); }, [gallery]);
  useEffect(() => { safeSetStorage('diklatsar', diklatsarEvents); if (isHydratedRef.current) syncToApi('diklatsar', diklatsarEvents); }, [diklatsarEvents]);
  useEffect(() => { safeSetStorage('achievements', achievements); if (isHydratedRef.current) syncToApi('achievements', achievements); }, [achievements]);
  useEffect(() => { safeSetStorage('alumni', alumni); if (isHydratedRef.current) syncToApi('alumni', alumni); }, [alumni]);
  useEffect(() => { safeSetStorage('audit_logs', auditLogs); if (isHydratedRef.current) syncToApi('audit_logs', auditLogs); }, [auditLogs]);
  useEffect(() => { safeSetStorage('notifications', notifications); if (isHydratedRef.current) syncToApi('notifications', notifications); }, [notifications]);

  // Toast Notification System
  const addToast = ({ type = 'info', title, message }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Audit Logging (FR-20)
  const addAuditLog = (action, module, details) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      user: settings.adminAccount?.email || 'admin@mapakti.tegal',
      action,
      module,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev].slice(0, 50));
  };

  // Admin Authentication handlers (FR-20)
  const loginAdmin = (email, password) => {
    // Ambil akun admin aktif: prioritas dari state settings, lalu fallback ke localStorage
    let activeAccount = settings?.adminAccount;
    if (!activeAccount?.password && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('mapakti_admin_account');
        if (stored) activeAccount = JSON.parse(stored);
      } catch (e) {}
    }

    const configuredEmail = (activeAccount?.email || 'admin@mapakti.tegal').trim().toLowerCase();
    const configuredPassword = (activeAccount?.password || 'MAPAKTI17JULI').trim();

    const cleanEmail = email?.trim().toLowerCase();
    const cleanPass = password?.trim();

    // HANYA COCOKKAN DENGAN KREDENSIAL YANG SEDANG AKTIF SAAT INI!
    // KATA SANDI LAMA TIDAK BOLEH BISA DIGUNAKAN LAGI SAMA SEKALI!
    const isMatch = (cleanEmail === configuredEmail && cleanPass === configuredPassword);

    if (isMatch) {
      setIsAdminAuthenticated(true);
      safeSetStorage('admin_auth', 'true');
      setIsAdminMode(true);
      setShowLoginModal(false);
      addAuditLog('LOGIN', 'Keamanan', `Administrator (${cleanEmail}) berhasil login ke Control Panel`);
      addToast({
        type: 'success',
        title: 'Login Berhasil',
        message: 'Selamat datang di Panel Administrator MAPAKTI UPS Tegal.'
      });
      return true;
    } else {
      addToast({
        type: 'error',
        title: 'Login Gagal',
        message: 'Email atau kata sandi tidak sesuai. Jika baru saja mengubah sandi, gunakan kata sandi baru Anda!'
      });
      return false;
    }
  };

  // Update Admin Credentials (Email & Password Reset)
  const updateAdminCredentials = ({ currentPassword, newEmail, newPassword }) => {
    let activeAccount = settings?.adminAccount;
    if (!activeAccount?.password && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('mapakti_admin_account');
        if (stored) activeAccount = JSON.parse(stored);
      } catch (e) {}
    }

    const configuredPassword = (activeAccount?.password || 'MAPAKTI17JULI').trim();
    const cleanCurrentPass = currentPassword?.trim();

    // Verifikasi kata sandi saat ini: wajib sama persis dengan kata sandi yang sedang aktif
    if (cleanCurrentPass !== configuredPassword) {
      return { success: false, message: 'Kata sandi saat ini yang Anda masukkan salah.' };
    }

    const cleanEmail = newEmail?.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, message: 'Format alamat email tidak valid.' };
    }

    const cleanNewPass = newPassword?.trim();
    if (!cleanNewPass || cleanNewPass.length < 6) {
      return { success: false, message: 'Kata sandi baru minimal harus 6 karakter.' };
    }

    if (cleanNewPass === configuredPassword) {
      return { success: false, message: 'Kata sandi baru tidak boleh sama dengan kata sandi lama.' };
    }

    const nowFormatted = new Date().toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const updatedAccount = {
      email: cleanEmail,
      password: cleanNewPass,
      isCustom: true,
      updatedAt: nowFormatted
    };

    const updatedSettings = {
      ...settings,
      adminAccount: updatedAccount
    };

    setSettings(updatedSettings);

    // Simpan seketika ke LocalStorage untuk memastikan sesi browser langsung terupdate
    safeSetStorage('settings', updatedSettings);
    safeSetStorage('admin_account', updatedAccount);

    // Sinkronkan ke database server backend
    syncToApi('settings', updatedSettings);

    addAuditLog('UPDATE', 'Keamanan Akun', `Kata sandi administrator diperbarui (Email: ${cleanEmail}). Kredensial lama dinonaktifkan.`);
    addToast({
      type: 'success',
      title: 'Kata Sandi Diperbarui',
      message: 'Kata sandi baru berhasil aktif. Kata sandi lama sudah dinonaktifkan permanen.'
    });

    return { success: true };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('mapakti_admin_auth');
    setIsAdminMode(false);
    addAuditLog('LOGOUT', 'Keamanan', 'Administrator mengakhiri sesi kerja');
    addToast({
      type: 'info',
      title: 'Sesi Berakhir',
      message: 'Anda telah keluar dari Panel Administrator.'
    });
  };

  // Member Registration (FR-14)
  const registerNewMember = (data) => {
    const newReg = {
      id: `reg-${Date.now()}`,
      fullName: data.fullName,
      nim: data.nim,
      faculty: data.faculty,
      phone: data.phone,
      reason: data.reason,
      createdAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      status: 'Menunggu Tinjauan'
    };

    setMemberRegistrations((prev) => [newReg, ...prev]);

    // Dashboard Notification (FR-19)
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Pendaftaran Anggota Baru',
      message: `${data.fullName} (${data.faculty}) mendaftar sebagai calon anggota baru.`,
      type: 'registration',
      createdAt: 'Baru saja',
      isRead: false
    };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 40));

    addAuditLog('REGISTER_MEMBER', 'Pendaftaran Calon Anggota', `Pendaftar baru: ${data.fullName} (NIM: ${data.nim})`);

    addToast({
      type: 'success',
      title: 'Pendaftaran Terkirim!',
      message: `Terima kasih, ${data.fullName}. Formulir pendaftaran calon anggota MAPAKTI telah kami terima dan masuk dalam antrean verifikasi.`
    });

    return true;
  };

  // Activity Registration (FR-08)
  const registerForActivity = (activityId, data) => {
    const targetActivity = activities.find((a) => a.id === activityId);
    if (!targetActivity || !targetActivity.isRegistrationOpen) {
      addToast({
        type: 'error',
        title: 'Pendaftaran Ditutup',
        message: 'Pendaftaran untuk kegiatan ini saat ini tidak dibuka.'
      });
      return false;
    }

    const newActReg = {
      id: `act-reg-${Date.now()}`,
      activityId,
      activityName: targetActivity.name,
      participantName: data.participantName,
      identityNumber: data.identityNumber,
      institution: data.institution,
      phone: data.phone,
      email: data.email,
      registeredAt: new Date().toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }),
      attendanceStatus: 'Belum Hadir'
    };

    setActivityRegistrations((prev) => [newActReg, ...prev]);

    // Update count in activity
    setActivities((prev) =>
      prev.map((act) =>
        act.id === activityId ? { ...act, registeredCount: (act.registeredCount || 0) + 1 } : act
      )
    );

    // Dashboard Notification (FR-19)
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Peserta Kegiatan Baru',
      message: `${data.participantName} mendaftar pada kegiatan "${targetActivity.name}".`,
      type: 'activity_reg',
      createdAt: 'Baru saja',
      isRead: false
    };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 40));

    addAuditLog('REGISTER_ACTIVITY', 'Kegiatan & Ekspedisi', `Peserta baru: ${data.participantName} pada ${targetActivity.name}`);

    addToast({
      type: 'success',
      title: 'Pendaftaran Kegiatan Berhasil!',
      message: `Data Anda telah tersimpan untuk kegiatan "${targetActivity.name}". Silakan cek informasi jadwal dan perlengkapan.`
    });

    return true;
  };

  // Privacy toggles (FR-04, FR-13)
  const toggleMemberPublish = (memberId) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          const nextVal = !m.isPublished;
          addAuditLog('PRIVACY_TOGGLE', 'Data Anggota', `Mengubah status publikasi ${m.name} menjadi ${nextVal ? 'PUBLIK' : 'PRIVAT'}`);
          addToast({
            type: 'info',
            title: 'Status Diperbarui',
            message: `Data ${m.name} kini berstatus: ${nextVal ? 'Tampil di Publik' : 'Privat (Admin Saja)'}`
          });
          return { ...m, isPublished: nextVal };
        }
        return m;
      })
    );
  };

  const toggleAlumniPublish = (alumniId) => {
    setAlumni((prev) =>
      prev.map((a) => {
        if (a.id === alumniId) {
          const nextVal = !a.isPublished;
          addAuditLog('PRIVACY_TOGGLE', 'Data Alumni', `Mengubah status publikasi alumni ${a.name} menjadi ${nextVal ? 'PUBLIK' : 'PRIVAT'}`);
          addToast({
            type: 'info',
            title: 'Status Diperbarui',
            message: `Alumni ${a.name} kini berstatus: ${nextVal ? 'Tampil di Publik' : 'Privat'}`
          });
          return { ...a, isPublished: nextVal };
        }
        return a;
      })
    );
  };

  // Activity open/close toggle (FR-08)
  const toggleActivityRegistration = (activityId) => {
    setActivities((prev) =>
      prev.map((act) => {
        if (act.id === activityId) {
          const nextState = !act.isRegistrationOpen;
          addAuditLog('UPDATE', 'Kegiatan & Ekspedisi', `Status pendaftaran ${act.name} diubah menjadi ${nextState ? 'DIBUKA' : 'DITUTUP'}`);
          addToast({
            type: 'info',
            title: 'Pendaftaran Diperbarui',
            message: `Pendaftaran untuk "${act.name}" kini ${nextState ? 'DIBUKA' : 'DITUTUP'}`
          });
          return { ...act, isRegistrationOpen: nextState };
        }
        return act;
      })
    );
  };

  // News draft toggle (FR-09)
  const toggleNewsDraft = (newsId) => {
    setNews((prev) =>
      prev.map((item) => {
        if (item.id === newsId) {
          const nextDraft = !item.isDraft;
          addAuditLog('UPDATE', 'Berita & Publikasi', `Mengubah berita "${item.title}" menjadi ${nextDraft ? 'DRAFT' : 'PUBLISHED'}`);
          addToast({
            type: 'info',
            title: 'Status Berita Diperbarui',
            message: `Berita "${item.title}" kini berstatus: ${nextDraft ? 'Draft (Belum Publik)' : 'Published (Tayang Publik)'}`
          });
          return { ...item, isDraft: nextDraft };
        }
        return item;
      })
    );
  };

  // Notification read marker (FR-19)
  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast({ type: 'info', title: 'Notifikasi', message: 'Semua notifikasi ditandai telah dibaca.' });
  };

  // Backup & Restore Database Simulation (FR-21)
  const exportBackupJson = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      organization: 'MAPAKTI UPS Tegal',
      version: '1.0',
      payload: {
        settings,
        profile,
        divisions,
        periods,
        members,
        programs,
        activities,
        activityRegistrations,
        memberRegistrations,
        news,
        gallery,
        diklatsarEvents,
        achievements,
        alumni,
        auditLogs
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MAPAKTI_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addAuditLog('BACKUP', 'Sistem & Backup', 'Mengekspor file cadangan database (JSON format)');
    addToast({
      type: 'success',
      title: 'Pencadangan Selesai',
      message: 'File cadangan basis data MAPAKTI telah berhasil diunduh.'
    });
  };

  const restoreBackupJson = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data.payload) {
        throw new Error('Format file backup tidak valid');
      }
      const p = data.payload;
      if (p.settings) setSettings(p.settings);
      if (p.profile) setProfile(p.profile);
      if (p.divisions) setDivisions(p.divisions);
      if (p.periods) setPeriods(p.periods);
      if (p.members) setMembers(p.members);
      if (p.programs) setPrograms(p.programs);
      if (p.activities) setActivities(p.activities);
      if (p.activityRegistrations) setActivityRegistrations(p.activityRegistrations);
      if (p.memberRegistrations) setMemberRegistrations(p.memberRegistrations);
      if (p.news) setNews(p.news);
      if (p.gallery) setGallery(p.gallery);
      if (p.diklatsarEvents) setDiklatsarEvents(p.diklatsarEvents);
      if (p.achievements) setAchievements(p.achievements);
      if (p.alumni) setAlumni(p.alumni);

      addAuditLog('RESTORE', 'Sistem & Backup', 'Memulihkan data sistem dari file cadangan');
      addToast({
        type: 'success',
        title: 'Pemulihan Berhasil',
        message: 'Data organisasi berhasil dipulihkan dari cadangan.'
      });
      return true;
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Pemulihan Gagal',
        message: 'Gagal memproses file cadangan: ' + err.message
      });
      return false;
    }
  };

  const resetToFactoryDefaults = async () => {
    if (window.confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke setelan default awal?')) {
      localStorage.clear();
      setSettings(initialSiteSettings);
      setProfile(initialProfile);
      setDivisions(initialDivisions);
      setPeriods(initialPeriods);
      setMembers(initialMembers);
      setPrograms(initialWorkPrograms);
      setActivities(initialActivities);
      setActivityRegistrations(initialActivityRegistrations);
      setMemberRegistrations(initialMemberRegistrations);
      setNews(initialNews);
      setGallery(initialGallery);
      setDiklatsarEvents(initialDiklatsarEvents);
      setAchievements(initialAchievements);
      setAlumni(initialAlumni);
      setAuditLogs(initialAuditLogs);
      setNotifications(initialNotifications);

      try {
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            updates: {
              settings: initialSiteSettings,
              profile: initialProfile,
              divisions: initialDivisions,
              periods: initialPeriods,
              members: initialMembers,
              programs: initialWorkPrograms,
              activities: initialActivities,
              act_regs: initialActivityRegistrations,
              mem_regs: initialMemberRegistrations,
              news: initialNews,
              gallery: initialGallery,
              diklatsar: initialDiklatsarEvents,
              achievements: initialAchievements,
              alumni: initialAlumni,
              audit_logs: initialAuditLogs,
              notifications: initialNotifications
            }
          })
        });
      } catch (e) {
        console.warn('Failed to reset backend database:', e);
      }

      addToast({
        type: 'info',
        title: 'Reset Selesai',
        message: 'Seluruh data telah dikembalikan ke kondisi bawaan awal.'
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        // Data Entities
        settings, setSettings,
        profile, setProfile,
        divisions, setDivisions,
        periods, setPeriods,
        members, setMembers,
        programs, setPrograms,
        activities, setActivities,
        activityRegistrations, setActivityRegistrations,
        memberRegistrations, setMemberRegistrations,
        news, setNews,
        gallery, setGallery,
        diklatsarEvents, setDiklatsarEvents,
        achievements, setAchievements,
        alumni, setAlumni,
        auditLogs, setAuditLogs,
        notifications, setNotifications,

        // Database status
        isDbConnected,

        // Navigation
        currentSection, setCurrentSection,
        isAdminMode, setIsAdminMode,
        adminCurrentTab, setAdminCurrentTab,

        // Admin Auth
        isAdminAuthenticated, setIsAdminAuthenticated,
        showLoginModal, setShowLoginModal,
        loginAdmin, logoutAdmin,
        updateAdminCredentials,
        adminAccount: settings.adminAccount || { email: 'admin@mapakti.tegal' },

        // Modal Views
        selectedNews, setSelectedNews,
        selectedActivity, setSelectedActivity,
        selectedMember, setSelectedMember,
        selectedDiklatsar, setSelectedDiklatsar,
        lightboxImage, setLightboxImage,
        searchModalOpen, setSearchModalOpen,

        // Operations
        toasts, addToast, removeToast,
        addAuditLog,
        registerNewMember,
        registerForActivity,
        toggleMemberPublish,
        toggleAlumniPublish,
        toggleActivityRegistration,
        toggleNewsDraft,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        exportBackupJson,
        restoreBackupJson,
        resetToFactoryDefaults
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
