angular.module('translate.controller', ['core.constants'])

  .controller('TranslateController', function ($scope, $translate, LOCALES) {
    $scope.switchLanguage = function (key) {
      $translate.use(key);
    };

    $scope.locales = LOCALES;
  });
