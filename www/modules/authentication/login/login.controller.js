angular.module('login.controller', [
  'firebase'
])

  .controller('loginController', function ($scope, $rootScope, $state, $firebaseAuth, $ionicLoading, $ionicPopup, $filter, SERVICES_ROOT, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');
    var ref = new Firebase(SERVICES_ROOT);
    var auth = $firebaseAuth(ref);

    $scope.login = function (user) {
      if (!user || !user.email || !user.password) {
        var errorTitle = $translate('LOGIN_ERROR_TITLE');
        var errorMsg = $translate('LOGIN_FORM_INCOMPLETE');
        showErrorAlert(errorTitle, errorMsg);
        return;
      }

      console.log("Logging in with email: ", user.email);
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });


      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function (authData) {
        console.log("Logged in as:" + authData.uid);
        $rootScope.authData = authData;

        ref.child("users").child(authData.uid).once('value', function (userInfoSnapshot) {
          var val = userInfoSnapshot.val();
          // To Update AngularJS $scope either use $apply or $timeout
          $scope.$apply(function () {
            $rootScope.displayName = val;
          });
        });
        $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});
      }).catch(function (error) {
        console.log("Error logging in: ", error.message);

        var errorTitle = $translate('LOGIN_ERROR_TITLE');
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