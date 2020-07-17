import {combineEpics, ofType} from 'redux-observable';
import {rootEpic} from './demo/epics';

export default combineEpics(rootEpic);
