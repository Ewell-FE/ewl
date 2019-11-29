import * as React from 'react';
export default class Button extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <button>{this.props.children}</button>;
    }
}
