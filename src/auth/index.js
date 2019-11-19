import {API} from '../config';

export const signup = user => {
    // console.log(name," ", email, " ", password);
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};
export const signin = user => {
    // console.log(name," ", email, " ", password);
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};
export const authenticate = (data, next) => {
    // console.log(data,"auth");
     if(typeof window != undefined) {
         localStorage.setItem('jwt',JSON.stringify(data));
         next();
     }
}