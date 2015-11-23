angular.module('authentication.controller', [])

  .controller('AuthenticationController', function ($scope, $state, $ionicPlatform, $rootScope, $location, $ionicLoading, $firebaseObject, FirebaseFactory, AuthenticationService, AuthenticationFactory, UNAUTHORIZED_DEFAULT_ROUTE, APP_DEFAULT_ROUTE) {
    AuthenticationService.onAuth(authDataCallback);

    /*
     * Method invoked every time there's a change in the user authentication.
     * Responsible for setting and cleaning data regarding the authentication in the RrootScope
     * */
    function authDataCallback(authData) {
      if (authData) {

        updateCurrentAuthData(authData);
        $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

      } else {

        console.log("Not authenticated.");
        $ionicLoading.hide();
        $location.path(UNAUTHORIZED_DEFAULT_ROUTE);

      }
    }

    /*
     * Update the info regarding the user currently logged in
     * */
    function updateCurrentAuthData(authData) {
      $rootScope.currentAuthData = authData;

      FirebaseFactory.child("users").child(authData.uid).on("value", function(snapshot) {
        var user = snapshot.val();
        if(isNewUser(user)){
          user  = getUserInfoFromAuth(authData);
          AuthenticationService.updateNewUser(user, authData);
          console.log("Updated DB with User info: ", authData);
        }

        $scope.$apply(function () {
          $scope.currentUser = user;
        });
      });

    }

    function isNewUser(user){
      return user == null;
    }

    /*
     * Retrieves additional user's info based on the authentication
     * */
    function getUserInfoFromAuth(authData) {
      var user = {};
      user.authenticationType = authData.provider;

      switch(authData.provider) {
        case 'password':
          user.name = authData.password.email.replace(/@.*/, '');
          user.email = authData.password.email;
          return user;
        case 'google':
          user.name = authData.google.displayName;
          user.email = authData.google.email;
          return user;
        case 'facebook':
          user.name = authData.facebook.displayName;
          user.email = authData.facebook.email;
          return user;
      }

      return user;
    }

    /*
     * Method that handles the event of AUTH_REQUIRED when it raises an error
     * */
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        console.log("Not authorized to access: ", toState.url);
        $location.path(UNAUTHORIZED_DEFAULT_ROUTE);
      }
    });


  });