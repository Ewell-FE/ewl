import {Component} from 'react';
import Link from 'next/link';
import {of, Subject, Observable} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';
import {ofType, StateObservable} from 'redux-observable';
import {connect} from 'react-redux';
import CharacterInfo from '../components/CharacterInfo';
import {rootEpic} from '../store/demo/epics';
import * as actions from '../store/demo/actions';
import {mapToClass} from '@nestjs/core/middleware/utils';
import * as axios from '../utils/axios';



class Counter extends Component<any, any> {
    static async getInitialProps({store, isServer}) {
        // const state$ = new StateObservable(new Subject(), store.getState());
        // const resultAction = await rootEpic(
        //     of(actions.fetchCharacter(isServer)),
        //     state$
        // ).toPromise(); // we need to convert Observable to Promise
        // store.dispatch(resultAction);
        store.dispatch({
            type: 'PING'
        });
        return {isServer};
    }

    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }


    componentDidMount() {
        this.props.startFetchingCharacters();
    }

    componentWillUnmount() {
        this.props.stopFetchingCharacters();
    }

    render() {
        return (
            <div>
                <h1>Index Page</h1>
                <h2>pingpingpangpang+{this.props.isPinging}</h2>
                <button onClick={e => {
                    this.props.pang();
                }}>PANG
                </button>
                <CharacterInfo/>
                <br/>
                <nav>
                    <Link href="/other">
                        <a>Navigate to "/other22"</a>
                    </Link>
                    <img width={200} height={200} src={'data:image/png;base64,' + this.state.base64}/>
                </nav>
            </div>
        );
    }
}

export default connect((state) => ({
    isPinging: state.demo.isPinging
}), {
    pang: actions.pang,
    startFetchingCharacters: actions.startFetchingCharacters,
    stopFetchingCharacters: actions.stopFetchingCharacters
})(Counter);
