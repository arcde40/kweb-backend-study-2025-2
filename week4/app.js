const {runQuery} = require('./database');
const sanitizeHtml = require('sanitize-html');


const getStudentCredit = async (student_name) => {
    const result = await runQuery(
        'select group_concat(enrollments.grade) as grade from students natural join enrollments where students.student_name = ? ',
        [student_name]
    )
    console.log(result[0].grade)
}

const getCourseStudents = async (course_name) => {
    const result = await runQuery(
        'select group_concat(students.student_name) as name from enrollments natural join students natural join courses where courses.course_name = ?',
        [course_name]
    )
    console.log(result[0].name)
}

const insertStudentCourse = async (student_id, course_id, grade) => {
    await runQuery(
        'insert into enrollments (student_id, course_id, grade) values (?, ?, ?) ON DUPLICATE KEY UPDATE grade = VALUES(grade)',
        [student_id, course_id, grade]
    )
}

(async () => {
    await getStudentCredit('이순신')
    await getCourseStudents('자료구조')
    await insertStudentCourse(1, 2, 'A0')
})();