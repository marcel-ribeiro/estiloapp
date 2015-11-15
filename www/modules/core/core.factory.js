angular.module('core.factory', [])
  .factory('firebaseFactory', function(SERVICES_ROOT){
    var ref = new Firebase(SERVICES_ROOT);
    return ref;
  });