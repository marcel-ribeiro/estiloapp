angular.module('login', [])
  .controller('loginController', function($scope, $state, $ionicPopup, AuthService, DEFAULT_STATE_AUTHENTICATED) {
    $scope.data = {};

    $scope.login = function(data) {
      AuthService.login(data.username, data.password).then(function(authenticated) {
        $state.go(DEFAULT_STATE_AUTHENTICATED, {}, {reload: true});
        $scope.setCurrentUsername(data.username);
      }, function(err) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    };
  })

  //.controller('loginController2', function ($scope, $state, $ionicPopup, AuthService) {
  //  $scope.data = {};
  //
  //  $scope.login = function (data) {
  //    AuthService.login(data.username, data.password).then(function (authenticated) {
  //      $state.go('main.dash', {}, {reload: true});
  //      $scope.setCurrentUsername(data.username);
  //    }, function (err) {
  //      var alertPopup = $ionicPopup.alert({
  //        title: 'Login failed!',
  //        template: 'Please check your credentials!'
  //      });
  //    });
  //  };
  //})


  //.controller('loginController', function ($scope, $state, Auth) {
  //  // Form data for the login modal
  //  $scope.user = {};
  //
  //  $scope.logout = function () {
  //    Auth.logout();
  //    $state.go("login");
  //  };
  //
  //
  //  // Perform the login action when the user submits the login form
  //  $scope.doLogin = function () {
  //
  //    if (!angular.isDefined($scope.user.username) || !angular.isDefined($scope.user.password) || $scope.user.username.trim() == "" || $scope.user.password.trim() == "") {
  //      alert("Enter both user name and password");
  //      return;
  //    }
  //
  //    Auth.setUser({
  //      username: $scope.user.username
  //    });
  //
  //    $state.go("app.playlists");
  //
  //  };
  //
  //});
