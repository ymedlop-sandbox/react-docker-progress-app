import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import i18nReducer from './i18n';
import {RegistryRedux} from '../registry';

const rootReducer = combineReducers({
   intl: i18nReducer,
   registry: RegistryRedux.registryReducer,
   routing: routerReducer
});

export default rootReducer;
