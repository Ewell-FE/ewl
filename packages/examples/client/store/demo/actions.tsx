import * as types from './actionTypes'

export const pang = () => ({
  type: "PING",
})

export const startFetchingCharacters = () => ({
  type: types.START_FETCHING_CHARACTERS,
})
export const stopFetchingCharacters = () => ({
  type: types.STOP_FETCHING_CHARACTERS,
})
export const fetchCharacter = (isServer = false) => {
    return ({
        type: types.FETCH_CHARACTER,
        payload: { isServer },
    })
}
export const fetchCharacterSuccess = (response, isServer) => ({
  type: types.FETCH_CHARACTER_SUCCESS,
  payload: { response, isServer },
})

export const fetchCharacterFailure = (error, isServer) => ({
  type: types.FETCH_CHARACTER_FAILURE,
  payload: { error, isServer },
})
