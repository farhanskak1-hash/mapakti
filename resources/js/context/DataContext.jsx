import React, { createContext, useContext, useState, useEffect } from 'react';
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
      if (key === 'settings' && parsed && parsed.heroSlides && parsed.heroSlides.length !== 3) {
        return { ...parsed, heroSlides: fallback.heroSlides };
      }
      // Auto-migrate members to strictly 3 types: Anggota Tetap, Anggota Luar Biasa, Anggota Muda
      if (key === 'members' && Array.isArray(parsed)) {
        return parsed.map((m) => {
          let status = m.membershipStatus || 'Anggota Tetap';
          if (status.includes('Muda') || status.includes('AM')) status = 'Anggota Muda';
          else if (status.includes('Luar') || status.includes('ALB')) status = 'Anggota Luar Biasa';
          else status = 'Anggota Tetap';
          return { ...m, membershipStatus: status };
        });
      }
      return parsed;
    } catch (e) {
      console.warn(`Failed to read ${key} from storage:`, e);
      return fallback;
    }
  };

  // State initialization
  const [settings, setSettings] = useState(() => loadStored('settings', initialSiteSettings));
  const [profile, setProfile] = useState(() => loadStored('profile', initialProfile));
  const [divisions, setDivisions] = useState(() => loadStored('divisions', initialDivisions));
  const [periods, setPeriods] = useState(() => loadStored('periods', initialPeriods));
  const [members, setMembers] = useState(() => loadStored('members', initialMembers));
  const [programs, setPrograms] = useState(() => loadStored('programs', initialWorkPrograms));
  const [activities, setActivities] = useState(() => loadStored('activities', initialActivities));
  const [activityRegistrations, setActivityRegistrations] = useState(() => loadStored('act_regs', initialActivityRegistrations));
  const [memberRegistrations, setMemberRegistrations] = useState(() => loadStored('mem_regs', initialMemberRegistrations));
  const [news, setNews] = useState(() => loadStored('news', initialNews));
  const [gallery, setGallery] = useState(() => loadStored('gallery', initialGallery));
  const [diklatsarEvents, setDiklatsarEvents] = useState(() => loadStored('diklatsar', initialDiklatsarEvents));
  const [achievements, setAchievements] = useState(() => loadStored('achievements', initialAchievements));
  const [alumni, setAlumni] = useState(() => loadStored('alumni', initialAlumni));
  const [auditLogs, setAuditLogs] = useState(() => loadStored('audit_logs', initialAuditLogs));
  const [notifications, setNotifications] = useState(() => loadStored('notifications', initialNotifications));

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

  // Helper to send updates to Aiven MySQL (/api/data)
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

  // Initial hydrate from Aiven MySQL via /api/data
  useEffect(() => {
    let active = true;
    async function loadFromDb() {
      try {
        const res = await fetch('/api/data');
        if (!res.ok) {
          console.warn('[MAPAKTI] /api/data returned', res.status, '- fallback to localStorage');
          return;
        }
        const resData = await res.json();
        if (active && resData && resData.ok && resData.data) {
          const d = resData.data;
          if (d.settings && typeof d.settings === 'object') setSettings(d.settings);
          if (d.profile) setProfile(d.profile);
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
      }
    }
    loadFromDb();
    return () => { active = false; };
  }, []);

  // Auto-sync state to localStorage and Aiven MySQL
  useEffect(() => { localStorage.setItem('mapakti_settings', JSON.stringify(settings)); syncToApi('settings', settings); }, [settings]);
  useEffect(() => { localStorage.setItem('mapakti_profile', JSON.stringify(profile)); syncToApi('profile', profile); }, [profile]);
  useEffect(() => { localStorage.setItem('mapakti_divisions', JSON.stringify(divisions)); syncToApi('divisions', divisions); }, [divisions]);
  useEffect(() => { localStorage.setItem('mapakti_periods', JSON.stringify(periods)); syncToApi('periods', periods); }, [periods]);
  useEffect(() => { localStorage.setItem('mapakti_members', JSON.stringify(members)); syncToApi('members', members); }, [members]);
  useEffect(() => { localStorage.setItem('mapakti_programs', JSON.stringify(programs)); syncToApi('programs', programs); }, [programs]);
  useEffect(() => { localStorage.setItem('mapakti_activities', JSON.stringify(activities)); syncToApi('activities', activities); }, [activities]);
  useEffect(() => { localStorage.setItem('mapakti_act_regs', JSON.stringify(activityRegistrations)); syncToApi('act_regs', activityRegistrations); }, [activityRegistrations]);
  useEffect(() => { localStorage.setItem('mapakti_mem_regs', JSON.stringify(memberRegistrations)); syncToApi('mem_regs', memberRegistrations); }, [memberRegistrations]);
  useEffect(() => { localStorage.setItem('mapakti_news', JSON.stringify(news)); syncToApi('news', news); }, [news]);
  useEffect(() => { localStorage.setItem('mapakti_gallery', JSON.stringify(gallery)); syncToApi('gallery', gallery); }, [gallery]);
  useEffect(() => { localStorage.setItem('mapakti_diklatsar', JSON.stringify(diklatsarEvents)); syncToApi('diklatsar', diklatsarEvents); }, [diklatsarEvents]);
  useEffect(() => { localStorage.setItem('mapakti_achievements', JSON.stringify(achievements)); syncToApi('achievements', achievements); }, [achievements]);
  useEffect(() => { localStorage.setItem('mapakti_alumni', JSON.stringify(alumni)); syncToApi('alumni', alumni); }, [alumni]);
  useEffect(() => { localStorage.setItem('mapakti_audit_logs', JSON.stringify(auditLogs)); syncToApi('audit_logs', auditLogs); }, [auditLogs]);
  useEffect(() => { localStorage.setItem('mapakti_notifications', JSON.stringify(notifications)); syncToApi('notifications', notifications); }, [notifications]);

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
      user: 'admin@mapakti.tegal',
      action,
      module,
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Admin Authentication handlers (FR-20)
  const loginAdmin = (email, password) => {
    if (email === 'admin@mapakti.tegal' && password === 'MAPAKTI17JULI') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('mapakti_admin_auth', 'true');
      setIsAdminMode(true);
      setShowLoginModal(false);
      addAuditLog('LOGIN', 'Keamanan', 'Administrator berhasil login ke Control Panel');
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
        message: 'Kombinasi email atau kata sandi tidak valid!'
      });
      return false;
    }
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
    setNotifications((prev) => [newNotif, ...prev]);

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
    setNotifications((prev) => [newNotif, ...prev]);

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

  const resetToFactoryDefaults = () => {
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
