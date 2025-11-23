const {runQuery} = require('./database');

const getStudentCredit= async (student_name) => {
    const query = `SELECT GROUP_CONCAT(enrollments.grade) as grade from students NATURAL JOIN enrollments WHERE students.student_name = '${student_name}';`
    const result = await runQuery(query)
    console.log(result[0].grade)
}

const getNamebyCourse = async (course_name) => {
    const query = `SELECT s.student_name FROM students s
                   JOIN enrollments e ON s.student_id = e.student_id
                   JOIN courses c ON e.course_id = c.course_id
                   WHERE c.course_name = '${course_name}';`
    const result = await runQuery(query)
    console.log(result)
}

const EnrollStudent = async (student_id, course_id, grade) => {
    const query = `INSERT INTO enrollments(student_id, course_id, grade) VALUES(${student_id}, ${course_id}, '${grade}');`
    const query2 = `select students.student_name, courses.course_name, GROUP_CONCAT(enrollments.grade) from students 
                    INNER JOIN enrollments ON students.student_id = enrollments.student_id NATURAL JOIN courses where students_student_id = ${student_id};`
    const regis = await runQuery(query)
    const result = await runQuery(query2)
    console.log(result)
}


(async () => {
    console.log(getStudentCredit('이순신'));
    console.log(getNamebyCourse('데이터베이스'));
    console.log(EnrollStudent(10,4,'A-'))
})();