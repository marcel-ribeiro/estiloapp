angular.module('login.controller', [])

  //.controller('LoginController', function($scope, $state) {
  //  $scope.data = {};
  //
  //  $scope.login = function(data) {
  //    $state.go('app.playlists', {}, {reload: true});
  //  };
  //})
  .controller('login.controller', function ($scope) {
    $scope.isLoginFormCompleted=function(user){
      return angular.isUndefined(user.username);//(!user.username || !user.password);
    };
  });
