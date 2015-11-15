angular.module('signup.controller', [
  'firebase'
])

  .controller('signupController', function ($scope, $state, $ionicModal, $ionicLoading, $ionicPopup, $filter, authenticationFactory, SERVICES_ROOT, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.signup = function (user) {
      if (!user || !user.email || !user.password || !user.name) {
        var errorTitle = $translate('SIGNUP_ERROR_TITLE');
        var errorMsg = $translate('SIGNUP_FORM_INCOMPLETE');
        showErrorAlert(errorTitle, errorMsg);
        return;
      }

      console.log("Signup with email: ", user.email);
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });

      authenticationFactory.$createUser({
        name: user.name,
        email: user.email,
        password: user.password
      }).then(function (userData) {
        console.log("User created with uid: ", userData.uid);

        $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

      }).catch(function (error) {
        console.log("Error signing up: ", error.message);

        var errorTitle = $translate('SIGNUP_ERROR_TITLE');
        var errorMsg = getErrorMsg(error);
        showErrorAlert(errorTitle, errorMsg);
      }).finally(function () {
        $ionicLoading.hide();
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