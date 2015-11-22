angular.module('welcome.controller', [])
  .controller('WelcomeController', function ($scope, $rootScope, $state, $ionicLoading, $filter, $cordovaFacebook, FirebaseFactory, AuthenticationService, PopupService, APP_DEFAULT_ROUTE) {
    $scope.loginWithFacebook = function () {
      if (ionic.Platform.isWebView()) {

        $cordovaFacebook.login(["public_profile", "email"]).then(function (success) {

          console.log(success);

          FirebaseFactory.authWithOAuthToken("facebook", success.authResponse.accessToken, function (error, authData) {
            if (error) {
              console.log('Firebase login failed!', error);
            } else {
              console.log('Authenticated successfully with payload:', authData);
            }
          });

        }, function (error) {
          console.log(error);
        });

      }
      else {

        AuthenticationService.authenticateWithProvider("facebook")
          .then(function (authData) {

            console.log("Login with facebook successful: ", authData);
            $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

          }).catch(function (error) {

            // Another error occurred
            console.log("Unable to login with facebook: ", error);

          });

      }
    };


    $scope.loginWithGoogle = function () {
      //if (ionic.Platform.isWebView()) {
      //
      //  $cordovaFacebook.login(["public_profile", "email"]).then(function (success) {
      //
      //    console.log(success);
      //
      //    FirebaseFactory.authWithOAuthToken("facebook", success.authResponse.accessToken, function (error, authData) {
      //      if (error) {
      //        console.log('Firebase login failed!', error);
      //      } else {
      //        console.log('Authenticated successfully with payload:', authData);
      //      }
      //    });
      //
      //  }, function (error) {
      //    console.log(error);
      //  });
      //
      //}
      //else {

        AuthenticationService.authenticateWithProvider("google")
          .then(function (authData) {

            console.log("Login with google successful: ", authData);
            $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

          }).catch(function (error) {

            // Another error occurred
            console.log("Unable to login with google: ", error);

          });

      //}
    };

  });

