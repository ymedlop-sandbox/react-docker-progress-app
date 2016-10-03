import {constants} from '../constants';

export const set = (state) => ({
    type: constants.i18nActions.I18N_SET_STATE,
    state
});