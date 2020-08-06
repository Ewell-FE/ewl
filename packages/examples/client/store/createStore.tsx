import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension';
import createReducer from './reducer';
import rootEpic from './epics';

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export default function initStore(initialState) {
    const epicMiddleware = createEpicMiddleware();
    let store: any = createStore(
        createReducer(),
        initialState,
        bindMiddleware([epicMiddleware])
    );
    epicMiddleware.run(rootEpic);

    return store;
}
