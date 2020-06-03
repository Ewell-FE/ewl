import {createStore, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import reducer from './demo/reducer';
import {rootEpic} from './epics';


const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export default function initStore(initialState) {

    const epicMiddleware = createEpicMiddleware();
    let store: any = createStore(
        reducer,
        initialState,
        bindMiddleware([epicMiddleware])
    );

    epicMiddleware.run(rootEpic);
    return store;
}
