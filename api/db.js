import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    const connectionUri = process.env.DATABASE_URL;
    if (!connectionUri) {
      throw new Error('Environment variable DATABASE_URL belum diatur.');
    }
    const url = new URL(connectionUri);

    pool = mysql.createPool({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: url.username,
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, '') || 'defaultdb',
      ssl: {
        rejectUnauthorized: false
      },
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000
    });
  }
  return pool;
}
