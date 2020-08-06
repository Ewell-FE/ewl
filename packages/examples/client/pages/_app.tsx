import React from 'react';
import App from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../lib/onepirate/modules/theme';
import initStore from '../store/createStore';
import withRedux from 'next-redux-wrapper';
import {Provider} from 'react-redux';

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }

    render() {
        const props: any = this.props;

        return (
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Provider store={props.store}>
                    <props.Component {...props.pageProps} />
                </Provider>
            </ThemeProvider>
        );
    }
}

export default withRedux(initStore)(MyApp);
