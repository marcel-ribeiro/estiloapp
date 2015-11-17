angular.module('login.controller', [])


  .controller('loginController', function ($scope, $rootScope, $state, $ionicLoading, $filter, firebaseFactory, authenticationFactory, popupService, APP_DEFAULT_ROUTE) {
    var $translate = $filter('translate');

    $scope.login = function (user) {
      if (!user || !user.email || !user.password) {
        var errorTitle = $translate('LOGIN.ERROR_TITLE');
        var errorMsg = $translate('LOGIN.FORM_INCOMPLETE');
        popupService.displayAlertPopup(errorTitle, errorMsg);
        return;
      }

      console.log("Logging in with email: ", user.email);
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>',
        hideOnStageChange: true
      });


      authenticationFactory.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function (authData) {
        console.log("Logged in as: " + authData.uid);

        $rootScope.currentAuthData = authData;

        firebaseFactory.child("users").child(authData.uid).once('value', function (snapshot) {
          var userData = snapshot.val();
          // To Update AngularJS $scope either use $apply or $timeout
          $scope.$apply(function () {
            $rootScope.currentUser = userData;
          });
        });

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


  });