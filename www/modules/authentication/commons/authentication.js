angular.module('authentication', [
  'core',
  'authentication.factory',
  'authentication.service'
])

.run(function ($ionicPlatform, $rootScope, $location, $ionicLoading, firebaseFactory, AuthenticationFactory, UNAUTHORIZED_DEFAULT_ROUTE) {
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


    /*
     * Method that handles the event of AUTH_REQUIRED when it raises an error
     * */
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        console.log("Not authorized to access: ", toState.url);
        $location.path(UNAUTHORIZED_DEFAULT_ROUTE);
      }
    });


    /*
    * Method invoked every time there's a change in the user authentication.
    * Responsible for setting and cleaning data regarding the authentication in the RrootScope
    * */
    AuthenticationFactory.$onAuth(function (authData) {
      if (authData) {
        console.log("Logged in as: ", authData.uid);
        updateCurrentAuthData(authData);
      } else {
        console.log("Not authenticated.");
        $ionicLoading.hide();
        $location.path(UNAUTHORIZED_DEFAULT_ROUTE);
      }
    });

    /*
     * Update the info regarding the user currently logged in
     * */
    var updateCurrentAuthData = function (authData) {
      $rootScope.currentAuthData = authData;
      firebaseFactory.child("users").child(authData.uid).once('value', function (snapshot) {
        var userData = snapshot.val();
        $rootScope.$apply(function () {
          $rootScope.currentUser = userData;
        });
      }, function (err) {
        console.error("Unable to retrieve the user information for UID: ", authData.uid);
      });
    }

  });
});