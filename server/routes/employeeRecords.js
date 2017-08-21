var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js');

console.log('employeeRecords is connected');

router.put('/', function (req, res) {
    var status = req.body.status;
    var id = req.body.id;
    console.log(status);
    console.log('employeeRecords.js put called id: ', id);
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('UPDATE employees SET status=($1) WHERE id=($2);', [status, id]);
            if (err) {
                console.log('Error making query: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    });
});

router.post('/', function (req, res) {
    var newEmployee = req.body;
    console.log('employeeRecords.js post called ');
    pool.connect(function (err, client, done) {
        if (err) {
            console.log('Error connecting to database', err);
            res.sendStatus(500);
        } else {
            client.query('INSERT INTO employees (first_name, last_name, job_title, annual_salary, status) VALUES ($1, $2, $3, $4, $5);', 
            [newEmployee.firstName, newEmployee.lastName, newEmployee.jobTitle, newEmployee.anualSalary, 'active']);
            done();
            if (err) {
                console.log('Error making query: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(201);
            }
        }
    });
});

router.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM employees;', function (err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});





module.exports = router;