import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { initialMembers } from '../../data/initialData';
import { ImageUploadInput } from '../common/ImageUploadInput';
import * as XLSX from 'xlsx';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  X,
  FileSpreadsheet,
  Download,
  Upload,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
  Check,
  CheckSquare,
  Square,
  AlertTriangle
} from 'lucide-react';

export const AdminMembers = () => {
  const {
    members,
    setMembers,
    updateMembers,
    toggleMemberPublish,
    addAuditLog,
    addToast
  } = useData();

  // Search and filter states
  const [search, setSearch] = useState('');
  const [filterDiv, setFilterDiv] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua'); // 'Semua' | 'Anggota Tetap' | 'Anggota Luar Biasa' | 'Anggota Muda'

  // Multi-select state for batch deletion
  const [selectedIds, setSelectedIds] = useState([]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Excel Import states
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [parsedMembers, setParsedMembers] = useState([]);
  const [importErrors, setImportErrors] = useState([]);
  const [importMode, setImportMode] = useState('append'); // 'append' | 'replace'
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef(null);

  // Form state for single member add/edit
  const [formData, setFormData] = useState({
    name: '',
    nia: '',
    generation: '',
    joinYear: new Date().getFullYear(),
    faculty: '',
    membershipStatus: 'Anggota Tetap', // Strictly: 'Anggota Tetap' | 'Anggota Luar Biasa' | 'Anggota Muda'
    specializationDivision: 'Hutan Gunung',
    isPublished: false,
    achievements: '',
    phone: '',
    email: '',
    photoUrl: ''
  });

  // Calculate statistics
  const totalCount = members.length;
  const tetapCount = members.filter((m) => m.membershipStatus === 'Anggota Tetap').length;
  const luarBiasaCount = members.filter((m) => m.membershipStatus === 'Anggota Luar Biasa').length;
  const mudaCount = members.filter((m) => m.membershipStatus === 'Anggota Muda').length;

  // Filter members list
  const filteredMembers = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.nia.toLowerCase().includes(search.toLowerCase()) ||
      (m.generation && m.generation.toLowerCase().includes(search.toLowerCase())) ||
      (m.faculty && m.faculty.toLowerCase().includes(search.toLowerCase()));

    const matchDiv = filterDiv === 'Semua' || m.specializationDivision.includes(filterDiv);
    const matchStatus = filterStatus === 'Semua' || m.membershipStatus === filterStatus;

    return matchSearch && matchDiv && matchStatus;
  });

  // =================== SINGLE MEMBER HANDLERS ===================
  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      nia: `MPK-XXIV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      generation: 'Angkatan XXIV - Kabut Lembah',
      joinYear: new Date().getFullYear(),
      faculty: 'Fakultas Teknik',
      membershipStatus: 'Anggota Tetap',
      specializationDivision: 'Hutan Gunung',
      isPublished: false,
      achievements: 'Pernah mengikuti ekspedisi navigasi rimba',
      phone: '085812345678',
      email: 'anggota@mapakti.or.id',
      photoUrl: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData({
      ...m,
      membershipStatus: ['Anggota Tetap', 'Anggota Luar Biasa', 'Anggota Muda'].includes(m.membershipStatus)
        ? m.membershipStatus
        : 'Anggota Tetap',
      photoUrl: m.photoUrl || ''
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      updateMembers((prev) =>
        prev.map((item) => (item.id === editingMember.id ? { ...item, ...formData } : item))
      );
      addAuditLog('UPDATE', 'Data Anggota', `Memperbarui data anggota ${formData.name} (${formData.nia})`);
      addToast({ type: 'success', title: 'Data Diperbarui', message: `Data anggota ${formData.name} berhasil disimpan.` });
    } else {
      const newM = {
        id: `mem-${Date.now()}`,
        ...formData
      };
      updateMembers((prev) => [newM, ...prev]);
      addAuditLog('CREATE', 'Data Anggota', `Menambahkan anggota baru ${formData.name} (${formData.nia})`);
      addToast({ type: 'success', title: 'Anggota Ditambahkan', message: `Anggota ${formData.name} berhasil didaftarkan sebagai ${formData.membershipStatus}.` });
    }
    setShowModal(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Hapus data anggota ${name}?`)) {
      updateMembers((prev) => prev.filter((m) => m.id !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      addAuditLog('DELETE', 'Data Anggota', `Menghapus anggota ${name}`);
      addToast({ type: 'info', title: 'Anggota Dihapus', message: `Data anggota ${name} telah dihapus.` });
    }
  };

  // Multi-select actions (Batch Delete)
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (filteredMembers.length > 0 && selectedIds.length === filteredMembers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredMembers.map((m) => m.id));
    }
  };

  const handleBatchDelete = () => {
    if (selectedIds.length === 0) return;
    const count = selectedIds.length;
    if (
      window.confirm(
        `PERINGATAN HAPUS MASSAL: Apakah Anda yakin ingin menghapus ${count} data anggota yang dicentang? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      updateMembers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      addAuditLog('DELETE', 'Data Anggota', `Menghapus massal ${count} data anggota`);
      addToast({
        type: 'info',
        title: 'Hapus Massal Berhasil',
        message: `${count} data anggota berhasil dihapus dari sistem.`
      });
      setSelectedIds([]);
    }
  };

  const handleClearAll = () => {
    if (members.length === 0) return;
    const count = members.length;
    if (
      window.confirm(
        `PERINGATAN: Apakah Anda yakin ingin MENGHAPUS SELURUH ${count} data anggota? Seluruh baris data anggota akan dikosongkan.`
      )
    ) {
      updateMembers([]);
      setSelectedIds([]);
      addAuditLog('DELETE', 'Data Anggota', `Mengosongkan seluruh data anggota (${count} orang)`);
      addToast({
        type: 'warning',
        title: 'Data Dikosongkan',
        message: `Seluruh data anggota (${count} orang) telah dikosongkan.`
      });
    }
  };

  const handleResetSampleData = () => {
    if (
      window.confirm(
        'Apakah Anda ingin mereset dan mengembalikan data anggota ke sample data bawaan MAPAKTI?'
      )
    ) {
      updateMembers(initialMembers);
      setSelectedIds([]);
      addAuditLog('UPDATE', 'Data Anggota', 'Mereset data anggota ke contoh awal bawaan');
      addToast({
        type: 'info',
        title: 'Data Direset',
        message: 'Data anggota berhasil dikembalikan ke data awal MAPAKTI.'
      });
    }
  };

  // =================== EXCEL IMPORT & EXPORT HANDLERS ===================
  // 1. Download Blank/Sample Template Excel
  const handleDownloadTemplate = (format = 'xlsx') => {
    const templateRows = [
      {
        'Nama Lengkap': 'M. Bayu Dirgantara',
        'NIA': 'MPK-XXII-2021-118',
        'Angkatan': 'Angkatan XXII - Tapak Rimba',
        'Tahun Masuk': 2021,
        'Fakultas': 'Fakultas Teknik',
        'Status Keanggotaan': 'Anggota Tetap', // Pilihan: Anggota Tetap | Anggota Luar Biasa | Anggota Muda
        'Divisi Spesialisasi': 'Hutan Gunung', // Pilihan: Hutan Gunung | Rock Climbing | Konservasi Sumber Daya Alam
        'Nomor HP / WhatsApp': '085876543210',
        'Email': 'bayu.dirgantara@mail.com',
        'Prestasi / Rekam Jejak': 'Pimpinan Ekspedisi Puncak Slamet 2023',
        'URL Foto Profil': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        'Publikasikan ke Web': 'Ya'
      },
      {
        'Nama Lengkap': 'Rangga Aditya Pratama',
        'NIA': 'MPK-XXIII-2022-135',
        'Angkatan': 'Angkatan XXIII - Badai Karst',
        'Tahun Masuk': 2022,
        'Fakultas': 'Fakultas Hukum',
        'Status Keanggotaan': 'Anggota Tetap',
        'Divisi Spesialisasi': 'Rock Climbing',
        'Nomor HP / WhatsApp': '089876543210',
        'Email': 'rangga.aditya@mail.com',
        'Prestasi / Rekam Jejak': 'Juara 2 Lead Climbing Kejurda Jateng 2024',
        'URL Foto Profil': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        'Publikasikan ke Web': 'Ya'
      },
      {
        'Nama Lengkap': 'Fajar Tri Wicaksono',
        'NIA': 'MPK-XIX-2018-099',
        'Angkatan': 'Angkatan XIX - Savana Rimba',
        'Tahun Masuk': 2018,
        'Fakultas': 'Fakultas Ilmu Sosial dan Ilmu Politik',
        'Status Keanggotaan': 'Anggota Luar Biasa',
        'Divisi Spesialisasi': 'Konservasi Sumber Daya Alam',
        'Nomor HP / WhatsApp': '081234567890',
        'Email': 'fajar.tri@mail.com',
        'Prestasi / Rekam Jejak': 'Inisiator Konservasi Mangrove Pantura',
        'URL Foto Profil': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
        'Publikasikan ke Web': 'Ya'
      },
      {
        'Nama Lengkap': 'Arya Surya Pratama',
        'NIA': 'MPK-XXIV-2023-158',
        'Angkatan': 'Angkatan XXIV - Kabut Lembah',
        'Tahun Masuk': 2023,
        'Fakultas': 'Fakultas Perikanan dan Ilmu Kelautan',
        'Status Keanggotaan': 'Anggota Muda',
        'Divisi Spesialisasi': 'Hutan Gunung',
        'Nomor HP / WhatsApp': '087755443322',
        'Email': 'arya.muda@mail.com',
        'Prestasi / Rekam Jejak': 'Lulusan DIKLATSAR Lapangan XXIV',
        'URL Foto Profil': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
        'Publikasikan ke Web': 'Tidak'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template Anggota');

    // Auto set column widths for nice readability
    ws['!cols'] = [
      { wch: 25 }, // Nama
      { wch: 22 }, // NIA
      { wch: 30 }, // Angkatan
      { wch: 14 }, // Tahun
      { wch: 30 }, // Fakultas
      { wch: 22 }, // Status Keanggotaan
      { wch: 28 }, // Divisi
      { wch: 20 }, // HP
      { wch: 26 }, // Email
      { wch: 35 }, // Prestasi
      { wch: 30 }, // Foto URL
      { wch: 18 }  // Publik
    ];

    const filename = `template_import_anggota_mapakti.${format}`;
    XLSX.writeFile(wb, filename);
    addToast({ type: 'info', title: 'Template Diunduh', message: `Berkas ${filename} siap diisi di Excel.` });
  };

  // 2. Export Current Members to Excel
  const handleExportMembers = () => {
    if (members.length === 0) {
      alert('Belum ada data anggota untuk diekspor.');
      return;
    }

    const exportRows = members.map((m, idx) => ({
      'No': idx + 1,
      'Nama Lengkap': m.name,
      'NIA': m.nia,
      'Angkatan': m.generation || '',
      'Tahun Masuk': m.joinYear || '',
      'Fakultas': m.faculty || '',
      'Status Keanggotaan': m.membershipStatus,
      'Divisi Spesialisasi': m.specializationDivision,
      'Nomor HP / WA': m.phone || '',
      'Email': m.email || '',
      'Prestasi / Rekam Jejak': m.achievements || '',
      'Status Publikasi': m.isPublished ? 'Publik' : 'Privat',
      'URL Foto Profil': m.photoUrl || ''
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Anggota');

    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `data_seluruh_anggota_mapakti_${dateStr}.xlsx`;
    XLSX.writeFile(wb, filename);

    addAuditLog('EXPORT', 'Data Anggota', `Mengekspor ${members.length} data anggota ke Excel`);
    addToast({ type: 'success', title: 'Ekspor Berhasil', message: `${members.length} data anggota diekspor ke ${filename}` });
  };

  // 3. Process Uploaded Excel File
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportFile(file);
    setIsParsing(true);
    setImportErrors([]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON objects
        const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        if (!rawRows || rawRows.length === 0) {
          setImportErrors(['File Excel kosong atau tidak memiliki baris data yang valid.']);
          setIsParsing(false);
          return;
        }

        const validParsed = [];
        const errors = [];

        rawRows.forEach((row, index) => {
          // Normalize column keys (case-insensitive & trimmed)
          const normalized = {};
          Object.keys(row).forEach((key) => {
            normalized[key.trim().toLowerCase()] = String(row[key]).trim();
          });

          // Extract fields flexibly
          const name =
            normalized['nama lengkap'] ||
            normalized['nama'] ||
            normalized['name'] ||
            normalized['full name'];

          if (!name) {
            errors.push(`Baris ${index + 2}: Kolom Nama kosong.`);
            return;
          }

          const nia =
            normalized['nia'] ||
            normalized['nomor induk anggota'] ||
            normalized['no anggota'] ||
            `MPK-GEN-${Math.floor(1000 + Math.random() * 9000)}`;

          const generation =
            normalized['angkatan'] ||
            normalized['generation'] ||
            normalized['nama angkatan'] ||
            'Angkatan MAPAKTI';

          const joinYear =
            parseInt(normalized['tahun masuk'] || normalized['tahun'] || normalized['join year']) ||
            new Date().getFullYear();

          const faculty =
            normalized['fakultas'] ||
            normalized['faculty'] ||
            'Universitas Pancasakti Tegal';

          // Strictly normalize membership status to: 'Anggota Tetap' | 'Anggota Luar Biasa' | 'Anggota Muda'
          const rawStatus = (
            normalized['status keanggotaan'] ||
            normalized['status'] ||
            normalized['tipe'] ||
            normalized['tipe anggota'] ||
            normalized['membership status'] ||
            ''
          ).toLowerCase();

          let membershipStatus = 'Anggota Tetap';
          if (rawStatus.includes('luar') || rawStatus.includes('alb') || rawStatus.includes('senior')) {
            membershipStatus = 'Anggota Luar Biasa';
          } else if (rawStatus.includes('muda') || rawStatus.includes('am') || rawStatus.includes('diksar')) {
            membershipStatus = 'Anggota Muda';
          } else {
            membershipStatus = 'Anggota Tetap';
          }

          // Strictly normalize division
          const rawDiv = (
            normalized['divisi spesialisasi'] ||
            normalized['divisi'] ||
            normalized['division'] ||
            ''
          ).toLowerCase();

          let specializationDivision = 'Hutan Gunung';
          if (rawDiv.includes('rock') || rawDiv.includes('climb') || rawDiv.includes('panjat')) {
            specializationDivision = 'Rock Climbing';
          } else if (rawDiv.includes('konservasi') || rawDiv.includes('ksda') || rawDiv.includes('alam')) {
            specializationDivision = 'Konservasi Sumber Daya Alam';
          } else {
            specializationDivision = 'Hutan Gunung';
          }

          const phone =
            normalized['nomor hp / whatsapp'] ||
            normalized['nomor hp'] ||
            normalized['nomor telepon'] ||
            normalized['telepon'] ||
            normalized['no hp'] ||
            normalized['phone'] ||
            '';

          const email =
            normalized['email'] ||
            normalized['surel'] ||
            '';

          const achievements =
            normalized['prestasi / rekam jejak'] ||
            normalized['prestasi'] ||
            normalized['rekam jejak'] ||
            normalized['achievements'] ||
            '';

          const photoUrl =
            normalized['url foto profil'] ||
            normalized['foto url'] ||
            normalized['url foto'] ||
            normalized['photo url'] ||
            normalized['foto'] ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';

          const rawPublic = (
            normalized['publikasikan ke web'] ||
            normalized['publik'] ||
            normalized['is published'] ||
            ''
          ).toLowerCase();

          const isPublished =
            rawPublic === 'ya' ||
            rawPublic === 'yes' ||
            rawPublic === 'true' ||
            rawPublic === '1';

          validParsed.push({
            id: `mem-import-${Date.now()}-${index}`,
            name,
            nia,
            generation,
            joinYear,
            faculty,
            membershipStatus,
            specializationDivision,
            phone,
            email,
            achievements,
            photoUrl,
            isPublished
          });
        });

        setParsedMembers(validParsed);
        setImportErrors(errors);
      } catch (err) {
        setImportErrors([`Gagal membaca file Excel: ${err.message}`]);
      } finally {
        setIsParsing(false);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  // 4. Confirm and Save Imported Members
  const handleCommitImport = () => {
    if (parsedMembers.length === 0) return;

    if (importMode === 'replace') {
      if (
        !window.confirm(
          `PERINGATAN: Mode 'Gantikan Semua' akan menghapus ${members.length} anggota yang ada dan menggantikannya dengan ${parsedMembers.length} anggota dari Excel. Lanjutkan?`
        )
      ) {
        return;
      }
      updateMembers(parsedMembers);
    } else {
      // Append mode: avoid duplicate NIA if already exists
      const existingNias = new Set(members.map((m) => m.nia.toLowerCase().trim()));
      const toAdd = [];
      const updated = [...members];

      parsedMembers.forEach((newMem) => {
        const cleanNia = newMem.nia.toLowerCase().trim();
        if (cleanNia && existingNias.has(cleanNia)) {
          // Update existing member with new data
          const idx = updated.findIndex((m) => m.nia.toLowerCase().trim() === cleanNia);
          if (idx !== -1) {
            updated[idx] = { ...updated[idx], ...newMem, id: updated[idx].id };
          }
        } else {
          toAdd.push(newMem);
        }
      });

      updateMembers([...toAdd, ...updated]);
    }

    addAuditLog('IMPORT', 'Data Anggota', `Berhasil mengimpor ${parsedMembers.length} anggota dari file ${importFile?.name || 'Excel'}`);
    addToast({
      type: 'success',
      title: 'Impor Excel Berhasil',
      message: `${parsedMembers.length} data anggota berhasil dimasukkan ke sistem database.`
    });

    setShowImportModal(false);
    setImportFile(null);
    setParsedMembers([]);
    setImportErrors([]);
  };

  return (
    <div className="space-y-6">
      {/* 1. Top Header & Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-[#F5C400]" />
            Master Data Seluruh Anggota MAPAKTI
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola data kader rimbawan dengan klasifikasi status resmi: <strong>Anggota Tetap</strong>, <strong>Anggota Luar Biasa</strong>, dan <strong>Anggota Muda</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Excel Template Download */}
          <button
            onClick={() => handleDownloadTemplate('xlsx')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#F5C400] font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
            title="Download Format Template Excel untuk Diisi"
          >
            <Download className="w-4 h-4 text-[#F5C400]" />
            <span>Format Template</span>
          </button>

          {/* Export to Excel */}
          <button
            onClick={handleExportMembers}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
            title="Ekspor Seluruh Data Anggota ke File Excel"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Ekspor Excel</span>
          </button>

          {/* Import from Excel / CSV */}
          <button
            onClick={() => {
              setParsedMembers([]);
              setImportErrors([]);
              setImportFile(null);
              setShowImportModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] font-bold text-xs border border-[#F5C400]/40 transition-all flex items-center gap-1.5 shadow-md transform active:scale-95"
            title="Upload dan Impor Otomatis Data Anggota dari File Excel"
          >
            <Upload className="w-4 h-4 text-[#F5C400]" />
            <span>Impor dari Excel</span>
          </button>

          {/* Add Member Manual */}
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Anggota</span>
          </button>

          {/* Reset / Kosongkan Button */}
          {members.length > 0 ? (
            <button
              onClick={handleClearAll}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-rose-950 text-slate-400 hover:text-rose-400 font-bold text-xs border border-slate-700 hover:border-rose-500/40 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Kosongkan Seluruh Data Anggota"
            >
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span className="hidden sm:inline">Kosongkan Semua</span>
            </button>
          ) : (
            <button
              onClick={handleResetSampleData}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-400 font-bold text-xs border border-sky-500/30 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Muat Kembali Data Contoh MAPAKTI"
            >
              <RefreshCw className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Muat Data Awal</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. KPI Metric Summary Cards (Strict 3 Types) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div
          onClick={() => setFilterStatus('Semua')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            filterStatus === 'Semua'
              ? 'bg-[#102A56]/60 border-[#F5C400] shadow-lg ring-1 ring-[#F5C400]/30'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400">Total Anggota</span>
            <Users className="w-4 h-4 text-[#F5C400]" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{totalCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Semua tipe anggota</div>
        </div>

        <div
          onClick={() => setFilterStatus('Anggota Tetap')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            filterStatus === 'Anggota Tetap'
              ? 'bg-[#102A56]/60 border-emerald-500 shadow-lg ring-1 ring-emerald-500/30'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-400">Anggota Tetap</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{tetapCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Kader penuh & pengurus</div>
        </div>

        <div
          onClick={() => setFilterStatus('Anggota Luar Biasa')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            filterStatus === 'Anggota Luar Biasa'
              ? 'bg-[#102A56]/60 border-purple-500 shadow-lg ring-1 ring-purple-500/30'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-400">Anggota Luar Biasa</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{luarBiasaCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Alumni & kehormatan</div>
        </div>

        <div
          onClick={() => setFilterStatus('Anggota Muda')}
          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
            filterStatus === 'Anggota Muda'
              ? 'bg-[#102A56]/60 border-sky-400 shadow-lg ring-1 ring-sky-400/30'
              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-400">Anggota Muda</span>
            <Users className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-white mt-1">{mudaCount}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Masa pengembaraan</div>
        </div>
      </div>

      {/* 3. Search & Dual Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan nama lengkap, NIA, angkatan, atau fakultas..."
              className="w-full bg-slate-950 border border-slate-700 focus:border-[#F5C400] rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span>Ditemukan: <span className="text-[#F5C400] font-bold">{filteredMembers.length}</span> Orang</span>
          </div>
        </div>

        {/* Filter Badges: Divisi & Tipe */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
          {/* Division Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-bold uppercase text-slate-500 mr-1">Divisi:</span>
            {['Semua', 'Hutan Gunung', 'Rock Climbing', 'Konservasi Sumber Daya Alam'].map((div) => (
              <button
                key={div}
                onClick={() => setFilterDiv(div)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  filterDiv === div
                    ? 'bg-[#F5C400] text-[#102A56]'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {div}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] font-bold uppercase text-slate-500 mr-1">Tipe:</span>
            {['Semua', 'Anggota Tetap', 'Anggota Luar Biasa', 'Anggota Muda'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                  filterStatus === st
                    ? 'bg-[#102A56] text-[#F5C400] border border-[#F5C400]/40'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Batch Action Bar (Ketika ada anggota yang dicentang) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/60 border border-rose-500/40 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xl animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-black text-xs">
              {selectedIds.length}
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>{selectedIds.length} Data Anggota Dipilih</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full border border-rose-500/30">
                  Hapus Massal
                </span>
              </div>
              <div className="text-[10px] text-rose-300/80">
                Data anggota yang dicentang dapat dihapus secara bersamaan dari database.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedIds([])}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Batalkan Pilihan
            </button>
            <button
              onClick={handleBatchDelete}
              className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 transform active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus {selectedIds.length} Anggota Terpilih</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Members Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0b1424] text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="w-10 px-3.5 py-3.5 text-center">
                  <input
                    type="checkbox"
                    checked={filteredMembers.length > 0 && selectedIds.length === filteredMembers.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-rose-500 bg-slate-950 border-slate-700 focus:ring-rose-500 focus:ring-offset-slate-900 cursor-pointer accent-[#F5C400]"
                    title="Pilih Semua Anggota di Tampilan Ini"
                  />
                </th>
                <th className="px-5 py-3.5">Nama & Foto</th>
                <th className="px-4 py-3.5">NIA & Angkatan</th>
                <th className="px-4 py-3.5">Tipe Keanggotaan</th>
                <th className="px-4 py-3.5">Divisi Spesialisasi</th>
                <th className="px-4 py-3.5">Kontak Internal (Admin)</th>
                <th className="px-4 py-3.5">Status Publikasi</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-14 text-slate-400 text-xs">
                    {members.length === 0 ? (
                      <div className="space-y-3 max-w-sm mx-auto">
                        <AlertTriangle className="w-9 h-9 text-amber-400 mx-auto opacity-70" />
                        <div className="font-bold text-white text-sm">Belum Ada Data Anggota</div>
                        <p className="text-slate-400 text-[11px]">
                          Tabel anggota saat ini kosong. Anda dapat mengimpor data lewat file Excel, menambah manual, atau memuat data contoh awal.
                        </p>
                        <div className="flex items-center justify-center gap-2 pt-2">
                          <button
                            onClick={() => setShowImportModal(true)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#102A56] hover:bg-[#163872] text-[#F5C400] border border-[#F5C400]/40 text-xs font-bold"
                          >
                            Impor dari Excel
                          </button>
                          <button
                            onClick={handleResetSampleData}
                            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700"
                          >
                            Muat Data Contoh
                          </button>
                        </div>
                      </div>
                    ) : (
                      'Tidak ada data anggota yang cocok dengan filter pencarian.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => {
                  const isTetap = m.membershipStatus === 'Anggota Tetap';
                  const isLuarBiasa = m.membershipStatus === 'Anggota Luar Biasa';
                  const isMuda = m.membershipStatus === 'Anggota Muda';
                  const isSelected = selectedIds.includes(m.id);

                  return (
                    <tr
                      key={m.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-rose-950/20' : ''
                      }`}
                    >
                      <td className="w-10 px-3.5 py-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelect(m.id)}
                          className="w-4 h-4 rounded text-rose-500 bg-slate-950 border-slate-700 focus:ring-rose-500 focus:ring-offset-slate-900 cursor-pointer accent-[#F5C400]"
                        />
                      </td>
                      <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img
                            src={m.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                            alt={m.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-700 flex-shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div>
                            <div className="font-bold text-white">{m.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{m.faculty}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-mono text-[#F5C400] font-bold">{m.nia}</div>
                        <div className="text-[11px] text-slate-400">{m.generation}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isTetap
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                              : isLuarBiasa
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                              : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                          }`}
                        >
                          {m.membershipStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-slate-300 font-semibold">{m.specializationDivision}</span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[11px] text-slate-400">
                        <div>{m.phone || '-'}</div>
                        <div className="text-[10px] text-slate-500">{m.email || '-'}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => toggleMemberPublish(m.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                            m.isPublished
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900'
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                          }`}
                          title="Klik untuk ubah izin tayang di publik"
                        >
                          {m.isPublished ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-400" />
                              <span>Publik (Tayang)</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3 h-3 text-slate-400" />
                              <span>Privat (Admin)</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEdit(m)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-[#102A56] text-slate-300 hover:text-[#F5C400] transition-colors border border-slate-700 hover:border-[#F5C400]/40"
                          title="Edit Data Anggota"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(m.id, m.name)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all shadow-sm"
                          title={`Hapus data ${m.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* =================== MODAL 1: EXCEL BULK IMPORT MODAL =================== */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-y-auto space-y-6 my-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-6 h-6 text-[#F5C400]" />
                <div>
                  <h3 className="text-lg font-black text-white">
                    Pengisian Otomatis Data Anggota via Excel / CSV
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload file spreadsheet untuk mengimpor puluhan atau ratusan data anggota sekaligus ke database.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Instruction Banner */}
            <div className="p-4 rounded-2xl bg-[#102A56]/40 border border-[#F5C400]/30 space-y-2 text-xs">
              <div className="font-bold text-[#F5C400] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Aturan Tipe Keanggotaan & Divisi Resmi MAPAKTI:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>
                  <span className="font-bold text-white block mb-0.5">3 Tipe Anggota yang Diterima:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                    <li><strong className="text-emerald-400">Anggota Tetap</strong> (kader resmi penuh)</li>
                    <li><strong className="text-purple-400">Anggota Luar Biasa</strong> (senior & alumni)</li>
                    <li><strong className="text-sky-400">Anggota Muda</strong> (lulusan DIKLATSAR)</li>
                  </ul>
                </div>
                <div>
                  <span className="font-bold text-white block mb-0.5">3 Divisi Resmi:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[11px]">
                    <li><strong>Hutan Gunung</strong></li>
                    <li><strong>Rock Climbing</strong></li>
                    <li><strong>Konservasi Sumber Daya Alam</strong></li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Belum punya format Excel?</span>
                <button
                  type="button"
                  onClick={() => handleDownloadTemplate('xlsx')}
                  className="px-3 py-1 rounded-xl bg-[#F5C400] text-[#102A56] font-bold text-xs flex items-center gap-1 shadow"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh Template Resmi (.xlsx)
                </button>
              </div>
            </div>

            {/* File Upload Dropzone */}
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-slate-700 hover:border-[#F5C400] rounded-2xl bg-slate-950/60 hover:bg-slate-900/50 cursor-pointer text-center transition-all group"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#102A56] text-[#F5C400] flex items-center justify-center border border-[#F5C400]/40 group-hover:scale-105 transition-transform">
                    {isParsing ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <Upload className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {importFile ? importFile.name : 'Pilih File Excel / CSV (.xlsx, .xls, .csv)'}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Klik di sini untuk mencari file dari komputer atau drag & drop ke area ini
                    </p>
                  </div>
                  <span className="px-4 py-1.5 rounded-xl bg-[#F5C400] text-[#102A56] font-bold text-xs uppercase tracking-wider">
                    {importFile ? 'Ganti File Excel' : 'Pilih Berkas Excel'}
                  </span>
                </div>
              </div>

              {/* Errors Display */}
              {importErrors.length > 0 && (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800 text-rose-300 text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Terjadi Kesalahan Parsing:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                    {importErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Live Preview Table of Parsed Members */}
            {parsedMembers.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white text-sm">
                        {parsedMembers.length} Data Anggota Berhasil Terdeteksi
                      </span>
                      <p className="text-[11px] text-slate-400">
                        Periksa preview data di bawah sebelum menyimpan ke database.
                      </p>
                    </div>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex items-center gap-2 text-xs">
                    <label className="text-slate-400 font-semibold mr-1">Metode:</label>
                    <button
                      type="button"
                      onClick={() => setImportMode('append')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        importMode === 'append'
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      Tambahkan (Append)
                    </button>
                    <button
                      type="button"
                      onClick={() => setImportMode('replace')}
                      className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                        importMode === 'replace'
                          ? 'bg-amber-600 text-white shadow'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      Gantikan Semua (Replace)
                    </button>
                  </div>
                </div>

                {/* Preview Table */}
                <div className="rounded-2xl border border-slate-800 overflow-hidden max-h-60 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0b1424] text-slate-400 text-[10px] uppercase tracking-wider sticky top-0">
                      <tr>
                        <th className="px-4 py-2.5">No</th>
                        <th className="px-4 py-2.5">Nama Lengkap</th>
                        <th className="px-4 py-2.5">NIA</th>
                        <th className="px-4 py-2.5">Tipe Anggota</th>
                        <th className="px-4 py-2.5">Divisi</th>
                        <th className="px-4 py-2.5">Fakultas</th>
                        <th className="px-4 py-2.5">Publikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                      {parsedMembers.slice(0, 50).map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/40">
                          <td className="px-4 py-2 text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                          <td className="px-4 py-2 font-bold text-white whitespace-nowrap">{row.name}</td>
                          <td className="px-4 py-2 font-mono text-[#F5C400] whitespace-nowrap">{row.nia}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.membershipStatus === 'Anggota Tetap'
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : row.membershipStatus === 'Anggota Luar Biasa'
                                  ? 'bg-purple-500/20 text-purple-400'
                                  : 'bg-sky-500/20 text-sky-400'
                              }`}
                            >
                              {row.membershipStatus}
                            </span>
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-slate-300">{row.specializationDivision}</td>
                          <td className="px-4 py-2 text-slate-400 whitespace-nowrap">{row.faculty}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-[11px]">
                            {row.isPublished ? (
                              <span className="text-emerald-400 font-semibold">Publik</span>
                            ) : (
                              <span className="text-slate-500">Privat</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {parsedMembers.length > 50 && (
                  <p className="text-[11px] text-slate-500 text-center">
                    ... dan {parsedMembers.length - 50} data anggota lainnya.
                  </p>
                )}
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={parsedMembers.length === 0}
                onClick={handleCommitImport}
                className="px-6 py-2.5 rounded-xl bg-[#F5C400] hover:bg-[#e6b800] text-[#102A56] font-bold text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Konfirmasi & Simpan ({parsedMembers.length} Anggota)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================== MODAL 2: MANUAL MEMBER ADD / EDIT =================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xl font-black text-white">
                {editingMember ? 'Edit Data Anggota' : 'Tambah Anggota Baru'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">NIA (Nomor Induk Anggota) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nia}
                    onChange={(e) => setFormData({ ...formData, nia: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Angkatan DIKLATSAR *</label>
                  <input
                    type="text"
                    required
                    value={formData.generation}
                    onChange={(e) => setFormData({ ...formData, generation: e.target.value })}
                    placeholder="Contoh: Angkatan XXII - Tapak Rimba"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Fakultas *</label>
                  <input
                    type="text"
                    required
                    value={formData.faculty}
                    onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Spesialisasi Divisi *</label>
                  <select
                    value={formData.specializationDivision}
                    onChange={(e) => setFormData({ ...formData, specializationDivision: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  >
                    <option value="Hutan Gunung">Hutan Gunung</option>
                    <option value="Rock Climbing">Rock Climbing</option>
                    <option value="Konservasi Sumber Daya Alam">Konservasi Sumber Daya Alam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status Keanggotaan *</label>
                  <select
                    value={formData.membershipStatus}
                    onChange={(e) => setFormData({ ...formData, membershipStatus: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400] font-bold text-[#F5C400]"
                  >
                    <option value="Anggota Tetap">Anggota Tetap (Kader Penuh)</option>
                    <option value="Anggota Luar Biasa">Anggota Luar Biasa (Alumni / Senior)</option>
                    <option value="Anggota Muda">Anggota Muda (Pengembaraan / Magang)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nomor HP/WA (Privat)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email (Privat)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Rekam Jejak / Prestasi</label>
                <input
                  type="text"
                  value={formData.achievements}
                  onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                  placeholder="Contoh: Pimpinan Ekspedisi Puncak Slamet 2023"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#F5C400]"
                />
              </div>

              {/* Publication Permission Switch */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Status Publikasi ke Web Publik</span>
                  <span className="text-[11px] text-slate-400">
                    Jika tidak dicentang, data hanya tersimpan privat di database admin.
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5C400]"></div>
                </label>
              </div>

              <div>
                <ImageUploadInput
                  value={formData.photoUrl}
                  onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                  label="Foto Profil Anggota"
                  hint="Pilih berkas foto profil anggota (otomatis dikompresi ringan & tajam)"
                  aspectRatio="aspect-square"
                  maxWidth={320}
                  maxHeight={320}
                  quality={0.7}
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#F5C400] text-[#102A56] text-xs font-black uppercase tracking-wider hover:bg-[#e6b800]"
                >
                  Simpan Data Anggota
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
