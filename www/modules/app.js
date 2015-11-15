angular.module('app', [
  'core',
  'authentication',
  'signup',
  'login',
  'starter'
])

  .run(function ($ionicPlatform, $rootScope, $location, $ionicLoading, authenticationFactory) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }


      //authenticationFactory.$onAuth(function (authData) {
      //  if (authData) {
      //    console.log("Logged in as: ", authData.uid);
      //  } else {
      //    console.log("Logged out");
      //    $ionicLoading.hide();
      //    $location.path('/welcome');
      //  }
      //});
      //
      //$rootScope.logout = function () {
      //  console.log("Logging out from the app");
      //  $ionicLoading.show({
      //    template: 'Logging Out...'
      //  });
      //  authenticationFactory.$unauth();
      //};
      //
      //
      //$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
      //  // We can catch the error thrown when the $requireAuth promise is rejected
      //  // and redirect the user back to the home page
      //  if (error === "AUTH_REQUIRED") {
      //    $location.path("/signup");
      //  }
      //});

    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'modules/authentication/welcome/welcome.html',
        authStatus: false
      })

      .state('login', {
        url: '/login',
        templateUrl: 'modules/authentication/login/login.html',
        controller: 'loginController',
        authStatus: false
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'modules/authentication/signup/signup.html',
        controller: 'signupController',
        authStatus: false
      })

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'modules/core/menu.html'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/search.html'
          }
        }
      })

      .state('app.translate', {
        url: '/translate',
        views: {
          'menuContent': {
            templateUrl: 'modules/translate/translate.html',
            controller: 'translate.controller'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/playlists.html',
            controller: 'playlistsController',
            resolve: {
              "currentAuth": ["authenticationFactory",
                function (authenticationFactory) {
                  return authenticationFactory.$requireAuth();
                }]
            }
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/playlist.html'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');
  });