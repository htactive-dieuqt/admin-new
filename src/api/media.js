import {callApi, imageUploadApi} from './apiCaller';

export const uploadImage = (data, token) => {
    return imageUploadApi('/image-upload', 'POST', data, token);
}

export const deleteImage = (data, token) => {
    return callApi('/image-delete', 'POST', data, token);
}