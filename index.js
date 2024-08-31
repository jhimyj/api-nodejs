var express = require('express');
var bodyParser = require("body-parser");
const agents = require('./students');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET ALL
app.get("/students", async function(req, res) {
    const allAgents = await agents.getStudents();
    res.send(allAgents);
});

// GET
app.get("/student/:id", async function(req, res) {
    const agent = await agents.getStudentById(req.params.id);
    res.send(agent);
});

// POST
app.post("/student", async function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const major = req.body.major;
    await agents.addStudent(firstName, lastName,major);
    res.send({"message": "Success"});
});

// PUT
app.put("/student/:id", async function(req, res) {
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const major = req.body.major;
    await agents.editStudent(id,firstName,lastName,major);
    res.send({"message": "Success"});
});

// DELETE
app.delete("/student/:id", async function(req, res) {
    await agents.deleteStudent(req.params.id);
    res.send({"message": "Success"});
});

app.listen(process.env.PORT || 8080,function(req,res){
    console.log("Server Started!");
});
