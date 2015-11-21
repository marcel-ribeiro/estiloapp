angular.module('authentication.service', [])

  .service('authenticationService', function ($state, $filter, $ionicLoading, $timeout, $q, authenticationFactory, firebaseFactory, popupService, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');


    this.authenticateWithPassword = function (user) {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      authenticationFactory.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function (authData) {
        console.log("Logged in as: " + authData.uid);

        $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});
      }).catch(function (error) {
        console.log("Error logging in: ", error.message);

        var errorTitle = $translate('LOGIN.ERROR_TITLE');
        var errorMsg = $translate(error.code) != error.code ? $translate(error.code) : error.message;
        popupService.displayAlertPopup(errorTitle, errorMsg);

      }).finally(function () {
        $ionicLoading.hide();
      });

    };

    this.createUser = function (user) {
      return createUser(user)
        .then(function (userData) {
          console.log("User created with uid: ", userData.uid);
          return updateNewUser(user, userData);
        }).then(function () {
          console.log("Authenticating user: ", user.email);
          return authenticateWithPassword(user);
        });
    };

    /*
    * Invokes the rest call to create a new user
    * */
    var createUser = function (user) {
      return authenticationFactory.$createUser({
        email: user.email,
        password: user.password
      });
    };

    /*
    * Updates the user that was recently created (should be used for the signup only)
    * */
    var updateNewUser = function (user, userData) {
      return firebaseFactory.child("users").child(userData.uid).set({
        email: user.email,
        name: user.name
      })
    };

    /*
    * Invokes the rest call to authenticate a user with email and password
    * */
    var authenticateWithPassword = function (user) {
      return authenticationFactory.$authWithPassword({
        email: user.email,
        password: user.password
      });
    };

  });