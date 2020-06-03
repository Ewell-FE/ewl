import * as React from 'react';

let ReduxContext: any = null;

const isServer = typeof window === 'undefined';

if (!isServer && window.parent['redux_context']) {
    ReduxContext = window.parent['redux_context'];
} else {
    ReduxContext = React.createContext({});
}

export {ReduxContext};
