import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
// const sharePatch = require('@module-federation/nextjs-mf/patchSharing');
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
            <Head>
                <script
                async
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
