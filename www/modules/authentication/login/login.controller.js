angular.module('login.controller', [])

  .controller('loginController', function ($scope, $state, $ionicPopup, AuthenticationService, APP_DEFAULT_ROUTE) {
    $scope.data = {};

    $scope.login = function (data) {
      AuthenticationService.login(data.email, data.password).then(function (authenticated) {
        $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});
      }, function (err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    };
  });