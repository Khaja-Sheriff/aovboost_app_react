import axios from "axios";

const api_url = "http://localhost:3004/";

export const get = (url) => {
    return axios.get(api_url + url);
}
export const getbyid = (url) => {
    return axios.get(api_url + url);
}
export const post = (url, item) => {
    return axios.post(api_url + url, item);
}
export const put = (url, item) => {
    return axios.put(api_url + url, item);
}
export const deleted = (url) => {
    return axios.delete(api_url + url);
}