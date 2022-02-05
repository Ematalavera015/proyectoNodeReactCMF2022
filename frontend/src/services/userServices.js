import axios from 'axios';

import { BASE_URL_BACK } from '../config';

export const getUserById = async (id) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL_BACK}/users/${id}`
        );
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const login = async (body) => {
    try {

        console.log('BODY Service ', body);
        const resUser = await axios.post(
            `${BASE_URL_BACK}/users/login`, body
        );
        return resUser.data
    } catch (error) {
        throw new Error('Invalid email or password');
    }
};

export const registerUser = async (body) => {
    try {
        const resUser = await axios.post(`${BASE_URL_BACK}/users`, body);
        return resUser.data;
    } catch (error) {
        throw new Error(error);
    }
};