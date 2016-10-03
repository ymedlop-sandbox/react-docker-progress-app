// Import CSS File
import './styles/index.scss';

// Import third dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider as I18nProvider} from 'react-intl-redux';

import reducer from './reducers';
import {configureStore} from './store/configure';
import {buildRouter} from './index.route.jsx';
import {initI18n} from './index.i18n';

const store = configureStore(reducer);
initI18n(store);


const app = document.getElementById('app');

if (app) {
    
    ReactDOM.render(
        <I18nProvider store={store}>
            {buildRouter(store)}
        </I18nProvider>,
        app
    );
}