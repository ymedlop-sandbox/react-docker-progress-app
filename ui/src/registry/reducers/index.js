import { combineReducers } from 'redux';
import catalog from './catalog';
import blobs from './blobs';
import manifests from './manifests';
import tags from './tags';

export const registryReducer = combineReducers({
    catalog,
    blobs,
    manifests,
    tags
});