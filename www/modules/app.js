angular.module('app', [
  'core',
  'signup',
  'login',
  'starter',
  'core.constants',
  'core.factory'
])

  .run(function ($ionicPlatform) {
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
            controller: 'playlistsController'
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
