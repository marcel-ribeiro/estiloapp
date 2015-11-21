angular.module('translate', [
  'pascalprecht.translate',
  'translate.constants',
  'translate.controller'
])

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