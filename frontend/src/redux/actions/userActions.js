import actionTypes from './actionTypes';
import { login, registerUser } from '../../services/userServices';

export const loginUser = (body) => {
    return async (dispatch) => {
        try {
            console.log('Actions user');
            dispatch({
                type: actionTypes.USER_LOGIN_REQUEST,
            });
            const data = await login(body);
            dispatch({
                type: actionTypes.USER_LOGIN_SUCCESS,
                payload: data,
            })
            console.log('DATA ACTIONS ', data);
            localStorage.setItem('user', JSON.stringify(data));
        } catch (error) {
            dispatch(
                {
                    type: actionTypes.USER_LOGIN_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                }
            );
            console.log('ERROR Actions', error);
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: actionTypes.USER_LOGOUT,
        });
        localStorage.removeItem('user');
    };
};

export const userRegister = (body) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: actionTypes.USER_REGISTER_REQUEST,
            });
            const data = await registerUser(body);
            dispatch({
                type: actionTypes.USER_REGISTER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch(
                {
                    type: actionTypes.USER_REGISTER_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                }
            );
        };
    };
};