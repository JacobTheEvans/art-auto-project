var app = angular.module("app.admin", ["ngFileUpload", "ngRoute", "adminModule"]);

app.config(function($locationProvider, $routeProvider) {
  $routeProvider.when("/admin", {
    templateUrl: "/views/admin.tpl.html",
    controller: "adminCtrl"
  });
});

app.filter('searchAdmin', function() {
  return function(data, searchTerm) {
    if(searchTerm == "" || searchTerm == undefined) {
      return data;
    }
    var result = [];
    for(var i = 0; i < data.length; i++) {
      var matchPattern = false;
      for(key in data[i]) {
        if(key != "date") {
          if(data[i][key].toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            matchPattern = true;
            break;
          }
        }
      }
      if(matchPattern) {
        result.push(data[i]);
      }
    }
    return result;
  }
});

app.controller("adminCtrl", function($scope, Upload, $timeout, adminRequests) {
  $scope.section = "";
  $scope.newUsers = [];
  $scope.currentUsers = [];
  $scope.records
  $scope.setSection = function(section) {
    $scope.section = section;
  };
  $scope.toggleAdminSelection = function(item) {
    item.isAdmin = !item.isAdmin;
  }
  $scope.loadNewUsers = function() {
    adminRequests.getNewUsers().then(function(response) {
      $scope.newUsers = response.data;
      $scope.newUsers = $scope.newUsers.map(function(item) {
        item.isAdmin = false;
        return item;
      });
    }, function(response) {
      alert("Err", response.status);
    });
  };
  $scope.loadCurrentUsers = function() {
    adminRequests.getCurrentUsers().then(function(response) {
      $scope.currentUsers = response.data;
    }, function(response) {
      alert("Err", response.status);
    });
  };
  $scope.loadRecords = function() {
    adminRequests.getRecords().then(function(response) {
      $scope.records = response.data;
      $scope.records = $scope.records.map(function(item) {
        var temp = new Date(item.date);
        item.showDate = temp.toLocaleDateString();
        item.showTime = temp.toLocaleTimeString();
        return item;
      });
    }, function(response) {
      alert("Err", response.status);
    });
  };
  $scope.addNewUser = function(item) {
    adminRequests.addNewUser(item._id, item).then(function(response) {
      $scope.loadNewUsers();
    }, function(response) {
      alert("Err", response.status);
    });
  };
  $scope.removeNewUser = function(item) {
    adminRequests.deleteNewUser(item._id).then(function(response) {
      $scope.loadNewUsers();
    }, function(response) {
      alert("Err", response.status);
    });
  };
  $scope.removeCurrentUser = function(item) {
    adminRequests.deleteCurrentUser(item._id).then(function(response) {
      $scope.loadCurrentUsers();
    }, function(response) {
      alert("Err", response.status);
    });
  }
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: "http://localhost:8080/admin/stock",
        data: {file: file}
      });
      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
          $scope.customFileMessage = "Success File Has Been Uploaded";
        });
      }, function (response) {
        if (response.status > 0) {
          $scope.errorMsg = response.status + ": " + response.data;
        }
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
  }
});
