import React from 'react';
import {connect} from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Markdown from 'markdown-to-jsx';
import readme from '../../README.md';
import Link from '~/client/lib/Link';
import axios from 'axios';

class Docs extends React.Component<any> {
    static async getInitialProps(ctx) {
        let obj;
        try {
            obj = await axios.get('http://localhost:3002/static/datasource/catList.json');
        } catch (e) {
            console.error(e.message);
        }
        return {catList: obj.data};
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <Container maxWidth="sm">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Next.js with TypeScript example
                    </Typography>
                    <Link href="/docs2" color="secondary">
                        Go to the docs2 page
                    </Link>
                    <ul>
                        {this.props.catList.map(function(item) {
                            return (
                                <li key={item.age}>
                                    {item.name}:{item.age}
                                </li>
                            );
                        })}
                    </ul>
                    <Markdown children={readme} />
                </Box>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    docs: state.docs
});
export default connect(mapStateToProps)(Docs);
