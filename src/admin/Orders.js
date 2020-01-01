import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listOrders} from './apiAdmin';

const Orders = () => {
    const [orders,
        setOrder] = useState([]);
    const {user, token} = isAuthenticated();
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.err) {} else {
                setOrder({
                    ...orders,
                    orders: data
                });
            }
        });
    };
    const noOrders = (orders) => {
        return orders && orders.length < 1
            ? <h4>No Orders</h4>
            : null;
    }
    useEffect(() => {
        loadOrders();
    }, [])
    return (
        <Layout title="Orders List" description={`Hello, ${user.name}!`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {noOrders(orders)} 
                    {JSON.stringify(orders)}    
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
