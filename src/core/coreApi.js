import {API} from '../config';
import {reject} from 'q';
import queryString from 'query-string';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products/?sortBy=${sortBy}&order=desc&limit=6`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return reject({err});
    });
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    // console.log(name," ", email, " ", password);
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};

export const list = params => {
    const query = queryString.stringify(params);
    return fetch(`${API}/products/search?${query}`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return reject({err});
    });
};

export const getOneProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return reject({err});
    });
};

export const getRelatedProducts = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return reject({err});
    });
};

export const getBrainTreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return reject({err});
    });
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    }).then(response => {
        return response.json(); 
    }).catch(err => {
        return reject({err});
    });
};
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: createOrderData})
    }).then(response => {
        return response.json();
    }).catch(err => {
        return reject({err});
    });
};
