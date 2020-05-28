import {Component} from 'react';
import _ from 'lodash';
import getStore from '~/client/store/createStore';

interface Prop {
    children: any;

    [propName: string]: any;
}

interface State {
    [stateName: string]: any;
}

class Bundle extends Component<any, any> {
    private store: any;

    constructor(props) {
        super(props);
        this.state = {
            mod: null
        };
        this.store = getStore();
    }

    async componentDidMount() {
        const path = this.props.path;
        const modules = await import('./' + path);
        const {reducers, sagas, view} = modules;
        this.store.injectAsynReducer({[_.camelCase(path)]: reducers});
        this.store.injectAsyncSaga({[_.camelCase(path)]: sagas});
        this.setState({
            mod: view
        });
    }

    render() {
        const children: any = this.props.children;
        return this.state.mod ? children(this.state.mod) : null;
    }
}

export default Bundle;
