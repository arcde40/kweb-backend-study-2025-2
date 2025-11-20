const mysql = require('mysql2/promise');

/*
const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'kweb',
    database: 'kweb_db',
    password: '1q2w3e4r'
});
*/

// 로컬 환경
const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'kweb',
    database: 'kweb_db',
    password: '0313'
});

const runQuery = async (sql, data) => {
    const conn = await pool.getConnection();
    try {
        const psql = conn.format(sql, data);
        const [result] = await conn.query(psql);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = {runQuery}
