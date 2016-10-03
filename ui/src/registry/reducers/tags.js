import _ from 'lodash';
import { Map } from 'immutable';
import {constants} from '../constants';

const initialState = Map({
    repositories: {}
});

export default function (state = initialState, action={}) {
    
    let repositories;
    
    switch (action.type) {

        case constants.tagsActions.TAGS_SEARCH_REQ:
            return Map({
                isFetching: true,
                repositories: state.get('repositories')
            });

        case constants.tagsActions.TAGS_SEARCH_RES:

            const value = {};
            value[action.repository] = action.tags;

            return Map(Object.assign(state.toObject(), value, { isFetching: false }));

        case constants.tagsActions.MANIFESTS_DELETE_REQ:
            return Map({
                isFetching: true,
                repositories: state.get('repositories')
            });

        case constants.manifestsActions.MANIFESTS_DELETE_RES:
            repositories = state.get('repositories');

            _.remove(repositories[action.repository], (n) => { return n == action.tag; });
            
            return Map({
                isFetching: false,
                repositories: repositories
            });
    }

    return state;
}
