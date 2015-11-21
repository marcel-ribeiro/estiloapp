angular.module('authentication.factory', [])
  .factory('AuthenticationFactory', function($firebaseAuth, FirebaseFactory){
    return $firebaseAuth(FirebaseFactory);
  });