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

const runQuery = async sql => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(sql);
        return result;
    } finally {
        conn.release();
    }
};

module.exports = {runQuery}
