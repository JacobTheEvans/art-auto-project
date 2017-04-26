var app = angular.module("tokenModule", []);

app.service("TokenService", function() {
  this.save = function(token) {
    localStorage.setItem("token", token);
  };
  this.removeToken = function() {
    localStorage.removeItem("token");
  }
  this.getToken = function() {
    return localStorage.getItem("token");
  }
});
