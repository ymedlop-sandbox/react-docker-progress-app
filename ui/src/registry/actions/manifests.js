import fetch from 'isomorphic-fetch';
import {constants} from '../constants';
import {provider} from '../provider';

export const requestGET = () => ({
    type: constants.manifestsActions.MANIFESTS_SEARCH_REQ
});

export const responseGET = (response, repository, tag, digest) => ({
    type: constants.manifestsActions.MANIFESTS_SEARCH_RES,
    config_digest: response.config.digest,
    headers: response.headers,
    repository,
    tag,
    digest
});

export function manifest(repository, tag) {

    const trickyGetResponse = (response, headers) => {
        return responseGET(
            response, 
            repository, 
            tag, 
            headers.get('docker-content-digest')
        );
    };
    
    return dispatch => {
        dispatch(requestGET());
        return fetch(`${document.location.origin}/v2/${repository}/manifests/${tag}`, provider.request.configuration)
            .then(response => provider.response.prepare(response))
            .then(response => provider.response.execute(response, dispatch, 'GET', trickyGetResponse));
    };
}

export const requestDELETE = () => ({
    type: constants.manifestsActions.MANIFESTS_DELETE_REQ
});

export const responseDELETE = (response, repository, tag) => ({
    type: constants.manifestsActions.MANIFESTS_DELETE_RES,
    repository,
    tag
});

export function deleteTag(repository, tag, digest) {

    const trickyGetResponse = (response) => {
        return responseDELETE(
            response,
            repository,
            tag
        );
    };

    return dispatch => {
        const config = {
            credentials: provider.request.configuration.credentials,
            headers: provider.request.configuration.headers,
            method: 'DELETE'
        };
        dispatch(requestDELETE());
        return fetch(`${document.location.origin}/v2/${repository}/manifests/${digest}`, config)
            .then(response => provider.response.prepare(response))
            .then(response => provider.response.execute(response, dispatch, 'DELETE', trickyGetResponse));
    };
}