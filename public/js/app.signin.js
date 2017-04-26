var app = angular.module("app.signin", ["ngRoute", "authModule", "tokenModule", "privModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/signin", {
    templateUrl: "/views/signin.tpl.html",
    controller: "signinCtrl"
  });
});


app.controller("signinCtrl", function($scope, authSerivce, TokenService, PrivService, $location) {
  $scope.userinput = {};
  $scope.signin = function() {
    var data = {
      username: $scope.userinput.username,
      password: $scope.userinput.password
    }
    authSerivce.signin(data).then(function(response) {
      TokenService.save(response.data.token);
      PrivService.save(response.data.priv);
      $location.path("/home")
      $scope.userinput = {};
    }, function(response) {
      console.log(response.status);
      alert(response.data.message);
    })
  };

});
