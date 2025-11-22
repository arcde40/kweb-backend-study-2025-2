const {runQuery} = require('./database');

const getStudentCredit = async (student_name) => {
    const query = `
        SELECT group_concat(enrollments.grade) AS grade 
        FROM students NATURAL JOIN enrollments WHERE 
        students.student_name = '${student_name}';
    `;
    const result = await runQuery(query);
    console.log(result[0].grade);
}

const getStudentsByCourseName = async (course_name) => {
    const query = `
        SELECT students.student_name
        FROM students
        NATURAL JOIN enrollments
        NATURAL JOIN courses
        WHERE courses.course_name = '${course_name}';
    `;
    const result = await runQuery(query);
    for (const row of result) {
        console.log(row.student_name);
    }
}

const enrollStudent = async (student_id, course_id, grade) => {
    const query = `
        INSERT INTO enrollments(student_id, course_id, grade)
        VALUES (${student_id}, ${course_id}, '${grade}');
    `;
    const result = await runQuery(query);
    console.log('수강 신청 완료!');
    console.log(result);
}

(async () => {
    await getStudentCredit('가나다');
    await getStudentsByCourseName('데이터베이스');
    await enrollStudent(9, 8, 'C-');
})();