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
import dynamic from 'next/dynamic';

// const RemoteTitle = dynamic(import('next1/exposedTitle'), {ssr: false});
// const RemoteNav = dynamic(import('next2/exposedTitle'), {ssr: false});

// class IndexPage extends Component<any, any> {
//     static async getInitialProps({store, isServer}) {
//         // const state$ = new StateObservable(new Subject(), store.getState());
//         // const resultAction = await rootEpic(
//         //     of(actions.fetchCharacter(isServer)),
//         //     state$
//         // ).toPromise(); // we need to convert Observable to Promise
//         // store.dispatch(resultAction);
//         store.dispatch({
//             type: 'PING'
//         });
//         return {isServer};
//     }
//
//     render() {
//         return (
//             <div>
//                 <h1>Index Page</h1>
//                 <p>this is module federation , the module comes from nextjs project of module-federation-examples </p>
//                 <RemoteTitle/>
//                 <Link href="/other">
//                     <a>Get back to "/other"</a>
//                 </Link>
//             </div>
//         );
//     }
// }
// export default IndexPage


//
//
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
                <p>The module comes from nextjs/next1 </p>
                {/*<RemoteTitle/>*/}
                <p>The module comes from nextjs/next2 </p>
                {/*<RemoteNav/>*/}
                <nav>
                    <Link href="/other">
                        <a>Navigate to "/other22"</a>
                    </Link>
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
