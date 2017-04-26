var app = angular.module("app.home", ["apiModule", "ngRoute", "privModule"]);

app.config(function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider.when("/home", {
    templateUrl: "/views/home.tpl.html",
    controller: "ctrl"
  });
});

function isNumeric(num) {
  return !isNaN(num)
}

app.filter('search', function() {
  return function(input, cat) {
    var output = [];
    for(var i = 0; i < input.length; i++) {
      if(input[i]["cat"].indexOf(cat) > -1) {
        output.push(input[i].ref);
      }
    }
    return output;
  }
});

app.controller("ctrl", function($scope, apiRequests, $location, PrivService) {
  $scope.priv = PrivService.getToken();
  //util functions
  var removeUneededItems = function(data) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i]["QTY5"] + data[i]["QTY3"] > 0) {
        result.push(data[i]);
      }
    }
    return result;
  }
  var returnMatchingItem = function(data, cat, ref) {
    for(var i = 0; i < data.length; i++) {
      if(data[i]["item"].indexOf(cat) > -1 && data[i]["item"].indexOf(ref) > -1) {
        return data[i];
      }
    }
    return null;
  }
  $scope.cats = [];
  $scope.data = [];
  $scope.loadData = function() {
    apiRequests.getData().then(function(response) {
      $scope.data = [];
      $scope.data = removeUneededItems(response.data.data);
      $scope.data = $scope.data.map(function(item) {
        var cat = "";
        var ref = "";
        if (item["item"].indexOf("-") != -1) {
          cat = item["item"].split("-")[0];
          ref = item["item"].split("-")[1];
        } else {
          var index = -1;
          for (var i = 0; i < item["item"].length; i++) {
            if (isNumeric(item["item"].length[i])) {
              index = i;
              break;
            }
          }
          cat = item["item"].substring(i, item["item"].length);
          ref = item["item"].substring(0, i);
        }
        if ($scope.cats.indexOf(cat) <= -1 && cat != "") {
          $scope.cats.push(cat)
        }
        item.cat = cat;
        item.ref = ref;
        return item;
      });
    }, function(response) {
      alert("Err", response.status);
    });
  }
  $scope.$watch("refNumber", function(newValue, oldValue) {
    if(newValue != undefined && $scope.catSelected != undefined) {
      $scope.selectedItem = returnMatchingItem($scope.data, $scope.catSelected, newValue);
    }
  });

  $scope.postUpdate = function(amount, item) {
    var data = {
      amount: amount,
      item: item
    }
    apiRequests.postUpdate(data).then(function(response) {
      alert("Update Sent");
      $location.path("/#/home");
    }, function(response) {
      alert("Err",response.status);
    });
  }
});
