const initState = {
    uuheader: {}
};
export default (state = initState, action) => {
    switch (action.type) {
        case 'AUTHORITY_USERINFO_D':
            return Object.assign({}, state, {
                uuheader: action.result
            });

        default:
            return state;
    }
};
