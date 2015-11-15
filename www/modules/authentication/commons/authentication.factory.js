angular.module('authentication.factory', [])
  .factory('authenticationFactory', function($firebaseAuth, firebaseFactory){
    return $firebaseAuth(firebaseFactory);
  });