var app = angular.module("apiModule", []);

app.service("apiRequests", function($http) {
  this.getData = function() {
    return $http.get("http://localhost:8080/api/");
  };
  this.postUpdate = function(data) {
    return $http.post("http://localhost:8080/api/", data);
  };
});
