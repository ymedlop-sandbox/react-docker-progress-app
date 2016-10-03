import fetch from 'isomorphic-fetch';
import {constants} from '../constants';
import {provider} from '../provider';

export const requestGET = () => ({
    type: constants.tagsActions.TAGS_SEARCH_REQ
});

export const responseGET = (response) => ({
    type: constants.tagsActions.TAGS_SEARCH_RES,
    tags: response.tags,
    repository: response.name
});

export function list(repository) {
    return dispatch => {
        dispatch(requestGET());
        return fetch(`${document.location.origin}/v2/${repository}/tags/list`, provider.request.configuration)
            .then(response => provider.response.prepare(response))
            .then(response => provider.response.execute(response, dispatch, 'GET', responseGET));
    };
}