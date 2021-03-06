console.log('js');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function ($http) {
    console.log('Employee controller has been loaded');
    var self = this;
    self.employees;
    self.status = {status: 'active'};
    self.monthlyExpendatures;

    self.getEmployees = function () {
        $http({
            method: 'GET',
            url: '/employeeRecords'
        }).then(function (response) {
            console.log('response from get: ', response);
            self.employees = response.data;
            self.monthlyExpendatures = response.data.reduce(function(acc, row) {
                return acc + row.annual_salary;
            }, 0);
            self.class = response.data.status;
        });
    }

    self.postEmployee = function (event) {
        
        $http({
            method: 'POST',
            url: '/employeeRecords',
            data: self.newEmployee
        }).then(function (response) {
            console.log('response from post: ', response);
            self.getEmployees();
        });
    }

    self.putStatus = function (employee) {
        //console.log('event: ', event.srcElement.innerText);
        //console.log('event: ', event.srcElement.parentElement.parentElement.children[0].innerText);
        employee.status = event.srcElement.innerText == 'active' ? 'inactive' : 'active';
        //var id = event.srcElement.parentElement.parentElement.children[0].innerText; //I have a feeling that there's a better way
        console.log(employee);
        

        $http({
            method: 'PUT',
            url: '/employeeRecords/',
            data: employee
        }).then(function (response) {
            console.log('response from put: ', response);
            
            self.getEmployees();
        });
    }

   

    //https://stackoverflow.com/questions/24320237/change-the-text-of-the-button-on-click-using-angular-js
    self.getEmployees();
}]);