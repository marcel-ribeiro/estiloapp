angular.module('translate.controller', ['core.constants'])

  .controller('translate.controller', function ($scope, $translate, LOCALES) {
    $scope.switchLanguage = function (key) {
      $translate.use(key);
    };

    $scope.locales = LOCALES;
  });
