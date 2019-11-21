import {API} from '../config';
import { reject } from 'q';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products/?sortBy=${sortBy}&order=desc&limit=6`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
       return reject({err});
    });
};
