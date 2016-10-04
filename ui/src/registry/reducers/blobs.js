import { Map } from 'immutable';
import {constants} from '../constants';

const initialState = Map({
    isFetching: false
});

export default function (state = initialState, action={}) {
    switch (action.type) {

        case constants.blobsActions.BLOBS_SEARCH_REQ:
            return Map(Object.assign(state.toObject(), { isFetching: true }));

        case constants.blobsActions.BLOBS_SEARCH_RES:

            const value = {};
            value[action.repository] = {};
            value[action.repository][action.tag] = {
                labels: action.labels,
                history: action.history
            };

            return Map(Object.assign(state.toObject(), value, { isFetching: false }));
    }

    return state;
}
