import {hashHistory} from 'react-router';
import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware } from 'react-router-redux';

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    if (!console.group) {
        return rawDispatch;
    }
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

export const configureStore = function (initialState) {

    const store = createStore(
        initialState,
        compose(
            // Redux Thunk
            applyMiddleware(thunk),
            // Redux React Router
            applyMiddleware(routerMiddleware(hashHistory)),
            // Redux Chrome Extension
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
};