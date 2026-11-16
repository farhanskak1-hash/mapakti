import React from 'react';
import { useData } from '../../context/DataContext';
import {
  Users,
  UserPlus,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Award,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Download,
  AlertTriangle,
  Lock,
  Flame,
  Plus
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    memberRegistrations,
    members,
    activities,
    news,
    gallery,
    notifications,
    auditLogs,
    setAdminCurrentTab,
    exportBackupJson
  } = useData();

  const pendingMembers = memberRegistrations.filter((r) => r.status === 'Menunggu Tinjauan');
  const publicMembersCount = members.filter((m) => m.isPublished).length;
  const privateMembersCount = members.filter((m) => !m.isPublished).length;
  const openActivitiesCount = activities.filter((a) => a.isRegistrationOpen).length;
  const publishedNewsCount = news.filter((n) => !n.isDraft).length;
  const draftNewsCount = news.filter((n) => n.isDraft).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#102A56] via-[#163872] to-[#0b1424] border border-[#F5C400]/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" /> Dashboard Pengendalian Konten
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Selamat Datang di Panel Admin MAPAKTI
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl">
            Pusat pengelolaan publikasi, data keanggotaan, pendaftaran calon anggota, dan pengaturan website resmi sesuai PRD v1.0.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setAdminCurrentTab('pendaftaran-anggota')}
            className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tinjau Calon Anggota ({pendingMembers.length})</span>
          </button>
          <button
            onClick={exportBackupJson}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-[#F5C400]" />
            <span>Cadangan Data</span>
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pendaftaran Calon Anggota (FR-14) */}
        <div
          onClick={() => setAdminCurrentTab('pendaftaran-anggota')}
          className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 cursor-pointer transition-all hover:shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Calon Anggota Baru</span>
            <div className="w-8 h-8 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{memberRegistrations.length}</div>
            <div className="text-[11px] text-rose-400 font-semibold mt-1">
              {pendingMembers.length} Menunggu Verifikasi
            </div>
          </div>
        </div>

        {/* Card 2: Master Anggota (FR-04) */}
        <div
          onClick={() => setAdminCurrentTab('anggota')}
          className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 cursor-pointer transition-all hover:shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Master Data Anggota</span>
            <div className="w-8 h-8 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{members.length}</div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1">
              {publicMembersCount} Publik • {privateMembersCount} Privat
            </div>
          </div>
        </div>

        {/* Card 3: Kegiatan & Ekspedisi (FR-07/08) */}
        <div
          onClick={() => setAdminCurrentTab('kegiatan')}
          className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 cursor-pointer transition-all hover:shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Kegiatan & Ekspedisi</span>
            <div className="w-8 h-8 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{activities.length}</div>
            <div className="text-[11px] text-[#F5C400] font-semibold mt-1">
              {openActivitiesCount} Buka Pendaftaran
            </div>
          </div>
        </div>

        {/* Card 4: Berita & Publikasi (FR-09) */}
        <div
          onClick={() => setAdminCurrentTab('berita')}
          className="p-5 rounded-3xl bg-slate-900 border border-slate-800 hover:border-[#F5C400]/60 cursor-pointer transition-all hover:shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Berita & Publikasi</span>
            <div className="w-8 h-8 rounded-xl bg-[#102A56] text-[#F5C400] flex items-center justify-center">
              <Newspaper className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">{news.length}</div>
            <div className="text-[11px] text-slate-400 font-semibold mt-1">
              {publishedNewsCount} Tayang • {draftNewsCount} Draft
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Latest Registration Queue & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Pending Member Registrations Table */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-[#F5C400]" />
              <h3 className="text-base font-bold text-white">Antrean Pendaftaran Calon Anggota</h3>
            </div>
            <button
              onClick={() => setAdminCurrentTab('pendaftaran-anggota')}
              className="text-xs text-[#F5C400] hover:underline font-semibold"
            >
              Lihat Semua
            </button>
          </div>

          {memberRegistrations.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">Belum ada pendaftaran masuk</div>
          ) : (
            <div className="space-y-2.5">
              {memberRegistrations.slice(0, 4).map((reg) => (
                <div
                  key={reg.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{reg.fullName}</div>
                    <div className="text-[11px] text-slate-400">
                      NIM: {reg.nim} • {reg.faculty}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{reg.createdAt}</div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    reg.status === 'Terverifikasi'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : reg.status === 'Dihubungi'
                      ? 'bg-sky-950 text-sky-400 border border-sky-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {reg.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Notifications & Recent Activity Logs (FR-19, FR-20) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#F5C400]" />
              <h3 className="text-base font-bold text-white">Notifikasi Dashboard</h3>
            </div>
            <span className="text-[11px] text-slate-500">Realtime</span>
          </div>

          <div className="space-y-2.5 max-h-80 overflow-y-auto">
            {notifications.slice(0, 5).map((n) => (
              <div
                key={n.id}
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1"
              >
                <div className="font-bold text-white text-[11px] flex items-center justify-between">
                  <span>{n.title}</span>
                  <span className="text-[9px] text-slate-500 font-normal">{n.createdAt}</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">{n.message}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => setAdminCurrentTab('audit')}
              className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#F5C400]" />
              <span>Buka Seluruh Audit Log Keamanan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
