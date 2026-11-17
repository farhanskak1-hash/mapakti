import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Logo } from '../common/Logo';
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Calendar,
  Compass,
  Flame,
  Newspaper,
  Image as ImageIcon,
  Award,
  GraduationCap,
  Settings,
  ShieldCheck,
  Bell,
  ArrowLeft,
  Menu,
  X,
  LogOut,
  ExternalLink,
  CheckCircle2,
  FileText,
  Lock,
  Database
} from 'lucide-react';

// Admin Tab Components
import { AdminDashboard } from './AdminDashboard';
import { AdminMemberRegistrations } from './AdminMemberRegistrations';
import { AdminMembers } from './AdminMembers';
import { AdminPeriods } from './AdminPeriods';
import { AdminDivisions } from './AdminDivisions';
import { AdminWorkPrograms } from './AdminWorkPrograms';
import { AdminActivities } from './AdminActivities';
import { AdminNews } from './AdminNews';
import { AdminGallery } from './AdminGallery';
import { AdminDiklatsar } from './AdminDiklatsar';
import { AdminAchievements } from './AdminAchievements';
import { AdminSettings } from './AdminSettings';
import { AdminAuditLogs } from './AdminAuditLogs';

export const AdminLayout = () => {
  const {
    adminCurrentTab,
    setAdminCurrentTab,
    setIsAdminMode,
    logoutAdmin,
    memberRegistrations,
    members,
    activities,
    news,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    settings
  } = useData();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const pendingRegistrationsCount = memberRegistrations.filter((r) => r.status === 'Menunggu Tinjauan').length;
  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Analitik', icon: LayoutDashboard },
    { id: 'pendaftaran-anggota', label: 'Pendaftaran (GForm & CP)', icon: UserPlus, badge: settings.registrationIsOpen !== false ? 'Aktif' : 'Tutup' },
    { id: 'anggota', label: 'Master Data Anggota', icon: Users },
    { id: 'periode', label: 'Kepengurusan & Periode', icon: ShieldCheck },
    { id: 'divisi', label: 'Informasi 3 Divisi', icon: Compass },
    { id: 'proker', label: 'Program Kerja Organisasi', icon: Flame },
    { id: 'kegiatan', label: 'Kegiatan & Peserta', icon: Calendar },
    { id: 'berita', label: 'Berita & Publikasi', icon: Newspaper },
    { id: 'galeri', label: 'Galeri Foto', icon: ImageIcon },
    { id: 'diklatsar', label: 'Sejarah DIKLATSAR', icon: Award },
    { id: 'prestasi', label: 'Rekor Prestasi', icon: Award },
    { id: 'cms-seo', label: 'Editor Tampilan Front-End & CMS', icon: Settings },
    { id: 'audit', label: 'Audit Log & Keamanan', icon: Lock }
  ];

  return (
    <div className="min-h-screen bg-[#0e131d] text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Logo size="sm" lightText={true} />
          <span className="bg-[#F5C400] text-[#102A56] text-[10px] font-black px-2 py-0.5 rounded">
            ADMIN
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdminMode(false)}
            className="px-2.5 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Web Publik</span>
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-800 rounded-lg text-slate-200"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0b1424] border-r border-slate-800 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Logo size="md" lightText={true} />
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Exit to Website */}
          <div className="px-4 pt-4">
            <button
              onClick={() => setIsAdminMode(false)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#F5C400] border border-slate-800 flex items-center justify-between text-xs font-bold transition-colors"
            >
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#F5C400]" />
                <span>Lihat Tampilan Publik</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>

          {/* Menu Items List */}
          <nav className="p-4 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 py-1">
              Modul Administrasi PRD v1.0
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminCurrentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminCurrentTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#102A56] text-[#F5C400] font-bold shadow-md shadow-[#102A56]/50 border border-[#F5C400]/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#F5C400]' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Admin Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-[#080d17]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#102A56] border border-[#F5C400]/60 text-[#F5C400] flex items-center justify-center font-bold text-xs flex-shrink-0">
                A
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">Administrator</div>
                <div className="text-[10px] text-slate-500 truncate">admin@mapakti.tegal</div>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
              title="Keluar dari Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Header */}
        <header className="hidden lg:flex items-center justify-between h-16 px-8 bg-[#0b1424] border-b border-slate-800 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Panel Administrator</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-[#F5C400] uppercase tracking-wider">
              {menuItems.find((m) => m.id === adminCurrentTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Cloud Database Status */}
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow-sm"
              title="Terhubung ke Database Cloud Aiven MySQL"
            >
              <Database className="w-3 h-3 text-emerald-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Aiven MySQL Online</span>
            </div>

            {/* Notification Bell Dropdown (FR-19) */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-[#0b1424]" />
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 space-y-3 z-50">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-[#F5C400]" /> Notifikasi Sistem
                    </span>
                    {unreadNotifCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-[10px] text-[#F5C400] hover:underline"
                      >
                        Tandai Semua Dibaca
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-500">Tidak ada notifikasi baru</div>
                    ) : (
                      notifications.slice(0, 6).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                            n.isRead
                              ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                              : 'bg-[#102A56]/40 border-[#F5C400]/40 text-slate-200'
                          }`}
                        >
                          <div className="font-bold text-white text-[11px]">{n.title}</div>
                          <div className="text-[11px] mt-0.5 leading-relaxed">{n.message}</div>
                          <div className="text-[9px] text-slate-500 mt-1">{n.createdAt}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Public View */}
            <button
              onClick={() => setIsAdminMode(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-200 hover:text-[#F5C400] font-bold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ke Website Publik</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Router Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {adminCurrentTab === 'dashboard' && <AdminDashboard />}
          {adminCurrentTab === 'pendaftaran-anggota' && <AdminMemberRegistrations />}
          {adminCurrentTab === 'anggota' && <AdminMembers />}
          {adminCurrentTab === 'periode' && <AdminPeriods />}
          {adminCurrentTab === 'divisi' && <AdminDivisions />}
          {adminCurrentTab === 'proker' && <AdminWorkPrograms />}
          {adminCurrentTab === 'kegiatan' && <AdminActivities />}
          {adminCurrentTab === 'berita' && <AdminNews />}
          {adminCurrentTab === 'galeri' && <AdminGallery />}
          {adminCurrentTab === 'diklatsar' && <AdminDiklatsar />}
          {adminCurrentTab === 'prestasi' && <AdminAchievements />}
          {adminCurrentTab === 'cms-seo' && <AdminSettings />}
          {adminCurrentTab === 'audit' && <AdminAuditLogs />}
        </main>
      </div>
    </div>
  );
};
