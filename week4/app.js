const {runQuery} = require('./database');

const getStudentCredit = async (student_name) => {
    const query = `select group_concat(enrollments.grade) as grade from students natural join enrollments where students.student_name = '${student_name}'`;
    const result = await runQuery(query);
    console.log(result[0].grade)
}

const getStudentGrade = async (student_name) => {
    const query = `select courses.course_name as course, enrollments.grade from students natural join enrollments natural join courses where students.student_name = '${student_name}'`;
    const result = await runQuery(query);
    result.forEach(row => {
        console.log(`${row.course}: ${row.grade}`);
    });
}

const getStudentList = async (course_name) => {
    const query = `select students.student_name from students natural join enrollments natural join courses where courses.course_name = '${course_name}'`;
    const result = await runQuery(query);
    result.forEach(row => {
        console.log(`${row.student_name}`);
    });
}

const makeEnroll = async (student_id, course_id, grade) => {
    const query = `INSERT INTO enrollments (student_id, course_id, grade)
        VALUES (${student_id}, ${course_id}, '${grade}')`;
    try {
        const result = await runQuery(query);
        console.log("수강 등록 완료:", result);
    } catch (err) {
        console.error("수강 등록 실패:", err);
    }
};

(async () => {
    getStudentCredit('이순신')
})();

(async () => {
    getStudentGrade('이순신')
})();

(async () => {
    getStudentList('미시경제학')
})();

(async () => {
    await makeEnroll(7, 1, 'A0');
})();