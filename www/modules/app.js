angular.module('app', [
  'core',
  'authentication',
  'welcome',
  'signup',
  'login',
  'forgotpass',
  'starter'
])

  .run(function ($ionicPlatform, $rootScope, $location, $ionicLoading, AuthenticationFactory) {
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
        controller: 'WelcomeController'
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

      .state('app.give-feedback', {
        url: '/give-feedback',
        views: {
          'menuContent': {
            templateUrl: 'modules/give-feedback/give-feedback.html',
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
            controller: 'TranslateController',
            resolve: {
              "currentAuth": requireAuth
            }
          }
        }
      })
      .state('app.friends', {
        url: '/friends',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/friends.html',
            controller: 'FriendsController',
            resolve: {
              "currentAuth": requireAuth
            }
          }
        }
      })

      .state('app.friend', {
        url: '/friends/:firendId',
        views: {
          'menuContent': {
            templateUrl: 'modules/starter/friend.html',
            resolve: {
              "currentAuth": requireAuth
            }
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/give-feedback');


    function requireAuth(AuthenticationFactory) {
      return AuthenticationFactory.$requireAuth();
    }

  });