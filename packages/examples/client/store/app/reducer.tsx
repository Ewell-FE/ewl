import {produce} from 'immer';

const initState = {
    router: {},
    apollo: {}
};
export default (state = initState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case 'APP_ROUTER_PUSH':
                draft.router = {
                    path: action.path,
                    code: ''
                };
        }
    });
