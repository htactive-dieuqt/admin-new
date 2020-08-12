import {callApi} from './apiCaller';

export const getCategory = (token) => {
    return callApi('/site-category', 'GET', null, token);
}

export const getCategoryById = (categoryId, token) => {
    return callApi('/site-category/' + categoryId, 'GET', null, token);
}

export const addNewCategory = (data, token) => {
    return callApi('/site-category', 'POST', data, token);
}

export const updateCategory = (categoryId, data, token) => {
    return callApi(`/site-category/${categoryId}`, 'PUT', data, token);
}

export const deleteCategory = (categoryId, token) => {
    return callApi(`/site-category/${categoryId}`, 'DELETE', null, token);
}