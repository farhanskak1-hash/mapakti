import { getPool } from './db.js';

let tablesInitialized = false;

async function ensureTables(pool) {
  if (tablesInitialized) return;
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS mapakti_collections (
        collection_key VARCHAR(100) PRIMARY KEY,
        data_json LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await pool.execute(`
      CREATE TABLE IF NOT EXISTS members (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        nia VARCHAR(100),
        generation VARCHAR(100),
        join_year INT,
        faculty VARCHAR(255),
        membership_status VARCHAR(100),
        specialization_division VARCHAR(100),
        phone VARCHAR(50),
        email VARCHAR(255),
        achievements TEXT,
        photo_url TEXT,
        is_published TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    tablesInitialized = true;
  } catch (err) {
    console.error('Error ensuring tables:', err.message);
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const pool = getPool();
  await ensureTables(pool);

  try {
    if (req.method === 'GET') {
      const { key } = req.query || {};

      if (key) {
        const [rows] = await pool.execute(
          'SELECT data_json, updated_at FROM mapakti_collections WHERE collection_key = ?',
          [key]
        );
        if (rows.length === 0) {
          return res.status(404).json({ ok: false, message: `Key ${key} not found` });
        }
        return res.status(200).json({
          ok: true,
          key,
          data: JSON.parse(rows[0].data_json),
          updatedAt: rows[0].updated_at
        });
      }

      // Fetch all collections
      const [rows] = await pool.execute('SELECT collection_key, data_json, updated_at FROM mapakti_collections');
      const allData = {};
      for (const row of rows) {
        try {
          allData[row.collection_key] = JSON.parse(row.data_json);
        } catch (e) {
          allData[row.collection_key] = null;
        }
      }

      return res.status(200).json({
        ok: true,
        data: allData,
        count: rows.length
      });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {}
      }

      const { key, data, updates } = body || {};

      const upsertCollection = async (collKey, collData) => {
        const query = `
          INSERT INTO mapakti_collections (collection_key, data_json)
          VALUES (?, ?)
          ON DUPLICATE KEY UPDATE data_json = VALUES(data_json), updated_at = CURRENT_TIMESTAMP
        `;
        await pool.execute(query, [collKey, JSON.stringify(collData)]);

        // Sync relational members table if members updated
        if (collKey === 'members' && Array.isArray(collData)) {
          const memberQuery = `
            INSERT INTO members (id, name, nia, generation, join_year, faculty, membership_status, specialization_division, phone, email, achievements, photo_url, is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              name = VALUES(name),
              nia = VALUES(nia),
              generation = VALUES(generation),
              join_year = VALUES(join_year),
              faculty = VALUES(faculty),
              membership_status = VALUES(membership_status),
              specialization_division = VALUES(specialization_division),
              phone = VALUES(phone),
              email = VALUES(email),
              achievements = VALUES(achievements),
              photo_url = VALUES(photo_url),
              is_published = VALUES(is_published)
          `;
          for (const m of collData) {
            await pool.execute(memberQuery, [
              m.id,
              m.name,
              m.nia,
              m.generation || '',
              m.joinYear || 2024,
              m.faculty || '',
              m.membershipStatus || 'Anggota Tetap',
              m.specializationDivision || 'Hutan Gunung',
              m.phone || '',
              m.email || '',
              m.achievements || '',
              m.photoUrl || '',
              m.isPublished ? 1 : 0
            ]);
          }
        }
      };

      if (key && data !== undefined) {
        await upsertCollection(key, data);
        return res.status(200).json({ ok: true, message: `Collection ${key} saved to Aiven MySQL` });
      }

      if (updates && typeof updates === 'object') {
        for (const [k, v] of Object.entries(updates)) {
          await upsertCollection(k, v);
        }
        return res.status(200).json({ ok: true, message: 'All updates saved to Aiven MySQL' });
      }

      return res.status(400).json({ ok: false, message: 'Invalid payload: key & data or updates required' });
    }

    return res.status(405).json({ ok: false, message: 'Method Not Allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ ok: false, error: error.message });
  }
}
