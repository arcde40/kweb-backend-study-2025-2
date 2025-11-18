const {runQuery} = require('./database');

const getStudentGrade = async (name) => {
    const result = await runQuery(
        `select grade from students inner join enrollments on students.student_id = enrollments.student_id where students.student_name = '${name}';`, 
        );
    console.log(result);
};


const getCourseStudents = async (coursename) => {
    const result = await runQuery(
        `select student_name from courses inner join enrollments on courses.course_id = enrollments.course_id inner join students on students.student_id = enrollments.student_id where course_name = '${coursename}';`, 
        );
    console.log(result);
};


(async () => {
    getStudentGrade('이순신');
    getCourseStudents('자료구조');
})();