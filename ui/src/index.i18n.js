import {addLocaleData} from 'react-intl';
import {actions as Actions} from './actions';

export const initI18n = (store) => {

    // Load && Cache React Intl Lang!!
    addLocaleData(require('react-intl/locale-data/en'));
    addLocaleData(require('react-intl/locale-data/es'));

    // Get Browser Locale
    // https://alicoding.com/detect-browser-language-preference-in-firefox-and-chrome-using-javascript/
    const locale = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
    let lang = {locale: 'en', messages: require('./assets/lang/en-US.json')};

    switch (locale.split('-')[0]) {
        case 'es':
            lang = {locale: 'es', messages: require('./assets/lang/es-ES.json')};
            break;
    }

    store.dispatch(Actions.i18nActions.set(lang));
};