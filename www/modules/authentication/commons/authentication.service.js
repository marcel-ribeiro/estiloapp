angular.module('authentication.service', [])

  .service('authenticationService', function (authenticationFactory, firebaseFactory) {
    this.loginWithEmail = function (user) {
      return authenticateWithPassword(user);
    };

    this.signupWithEmail = function (user) {
      return createUser(user)
        .then(function (userData) {
          console.log("User created with uid: ", userData.uid);
          return updateNewUser(user, userData);
        }).then(function () {
          console.log("Authenticating user: ", user.email);
          return authenticateWithPassword(user);
        });
    };

    /*
    * Invokes the rest call to create a new user
    * */
    var createUser = function (user) {
      return authenticationFactory.$createUser({
        email: user.email,
        password: user.password
      });
    };

    /*
    * Updates the user that was recently created (should be used for the signup only)
    * */
    var updateNewUser = function (user, userData) {
      return firebaseFactory.child("users").child(userData.uid).set({
        email: user.email,
        name: user.name
      })
    };

    /*
    * Invokes the rest call to authenticate a user with email and password
    * */
    var authenticateWithPassword = function (user) {
      return authenticationFactory.$authWithPassword({
        email: user.email,
        password: user.password
      });
    };

  });