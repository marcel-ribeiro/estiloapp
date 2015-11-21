angular.module('app', [
  'core',
  'authentication',
  'signup',
  'login',
  'forgotpass',
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
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'modules/authentication/welcome/welcome.html'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'modules/authentication/login/login.html',
        controller: 'LoginController'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'modules/authentication/signup/signup.html',
        controller: 'SignupController'
      })

      .state('forgotpass', {
        url: '/forgotpass',
        templateUrl: 'modules/authentication/forgotpass/forgotpass.html',
        controller: 'ForgotpassController'
      })

      //Application per say
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'modules/core/menu.html'
      })

      .state('app.search', {
        url: '/search',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/search.html',
            resolve: {
              "currentAuth": requireAuth
            }
          }
        }
      })

      .state('app.translate', {
        url: '/translate',
        views: {
          'menuContent': {
            templateUrl: 'modules/translate/translate.html',
            controller: 'translate.controller',
            resolve: {
              "currentAuth": requireAuth
            }
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
              "currentAuth": requireAuth
            }
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/playlist.html',
            resolve: {
              "currentAuth": requireAuth
            }
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');


    function requireAuth(authenticationFactory) {
      return authenticationFactory.$requireAuth();
    }

  });