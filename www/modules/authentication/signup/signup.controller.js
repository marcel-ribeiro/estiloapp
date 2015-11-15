angular.module('signup.controller', [
  'firebase'
])

  .controller('signupController', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, $ionicPopup, $filter, SERVICES_ROOT, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');
    var ref = new Firebase(SERVICES_ROOT);
    var auth = $firebaseAuth(ref);

    $scope.signup = function (user) {
      console.log("Signup with email: ", user.email);

      if (user && user.email && user.password && user.name) {
        $ionicLoading.show({
          template: $translate('SIGNUP_LOADING')
        });

        auth.$createUser({
          name: user.name,
          email: user.email,
          password: user.password
        }).then(function (userData) {
          console.log("User created with uid: ", userData.uid);

          $ionicLoading.hide();
          $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

        }).catch(function (error) {
          //error
          console.log("Error signing up: ", error.message);
          var errorMsg = getErrorMsg(error);
          showErrorAlert(errorMsg);

          $ionicLoading.hide();
        });

      } else {
        showErrorAlert($translate('SIGNUP_FORM_INCOMPLETE'));
      }
    };

    /*
     * Displays the alert with the error messages
     * */
    var showErrorAlert = function (errorMsg) {
      var errorTitle = getErrorTitle();

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

    /*
     * Retrieves the title of the alert pop up (according to the locale)
     * */
    var getErrorTitle = function () {
      var errorTitle = $translate('SIGNUP_ERROR_TITLE');
      if (!errorTitle) {
        errorTitle = 'Error';
      }

      return errorTitle;
    }
  });