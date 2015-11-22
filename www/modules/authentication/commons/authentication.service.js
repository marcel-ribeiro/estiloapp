angular.module('authentication.service', [])
  .service('AuthenticationService', function ($q, AuthenticationFactory, FirebaseFactory) {

    this.onAuth = function (authDataCallback) {
      FirebaseFactory.onAuth(authDataCallback);
    };

    /*
     * Public method invoked to log the user in with email and password
     * */
    this.loginWithEmail = function (user) {
      return authenticateWithPassword(user);
    };

    /*
     * Public method invoked to log the user in with 3party providers (facebook, google, etc)
     * */
    this.authenticateWithProvider = function (provider) {
      return asyncAuthenticateWithProvider(provider);
    };

    function asyncAuthenticateWithProvider(provider) {
      return $q(function (resolve, reject) {
        AuthenticationFactory.$authWithOAuthRedirect(provider)
          .then(function (authData) {
            console.log("Authenticated successfully with redirect: ", authData);
            resolve("Authenticated successfully with redirect:", authData);
          }).catch(function (error) {
            if (error.code === 'TRANSPORT_UNAVAILABLE') {
              AuthenticationFactory.$authWithOAuthPopup(provider)
                .then(function (authData) {
                  console.log("Authenticated successfully with popup: ", authData);
                  resolve("Authenticated successfully with popup: ", authData);
                }).catch(function (error) {
                  console.log("Unable to authenticate with popup:", error);
                  reject("Unable to authenticate with popup:", error);
                });
            } else {
              console.log("Unable to authenticate with redirect:", error);
              reject("Unable to authenticate with redirect:", error);
            }
          });
      });
    };

    /*
     * Public method invoked to signup the user with email and password
     * */
    this.signupWithEmail = function (user) {
      return createUser(user)
        .then(function (userData) {
          return updateNewUser(user, userData);
        }).then(function () {
          return authenticateWithPassword(user);
        });
    };

    /*
     * Public method invoked to request the user password reset
     * */
    this.resetPassword = function (user) {
      return restPassword(user);
    };


    /*
     * Public method invoked to update the user information after authentication
     * */
    this.updateNewUser = function (user, userData) {
      return updateNewUser(user, userData);
    };

    /*
     * Invokes the rest call to create a new user
     * */
    var createUser = function (user) {
      console.log("Creating user with email: ", user.email);
      return AuthenticationFactory.$createUser({
        email: user.email,
        password: user.password
      });
    };


    /*
     * Invokes the rest call to authenticate a user with email and password
     * */
    var authenticateWithPassword = function (user) {
      console.log("Authenticating user with email: ", user.email);
      return AuthenticationFactory.$authWithPassword({
        email: user.email,
        password: user.password
      });
    };

    /*
     * Updates the newly created user
     * */
    var updateNewUser = function (user, userData) {
      if (!isValidUserInfo(user)) {
        return;
      }
      console.log("Updating user with uid: ", userData.uid);
      return FirebaseFactory.child("users").child(userData.uid).set({
        email: user.email,
        name: user.name,
        authenticationType: user.authenticationType
      })
    };

    /*
     * Validates the information provided to update the user
     * */
    function isValidUserInfo(user) {
      return user.email && user.name && user.authenticationType;
    }


    /*
     * Invokes the rest call that sends an email to the user to reset the password
     * */
    var restPassword = function (user) {
      console.log("Resetting password for user with email: ", user.email);
      return AuthenticationFactory.$resetPassword({
        email: user.email
      })
    }
  });