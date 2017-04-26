var app = angular.module("privModule", []);

app.service("PrivService", function() {
  this.save = function(token) {
    localStorage.setItem("priv", token);
  };
  this.removeToken = function() {
    localStorage.removeItem("priv");
  }
  this.getToken = function() {
    return localStorage.getItem("priv");
  }
});
