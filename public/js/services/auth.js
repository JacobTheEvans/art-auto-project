var app = angular.module("authModule", []);

app.service("authSerivce", function($http) {
  this.signup = function(data) {
    return $http.post("http://localhost:8080/auth/signup", data);
  }
  this.signin = function(data) {
    return $http.post("http://localhost:8080/auth/signin", data);
  }
});
