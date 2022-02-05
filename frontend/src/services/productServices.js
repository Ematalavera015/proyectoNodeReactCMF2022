import axios from 'axios';

import { BASE_URL_BACK } from '../config';

export const getProducts = async (keyword, pageNumber) => {
    try {
        const { data } = await axios.get(
            `${BASE_URL_BACK}/products?keyword=${keyword}&pageNumber=${pageNumber}`
        );
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const registerProduct = async (body, token) => {
    try {
        const config = {
            headers: {
                "authorization": `Bearer ${token}`,
            }
        }
        const { data } = await axios.post(`${BASE_URL_BACK}/products`, body, config);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const guardarImagen = async (token, file) => {
    try {
        const imagen = new FormData();
        imagen.append('file', file);

        console.log('DATA IMAGEN ', imagen);
        const config = {
            headers: {
                "authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        }
        const { data } = await axios.post(`${BASE_URL_BACK}/upload/aws`, imagen, config);
        return data;
    } catch (error) {
        throw new Error(error);
    }
};