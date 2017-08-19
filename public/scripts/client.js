console.log('js');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function ($http) {
    console.log('Employee controller has been loaded');
    var self = this;
    self.employees;
    self.status = {status: 'active'};

    self.getEmployees = function () {
        $http({
            method: 'GET',
            url: '/employeeRecords'
        }).then(function (response) {
            console.log('response from get: ', response);
            self.employees = response.data;
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

    self.putStatus = function (event) {
        //console.log('event: ', event.srcElement.innerText);
        //console.log('event: ', event.srcElement.parentElement.parentElement.children[0].innerText);
        self.status.status = event.srcElement.innerText == 'active' ? 'inactive' : 'active';
        var id = event.srcElement.parentElement.parentElement.children[0].innerText; //I have a feeling that there's a better way
        $http({
            method: 'PUT',
            url: '/employeeRecords/put/' + id,
            data: self.status
        }).then(function (response) {
            console.log('response from put: ', response);
            self.class = response.data.status;
            self.getEmployees();
        });
    }

   

    //https://stackoverflow.com/questions/24320237/change-the-text-of-the-button-on-click-using-angular-js
    self.getEmployees();
}]);