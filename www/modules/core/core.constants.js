angular.module('core.constants', [])

  //Translate
  .constant('PREFIX_LOCALES', 'modules/core/locales/')
  .constant('SUFFIX_LOCALES', '.json')
  .constant('LOCALES', {
    'en': 'en', 'en_GB': 'en', 'en_US': 'en',
    'pt': 'pt', 'pt_BR': 'pt', 'pt_PT': 'pt',
    'de': 'de', 'de_DE': 'de', 'de_CH': 'de'
  })

  .constant('SERVICES_ROOT', 'https://shining-torch-7795.firebaseio.com')

  .constant('APP_DEFAULT_ROUTE', 'app.playlists');
