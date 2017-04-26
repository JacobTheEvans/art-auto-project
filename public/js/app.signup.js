var app = angular.module("app.signup", ["ngRoute", "authModule"]);

app.config(function($routeProvider) {
  $routeProvider.when("/signup", {
    templateUrl: "/views/signup.tpl.html",
    controller: "signupCtrl"
  });
});


app.controller("signupCtrl", function($scope, authSerivce, $location) {
  $scope.userinput = {};
  $scope.signup = function() {
    var data = {
      username: $scope.userinput.username,
      password: $scope.userinput.password1
    }
    authSerivce.signup(data).then(function(response) {
      $scope.userinput = {};
      alert("Account has been added to que of new users");
    }, function(response) {
      alert(response.data.message);
    })
  };
  $scope.validate = function() {
    var val=true;
    if($scope.userinput.username) {
       val= val & false;
    } else if($scope.userinput.password1) {
      val= val & false;
    } else if($scope.userinput.password2) {
      val= val & false;
    } else if($scope.userinput.password1 != $scope.userinput.password2) {
      val= val & false;
    } else {
      val= val & true;
    }
    return val
  }
});
