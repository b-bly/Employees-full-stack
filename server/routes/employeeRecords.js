var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

console.log('employeeRecords is connected');

router.post('/', function(req, res) {
    var newEmployee = req.body;
    console.log('employeeRecords.js post called ');
    pool.connect(function(err, client, done) {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO employees (first_name, last_name, job_title, annual_salary) VALUES ($1, $2, $3, $4);', [newEmployee.firstName, newEmployee.lastName, newEmployee.jobTitle, newEmployee.anualSalary]);
            if (err) {
                console.log('Error making query: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    });
});

module.exports = router;