import React from 'react';
import {connect} from 'react-redux';
import Bundle from './bundle';

class RouterComponents extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            page: props.router.path ? this.loadPage(props) : null
        };
    }

    loadPage(props) {
        return (
            <Bundle key={props.router.path} path={props.router.path}>
                {Container => <Container {...props} />}
            </Bundle>
        );
    }

    componentWillReceiveProps(nextProps: Readonly<any>, nextContext: any): void {
        if (this.props.router.path !== nextProps.router.path) {
            this.setState({
                page: this.loadPage(nextProps)
            });
        }
    }

    render(): React.ReactNode {
        return this.state.page;
    }
}

const mapStateToProps = state => {
    return {
        router: state.appReducer.router
    };
};
export default connect(mapStateToProps)(RouterComponents);

export function toPage(url) {
    // todo: 打开tab页面
    // todo: loading页面组件
}
