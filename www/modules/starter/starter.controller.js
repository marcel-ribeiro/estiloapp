angular.module('starter.controller', ['core.constants'])

  .controller('FriendsController', function ($scope) {
    $scope.friends = [
      {title: 'John doe', id: 1},
      {title: 'Joe schmo', id: 2},
      {title: 'Khalilah Pitre ', id: 3},
      {title: 'Sommer Pierre', id: 4},
      {title: 'Willis Devivo', id: 5},
      {title: 'Nubia Lecompte', id: 6}
    ];
  });

