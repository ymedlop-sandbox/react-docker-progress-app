import fetch from 'isomorphic-fetch';
import {constants} from '../constants';
import {provider} from '../provider';

export const requestGET = () => ({
    type: constants.catalogActions.CATALOG_SEARCH_REQ
});

export const responseGET = (response) => ({
    type: constants.catalogActions.CATALOG_SEARCH_RES,
    repositories: response.repositories
});

export function list() {
    const url = `${document.location.origin}/v2/_catalog`;

    return dispatch => {
        dispatch(requestGET());
        
        caches.match(url)
            .then((response) => {
                if (response) {
                    const jsonPromise = response.json();
                    jsonPromise.then(response => dispatch(responseGET(response)));
                }
            });
        
        return fetch(url, provider.request.configuration)
            .then(response => provider.response.prepare(response))
            .then(response => provider.response.execute(response, dispatch, 'GET', responseGET));
    };
}