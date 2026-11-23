import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ImageUploadInput } from '../common/ImageUploadInput';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Users,
  Calendar,
  X,
  CheckCircle2,
  Link as LinkIcon,
  Sparkles,
  Award,
  ChevronRight,
  Clock,
  History,
  Camera
} from 'lucide-react';

export const AdminPeriods = () => {
  const { periods, setPeriods, updatePeriods, members, addAuditLog, addToast } = useData();
  const [selectedPeriodId, setSelectedPeriodId] = useState(periods[0]?.id || '');

  // Modal states
  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState(null);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Period form state
  const [periodForm, setPeriodForm] = useState({
    name: '',
    startYear: new Date().getFullYear(),
    endYear: new Date().getFullYear() + 1,
    theme: '',
    status: 'Demisioner', // 'Aktif' | 'Demisioner' | 'Persiapan'
    groupPhotoUrl: ''
  });

  // Member (Officer) form state
  const [officerForm, setOfficerForm] = useState({
    memberId: '',
    name: '',
    nia: '',
    position: 'Ketua Umum',
    division: 'Hutan Gunung',
    faculty: '',
    photoUrl: ''
  });

  const activePeriod = periods.find((p) => p.id === selectedPeriodId) || periods[0];

  // Quick preset positions in board structure
  const positionPresets = [
    'Ketua Umum',
    'Wakil Ketua Umum',
    'Sekretaris Umum',
    'Sekretaris I',
    'Bendahara Umum',
    'Bendahara I',
    'Koordinator Divisi Hutan Gunung',
    'Koordinator Divisi Rock Climbing',
    'Koordinator Divisi Konservasi Sumber Daya Alam',
    'Koordinator Bidang Hubungan Masyarakat (Humas)',
    'Koordinator Bidang Logistik & Perlengkapan',
    'Koordinator Bidang Diklat & Litbang'
  ];

  // =================== PERIOD HANDLERS ===================
  const handleOpenAddPeriod = () => {
    setEditingPeriod(null);
    const currYear = new Date().getFullYear();
    setPeriodForm({
      name: `Periode ${currYear} / ${currYear + 1}`,
      startYear: currYear,
      endYear: currYear + 1,
      theme: 'Menempa Jiwa Petualang Berwawasan Konservasi & Integritas',
      status: 'Persiapan',
      groupPhotoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80'
    });
    setShowPeriodModal(true);
  };

  const handleOpenEditPeriod = (period) => {
    setEditingPeriod(period);
    setPeriodForm({
      name: period.name || '',
      startYear: period.startYear || new Date().getFullYear(),
      endYear: period.endYear || new Date().getFullYear() + 1,
      theme: period.theme || '',
      status: period.status || 'Demisioner',
      groupPhotoUrl: period.groupPhotoUrl || ''
    });
    setShowPeriodModal(true);
  };

  const handleSavePeriod = (e) => {
    e.preventDefault();

    if (editingPeriod) {
      // If set to Aktif, demote any previous Aktif period
      updatePeriods((prev) =>
        prev.map((p) => {
          if (p.id === editingPeriod.id) {
            return {
              ...p,
              ...periodForm,
              members: p.members || []
            };
          }
          if (periodForm.status === 'Aktif' && p.status === 'Aktif') {
            return { ...p, status: 'Demisioner' };
          }
          return p;
        })
      );
      addAuditLog('UPDATE', 'Kepengurusan', `Memperbarui data periode ${periodForm.name}`);
      addToast({ type: 'success', title: 'Periode Diperbarui', message: `Data ${periodForm.name} berhasil disimpan.` });
    } else {
      const newId = `period-${Date.now()}`;
      const newPeriodObj = {
        id: newId,
        ...periodForm,
        members: []
      };

      updatePeriods((prev) => {
        let updated = [...prev];
        if (periodForm.status === 'Aktif') {
          updated = updated.map((p) => (p.status === 'Aktif' ? { ...p, status: 'Demisioner' } : p));
        }
        return [newPeriodObj, ...updated];
      });

      setSelectedPeriodId(newId);
      addAuditLog('CREATE', 'Kepengurusan', `Menambahkan periode masa bakti baru: ${periodForm.name}`);
      addToast({ type: 'success', title: 'Periode Dibuat', message: `${periodForm.name} berhasil ditambahkan ke daftar kepengurusan.` });
    }

    setShowPeriodModal(false);
  };

  const handleDeletePeriod = (period) => {
    if (periods.length <= 1) {
      alert('Sistem harus memiliki minimal 1 periode kepengurusan.');
      return;
    }
    if (window.confirm(`Yakin ingin menghapus ${period.name}? Seluruh struktur pengurus di periode ini akan terhapus.`)) {
      updatePeriods((prev) => prev.filter((p) => p.id !== period.id));
      const remaining = periods.filter((p) => p.id !== period.id);
      if (remaining.length > 0) setSelectedPeriodId(remaining[0].id);

      addAuditLog('DELETE', 'Kepengurusan', `Menghapus periode ${period.name}`);
      addToast({ type: 'info', title: 'Periode Dihapus', message: `${period.name} telah dihapus dari sistem.` });
    }
  };

  const handleSetPrimaryActive = (periodId) => {
    updatePeriods((prev) =>
      prev.map((p) => ({
        ...p,
        status: p.id === periodId ? 'Aktif' : p.status === 'Aktif' ? 'Demisioner' : p.status
      }))
    );
    addAuditLog('UPDATE', 'Kepengurusan', `Menetapkan ${periods.find((p) => p.id === periodId)?.name} sebagai periode aktif`);
    addToast({ type: 'success', title: 'Periode Aktif Diubah', message: 'Masa bakti ini sekarang tampil sebagai pengurus aktif di website publik.' });
  };

  // =================== OFFICER (MEMBER) HANDLERS ===================
  const handleOpenAddOfficer = () => {
    setEditingMember(null);
    // If members exist, default to the first member
    const firstMem = members[0];
    setOfficerForm({
      memberId: firstMem ? firstMem.id : '',
      name: firstMem ? firstMem.name : '',
      nia: firstMem ? firstMem.nia : '',
      position: 'Ketua Umum',
      division: firstMem?.specializationDivision || 'Hutan Gunung',
      faculty: firstMem?.faculty || 'Fakultas Teknik',
      photoUrl: firstMem?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'
    });
    setShowMemberModal(true);
  };

  const handleOpenEditOfficer = (officer) => {
    setEditingMember(officer);
    setOfficerForm({
      memberId: officer.memberId || '',
      name: officer.name || '',
      nia: officer.nia || '',
      position: officer.position || 'Ketua Umum',
      division: officer.division || 'Hutan Gunung',
      faculty: officer.faculty || '',
      photoUrl: officer.photoUrl || ''
    });
    setShowMemberModal(true);
  };

  const handleSelectMemberFromDB = (selectedId) => {
    if (!selectedId) {
      setOfficerForm({
        ...officerForm,
        memberId: '',
        name: '',
        nia: '',
        faculty: '',
        photoUrl: ''
      });
      return;
    }

    const selectedMember = members.find((m) => m.id === selectedId);
    if (selectedMember) {
      setOfficerForm({
        ...officerForm,
        memberId: selectedMember.id,
        name: selectedMember.name,
        nia: selectedMember.nia,
        faculty: selectedMember.faculty,
        division: selectedMember.specializationDivision || officerForm.division,
        photoUrl: selectedMember.photoUrl || officerForm.photoUrl
      });
    }
  };

  const handleSaveOfficer = (e) => {
    e.preventDefault();
    if (!activePeriod) return;

    if (editingMember) {
      // Update existing officer
      updatePeriods((prev) =>
        prev.map((p) => {
          if (p.id === activePeriod.id) {
            return {
              ...p,
              members: (p.members || []).map((m) =>
                m.id === editingMember.id ? { ...m, ...officerForm } : m
              )
            };
          }
          return p;
        })
      );
      addAuditLog('UPDATE', 'Kepengurusan', `Memperbarui pengurus ${officerForm.name} (${officerForm.position})`);
      addToast({ type: 'success', title: 'Pengurus Diperbarui', message: `Data pengurus ${officerForm.name} berhasil diperbarui.` });
    } else {
      // Add new officer
      const newOfficerObj = {
        id: `peng-${Date.now()}`,
        ...officerForm
      };

      updatePeriods((prev) =>
        prev.map((p) =>
          p.id === activePeriod.id
            ? { ...p, members: [...(p.members || []), newOfficerObj] }
            : p
        )
      );

      addAuditLog('CREATE', 'Kepengurusan', `Menambahkan ${officerForm.name} sebagai ${officerForm.position} di ${activePeriod.name}`);
      addToast({ type: 'success', title: 'Pengurus Ditambahkan', message: `${officerForm.name} ditugaskan sebagai ${officerForm.position}.` });
    }

    setShowMemberModal(false);
  };

  const handleDeleteOfficer = (officerId, officerName) => {
    if (window.confirm(`Hapus ${officerName} dari struktur pengurus ${activePeriod.name}?`)) {
      updatePeriods((prev) =>
        prev.map((p) =>
          p.id === activePeriod.id
            ? { ...p, members: (p.members || []).filter((m) => m.id !== officerId) }
            : p
        )
      );
      addAuditLog('DELETE', 'Kepengurusan', `Menghapus pengurus ${officerName} dari ${activePeriod.name}`);
      addToast({ type: 'info', title: 'Pengurus Dihapus', message: `${officerName} telah dihapus dari struktur.` });
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#F5C400]" />
            Manajemen Periode & Struktur Kepengurusan
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola periode kepengurusan (sebelumnya, aktif, maupun mendatang) dengan susunan pengurus yang terintegrasi langsung dengan biodata anggota.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleOpenAddPeriod}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4 text-[#F5C400]" />
            <span>+ Buat Periode Baru</span>
          </button>

          <button
            onClick={handleOpenAddOfficer}
            className="px-4 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Pengurus</span>
          </button>
        </div>
      </div>

      {/* 2. Periode Tabs Navigation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
          <span>PILIH PERIODE MASA BAKTI:</span>
          <span>Total: {periods.length} Periode Terdata</span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 border-b border-slate-800 pb-4">
          {periods.map((p) => {
            const isSelected = p.id === activePeriod?.id;
            const isAktif = p.status === 'Aktif';
            const isPersiapan = p.status === 'Persiapan';

            return (
              <div key={p.id} className="relative group">
                <button
                  onClick={() => setSelectedPeriodId(p.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-[#F5C400] text-[#102A56] shadow-lg shadow-[#F5C400]/25 ring-2 ring-[#F5C400]'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{p.name}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      isAktif
                        ? isSelected
                          ? 'bg-[#102A56] text-[#F5C400]'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isPersiapan
                        ? isSelected
                          ? 'bg-[#102A56] text-sky-300'
                          : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                        : isSelected
                        ? 'bg-slate-900/80 text-slate-200'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Active Period Highlight Card */}
      {activePeriod && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#102A56]/40 to-slate-900 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5C400] text-[#102A56]">
                  {activePeriod.status === 'Aktif'
                    ? 'Sedang Menjabat (Aktif)'
                    : activePeriod.status === 'Persiapan'
                    ? 'Periode Yang Akan Datang'
                    : 'Periode Sebelumnya (Demisioner)'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activePeriod.startYear && activePeriod.endYear ? `${activePeriod.startYear} - ${activePeriod.endYear}` : ''}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{activePeriod.name}</h3>
              <p className="text-xs text-slate-300 italic">"{activePeriod.theme}"</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {activePeriod.status !== 'Aktif' && (
                <button
                  onClick={() => handleSetPrimaryActive(activePeriod.id)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                  title="Jadikan periode ini sebagai kepengurusan aktif utama"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Jadikan Periode Aktif</span>
                </button>
              )}

              <button
                onClick={() => handleOpenEditPeriod(activePeriod)}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-[#102A56] text-slate-200 hover:text-[#F5C400] font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Info Periode</span>
              </button>

              <button
                onClick={() => handleDeletePeriod(activePeriod)}
                className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white font-bold text-xs border border-rose-900/60 transition-colors flex items-center gap-1.5"
                title="Hapus periode kepengurusan ini"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Periode</span>
              </button>
            </div>
          </div>

          {/* Group Photo Showcase (if exists) */}
          {activePeriod.groupPhotoUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 group shadow-xl bg-slate-950">
              <div className="w-full flex items-center justify-center bg-slate-950">
                <img
                  src={activePeriod.groupPhotoUrl}
                  alt={`Foto Bersama ${activePeriod.name}`}
                  className="w-full h-auto max-h-[460px] object-contain sm:object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end justify-between p-4 pointer-events-none">
                <span className="text-xs font-bold text-white flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
                  <Camera className="w-4 h-4 text-[#F5C400]" />
                  Dokumentasi Foto Bersama Pengurus {activePeriod.name}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Resolusi Full HD
                </span>
              </div>
            </div>
          )}

          {/* Statistics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Personil</span>
              <span className="text-lg font-black text-white">{activePeriod.members?.length || 0} Pengurus</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Divisi HG</span>
              <span className="text-lg font-black text-emerald-400">
                {activePeriod.members?.filter((m) => m.division === 'Hutan Gunung').length || 0}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Divisi RC</span>
              <span className="text-lg font-black text-amber-400">
                {activePeriod.members?.filter((m) => m.division === 'Rock Climbing').length || 0}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Divisi KSDA</span>
              <span className="text-lg font-black text-teal-400">
                {activePeriod.members?.filter((m) => m.division === 'Konservasi Sumber Daya Alam').length || 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Officers Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-[#F5C400]" />
            Susunan Struktur Organisasi ({activePeriod?.members?.length || 0} Pengurus)
          </h3>
          <button
            onClick={handleOpenAddOfficer}
            className="text-xs text-[#F5C400] hover:underline font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Personil
          </button>
        </div>

        {activePeriod?.members?.length === 0 ? (
          <div className="text-center py-12 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <Users className="w-12 h-12 text-slate-600 mx-auto" />
            <div className="text-sm font-bold text-slate-300">Belum Ada Pengurus Terdaftar</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Periode ini belum memiliki susunan pengurus. Tambahkan personil dengan memilih dari master biodata anggota.
            </p>
            <button
              onClick={handleOpenAddOfficer}
              className="px-5 py-2.5 rounded-xl bg-[#F5C400] text-[#102A56] font-bold text-xs uppercase tracking-wider"
            >
              + Tambah Pengurus Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {activePeriod?.members?.map((officer) => {
              const isLinkedToMember = Boolean(officer.memberId);

              return (
                <div
                  key={officer.id}
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 hover:border-[#F5C400]/40 transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-3">
                    {/* Header Officer Info */}
                    <div className="flex items-start gap-3">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 flex-shrink-0">
                        <img
                          src={officer.photoUrl}
                          alt={officer.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase text-[#F5C400] tracking-wider block truncate">
                          {officer.position}
                        </span>
                        <h4 className="font-bold text-white text-sm truncate">{officer.name}</h4>
                        {officer.nia && (
                          <div className="text-[10px] font-mono text-slate-400 truncate">
                            NIA: {officer.nia}
                          </div>
                        )}
                        <div className="text-[10px] text-slate-500 truncate">{officer.faculty}</div>
                      </div>
                    </div>

                    {/* Division Badge & Integration Status */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-[#102A56] text-[#F5C400] font-semibold truncate max-w-[130px]">
                        {officer.division}
                      </span>

                      {isLinkedToMember ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold" title="Terhubung langsung dengan Biodata Master Anggota">
                          <LinkIcon className="w-3 h-3" /> Biodata Terhubung
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Manual</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => handleOpenEditOfficer(officer)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#F5C400] hover:bg-slate-800 transition-colors"
                      title="Edit Pengurus"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteOfficer(officer.id, officer.name)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Hapus dari Pengurus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =================== MODAL 1: PERIOD CREATE / EDIT =================== */}
      {showPeriodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#F5C400]" />
                <h3 className="text-lg font-bold text-white">
                  {editingPeriod ? `Edit ${editingPeriod.name}` : 'Buat Periode Kepengurusan Baru'}
                </h3>
              </div>
              <button onClick={() => setShowPeriodModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePeriod} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Nama Periode Masa Bakti *</label>
                <input
                  type="text"
                  required
                  value={periodForm.name}
                  onChange={(e) => setPeriodForm({ ...periodForm, name: e.target.value })}
                  placeholder="Contoh: Periode 2025 / 2026 atau Periode 2022 / 2023"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tahun Mulai *</label>
                  <input
                    type="number"
                    required
                    value={periodForm.startYear}
                    onChange={(e) => setPeriodForm({ ...periodForm, startYear: parseInt(e.target.value) || 2025 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Tahun Selesai *</label>
                  <input
                    type="number"
                    required
                    value={periodForm.endYear}
                    onChange={(e) => setPeriodForm({ ...periodForm, endYear: parseInt(e.target.value) || 2026 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status Masa Bakti *</label>
                <select
                  value={periodForm.status}
                  onChange={(e) => setPeriodForm({ ...periodForm, status: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                >
                  <option value="Aktif">Aktif (Sedang Menjabat Sekarang)</option>
                  <option value="Persiapan">Persiapan (Periode Yang Akan Datang)</option>
                  <option value="Demisioner">Demisioner (Periode Sebelumnya / Arsip Sejarah)</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  * Menyetel status menjadi "Aktif" akan secara otomatis menjadikan periode ini sebagai pengurus yang tampil pertama di portal publik.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tema / Semboyan Masa Bakti</label>
                <input
                  type="text"
                  value={periodForm.theme}
                  onChange={(e) => setPeriodForm({ ...periodForm, theme: e.target.value })}
                  placeholder="Contoh: Sinergi Rimbawan Berintegritas & Berdaya Saing"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              {/* Upload Foto Bersama Periode via Button (Resolusi Tinggi Full HD) */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUploadInput
                  value={periodForm.groupPhotoUrl}
                  onChange={(url) => setPeriodForm({ ...periodForm, groupPhotoUrl: url })}
                  label="Foto Bersama Seluruh Pengurus (Landscape Full HD)"
                  hint="Unggah foto bersama dewan pengurus resolusi tinggi (Sistem otomatis memproses Full HD 1080p / 1920px agar sangat tajam dan tidak pecah)"
                  aspectRatio="aspect-video"
                  maxWidth={1920}
                  maxHeight={1200}
                  quality={0.90}
                  isGroupPhoto={true}
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowPeriodModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold shadow-lg"
                >
                  {editingPeriod ? 'Simpan Perubahan' : 'Buat Periode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================== MODAL 2: OFFICER (MEMBER) CREATE / EDIT =================== */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#F5C400]" />
                <h3 className="text-base font-bold text-white">
                  {editingMember ? 'Edit Data Pengurus' : `Tambah Pengurus ${activePeriod.name}`}
                </h3>
              </div>
              <button onClick={() => setShowMemberModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOfficer} className="space-y-4 text-xs">
              {/* 1. Integrated Biodata Selector */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-[#F5C400] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5" /> Pilih dari Biodata Master Anggota *
                  </label>
                  <span className="text-[10px] text-slate-500">Terintegrasi Database</span>
                </div>

                <select
                  value={officerForm.memberId}
                  onChange={(e) => handleSelectMemberFromDB(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400] font-medium"
                >
                  <option value="">-- Pilih dari Master Biodata Anggota --</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} [{m.nia || 'Belum ada NIA'}] - {m.specializationDivision || 'HG'} ({m.faculty})
                    </option>
                  ))}
                </select>

                {officerForm.memberId ? (
                  <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Biodata terhubung: Data nama, NIA, foto & fakultas tersinkronisasi otomatis.</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400">
                    Atau ketikkan nama & data personil secara manual jika pengurus belum terdaftar di database anggota.
                  </p>
                )}
              </div>

              {/* 2. Position Preset Selector */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Jabatan dalam Kepengurusan *</label>
                <div className="space-y-2">
                  <select
                    value={officerForm.position}
                    onChange={(e) => setOfficerForm({ ...officerForm, position: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    {positionPresets.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                    <option value="custom">-- Jabatan Lainnya (Ketik Manual) --</option>
                  </select>

                  {(!positionPresets.includes(officerForm.position) || officerForm.position === 'custom') && (
                    <input
                      type="text"
                      required
                      value={officerForm.position === 'custom' ? '' : officerForm.position}
                      onChange={(e) => setOfficerForm({ ...officerForm, position: e.target.value })}
                      placeholder="Ketik nama jabatan khusus..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                    />
                  )}
                </div>
              </div>

              {/* 3. Member Name & NIA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nama Lengkap Pengurus *</label>
                  <input
                    type="text"
                    required
                    value={officerForm.name}
                    onChange={(e) => setOfficerForm({ ...officerForm, name: e.target.value })}
                    placeholder="Nama Lengkap"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Nomor Induk Anggota (NIA)</label>
                  <input
                    type="text"
                    value={officerForm.nia}
                    onChange={(e) => setOfficerForm({ ...officerForm, nia: e.target.value })}
                    placeholder="Contoh: MPK-XXII-2021-118"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              {/* 4. Division & Faculty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Divisi Asal *</label>
                  <select
                    value={officerForm.division}
                    onChange={(e) => setOfficerForm({ ...officerForm, division: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="Hutan Gunung">Hutan Gunung</option>
                    <option value="Rock Climbing">Rock Climbing</option>
                    <option value="Konservasi Sumber Daya Alam">Konservasi Sumber Daya Alam</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Fakultas Asal *</label>
                  <input
                    type="text"
                    required
                    value={officerForm.faculty}
                    onChange={(e) => setOfficerForm({ ...officerForm, faculty: e.target.value })}
                    placeholder="Contoh: Fakultas Teknik"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              {/* 5. Upload Foto Pengurus Menggunakan Tombol */}
              <div className="pt-2 border-t border-slate-800">
                <ImageUploadInput
                  value={officerForm.photoUrl}
                  onChange={(url) => setOfficerForm({ ...officerForm, photoUrl: url })}
                  label="Foto Resmi Pengurus"
                  hint="Unggah foto formal / setengah badan pengurus"
                  aspectRatio="aspect-square"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold shadow-md"
                >
                  {editingMember ? 'Simpan Perubahan' : 'Simpan Pengurus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
