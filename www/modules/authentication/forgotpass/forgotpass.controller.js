angular.module('forgotpass.controller', [])

  .controller('forgotpassController', function ($scope, $state, $ionicModal, $ionicLoading, $ionicPopup, $filter, firebaseFactory, authenticationFactory, UNAUTHORIZED_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.forgotpass = function (user) {
      if (!user || !user.email) {
        var errorTitle = $translate('SIGNUP_ERROR_TITLE');
        var errorMsg = $translate('SIGNUP_FORM_INCOMPLETE');
        showErrorAlert(errorTitle, errorMsg);
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

        //displaySucessMsg();

        $state.go(UNAUTHORIZED_DEFAULT_ROUTE, {}, {reload: true});

      }).catch(function (error) {
        console.log("Error sending reset email: ", error.message);

        var errorTitle = $translate('SIGNUP_ERROR_TITLE');
        var errorMsg = getErrorMsg(error);
        showErrorAlert(errorTitle, errorMsg);
      }).finally(function () {
        $ionicLoading.hide();
      });

    };

    var displaySucessMsg = function($cordovaToast){
      var message = "test msg";
      var duration = "long";
      $cordovaToast.showLongBottom('This could be your text!')
        .then(function(success) {
          // Do something on success
        }, function(error) {
          // Handle error
        });
    };

    /*
     * Displays the alert with the error messages
     * */
    var showErrorAlert = function (errorTitle, errorMsg) {
      var alertPopup = $ionicPopup.alert({
        title: errorTitle,
        template: errorMsg,
        buttons: [{
          text: 'OK',
          type: 'button-royal'
        }]
      });
      alertPopup.then(function (res) {
        console.log(errorMsg);
      });
    };

    /*
     * Retrieves the error msg to be displayed (according to the locale)
     * */
    var getErrorMsg = function (error) {
      var errorMsg = $translate(error.code);

      if (!errorMsg && error) {
        errorMsg = error.message;
      }
      return errorMsg;
    };


  });