import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {listOrders, getStatusValue, updateOrderStatus} from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders,
        setOrder] = useState([]);
    const [statusValue,
        setStatusValue] = useState([]);
    const {user, token} = isAuthenticated();
    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.err) {
                //err set
                console.log(data.err);
            } else {
                setOrder(data);
            }
        });

    };
    const loadStatusValue = () => {
        getStatusValue(user._id, token).then(data => {
            if (data.err) {
                //err set
                console.log(data.err);
            } else {
                setStatusValue(data);
            }
        });
    }
    const handleStatusChange = (event, orderId) => {
        updateOrderStatus(user._id, token, orderId, event.target.value).then((response) => {
            if (response.error) {
                console.log("Status field update failed");
            } else {
                loadOrders();
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    const showStatus = (order) => {
        return (
            <div className="form-group">
                <h3 className="mark mb-4">Status: {order.status}</h3>
                <select
                    className="form-control"
                    onChange=
                    {(e)=>handleStatusChange(e, order._id)}>
                    <option>Update Status</option>
                    {statusValue && statusValue.map((status, statusIdx) => (
                        <option key={statusIdx} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        );
    }
    useEffect(() => {
        loadOrders();
        loadStatusValue();
    }, []);
    const showOrdersLength = () => {
        if (orders && orders.length > 0) {
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
            <input type="text" value={value} className="form-control" readOnly/>
        </div>
    );

    return (
        <Layout title="Orders List" description={`Hello, ${user.name}!`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    {orders && orders.map((order, orderIndex) => {
                        console.log(order , "order-1")
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
                                        {showStatus(order)}
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
