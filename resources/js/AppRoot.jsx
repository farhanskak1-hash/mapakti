import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { AdminLoginModal } from './components/common/AdminLoginModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { DetailModals } from './components/common/DetailModals';
import { ToastContainer } from './components/common/ToastContainer';
import { AdminLayout } from './components/admin/AdminLayout';

// 14 Public Sections per PRD
import { HomeSection } from './components/public/HomeSection';
import { ProfileSection } from './components/public/ProfileSection';
import { ManagementSection } from './components/public/ManagementSection';
import { MembersSection } from './components/public/MembersSection';
import { DivisionsSection } from './components/public/DivisionsSection';
import { WorkProgramSection } from './components/public/WorkProgramSection';
import { ActivitiesSection } from './components/public/ActivitiesSection';
import { NewsSection } from './components/public/NewsSection';
import { GallerySection } from './components/public/GallerySection';
import { DiklatsarSection } from './components/public/DiklatsarSection';
import { AchievementsSection } from './components/public/AchievementsSection';
import { AlumniSection } from './components/public/AlumniSection';
import { RegistrationSection } from './components/public/RegistrationSection';
import { ContactSection } from './components/public/ContactSection';

const MainApp = () => {
  const { currentSection, isAdminMode, isAdminAuthenticated } = useData();

  if (isAdminMode && isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <AdminLayout />
        <ToastContainer />
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
      case 'beranda':
        return <HomeSection />;
      case 'profile':
      case 'profil':
        return <ProfileSection />;
      case 'management':
      case 'kepengurusan':
        return <ManagementSection />;
      case 'members':
      case 'anggota':
        return <MembersSection />;
      case 'divisions':
      case 'divisi':
        return <DivisionsSection />;
      case 'programs':
      case 'proker':
        return <WorkProgramSection />;
      case 'activities':
      case 'kegiatan':
        return <ActivitiesSection />;
      case 'news':
      case 'berita':
        return <NewsSection />;
      case 'gallery':
      case 'galeri':
        return <GallerySection />;
      case 'diklatsar':
        return <DiklatsarSection />;
      case 'achievements':
      case 'prestasi':
        return <AchievementsSection />;
      case 'alumni':
        return <AlumniSection />;
      case 'registration':
      case 'daftar-anggota':
        return <RegistrationSection />;
      case 'contact':
      case 'kontak':
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      <Header />
      <main className="flex-1">
        {renderSection()}
      </main>
      <Footer />

      {/* Global Overlays & Modals */}
      <AdminLoginModal />
      <GlobalSearchModal />
      <DetailModals />
      <ToastContainer />
    </div>
  );
};

export default function AppRoot() {
  return (
    <DataProvider>
      <MainApp />
    </DataProvider>
  );
}
