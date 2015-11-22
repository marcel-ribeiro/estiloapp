angular.module('signup.controller', [])

  .controller('SignupController', function ($scope, $state, $ionicLoading, $filter, AuthenticationService, PopupService, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.signup = function (user) {
      if (!user || !user.email || !user.password || !user.name) {
        var errorTitle = $translate('SIGNUP.ERROR_TITLE');
        var errorMsg = $translate('SIGNUP.FORM_INCOMPLETE');
        PopupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Signup with email: ", user.email);

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      user.authenticationType = "password";

      AuthenticationService.signupWithEmail(user)
        .then(function (userData) {

          console.log("User created with uid: ", userData.uid);
          $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

        }).catch(function (error) {

          console.log("Error signing up: ", error.message);
          var errorTitle = $translate('SIGNUP.ERROR_TITLE');
          var errorMsg = $translate(error.code) != error.code ? $translate(error.code) : error.message;
          PopupService.displayAlertPopup(errorTitle, errorMsg);

        }).finally(function () {

          $ionicLoading.hide();

        });


    };

  });