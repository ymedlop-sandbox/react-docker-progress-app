import React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Root} from './components';
import {RegistryRedux} from './registry';

const routes =
    <Route path="/" component={Root}>
        <IndexRoute component={RegistryRedux.RegistryComponents.Catalog} />
    </Route>
;

export function buildRouter(store) {
    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(hashHistory, store);
    return <Router history={history}>{routes}</Router>;
}