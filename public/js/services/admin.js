var app = angular.module("adminModule", []);

app.service("adminRequests", function($http) {
  this.getNewUsers = function() {
    return $http.get("http://localhost:8080/admin/newusers/");
  };
  this.deleteNewUser = function(id) {
    return $http.delete("http://localhost:8080/admin/newusers/" + id);
  };
  this.addNewUser = function(id, data) {
    return $http.post("http://localhost:8080/admin/users/" + id, data);
  };
  this.getCurrentUsers = function() {
    return $http.get("http://localhost:8080/admin/users/");
  };
  this.deleteCurrentUser = function(id) {
    return $http.delete("http://localhost:8080/admin/user/" + id);
  };
  this.getRecords = function() {
    return $http.get("http://localhost:8080/admin/records/");
  };
});
