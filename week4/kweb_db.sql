-- Active: 1763528628717@@db@3306@kweb_db
SELECT students.student_name, courses.course_name, enrollments.grade FROM
enrollments NATURAL JOIN students NATURAL JOIN courses;

SELECT students.student_name, courses.course_name, enrollments.grade
FROM students INNER JOIN enrollments ON students.student_id = enrollments.student_id
NATURAL JOIN courses
WHERE student_name = '신사임당'

SELECT * FROM courses;
SELECT * FROM students;

INSERT INTO enrollments(student_id, course_id, grade)
VALUES (10, 8, 'C-');

UPDATE enrollments SET course_id=9 WHERE student_id = 10 AND course_id = 8;

SELECT s.student_name, min(e.grade) AS grade 
FROM students s NATURAL JOIN enrollments e
GROUP BY s.student_id
ORDER BY min(e.grade) ASC, s.student_name ASC
LIMIT 3;

DELETE FROM enrollments WHERE student_id = 10;

SELECT courses.course_name, enrollments.grade
FROM students NATURAL JOIN enrollments NATURAL JOIN courses
WHERE students.student_name = '가나다';

SELECT
    courses.course_name,
    students.student_name
FROM courses
JOIN enrollments ON courses.course_id = enrollments.course_id
JOIN students ON enrollments.student_id = students.student_id
WHERE courses.course_name = '데이터베이스'
ORDER BY student_name ASC;
