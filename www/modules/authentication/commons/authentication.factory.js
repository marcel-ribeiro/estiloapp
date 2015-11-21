angular.module('authentication.factory', [])
  .factory('AuthenticationFactory', function($firebaseAuth, firebaseFactory){
    return $firebaseAuth(firebaseFactory);
  });