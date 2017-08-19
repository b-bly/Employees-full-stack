console.log('js');

var app = angular.module('EmployeeApp', []);

app.controller('EmployeeController', ['$http', function($http) {
    console.log('Employee controller has been loaded');
    var self = this;
    self.employees = [];

    self.postEmployee = function() {
        $http({
            method: 'POST',
            url: '/employeeRecords',
            data: self.newEmployee
        }).then(function(response) {
            console.log('response from post: ', response);
            //getEmployees();
    });
}


}]);