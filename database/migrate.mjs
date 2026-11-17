// Script migrasi database MAPAKTI
// Jalankan: node database/migrate.mjs

import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ⚠️ ISI DATABASE_URL kamu di sini:
// Format: mysql://USER:PASSWORD@HOST:PORT/DBNAME
const DATABASE_URL = process.env.DATABASE_URL || 'GANTI_DENGAN_URL_AIVEN_KAMU';

if (DATABASE_URL === 'GANTI_DENGAN_URL_AIVEN_KAMU') {
  console.error('❌ Harap isi DATABASE_URL terlebih dahulu!');
  console.error('   Cara 1: DATABASE_URL="mysql://..." node database/migrate.mjs');
  console.error('   Cara 2: Edit baris DATABASE_URL di file ini langsung');
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS \`mapakti_collections\` (
  \`id\`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
  \`collection_key\` VARCHAR(100) NOT NULL,
  \`data_json\`      LONGTEXT     NOT NULL,
  \`updated_at\`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`uq_collection_key\` (\`collection_key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS \`members\` (
  \`id\`                      VARCHAR(50)  NOT NULL,
  \`name\`                    VARCHAR(255) NOT NULL,
  \`nia\`                     VARCHAR(50)  DEFAULT NULL,
  \`generation\`              VARCHAR(100) DEFAULT NULL,
  \`join_year\`               INT          DEFAULT NULL,
  \`faculty\`                 VARCHAR(255) DEFAULT NULL,
  \`membership_status\`       VARCHAR(100) DEFAULT 'Anggota Tetap',
  \`specialization_division\` VARCHAR(100) DEFAULT 'Hutan Gunung',
  \`phone\`                   VARCHAR(50)  DEFAULT NULL,
  \`email\`                   VARCHAR(255) DEFAULT NULL,
  \`achievements\`            TEXT         DEFAULT NULL,
  \`photo_url\`               TEXT         DEFAULT NULL,
  \`is_published\`            TINYINT(1)   NOT NULL DEFAULT 1,
  \`created_at\`              DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\`              DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

const SEED = [
  ['settings', '{"organizationName":"MAPAKTI — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal","shortName":"MAPAKTI UPS Tegal","tagline":"Lestari Alamku, Jaya MAPAKTI-ku","establishedYear":"1984","baseCampus":"Universitas Pancasakti Tegal","chairmanName":"M. Bayu Dirgantara","chairmanTitle":"Ketua Umum MAPAKTI Masa Bakti 2024/2025","chairmanNia":"MPK-XXII-2021-118","email":"sekretariat@mapakti.or.id","phone":"+62 858-7654-3210","whatsappNumber":"6285876543210","operationalHours":"Senin - Sabtu: 10:00 - 21:00 WIB","secretariatAddress":"Gedung PKM Lt. 1, Universitas Pancasakti Tegal, Jl. Halmahera KM. 1, Kota Tegal"}'],
  ['members',       '[]'],
  ['activities',    '[]'],
  ['act_regs',      '[]'],
  ['news',          '[]'],
  ['gallery',       '[]'],
  ['achievements',  '[]'],
  ['proker',        '[]'],
  ['periods',       '[]'],
  ['profile',       '{}'],
  ['audit_logs',    '[]'],
  ['notifications', '[]'],
  ['diklatsar',     '[]'],
];

async function run() {
  const url = new URL(DATABASE_URL);
  // Pakai single connection (bukan pool) agar tidak conflict dengan Vercel
  const conn = await mysql.createConnection({
    host:     url.hostname,
    port:     Number(url.port) || 3306,
    user:     url.username,
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, '') || 'defaultdb',
    ssl:      { rejectUnauthorized: false },
    multipleStatements: true,
    connectTimeout: 30000,
  });

  console.log('✅ Terhubung ke database:', url.hostname);

  // Buat tabel
  console.log('⏳ Membuat tabel...');
  await conn.query(SQL);
  console.log('✅ Tabel mapakti_collections dan members berhasil dibuat!');

  // Seed data awal
  console.log('⏳ Mengisi data awal...');
  for (const [key, json] of SEED) {
    await conn.execute(
      'INSERT INTO mapakti_collections (collection_key, data_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE collection_key = collection_key',
      [key, json]
    );
    console.log(`   ✔ ${key}`);
  }

  await conn.end();
  console.log('\n🎉 Migrasi selesai! Silakan buka https://mapakti.vercel.app dan login kembali.');
}

run().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
