const { runQuery } = require('./database');

const getStudentGrades = async (studentName) => {
    const sql = `
        SELECT c.course_name, e.grade 
        FROM students s
        JOIN enrollments e ON s.student_id = e.student_id
        JOIN courses c ON e.course_id = c.course_id
        WHERE s.student_name = '${studentName}'
    `;
    
    const results = await runQuery(sql);
    
    console.log(`\n[ ${studentName} 학생의 성적표 ]`);
    if (results.length === 0) {
        console.log("데이터가 없습니다.");
    } else {
        results.forEach(row => {
            console.log(`- ${row.course_name}: ${row.grade}`);
        });
    }
};

const getCourseAttendees = async (courseName) => {
    const sql = `
        SELECT s.student_name, s.major, e.grade
        FROM courses c
        JOIN enrollments e ON c.course_id = e.course_id
        JOIN students s ON e.student_id = s.student_id
        WHERE c.course_name = '${courseName}'
    `;

    const results = await runQuery(sql);

    console.log(`\n[ ${courseName} 강의 수강생 목록 ]`);
    if (results.length === 0) {
        console.log("수강생이 없습니다.");
    } else {
        results.forEach(row => {
            console.log(`- ${row.student_name} (${row.major}): ${row.grade}`);
        });
    }
};

const enrollStudent = async (studentId, courseId, grade) => {
    const checkStudent = await runQuery(`SELECT * FROM students WHERE student_id = ${studentId}`);
    const checkCourse = await runQuery(`SELECT * FROM courses WHERE course_id = ${courseId}`);

    if (checkStudent.length === 0 || checkCourse.length === 0) {
        console.log(`\n[수강신청 실패] 학생(${studentId}) 또는 강의(${courseId})가 존재하지 않습니다.`);
        return;
    }

    const sql = `
        INSERT INTO enrollments (student_id, course_id, grade)
        VALUES (${studentId}, ${courseId}, '${grade}')
    `;
    
    try {
        await runQuery(sql);
        console.log(`\n[수강신청 성공] 학번:${studentId}, 과목:${courseId}, 점수:${grade}`);
    } catch (error) {
        console.log(`\n[수강신청 에러] 이미 신청했거나 DB 오류입니다.`);
    }
};