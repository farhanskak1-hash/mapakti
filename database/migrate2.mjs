import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;
const url = new URL(DATABASE_URL);

async function run() {
  let conn;
  let retries = 5;
  
  while (retries > 0) {
    try {
      conn = await mysql.createConnection({
        host: url.hostname,
        port: Number(url.port) || 3306,
        user: url.username,
        password: decodeURIComponent(url.password),
        database: url.pathname.replace(/^\//, '') || 'defaultdb',
        ssl: { rejectUnauthorized: false },
        connectTimeout: 30000,
      });
      break;
    } catch(e) {
      if (e.message.includes('Too many connections')) {
        console.log(`⏳ Koneksi penuh, coba lagi... (sisa ${--retries}x)`);
        await new Promise(r => setTimeout(r, 3000));
      } else throw e;
    }
  }

  if (!conn) { console.error('❌ Gagal connect setelah beberapa percobaan'); process.exit(1); }
  
  console.log('✅ Terhubung ke:', url.hostname);

  // Kill semua connection lain selain ini
  const [procs] = await conn.query('SHOW PROCESSLIST');
  const myId = (await conn.query('SELECT CONNECTION_ID() as id'))[0][0].id;
  for (const p of procs) {
    if (p.Id !== myId && p.User !== 'system user') {
      try { await conn.query(`KILL ${p.Id}`); console.log(`   🔪 Kill connection ${p.Id}`); } catch(e) {}
    }
  }

  console.log('⏳ Membuat tabel...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS \`mapakti_collections\` (
      \`id\`             INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`collection_key\` VARCHAR(100) NOT NULL,
      \`data_json\`      LONGTEXT     NOT NULL,
      \`updated_at\`     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`uq_collection_key\` (\`collection_key\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query(`
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
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('✅ Tabel berhasil dibuat!');

  const seeds = [
    ['settings', JSON.stringify({organizationName:"MAPAKTI — Mahasiswa Pencinta Alam Universitas Pancasakti Tegal",shortName:"MAPAKTI UPS Tegal",tagline:"Lestari Alamku, Jaya MAPAKTI-ku",establishedYear:"1984",baseCampus:"Universitas Pancasakti Tegal",chairmanName:"M. Bayu Dirgantara",chairmanTitle:"Ketua Umum MAPAKTI Masa Bakti 2024/2025",chairmanNia:"MPK-XXII-2021-118",email:"sekretariat@mapakti.or.id",phone:"+62 858-7654-3210",whatsappNumber:"6285876543210",operationalHours:"Senin - Sabtu: 10:00 - 21:00 WIB"})],
    ['members','[]'],['activities','[]'],['act_regs','[]'],['news','[]'],
    ['gallery','[]'],['achievements','[]'],['proker','[]'],['periods','[]'],
    ['profile','{}'],['audit_logs','[]'],['notifications','[]'],['diklatsar','[]'],
  ];

  console.log('⏳ Seed data awal...');
  for (const [key, json] of seeds) {
    await conn.execute(
      'INSERT INTO mapakti_collections (collection_key, data_json) VALUES (?, ?) ON DUPLICATE KEY UPDATE collection_key = collection_key',
      [key, json]
    );
    console.log(`   ✔ ${key}`);
  }

  await conn.end();
  console.log('\n🎉 Migrasi selesai!');
}

run().catch(e => { console.error('❌ Error:', e.message); process.exit(1); });
