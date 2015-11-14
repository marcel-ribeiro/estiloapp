angular.module('signup.controller', [])

  .controller('signupController', function ($scope, $state, $ionicPopup, AuthenticationService, APP_DEFAULT_ROUTE) {
    $scope.data = {};

    $scope.signup = function (data) {
      alert("Signup with name:"+ data.name + "; email=" +data.email+ "; pass=" + data.password);
    };
  });