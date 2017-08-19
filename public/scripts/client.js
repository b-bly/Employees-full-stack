console.log('js');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function($http) {
    console.log('Employee controller has been loaded');

}]);