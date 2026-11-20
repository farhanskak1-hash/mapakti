/**
 * Utilitas Parser dan Pengurut Angka Romawi & Penomoran Angkatan MAPAKTI
 * 
 * Mendukung ekstraksi dan perbandingan akurat untuk:
 * - Format Romawi: "Angkatan XVIII – Samana Dasa", "Angkatan I – Pionir", "Diksar XXIV", "XXIV"
 * - Format Desimal: "Angkatan 18 - Samana Dasa", "Angkatan 1", "24"
 * - Tanda hubung: "-" (hyphen), "–" (en-dash), "—" (em-dash), ":" (titik dua), dsb.
 */

const ROMAN_MAP = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

/**
 * Konversi string angka Romawi menjadi bilangan bulat (integer) desimal
 * @param {string} romanStr 
 * @returns {number}
 */
export const romanToInt = (romanStr) => {
  if (!romanStr || typeof romanStr !== 'string') return 0;
  const clean = romanStr.toUpperCase().trim();
  if (!/^[IVXLCDM]+$/.test(clean)) return 0;

  let total = 0;
  for (let i = 0; i < clean.length; i++) {
    const current = ROMAN_MAP[clean[i]];
    const next = ROMAN_MAP[clean[i + 1]];
    if (!current) return 0;
    if (next && current < next) {
      total -= current;
    } else {
      total += current;
    }
  }
  return total;
};

/**
 * Konversi integer desimal menjadi string angka Romawi
 * @param {number} num 
 * @returns {string}
 */
export const intToRoman = (num) => {
  if (!num || typeof num !== 'number' || num <= 0) return '';
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  let roman = '';
  let n = Math.floor(num);
  for (let i = 0; i < val.length; i++) {
    while (n >= val[i]) {
      roman += syms[i];
      n -= val[i];
    }
  }
  return roman;
};

/**
 * Ekstrak nilai nomor urut angkatan dari teks nama angkatan
 * @param {string} genStr 
 * @returns {number}
 */
export const extractGenerationNumber = (genStr) => {
  if (!genStr || typeof genStr !== 'string') return 0;
  const s = genStr.trim();

  // 1. Cek angka Romawi setelah kata "Angkatan", "Diksar", "Batch", atau "Ke-"
  // Contoh: "Angkatan XVIII – Samana Dasa", "Angkatan I – Pionir", "Diksar XXIV"
  const romanAfterKeyword = s.match(/(?:angkatan|diksar|batch|ke-?)\s*([IVXLCDM]+)\b/i);
  if (romanAfterKeyword && romanAfterKeyword[1]) {
    const val = romanToInt(romanAfterKeyword[1]);
    if (val > 0) return val;
  }

  // 2. Cek angka desimal setelah kata "Angkatan", "Diksar", dsb.
  // Contoh: "Angkatan 18 – Samana Dasa", "Angkatan 1"
  const decimalAfterKeyword = s.match(/(?:angkatan|diksar|batch|ke-?)\s*(\d+)\b/i);
  if (decimalAfterKeyword && decimalAfterKeyword[1]) {
    const val = parseInt(decimalAfterKeyword[1], 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // 3. Cek jika angka Romawi berada langsung di awal string
  // Contoh: "XVIII – Samana Dasa", "XXIV - Kabut Lembah", "I - Pionir"
  const romanAtStart = s.match(/^([IVXLCDM]+)\b/i);
  if (romanAtStart && romanAtStart[1]) {
    const val = romanToInt(romanAtStart[1]);
    if (val > 0) return val;
  }

  // 4. Cek jika angka desimal berada di awal string
  // Contoh: "18 - Samana Dasa", "1 - Pionir"
  const decimalAtStart = s.match(/^(\d+)\b/);
  if (decimalAtStart && decimalAtStart[1]) {
    const val = parseInt(decimalAtStart[1], 10);
    if (!isNaN(val) && val > 0) return val;
  }

  // 5. Cek token kata terpisah jika mengandung angka Romawi valid
  // Contoh: "DIKSAR MAPAKTI XIX"
  const tokens = s.split(/[\s\-–—/()]+/);
  for (const token of tokens) {
    if (/^[IVXLCDM]+$/i.test(token)) {
      const val = romanToInt(token);
      if (val > 0) return val;
    }
  }

  return 0;
};

/**
 * Komparator untuk mengurutkan dua nama angkatan berdasarkan angka romawi/desimal
 * @param {string} a 
 * @param {string} b 
 * @param {'asc'|'desc'} order 'asc' untuk urutan I -> XXIV, 'desc' untuk XXIV -> I
 * @returns {number}
 */
export const compareGenerations = (a, b, order = 'asc') => {
  const numA = extractGenerationNumber(a);
  const numB = extractGenerationNumber(b);

  if (numA > 0 && numB > 0 && numA !== numB) {
    return order === 'asc' ? numA - numB : numB - numA;
  }

  // Jika salah satu memiliki angka dan yang lain tidak
  if (numA > 0 && numB === 0) return order === 'asc' ? -1 : 1;
  if (numA === 0 && numB > 0) return order === 'asc' ? 1 : -1;

  // Fallback ke urutan leksikografis standar
  return order === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
};

/**
 * Mengurutkan array string nama angkatan
 * @param {string[]} list 
 * @param {'asc'|'desc'} order 
 * @returns {string[]}
 */
export const sortGenerations = (list, order = 'asc') => {
  if (!Array.isArray(list)) return [];
  return [...list].sort((a, b) => compareGenerations(a, b, order));
};
