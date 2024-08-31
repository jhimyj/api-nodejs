const db = require('./db');

function getStudents() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM students', (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function getStudentById(id) {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM students where id=(?)',id, (err, rows) => {
            if(err)
                reject(err);
            else
                resolve(rows);
        });
    });
}

function addStudent(firstName, lastName, major) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO students (firstName, lastName, major) VALUES (?, ?, ?)', firstName, lastName, major, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function editStudent(id, firstName, lastName, major) {
    return new Promise((resolve, reject) => {
        db.run('UPDATE students SET firstName = ?, lastName = ?, major = ? where id = ?', [firstName, lastName, major, id], (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

function deleteStudent(id) {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM students WHERE id = (?)', id, (err) => {
            if(err)
                reject(err);
            else
                resolve();
        });
    });
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    editStudent,
    deleteStudent
};

