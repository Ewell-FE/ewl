import {combineReducers} from 'redux';
import reducer from './demo/reducer';

export default function createReducer(asyncReducers = {}) {
    const reducers = {
        demo: reducer,
        ...asyncReducers
    };
    return combineReducers(reducers);
}
