angular.module('signup.service', [])
  .service('SignupService', function ($q, $http, SERVICES_ROOT) {
    //var ref = new Firebase(SERVICES_ROOT);
    //var auth = $firebaseAuth(ref);
    //
    //$scope.signup = function (user) {
    //  console.log("Create User Function called");
    //  if (user && user.email && user.password && user.name) {
    //    $ionicLoading.show({
    //      template: 'Signing Up...'
    //    });
    //
    //    auth.$createUser({
    //      email: user.email,
    //      password: user.password
    //    }).then(function (userData) {
    //      alert("User created successfully!");
    //      ref.child("users").child(userData.uid).set({
    //        email: user.email,
    //        displayName: user.displayname
    //      });
    //      $ionicLoading.hide();
    //      $scope.modal.hide();
    //    }).catch(function (error) {
    //      alert("Error: " + error);
    //      $ionicLoading.hide();
    //    });
    //  } else
    //    alert("Please fill all details");
    //}
    //
    //
    //ref.createUser({
    //  email: "bobtony@firebase.com",
    //  password: "correcthorsebatterystaple"
    //}, function (error, userData) {
    //  if (error) {
    //    console.log("Error creating user:", error);
    //  } else {
    //    console.log("Successfully created user account with uid:", userData.uid);
    //  }
    //});

  });

