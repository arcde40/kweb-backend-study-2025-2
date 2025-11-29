const {runQuery} = require('./database');
const express = require('express');
const session = require('express-session');
const sanitizeHtml = express("sanitize-html")
const app = express()

//for pug
app.use(express.urlencoded({extended: true}));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`))

app.get("/", (req, res) => {
    res.render("Main.pug")
})

const getstudentinfo = async (student_name) => {
    const query = `select student_name, course_name, grade from enrollments natural join students natural join courses where student_name = ?`
    const result = await runQuery(query, [student_name]);
    return result
}
const getcourseinfo = async (course_name) => {
    const query = `
    select course_name, student_name
    from enrollments natural join courses natural join students
    where course_name = ?`

    const result = await runQuery(query, [course_name])
    return result
}
const pushenrollment = async (sid, cid, grade) => {
    const query = `
    insert ignore into enrollments(student_id, course_id, grade)
    values (?, ?, ?)
    on duplicate key update
        grade = VALUES(grade)
    `

    const result = await runQuery(query, [sid, cid, grade])
    return result["affectedRows"]
}

app.get("/student-info", async (req, res) => {
    const name = req.query.name
    if (name === undefined || name.trim() === "") {
        res.send("유효한 값이 아닙니다.")
    }
    else{
        result = await getstudentinfo(name)
        if (result.length === 0) {
            res.send("조회되지 않습니다.")
        }
        else{
            res.render("student-info.pug", {title: name, result: result})
        }
    }
})
app.get("/course-info", async (req, res) => {
    const name = req.query.name
    if (name === undefined || name.trim() === "")
        res.send("유효한 값이 아닙니다.")
    else{
        result = await getcourseinfo(name)
        if (result.length === 0) {
            res.send("조회되지 않습니다.")
        }
        else{
            let output = ""
            let array = []
            result.forEach((elem) => {
                array.push(elem["student_name"])
            })

            res.render("course-info.pug", {title: name, result: array.join(", ")})
        }
    }
})
app.get("/push-enrollment", async (req, res) => {
    const sid = req.query.studentid
    const cid = req.query.courseid
    const grade = req.query.grade

    if (
        sid === undefined || sid.trim() === "" ||
        cid === undefined || cid.trim() === "" ||
        grade === undefined || grade.trim() === ""
    ){
        res.send("값이 유효하지 않습니다.")
    }
    else{
        const result = await pushenrollment(sid, cid, grade)

        if (result != 0) {
            res.send(`삽입 성공`)
        }
        else{
            res.send(`삽입 실패`)
        }
    }

})

app.listen(3000, () => { console.log('Server listening on port 3000!');});