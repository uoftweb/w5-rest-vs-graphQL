const fs = require('fs');

function getCourseByID(id){
    const rawdata = fs.readFileSync('data.json');
    const courses = JSON.parse(rawdata);
    return courses[id];
}

function getCourses(id){
    const rawdata = fs.readFileSync('data.json');
    const courses = JSON.parse(rawdata);
    return courses;
}

function createCourse(course) {
    const rawdata = fs.readFileSync('data.json');
    const courses = JSON.parse(rawdata);
    const fields = ["courseCode", "title", "hours", "summary"]

    for (const field of fields){
        if (!course.hasOwnProperty(field)){
            throw new Error("Data ill-defined")
        }
    }

    if (courses[course.courseCode]){
        throw new Error("Course existed")
    }

    courses[course.courseCode] = course

    fs.writeFileSync('data.json', JSON.stringify(courses));
}

module.exports = {getCourseByID, getCourses, createCourse}
