import * as Config from "../constants/apiConfig";
import axios from "axios";

export function callApi(endpoint, method, body, token) {
  return axios({
    method: method,
    url: `${Config.API_URL}${endpoint}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
}

export function imageUploadApi(endpoint, method, body, token) {
  return axios({
    method: method,
    url: `${Config.API_URL}${endpoint}`,
    data: body,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  });
}

export function getDataApi(endpoint, method, body, token) {
  return axios({
    method: method,
    url: `${Config.API_URL}${endpoint}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => {
    return res.data.data;
  });
}

export function authApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${Config.API_URL}${endpoint}`,
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
