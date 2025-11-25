const {runQuery} = require('./database');
const sanitizeHtml = require('sanitize-html');
const express = require('express');
const app = express();
app.use(express.json());

const getStudentsCourse = async () => {
    const query = `
    SELECT 
        s.student_name, group_concat(c.course_name) AS 수강신청_과목 , group_concat(e.GRADE) AS 성적
    FROM 
        students s
    LEFT OUTER JOIN 
        enrollments e on s.student_id = e.student_id 
    LEFT OUTER JOIN 
        courses c on e.course_id = c.course_id 
    GROUP By 
        s.student_id ;
    `
    const result = await runQuery(query) ; 
    return result ;
}

const getStudentGradeByName = async (student_name) => {
    const query = `
    SELECT 
        s.student_name, group_concat(c.course_name ORDER By c.course_id) AS 수강신청_과목 , group_concat(e.GRADE ORDER By c.course_id) AS 성적
    FROM 
        students s
    LEFT OUTER JOIN 
        enrollments e on s.student_id = e.student_id 
    LEFT OUTER JOIN 
        courses c on e.course_id = c.course_id 
    WHERE 
        s.student_name = ?
    GROUP By 
        s.student_id ;
    `
    const result = await runQuery(query, [student_name]) ; 
    return result ;
}
const getStudentGPAByName = async (student_name) => {
    const query = `
    SELECT 
        s.student_name, group_concat(c.course_name ORDER By c.course_id) AS 수강신청_과목,
        SUM(
            CASE 
                WHEN e.grade = 'A+' THEN 4.5
                WHEN e.grade = 'A0' THEN 4.0
                WHEN e.grade = 'A-' THEN 3.5
                WHEN e.grade = 'B+' THEN 3.0
                WHEN e.grade = 'B0' THEN 2.5
                WHEN e.grade = 'B-' THEN 2.0
                WHEN e.grade = 'C+' THEN 1.5
                WHEN e.grade = 'C0' THEN 1.0
                ELSE 0.0
            END
                * c.credits
            ) 
         / NULLIF(SUM(c.credits), 0)
         AS GPA
    FROM 
        students s
    LEFT OUTER JOIN 
        enrollments e on s.student_id = e.student_id 
    LEFT OUTER JOIN 
        courses c on e.course_id = c.course_id 
    WHERE 
        s.student_name = ? 
    GROUP By 
        s.student_id ;
    `
    const result = await runQuery(query, [student_name]) ; 
    return result ;

}


const getStudentsListByCourse = async (course_name) => {
    const query = `
    SELECT 
        c.course_name AS 과목_이름, GROUP_CONCAT(s.student_name ORDER by s.student_id) AS 학생목록, GROUP_CONCAT(e.grade ORDER by s.student_id) AS 성적
    FROM 
        courses c
    LEFT OUTER JOIN 
        enrollments e on c.course_id = e.course_id 
    LEFT OUTER JOIN 
        students s on e.student_id = s.student_id 
    WHERE 
        c.course_name = ?
    GROUP By 
        c.course_id ;
    `
    const result = await runQuery(query, [course_name]) ; 
    return result ;
}
const getCourseAlignByGPA = async() => {
    const query = `
    SELECT 
        c.course_name AS 과목_이름, GROUP_CONCAT(e.grade ORDER by s.student_id) AS 성적,
        AVG(
            CASE 
                WHEN e.grade = 'A+' THEN 4.5
                WHEN e.grade = 'A0' THEN 4.0
                WHEN e.grade = 'A-' THEN 3.5
                WHEN e.grade = 'B+' THEN 3.0
                WHEN e.grade = 'B0' THEN 2.5
                WHEN e.grade = 'B-' THEN 2.0
                WHEN e.grade = 'C+' THEN 1.5
                WHEN e.grade = 'C0' THEN 1.0
                ELSE 0.0
            END
            ) 
        AS Course_GPA
    FROM 
        courses c
    LEFT OUTER JOIN 
        enrollments e on c.course_id = e.course_id 
    LEFT OUTER JOIN 
        students s on e.student_id = s.student_id 
    GROUP By 
        c.course_id 
    ORDER By
        Course_GPA DESC ;
    `
    const result = await runQuery(query) ; 
    return result ;
}


const courseRegByID = async (student_id, course_id, grade) => {
    const query = `
    INSERT INTO enrollments(student_id, course_id, grade)
    VALUES(?, ?, ?) ;
    `
    const result = await runQuery(query, [student_id, course_id, grade]) ; 
    return result ; 
}


app.get('/students-courses', async (req, res) => {
    const result = await getStudentsCourse() ;
    res.json(result) ;
}); 

app.get('/student-grade/:name', async (req, res) => {
    const student_name = sanitizeHtml(req.params.name) ;
    const result = await getStudentGradeByName(student_name) ;
    res.json(result) ;
}); 

app.get('/student-gpa/:name', async (req, res) => {
    const student_name = sanitizeHtml(req.params.name) ;
    const result = await getStudentGPAByName(student_name) ;
    res.json(result) ;
});

app.get('/course-students/:course', async (req, res) => {
    const course_name = sanitizeHtml(req.params.course) ;
    const result = await getStudentsListByCourse(course_name) ;
    res.json(result) ;
});

app.get('/courses-gpa', async (req, res) => {
    const result = await getCourseAlignByGPA() ;
    res.json(result) ;
});

app.post('/register-course', async (req, res) => {
    const {student_id, course_id, grade} = req.body ;
    const result = await courseRegByID(
        sanitizeHtml(student_id), 
        sanitizeHtml(course_id), 
        sanitizeHtml(grade)
    ) ;
    res.json(result) ;
});

const PORT = 8000 ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`) ;
}) ;