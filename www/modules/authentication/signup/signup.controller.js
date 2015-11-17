angular.module('signup.controller', [])

  .controller('signupController', function ($scope, $state, $ionicLoading, $filter, firebaseFactory, authenticationFactory, popupService, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.signup = function (user) {
      if (!user || !user.email || !user.password || !user.name) {
        var errorTitle = $translate('SIGNUP.ERROR_TITLE');
        var errorMsg = $translate('SIGNUP.FORM_INCOMPLETE');
        popupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Signup with email: ", user.email);
      //popupService.displayAlertPopup(errorTitle, errorMsg);
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      authenticationFactory.$createUser({
        email: user.email,
        password: user.password
      }).then(function (userData) {
        console.log("User created with uid: ", userData.uid);

        firebaseFactory.child("users").child(userData.uid).set({
          email: user.email,
          name: user.name
        });

        $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

      }).catch(function (error) {
        console.log("Error signing up: ", error.message);

        var errorTitle = $translate('SIGNUP.ERROR_TITLE');
        var errorMsg = $translate(error.code) != error.code ? $translate(error.code) : error.message;
        popupService.displayAlertPopup(errorTitle, errorMsg);

      }).finally(function () {
        $ionicLoading.hide();
      });

    };

  });