import * as React from 'react';
import Button from '@material-ui/core/Button';

export default class EwlButton extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <Button {...this.props}>{this.props.children}</Button>;
    }
}
