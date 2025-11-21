const mysql = require('mysql2/promise');
const {runQuery} = require('/database');
const express = require('express');
const sanitizeHtml = require('sanitize-html');
const app= express();

const pool = mysql.createPool({
    host: 'db',
    port: 3306,
    user: 'kweb',
    database: 'kweb_db',
    password: '1q2w3e4r'
});

/**
@param {string} sql 
@param {Array<any>} values
@returns {Promise<Array<any>>}
*/
const runQuery = async (sql, values = []) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const [result] = await conn.execute(sql, values);
        return result;
    } catch (error) {
        console.error("오류 발생:", error.message);
        throw error;
    } finally {
        if (conn) conn.release();
    }
};

/**
@param {string} studentName
*/
async function getStudentGradesByName(studentName) {
    const sql = `SELECT c.course_name AS '강의 이름', e.grade AS '성적' FROM students s JOIN enrollments e ON s.student_id = e.student_id
        JOIN courses c ON e.course_id = c.course_id WHERE s.student_name = ?`;
    const grades = await runQuery(sql, [studentName]);
    console.table(grades);
}

/**
@param {string} courseName
**/
async function getEnrolledStudentsByCourseName(courseName) {
    const sql = `SELECT s.student_name AS '학생 이름', s.major AS '학과', e.grade AS '성적' FROM courses c
        JOIN enrollments e ON c.course_id = e.course_id JOIN students s ON e.student_id = s.student_id WHERE c.course_name = ?`;
    const students = await runQuery(sql, [courseName]);
    console.table(students);
}

app.get('/xss', (req, res) => {
    const content = req.query.content;
    return res.send(sanitizeHTML(content));
});

(async () => {
    try {
        await getStudentGradesByName('가나다');
        await getEnrolledStudentsByCourseName('데이터베이스');
    } catch (error) {
        console.error("예외 발생:", error);
    } finally {
        await pool.end();
    }
})();
app.listen(3000, ()=>console.log('statring server..'));