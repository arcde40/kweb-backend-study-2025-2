const {runQuery} = require('./database');

/*  
    TODO
    1. 학생의 이름을 받아 그 학생의 모든 성적을 출력하는 함수
    2. 강의 이름을 받아 그 강의를 들었던 학생 목록을 출력하는 함수
    3. 학생 ID와 강의 ID, 성적을 받아 학생이 강의를 수강하도록 하는 함수
*/

// 1. 학생의 이름을 받아 그 학생의 모든 성적을 출력하는 함수
const getStudentCredit = async (student_name) => {
    const query =  `
        SELECT courses.course_name, enrollments.grade
        FROM students NATURAL JOIN enrollments NATURAL JOIN courses
        WHERE students.student_name = ?;
    `;
    const row = await runQuery(query, [student_name]);
    console.log(`${student_name}의 성적`);
    row.forEach(elt => {
        console.log(`${elt.course_name}: ${elt.grade}`);
    });
};

// 2. 강의 이름을 받아 그 강의를 들었던 학생 목록을 출력하는 함수
const getStudentsByCourse = async (course_name) => {
    const query = `
        SELECT students.student_name as name
        FROM courses
        JOIN enrollments ON courses.course_id = enrollments.course_id
        JOIN students ON enrollments.student_id = students.student_id
        WHERE courses.course_name = ?
        ORDER BY student_name ASC;
    `;
    const row = await runQuery(query, [course_name]);
    console.log(`${course_name}을(를) 수강하는 학생 목록`);
    row.forEach(elt => {
        console.log(`${elt.name}`);
    });
};

// 3. 학생 ID와 강의 ID, 성적을 받아 학생이 강의를 수강하도록 하는 함수
const addEnrollment = async (studentID, courseID, grade) => {
    const query = `
        INSERT INTO enrollments(student_id, course_id, grade)
        VALUES (?, ?, ?);
    `;
    runQuery(query, [studentID, courseID, grade]).then(async () => {
        console.log(`수강 신청 완료`);
        const query =  `
            SELECT students.student_name, courses.course_name, enrollments.grade
            FROM students NATURAL JOIN enrollments NATURAL JOIN courses
            WHERE students.student_id = ${studentID};
        `;
        const row = await runQuery(query);
        console.log(`${row[0].student_name}의 성적`);
        row.forEach(elt => {
            console.log(`${elt.course_name}: ${elt.grade}`);
        });
    }).catch(e => { console.error(e); });
}

(async () => {
    getStudentCredit('이순신');
    getStudentsByCourse('데이터베이스');
    addEnrollment(10, 8, 'C-');
    // addEnrollment(15, 8, 'C-'); <- Error
})();