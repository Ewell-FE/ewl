import _ from 'lodash';

const initState = {
    menuList: {}
};
export default (state = initState, action) => {
    switch (action.type) {
        case 'MODULE_MENU_LIST':
            return Object.assign({}, state, {
                menuList: action.result
            });
        default:
            return state;
    }
};
