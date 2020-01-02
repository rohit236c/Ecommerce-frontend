import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listOrders} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders,
        setOrder] = useState([]);
    const {user, token} = isAuthenticated();
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.err) {
                //err set

            } else {
                setOrder(data);
            }
        });

    };
    useEffect(() => {
        loadOrders();
    }, []);
    const showOrdersLength = () => {
        if (orders && orders.length > 0) {
            console.log(orders, "ord")
            return (
                <h4 className="text-danger display-3">Total orders: {orders.length}</h4>
            );
        } else {
            return (
                <h4 className="text-danger">NO ORDERS</h4>
            );
        }
    }
    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend mr-2">
                <div className="input-group-text">
                    {key}
                </div>
            </div>
            <input type="text" value = {value} className="form-control" readOnly />
        </div>
    );

    return (
        <Layout title="Orders List" description={`Hello, ${user.name}!`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders.map((order, orderIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={orderIndex}
                                style={{
                                borderBottom: '5px solid indigo'
                            }}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">OrderId: {order._id}
                                    </span>
                                </h2>
                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        Status: {order.status}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction_id: {order.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        amount: Rs {order.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered By: {order.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered On: {moment(order.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery Address: {order.address}
                                    </li>
                                </ul>
                                <h3 className="mt-4 mb-4 font-italic">
                                    Total Products in the Order: {order.products && order.products.length}
                                </h3>
                                {order
                                    .products
                                    .map((p, pidx) => (
                                        <div
                                            className="mb-4"
                                            key={pidx}
                                            style
                                            ={{
                                            padding: '20px',
                                            border: '1px solid indigo'
                                        }}>
                                            {showInput('Product Name', p.name)}
                                            {showInput('Product Price', p.price)}
                                            {showInput('Product Total', p.count)}
                                            {showInput('Product Id', p._id)}
                                        </div>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;
