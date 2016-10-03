import {RegistryActions} from './actions';
import {RegistryComponents} from './components';
import {registryReducer} from './reducers';

const modules = {
    registryReducer,
    RegistryActions,
    RegistryComponents
};

export const RegistryRedux = modules;
