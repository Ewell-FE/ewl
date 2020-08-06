const initState = {
    demo: {}
};
export default (state = initState, action) => {
    switch (action.type) {
        case 'DEMO':
            return Object.assign({}, state, {
                demo: action.result
            });
        default:
            return state;
    }
};
