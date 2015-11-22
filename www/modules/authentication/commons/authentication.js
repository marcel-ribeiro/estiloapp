angular.module('authentication', [
  'core',
  'authentication.factory',
  'authentication.service',
  'authentication.controller'
])

.run(function ($ionicPlatform, $rootScope, $location, $ionicLoading, AuthenticationFactory) {
  $ionicPlatform.ready(function () {

    /*
     * Method available throughout the entire app to allow the user to logout
     * */
    $rootScope.logout = function () {
      console.log("Logging out from the app");

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      $rootScope.currentUser = null;
      $rootScope.currentAuthData = null;

      AuthenticationFactory.$unauth();
    };

  });
});