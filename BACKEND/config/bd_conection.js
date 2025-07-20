import _mysql from 'mysql2/promise';

const pool = _mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_amazon',
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
});

export default pool;