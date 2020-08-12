import * as types from './types';

// Add new category
export const addNewCategory = (data, token) => {
    return {
        type: types.ADD_CATEGORY,
        payload: data,
        token,
    };
};

export const addNewCategorySuccess = data => {
    return {
        type: types.ADD_CATEGORY_SUCCESS,
        payload: data,
    };
};

export const addNewCategoryFailed = error => {
    return {
        type: types.ADD_CATEGORY_FAILED,
        error: error,
    };
};

// Get all categories
export const getAllCategory = (token) => {
    return {
        type: types.GET_ALL_CATEGORIES,
        token,
    };
};

export const getAllSuccess = data => {
    return {
        type: types.GET_ALL_CATEGORIES_SUCCESS,
        payload: data,
    };
};

export const getAllFailed = error => {
    return {
        type: types.GET_ALL_CATEGORIES_FAILED,
        error: error,
    };
};

// Get one from category
export const getCategory = (id, token) => {
    return {
        type: types.GET_CATEGORY,
        payload: id,
        token,
    };
};
  
export const getCategorySuccess = data => {
    return {
        type: types.GET_CATEGORY_SUCCESS,
        payload: data,
    };
};
  
export const getCategoryFailed = error => {
    return {
        type: types.GET_CATEGORY_FAILED,
        error: error,
    };
};

//Update category
export const updateCategory = (data, token) => {
    return {
        type: types.UPDATE_CATEGORY,
        payload: data,
        token,
    };
};
  
export const updateCategorySuccess = data => {
    return {
        type: types.UPDATE_CATEGORY_SUCCESS,
        payload: data,
    };
};
  
export const updateCategoryFailed = error => {
    return {
        type: types.UPDATE_CATEGORY_FAILED,
        error: error,
    };
};

// Delete category
export const deleteCategory = (id, token) => {
    return {
        type: types.DELETE_CATEGORY,
        payload: id,
        token,
    };
};
  
export const deleteCategorySuccess = data => {
    return {
        type: types.DELETE_CATEGORY_SUCCESS,
        payload: data,
    };
};
  
export const deleteCategoryFailed = error => {
    return {
        type: types.DELETE_CATEGORY_FAILED,
        error: error,
    };
};
