import { deleted, get, getbyid, post, put } from "./api"

const itemLink = "items/";

export const getitems = () => {
    return get(itemLink);
}
export const getitembyid = (id) => {
    return getbyid(itemLink + id);
}
export const createitem = (item) => {
    return post(itemLink, item);
}
export const edititem = (itemid, item) => {
    return put(itemLink + itemid, item);
}
export const deleteitem = (id) => {
    return deleted(itemLink + id);
}