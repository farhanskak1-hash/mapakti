import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Menu,
  Save,
  Eye,
  EyeOff,
  Edit2,
  ExternalLink,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Info,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { initialSiteSettings } from '../../data/initialData';

export const AdminNavMenus = () => {
  const { settings, setSettings, setAdminCurrentTab, addAuditLog, addToast } = useData();

  const [menus, setMenus] = useState(() => {
    return settings.navMenus && settings.navMenus.length > 0
      ? settings.navMenus
      : initialSiteSettings.navMenus;
  });

  const handleToggleMenu = (id) => {
    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isEnabled: !m.isEnabled } : m))
    );
  };

  const handleUpdateLabel = (id, newLabel) => {
    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, label: newLabel } : m))
    );
  };

  const handleUpdateBadge = (id, newBadge) => {
    setMenus((prev) =>
      prev.map((m) => (m.id === id ? { ...m, badge: newBadge } : m))
    );
  };

  const handleUpdateSubmenu = (menuId, subId, field, val) => {
    setMenus((prev) =>
      prev.map((m) => {
        if (m.id !== menuId || !m.subMenu) return m;
        return {
          ...m,
          subMenu: m.subMenu.map((sub) =>
            sub.id === subId ? { ...sub, [field]: val } : sub
          )
        };
      })
    );
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan susunan dan label seluruh menu navigasi ke setelan awal pabrik?')) {
      setMenus(initialSiteSettings.navMenus);
      addToast({
        type: 'info',
        title: 'Menu Direset',
        message: 'Susunan menu dikembalikan ke setelan default.'
      });
    }
  };

  const handleSave = (e) => {
    e?.preventDefault();
    setSettings((prev) => ({
      ...prev,
      navMenus: menus
    }));

    addAuditLog('UPDATE', 'Manajemen Menu Navigasi', 'Memperbarui nama label, visibilitas, dan badge menu navigasi website');
    addToast({
      type: 'success',
      title: 'Menu Navigasi Disimpan',
      message: 'Perubahan nama label dan visibilitas menu navigasi telah diterapkan ke header website.'
    });
  };

  // Helper mapping target section to admin tab
  const getAdminTabForMenu = (path) => {
    switch (path) {
      case 'home':
        return 'beranda';
      case 'profil':
        return 'profil';
      case 'kepengurusan':
        return 'periode';
      case 'anggota':
        return 'anggota';
      case 'divisi':
        return 'divisi';
      case 'proker':
        return 'proker';
      case 'kegiatan':
        return 'kegiatan';
      case 'berita':
        return 'berita';
      case 'galeri':
        return 'galeri';
      case 'diklatsar':
        return 'diklatsar';
      case 'prestasi':
        return 'prestasi';
      case 'kontak':
        return 'kontak';
      case 'daftar-anggota':
        return 'pendaftaran-anggota';
      default:
        return 'dashboard';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Menu className="w-6 h-6 text-[#F5C400]" />
            Manajemen & Editor Seluruh Menu Website
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ubah nama label menu, badge penanda, visibilitas tampil/sembunyi di header, serta akses langsung editor konten setiap menu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
            title="Kembalikan nama menu ke standar awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transform active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Menu</span>
          </button>
        </div>
      </div>

      {/* Menu Cards List */}
      <div className="space-y-4">
        {menus.map((menu, idx) => (
          <div
            key={menu.id}
            className={`p-5 sm:p-6 rounded-3xl border transition-all ${
              menu.isEnabled !== false
                ? 'bg-slate-900 border-slate-800 hover:border-[#F5C400]/40'
                : 'bg-slate-950/60 border-slate-800/60 opacity-60'
            }`}
          >
            {/* Main Menu Item Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-[#102A56] text-[#F5C400] text-xs font-black flex items-center justify-center border border-[#F5C400]/40 flex-shrink-0">
                  {idx + 1}
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      Menu ID: {menu.id}
                    </span>
                    {menu.subMenu && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 font-semibold border border-slate-700">
                        Memiliki {menu.subMenu.length} Sub-Menu
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Tools */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Edit Label Input */}
                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700">
                  <span className="text-slate-500 font-semibold text-[11px]">Label:</span>
                  <input
                    type="text"
                    value={menu.label}
                    onChange={(e) => handleUpdateLabel(menu.id, e.target.value)}
                    className="bg-transparent text-white font-bold text-xs focus:outline-none w-28 sm:w-36"
                  />
                </div>

                {/* Edit Badge Input */}
                <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-700">
                  <span className="text-slate-500 font-semibold text-[11px]">Badge:</span>
                  <input
                    type="text"
                    value={menu.badge || ''}
                    placeholder="Misal: BARU"
                    onChange={(e) => handleUpdateBadge(menu.id, e.target.value)}
                    className="bg-transparent text-[#F5C400] font-bold text-xs focus:outline-none w-16 sm:w-20"
                  />
                </div>

                {/* Toggle Show/Hide */}
                <button
                  type="button"
                  onClick={() => handleToggleMenu(menu.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
                    menu.isEnabled !== false
                      ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-700/60 hover:bg-emerald-900'
                      : 'bg-rose-950/70 text-rose-300 border border-rose-700/60 hover:bg-rose-900'
                  }`}
                  title={menu.isEnabled !== false ? 'Menu Aktif di Navbar' : 'Menu Disembunyikan dari Navbar'}
                >
                  {menu.isEnabled !== false ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Aktif</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                      <span>Sembunyi</span>
                    </>
                  )}
                </button>

                {/* Direct Jump to Edit Content */}
                <button
                  type="button"
                  onClick={() => setAdminCurrentTab(getAdminTabForMenu(menu.path))}
                  className="px-3.5 py-1.5 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] border border-[#F5C400]/40 font-bold flex items-center gap-1.5 shadow-sm transition-all"
                  title="Buka panel untuk mengedit isi data menu ini"
                >
                  <span>Edit Isi Konten</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sub-Menus Accordion / Grid (if present) */}
            {menu.subMenu && menu.subMenu.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Daftar Sub-Menu Navigasi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {menu.subMenu.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-500">ID: {sub.id}</span>
                        <button
                          type="button"
                          onClick={() => setAdminCurrentTab(getAdminTabForMenu(sub.path))}
                          className="text-[10px] text-[#F5C400] hover:underline font-bold flex items-center gap-1"
                        >
                          <span>Edit Konten</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Nama Label Sub-Menu</label>
                        <input
                          type="text"
                          value={sub.label}
                          onChange={(e) => handleUpdateSubmenu(menu.id, sub.id, 'label', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">Keterangan Singkat</label>
                        <input
                          type="text"
                          value={sub.desc || ''}
                          onChange={(e) => handleUpdateSubmenu(menu.id, sub.id, 'desc', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Save Bar */}
      <div className="p-4 rounded-2xl bg-[#0b1424] border border-[#F5C400]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Info className="w-4 h-4 text-[#F5C400]" />
          <span>Pengaturan menu disimpan ke database server dan langsung ter-update di bilah navigasi header website.</span>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-black text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transform active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Seluruh Menu</span>
        </button>
      </div>
    </div>
  );
};
