angular.module('core.factory', [])
  .factory('FirebaseFactory', function(SERVICES_ROOT){
    var ref = new Firebase(SERVICES_ROOT);
    return ref;
  });