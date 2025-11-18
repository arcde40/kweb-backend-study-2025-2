const {runQuery} = require('./database');


const getStudentGrades = async (student_name) => {
    const query = `
    select group_concat(enrollments.grade) as grade
    from students 
    natural join enrollments 
    where students.student_name = '${student_name}'
    `
    const result = await runQuery(query)
    console.log(result[0].grade)
}

const getCourseStudents = async (course_name) => {
    const query = `
    select group_concat(student_name) as sname
    from courses
    natural join enrollments 
    natural join students
    where courses.course_name = '${course_name}' 
    ` 
    const result = await runQuery(query)
    console.log(result[0].sname)
}

const addEnrollment = async (student_id, course_id, grade) => {
    const query = `
    insert into enrollments (student_id, course_id, grade)
    values('${student_id}', '${course_id}', '${grade}')
    ` 
    const result = await runQuery(query)
}

(async () => {
    await getStudentGrades('차카타')
    await getCourseStudents('데이터베이스')
    await addEnrollment(4, 1, 'C0')
    await getStudentGrades('차카타')
    await getCourseStudents('데이터베이스')
})();
