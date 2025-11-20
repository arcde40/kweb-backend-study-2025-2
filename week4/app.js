const {runQuery} = require('./database');
const express = require('express');
const sanitizeHTML = require('sanitize-html');

const app = express();

const getStudentGrade = async (student_name) => {
    const result = await runQuery('select group_concat(enrollments.grade) as grades from students natural join enrollments where students.student_name = ?', [student_name]);
    console.log(result[0].grades);
};

const getCourseStudent = async (course_name) => {
    const result = await runQuery('select group_concat(students.student_name) as names from courses natural join enrollments natural join students where courses.course_name = ?', [course_name]);
    console.log(result[0].names);
};

app.get('/xss', (req, res) => {
    const content = req.query.content;
    return res.send(sanitizeHTML(content));
});

(async () => {
    getStudentGrade('이순신');
    getCourseStudent('데이터베이스');
})();

app.listen(3000, ()=>console.log('server started!'));