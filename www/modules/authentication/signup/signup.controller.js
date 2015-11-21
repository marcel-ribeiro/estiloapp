angular.module('signup.controller', [])

  .controller('SignupController', function ($scope, $state, $ionicLoading, $filter, AuthenticationService, popupService, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.signup = function (user) {
      if (!user || !user.email || !user.password || !user.name) {
        var errorTitle = $translate('SIGNUP.ERROR_TITLE');
        var errorMsg = $translate('SIGNUP.FORM_INCOMPLETE');
        popupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Signup with email: ", user.email);

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      AuthenticationService.signupWithEmail(user)
        .then(function (userData) {

          console.log("User created with uid: ", userData.uid);
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