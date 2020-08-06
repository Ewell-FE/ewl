import {interval, of} from 'rxjs';
import {takeUntil, mergeMap, catchError, map, delay, mapTo} from 'rxjs/operators';
import {combineEpics, ofType} from 'redux-observable';
import {request} from 'universal-rxjs-ajax'; // because standard AjaxObservable only works in browser

import * as actions from './actions';
import * as types from './actionTypes';

export const fetchUserEpic = (action$, state$) => {
    return action$.pipe(
        ofType(types.START_FETCHING_CHARACTERS),
        mergeMap((action) => {
            return interval(2000).pipe(
                map((x) => actions.fetchCharacter()),
                takeUntil(
                    action$.ofType(
                        types.STOP_FETCHING_CHARACTERS,
                        types.FETCH_CHARACTER_FAILURE
                    )
                )
            );
        })
    );
};


export const fetchCharacterEpic = (action$, state$) => {
    return action$.pipe(
        ofType(types.FETCH_CHARACTER),
        mergeMap((action: any) => {
                return request({
                    url: `http://localhost:3002/api/app/${state$.value.demo.nextCharacterId}`,
                    method: 'Post'
                }).pipe(
                    map((response) => {
                            return actions.fetchCharacterSuccess(
                                response.response,
                                action.payload.isServer
                            );
                        }
                    ),
                    catchError((error) =>
                        of(
                            actions.fetchCharacterFailure(
                                error.xhr.response,
                                action.payload.isServer
                            )
                        )
                    )
                );
            }
        )
    );
};

const pingEpic = (action$, state$) => {
    return action$.pipe(
        ofType('PING'),
        delay(1000),
        mapTo({type: 'PONG'})
    );
};


export const rootEpic = combineEpics(fetchUserEpic, fetchCharacterEpic, pingEpic);
