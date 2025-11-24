const {runQuery} = require('./database');

const express = require('express');
const sanitizeHTML = require('sanitize-html');

const app = express();

const getStudentGrades = async (student_name) => {
    const query = `
    select group_concat(enrollments.grade) as grade
    from students 
    natural join enrollments 
    where students.student_name = ?`;
    const result = await runQuery(query, student_name)
    console.log(result[0].grade)
}

const getCourseStudents = async (course_name) => {
    const query = `
    select group_concat(student_name) as sname
    from courses
    natural join enrollments 
    natural join students
    where courses.course_name = ?`;
    const result = await runQuery(query, course_name)
    console.log(result[0].sname)
}

const addEnrollment = async (student_id, course_id, grade) => {
    const query = `
    insert into enrollments (student_id, course_id, grade)
    values(?, ?, ?)`;
    const vaules = [student_id, course_id, grade]
    const result = await runQuery(query, vaules)
}

app.get('/xss', (req, res) => {
    const content = req.query.content;
    return res.send(sanitizeHTML(content));
});

(async () => {
    await getStudentGrades('차카타')
    await getCourseStudents('데이터베이스')
})();

app.listen(3000, ()=>console.log('server started!'));