const { runQuery } = require('./database');
const sanitizeHtml = require('sanitize-html');

const cleanInput = (input) => {
    if (!input) return '';
    if (typeof input === 'number') return input;
    return sanitizeHtml(input); 
};

const getStudentGrades = async (studentName) => {
    const safeName = cleanInput(studentName);

    const sql = `
        SELECT c.course_name, e.grade 
        FROM students s
        JOIN enrollments e ON s.student_id = e.student_id
        JOIN courses c ON e.course_id = c.course_id
        WHERE s.student_name = ?
    `;
    
    const results = await runQuery(sql, [safeName]);
    
    console.log(`\n[ ${safeName} 학생의 성적표 ]`);
    if (results.length === 0) {
        console.log("데이터가 없습니다.");
    } else {
        results.forEach(row => {
            const safeCourse = cleanInput(row.course_name);
            const safeGrade = cleanInput(row.grade);
            console.log(`- ${safeCourse}: ${safeGrade}`);
        });
    }
};

const getCourseAttendees = async (courseName) => {
    const safeCourseName = cleanInput(courseName);

    const sql = `
        SELECT s.student_name, s.major, e.grade
        FROM courses c
        JOIN enrollments e ON c.course_id = e.course_id
        JOIN students s ON e.student_id = s.student_id
        WHERE c.course_name = ?
    `;

    const results = await runQuery(sql, [safeCourseName]);

    console.log(`\n[ ${safeCourseName} 강의 수강생 목록 ]`);
    if (results.length === 0) {
        console.log("수강생이 없습니다.");
    } else {
        results.forEach(row => {
            console.log(`- ${cleanInput(row.student_name)} (${cleanInput(row.major)}): ${cleanInput(row.grade)}`);
        });
    }
};

const enrollStudent = async (studentId, courseId, grade) => {
    const safeGrade = cleanInput(grade);

    const checkStudent = await runQuery(`SELECT * FROM students WHERE student_id = ?`, [studentId]);
    const checkCourse = await runQuery(`SELECT * FROM courses WHERE course_id = ?`, [courseId]);

    if (checkStudent.length === 0 || checkCourse.length === 0) {
        console.log(`\n[수강신청 실패] 존재하지 않는 데이터입니다.`);
        return;
    }

    const sql = `
        INSERT INTO enrollments (student_id, course_id, grade)
        VALUES (?, ?, ?)
    `;
    
    try {
        await runQuery(sql, [studentId, courseId, safeGrade]);
        console.log(`\n[수강신청 성공] 학번:${studentId}, 과목:${courseId}, 점수:${safeGrade}`);
    } catch (error) {
        console.log(`\n[수강신청 에러] 처리 중 오류 발생.`);
    }
};