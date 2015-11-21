angular.module('core.utils.popup', [])

  .service('PopupService', function ($ionicPopup, $cordovaToast) {

    this.displayCordovaToast = function (title, msg) {
      try {
        $cordovaToast.showLongBottom(msg)
          .then(function (success) {
            // Do something on success
          }, function (error) {
            // Handle error
          });
      } catch (e) {
        this.displayAlertPopup(title, msg);
      }
    };

    /*
     * Displays the alert with the error messages
     * */
    this.displayAlertPopup = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg,
        buttons: [{
          text: 'OK',
          type: 'button-royal'
        }]
      });
      alertPopup.then(function (res) {
        console.log(msg);
      });
    };
  });
