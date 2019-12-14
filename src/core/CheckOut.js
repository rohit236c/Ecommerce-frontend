import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {Link} from 'react-router-dom'
import {getCart} from './cartHelpers';
import Card from './Card';
import {isAuthenticated} from '../auth';

const CheckOut = ({products}) => {
    const getTotal = () => {
        return products.reduce((currVal, nextVal) => {
            return currVal + nextVal.count * nextVal.price;
        }, 0);
    };
    const showCheckout = () => {
        return isAuthenticated()
            ? (
                <button className="btn btn-success">Checkout</button>
            )
            : (
                <Link to="/signin">
                    <button className="btn btn-primary">Signin to Checkout</button>
                </Link>
            );
    };
    return (
        <div>
            <h2>Total : Rs {getTotal()}</h2>
            {showCheckout()}
        </div>
    );
};

export default CheckOut;
