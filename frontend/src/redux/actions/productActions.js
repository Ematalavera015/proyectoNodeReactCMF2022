import actionTypes from "./actionTypes";
import { getProducts, registerProduct } from "../../services/productServices";

export const listProducts = (keyword = '', pageNumber = '') => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PRODUCT_LIST_REQUEST,
            });
            const data = await getProducts(keyword, pageNumber);
            dispatch({
                type: actionTypes.PRODUCT_LIST_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.PRODUCT_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    }
};

export const createProduct = (body, token) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.PRODUCT_CREATE_REQUEST,
            });
            const data = await registerProduct(body, token);
            dispatch({
                type: actionTypes.PRODUCT_CREATE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.PRODUCT_CREATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};