const express = require('express');
const session = require('express-session'); // 안 써도 상관 없음(과제용이면 남겨둬도 됨)
const { runQuery } = require('./database');
const sanitizeHtml = require('sanitize-html');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const getStudentCredit = async (student_name) => {
  const query = `
    SELECT GROUP_CONCAT(enrollments.grade) AS grade
    FROM students
    NATURAL JOIN enrollments
    WHERE students.student_name = ?
  `;
  const result = await runQuery(query, [student_name]);
  console.log(result[0]?.grade ?? '결과 없음');
};

const getStudentGrade = async (student_name) => {
  const query = `
    SELECT courses.course_name AS course, enrollments.grade
    FROM students
    NATURAL JOIN enrollments
    NATURAL JOIN courses
    WHERE students.student_name = ?
  `;
  const result = await runQuery(query, [student_name]);
  result.forEach((row) => {
    console.log(`${row.course}: ${row.grade}`);
  });
};

const getStudentList = async (course_name) => {
  const query = `
    SELECT students.student_name
    FROM students
    NATURAL JOIN enrollments
    NATURAL JOIN courses
    WHERE courses.course_name = ?
  `;
  const result = await runQuery(query, [course_name]);
  result.forEach((row) => {
    console.log(`${row.student_name}`);
  });
};

const makeEnroll = async (student_id, course_id, grade) => {
  const query = `
    INSERT INTO enrollments (student_id, course_id, grade)
    VALUES (?, ?, ?)
  `;
  try {
    const result = await runQuery(query, [student_id, course_id, grade]);
    console.log('수강 등록 완료:', result);
  } catch (err) {
    console.error('수강 등록 실패:', err);
  }
};


app.get('/xss', (req, res) => {
  const content = req.query.content || '';
  const safeContent = sanitizeHtml(content);
  return res.send(safeContent);
});


async function main() {

  await getStudentCredit('이순신');
  await getStudentGrade('이순신');
  await getStudentList('미시경제학');
  await makeEnroll(7, 1, 'A0');

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

main();