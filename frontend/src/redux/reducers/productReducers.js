import actionTypes from '../actions/actionTypes';

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            };
        case actionTypes.PRODUCT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const productCreateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CREATE_REQUEST:
            return { loading: true, product: {} };
        case actionTypes.PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case actionTypes.PRODUCT_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}