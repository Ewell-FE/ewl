import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
// const sharePatch = require('@module-federation/nextjs-mf/patchSharing');
export default class MyDocument extends Document {

    static async getInitialProps(ctx){
        // Resolution order
        //
        // On the server:
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. document.getInitialProps
        // 4. app.render
        // 5. page.render
        // 6. document.render
        //
        // On the server with error:
        // 1. document.getInitialProps
        // 2. app.render
        // 3. page.render
        // 4. document.render
        //
        // On the client
        // 1. app.getInitialProps
        // 2. page.getInitialProps
        // 3. app.render
        // 4. page.render

        // Render app and page and get the context of the page with collected side effects.
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        };
    }

    render() {
        return (
            <Html lang="en">
            <Head>
                <script
                    src="/static/umd/react.development.js"
                />
                <script
                    async
                    src="http://localhost:3000/_next/static/remoteEntryMerged.js"
                />
                <script
                    async
                    src="http://localhost:3001/_next/static/remoteEntryMerged.js"
                />

            </Head>
            <body style={{textAlign: 'center'}}>
            <Main/>
            <NextScript/>
            </body>
            </Html>
        );
    }
}
