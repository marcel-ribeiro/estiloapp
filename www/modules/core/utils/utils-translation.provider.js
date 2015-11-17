angular.module('core.utils.translation', [])
  .service('translationService', function ($filter) {
    var $translate = $filter('translate');

    this.getErrorMsg = function (error) {
      var errorMsg = $translate(error.code);

      if (!errorMsg && error) {
        errorMsg = error.message;
      }
      return errorMsg;
    };

    this.translate = function (key, alternativeValue){
      var translation = $translate(key);

      if (!translation) {
        translation = alternativeValue;
      }
      return translation;
    }
  });