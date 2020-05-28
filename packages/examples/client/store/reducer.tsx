import {combineReducers} from 'redux';
export const exampleInitialState: object = {};

export default function createReducer(asyncReducers) {
    const reducers = {
        ...asyncReducers
    };
    return combineReducers(reducers);
}
