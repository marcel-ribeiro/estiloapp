angular.module('authentication.service', [])

  .service('authenticationService', function (authenticationFactory, firebaseFactory) {
    this.loginWithEmail = function (user) {
      return authenticateWithPassword(user);
    };

    this.signupWithEmail = function (user) {
      return createUser(user)
        .then(function (userData) {
          return updateNewUser(user, userData);
        }).then(function () {
          return authenticateWithPassword(user);
        });
    };

    this.resetPassword = function (user) {
      return restPassword(user);
    };

    /*
    * Invokes the rest call to create a new user
    * */
    var createUser = function (user) {
      console.log("Creating user with email: ", user.email);
      return authenticationFactory.$createUser({
        email: user.email,
        password: user.password
      });
    };

    /*
    * Updates the user that was recently created (should be used for the signup only)
    * */
    var updateNewUser = function (user, userData) {
      console.log("Updating user with uid: ", userData.uid);
      return firebaseFactory.child("users").child(userData.uid).set({
        email: user.email,
        name: user.name
      })
    };

    /*
    * Invokes the rest call to authenticate a user with email and password
    * */
    var authenticateWithPassword = function (user) {
      console.log("Authenticating user with email: ", user.email);
      return authenticationFactory.$authWithPassword({
        email: user.email,
        password: user.password
      });
    };

    /*
    * Invokes the rest call that sends an email to the user to reset the password
    * */
    var restPassword = function(user){
      console.log("Resetting password for user with email: ", user.email);
      return authenticationFactory.$resetPassword({
        email: user.email
      })
    }


  });