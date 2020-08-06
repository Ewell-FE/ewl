import * as React from 'react';
import {styled} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const EwlButton = styled(Button)({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 30,
    padding: '0 30px'
});

export default class ButtonComponent extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <EwlButton {...this.props}>{this.props.children}</EwlButton>;
    }
}
