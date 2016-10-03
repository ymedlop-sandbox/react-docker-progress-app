import { Map } from 'immutable';
import {constants} from '../constants';

const initialState = Map({
    isFetching: false
});

export default function (state = initialState, action={}) {
    switch (action.type) {

        case constants.manifestsActions.MANIFESTS_SEARCH_REQ:
            return Map({
                isFetching: true,
                repositories: state.get('repositories')
            });

        case constants.manifestsActions.MANIFESTS_SEARCH_RES:
            
            const value = {};
            value[action.repository] = {};
            value[action.repository][action.tag] = {
                config_digest: action.config_digest,
                digest: action.digest
            };

            return Map(Object.assign(state.toObject(), value, { isFetching: false }));
    }

    return state;
}
