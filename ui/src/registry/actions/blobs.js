import fetch from 'isomorphic-fetch';
import {constants} from '../constants';
import {provider} from '../provider';

export const requestGET = () => ({
    type: constants.blobsActions.BLOBS_SEARCH_REQ
});

export const responseGET = (response, repository, tag) => ({
    type: constants.blobsActions.BLOBS_SEARCH_RES,
    labels: response.config.Labels,
    history: response.history,
    repository,
    tag
});

export function getBlob(repository, tag, digest) {
    
    const trickyGetResponse = (response) => {
        return responseGET(
            response,
            repository,
            tag
        );
    };

    const config = {
        credentials: provider.request.configuration.credentials,
        headers: provider.request.configuration.headers
        //mode: 'no-cors'
    };

    return dispatch => {
        dispatch(requestGET());
        return fetch(`${document.location.origin}/v2/${repository}/blobs/${digest}`, config)
            .then(response => provider.response.prepare(response))
            .then(response => provider.response.execute(response, dispatch, 'GET', trickyGetResponse));
    };
}