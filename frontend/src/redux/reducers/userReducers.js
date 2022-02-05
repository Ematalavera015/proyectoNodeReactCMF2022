import actionTypes from "../actions/actionTypes";

export const loginUser = (state = { user: {} }, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
            return {
                loading: true,
                user: {},
            };
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };
        case actionTypes.USER_LOGIN_FAIL:
            return {
                error: action.payload,
            };
        case actionTypes.USER_LOGOUT:
            return {
                user: {},
            };
        default:
            return state;
    }
};

export const registerUser = (state = { user: {} }, action) => {
    switch (action.types) {
        case actionTypes.USER_REGISTER_REQUEST:
            return {
                loading: true,
                user: {}
            };
        case actionTypes.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.USER_REGISTER_FAIL:
            return {
                error: action.payload,
            }
        default:
            return state;
    };
};