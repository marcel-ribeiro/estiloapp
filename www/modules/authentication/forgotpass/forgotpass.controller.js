angular.module('forgotpass.controller', [])

  .controller('forgotpassController', function ($scope, $state, $ionicLoading, $filter, firebaseFactory, authenticationFactory, popupService, UNAUTHORIZED_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.forgotpass = function (user) {
      if (!user || !user.email) {
        var errorTitle = $translate('SIGNUP_ERROR_TITLE');
        var errorMsg = $translate('SIGNUP_FORM_INCOMPLETE');
        popupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Sending password reset email to: ", user.email);

      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      authenticationFactory.$resetPassword({
        email: user.email
      }).then(function () {
        console.log("Password reset email sent successfully!");

        var title = $translate('FORGOTPASS_TITLE');
        var msg = $translate('FORGOTPASS_SUCCESS', {email: user.email});
        popupService.displayCordovaToast(title, msg);

        $state.go(UNAUTHORIZED_DEFAULT_ROUTE, {}, {reload: true});

      }).catch(function (error) {
        console.log("Error sending reset email: ", error.message);

        var errorTitle = $translate('SIGNUP_ERROR_TITLE');
        var errorMsg = $translate(error.code) != error.code ? $translate(error.code) : error.message;
        popupService.displayAlertPopup(errorTitle, errorMsg);

      }).finally(function () {
        $ionicLoading.hide();
      });

    };

  });