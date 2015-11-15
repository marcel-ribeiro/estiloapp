angular.module('authentication.factory', [])
  .factory('authenticationFactory', function($firebaseAuth, SERVICES_ROOT){
    var ref = new Firebase(SERVICES_ROOT);
    return $firebaseAuth(ref);
  })