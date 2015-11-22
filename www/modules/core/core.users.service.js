angular.module('core.users.service', [])
  .factory('UsersService', function($firebaseArray, $firebaseObject, FirebaseFactory){
    var usersRef = FirebaseFactory.child("users");
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      all: users
    };

    return Users;
  });


