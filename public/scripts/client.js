console.log('js');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function($http) {
    console.log('Employee controller has been loaded');
    var self = this;
    self.employees = [];

    self.newEmployee = {};

    self.createEmployee = function() {
        console.log('createEmployee called');
        self.employees.push(angular.copy(self.newEmployee));
    }

}]);