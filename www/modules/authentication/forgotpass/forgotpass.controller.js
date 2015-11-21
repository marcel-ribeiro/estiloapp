angular.module('forgotpass.controller', [])

  .controller('ForgotpassController', function ($scope, $state, $ionicLoading, $filter, AuthenticationService, popupService, UNAUTHORIZED_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.forgotpass = function (user) {
      if (!user || !user.email) {
        var errorTitle = $translate('SIGNUP.ERROR_TITLE');
        var errorMsg = $translate('SIGNUP.FORM_INCOMPLETE');
        popupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Sending password reset email to: ", user.email);

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      AuthenticationService.resetPassword(user)
        .then(function () {

          console.log("Password reset email sent successfully!");
          var title = $translate('FORGOTPASS.TITLE');
          var msg = $translate('FORGOTPASS.SUCCESS', {email: user.email});
          popupService.displayCordovaToast(title, msg);
          $state.go(UNAUTHORIZED_DEFAULT_ROUTE, {}, {reload: true});

        }).catch(function (error) {

          console.log("Error sending reset email: ", error.message);
          var errorTitle = $translate('SIGNUP.ERROR_TITLE');
          var errorMsg = $translate(error.code) != error.code ? $translate(error.code) : error.message;
          popupService.displayAlertPopup(errorTitle, errorMsg);

        }).finally(function () {

          $ionicLoading.hide();

        });

    };

  });