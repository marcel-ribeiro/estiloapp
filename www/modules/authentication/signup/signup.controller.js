angular.module('signup.controller', [
  'firebase'
])

  .controller('signupController', function ($scope, $ionicModal, $state, $firebaseAuth, $ionicLoading, SignupService, SERVICES_ROOT) {
    $scope.data = {};
    var ref = new Firebase(SERVICES_ROOT);
    var auth = $firebaseAuth(ref);

    $scope.signup = function (user) {
      console.log("Signup with name:" + user.name + "; email=" + user.email + "; pass=" + user.password);

      if (user && user.email && user.password && user.name) {
        $ionicLoading.show({
          template: 'Signing Up...'
        });

        auth.$createUser({
          email: user.email,
          password: user.password
        }).then(function (userData) {
          alert("User created successfully!");
          ref.child("users").child(userData.uid).set({
            email: user.email,
            name: user.name
          });

          $ionicLoading.hide();
          $state.go(APP_DEFAULT_ROUTE, {}, {reload: true});

        }).catch(function (error) {
          alert("Error: " + error);
          $ionicLoading.hide();
        });
      } else {
        alert("Please fill all details");
      }
    }
  });