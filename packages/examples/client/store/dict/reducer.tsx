const initState = {
    cardList: [1, 2, 3]
};
export default (state = initState, action) => {
    switch (action.type) {
        case 'DEPLOYMENT_SERVICE_CARDLIST_DATA':
            return Object.assign({}, state, {
                cardList: action.result
            });
        default:
            return state;
    }
};
