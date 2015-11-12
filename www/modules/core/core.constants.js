angular.module('core.constants', [])
  .constant('DEFAULT_STATE_AUTHENTICATED', 'app.playlists')

  //Translate
  .constant('PREFIX_LOCALES', 'modules/core/locales/')
  .constant('SUFFIX_LOCALES', '.json')
  .constant('LOCALES', {
    'en': 'en', 'en_GB': 'en', 'en_US': 'en',
    'pt': 'pt', 'pt_BR': 'pt', 'pt_PT': 'pt',
    'de': 'de', 'de_DE': 'de', 'de_CH': 'de'
  });
