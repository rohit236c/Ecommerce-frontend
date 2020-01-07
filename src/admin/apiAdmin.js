import {API} from "../config";

export const createCategory = (userId, token, category) => {
    // console.log(name," ", email, " ", password);
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
    // console.log(name," ", email, " ", password);
    return fetch(`${API}/products/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};
export const getCategories = () => {
    return fetch(`${API}/categories`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};
export const listOrders = (userId, token) => {
    return fetch(`${API}/orders/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};
export const getStatusValue = (userId, token) => {
    return fetch(`${API}/orders/status-value/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};
export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/orders/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};
/**
 * To Perform
 * Crud on Products
 *
 * get all products
 * get a single product
 * update a single product
 * delete a single product
 */

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};

export const getOneProduct = (productId) => {
    return fetch(`${API}/product/${productId}`, {method: "GET"}).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};
export const deleteProduct = (userId, productId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};

export const updateProduct = (userId, productId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response => {
        return response.json();
    }).catch(err => {
        return err;
    });
};