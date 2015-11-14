angular.module('core', [
  'ionic',
  'pascalprecht.translate',
  'translate',
  'signup',
  'login',
  'core.constants',
  'core.controller'
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

  .config(function ($ionicConfigProvider, $translateProvider, PREFIX_LOCALES, SUFFIX_LOCALES, LOCALES) {

    $translateProvider
      .useStaticFilesLoader({
        prefix: PREFIX_LOCALES,
        suffix: SUFFIX_LOCALES
      })
      .registerAvailableLanguageKeys(['en', 'pt', 'de'], LOCALES)
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'modules/authentication/welcome/welcome.html',
        controller: 'core.controller',
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
        templateUrl: 'modules/core/menu.html',
        controller: 'core.controller'
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
            controller: 'PlaylistsCtrl'
          }
        }
      })

      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/welcome');
  });
