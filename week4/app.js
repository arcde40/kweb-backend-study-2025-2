const {runQuery} = require('./database');

const getStudentCredit = async (student_name) => {
    const query = `
    select e.grade, courses.course_name from enrollments as e natural join students as s natural join courses
    where s.student_name = '${student_name}';
    `
    const result = await runQuery(query);
    console.log(result)
    
    if (result[0]) {
        let output = `${student_name}의 수강목록: \n`
        result.forEach(element => {
            output += `${element["course_name"]}: ${element["grade"]}\n`
        });
        console.log(output.trimEnd())
    }
    else{
        console.log(`요청하신 ${student_name}에 대한 자료가 조회되지 않았습니다.`)
    }
}

const getStudentsofCourse = async (course_name) => {
    const query = `
    select course_name, student_name from enrollments NATURAL JOIN courses NATURAL join students where course_name = "${course_name}";
    
    `
    const result = await runQuery(query)
    let output = `${course_name}의 수강 학생\n`
    if (result[0]){
        result.forEach(element => {
            output += `${element["student_name"]}, `
        })
        console.log(output.slice(0, output.length - 2))
    }
    else{

    }
}

const addenrollment = async (student_id, course_id, grade) => {
    const read_course = `
    select * from courses where course_id = ${course_id}
    `

    const read_student = `
    select * from students where student_id = ${student_id}
    `

    const student = await runQuery(read_student)
    const course = await runQuery(read_course)

    if (student.length == 0 || course.length == 0){
        console.log("삽입실패, 존재하지 않는 데이터")
        return;
    }
    const query = `
    insert ignore into enrollments(student_id, course_id, grade)
    VALUES (${student_id}, ${course_id}, "${grade}");
    `
    runQuery(query)
}

(async () => {
    addenrollment(87, 56, "A+")
})();