import { deleted, get, getById, post, put } from "./api"

const itemLink = "items/";

export const getItems = () => {
    return get(itemLink);
}
export const getItemById = (id) => {
    return getById(itemLink + id);
}
export const createItem = (item) => {
    return post(itemLink, item);
}
export const editItem = (itemId, item) => {
    return put(itemLink + itemId, item);
}
export const deleteItem = (id) => {
    return deleted(itemLink + id);
}