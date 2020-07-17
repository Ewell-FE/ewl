import * as types from './actionTypes';

const INITIAL_STATE = {
    isPinging: "ping",
    nextCharacterId: 1,
    character: {},
    isFetchedOnServer: false,
    error: null
};

export default function reducer(state = INITIAL_STATE, {type, payload}) {
    switch (type) {
        case types.FETCH_CHARACTER_SUCCESS:
            return {
                ...state,
                character: payload.response,
                isFetchedOnServer: payload.isServer,
                nextCharacterId: state.nextCharacterId + 1
            };
        case types.FETCH_CHARACTER_FAILURE:
            return {
                ...state,
                error: payload.error,
                isFetchedOnServer: payload.isServer
            };
        case 'PING':
            return {
                ...state,
                isPinging: "PING"
            };
        case 'PONG':
            return {
                ...state,
                isPinging: "PONG"
            };
        default:
            return state;
    }
}
