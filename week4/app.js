const {runQuery} = require('./database');

// (async () => {
//     console.log(await runQuery(`select * from professors;`));
// })();

const getGrade = async (student_name) => {
    const query = `select group_concat(enrollments.grade) from students natural join enrollments where students.student_name = '${student_name}'`
    const result = await runQuery(query);
    console.log(result)
}

const getStudents = async (course_name) => {
    const query = `select group_concat(students.student_name) from courses natural join (enrollments natural join students) where courses.course_name = '${course_name}'`
    const result = await runQuery(query);
    console.log(result)
}

const joinCourse = async (student_id, course_id, grade) => {
    const query = `insert into enrollments (student_id, course_id, grade) values ('${student_id}', '${course_id}', '${grade}')`
    await runQuery(query);
}

getGrade('파하')
getStudents('데이터베이스')
joinCourse(5, 1, 'A0')
getGrade('파하')
getStudents('데이터베이스')