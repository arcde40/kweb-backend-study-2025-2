const {runQuery} = require('./database');

const getStudentGrade = async (student_name) => {
    const query = `select group_concat(enrollments.grade) as grades from students natural join enrollments where students.student_name = '${student_name}';`
    const result = await runQuery(query);
    console.log(result[0].grades);
};

const getCourseStudent = async (course_name) => {
    const query = `select group_concat(students.student_name) as names from courses natural join enrollments natural join students where courses.course_name = '${course_name}';`
    const result = await runQuery(query);
    console.log(result[0].names);
};

(async () => {
    getStudentGrade('이순신');
    getCourseStudent('데이터베이스');
})();