import { Map } from 'immutable';
import {constants} from '../constants';

const initialState = Map({
    repositories: []
});

export default function (state = initialState, action={}) {
    switch (action.type) {

        case constants.catalogActions.CATALOG_SEARCH_REQ:
            return Map({
                isFetching: true,
                repositories: state.get('repositories')
            });

        case constants.catalogActions.CATALOG_SEARCH_RES:
            return Map({
                isFetching: false,
                repositories: action.repositories
            });
    }

    return state;
}
