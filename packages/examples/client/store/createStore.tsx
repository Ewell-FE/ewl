import {createStore, applyMiddleware} from 'redux';
import createReducer from './reducer';
import asyncModule from './asyncModule';

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

let store;

export function initStore(initState: any = null, ctx?: any) {
    const {reducers, initialState} = asyncModule(ctx, initState);

    store = createStore(
        createReducer({
            ...reducers
        }),
        initialState,
        bindMiddleware([])
    );

    store.asyncReducers = reducers;

    // saga
    store.asyncSagas = {};
    store.injectAsyncSaga = sagas => {
        if (sagas) {
            for (const key in sagas) {
                if (!store.asyncSagas[key]) {
                    store.asyncSagas[key] = sagas[key];
                    const task = store.runSagaTask(sagas[key]);
                }
            }
        }
    };

    // reducer
    store.injectAsynReducer = keyValues => {
        for (const key in keyValues) {
            if (!store.asyncReducers[key]) {
                store.asyncReducers[key] = keyValues[key];
            }
        }
        store.replaceReducer(createReducer(store.asyncReducers));
    };

    return store;
}

export default function getStore() {
    if (!store) {
        return initStore();
    }
    return store;
}
