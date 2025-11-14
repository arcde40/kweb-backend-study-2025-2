const {runQuery} = require('./database');


const getStudentCredit = async (student_name) => {
    const query = `select group_concat(enrollments.grade) from students natural join enrollments where student.student_name = '${student_name}';`
    const result = await runQuery(query);
    console.log(result[0].grade);
};

(async () => {
    getStudentCredit('이순신');
})();