import React, {useState, useEffect} from 'react';
import {getBrainTreeClientToken, processPayment, createOrder} from './coreApi';
import {emptyCart} from './cartHelpers';
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth';
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({
    products,
    setRun = f => f,
    run = undefined
}) => {
    const [data,
        setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: '',
        loading: false
    });

    const getTotal = () => {
        return products.reduce((currVal, nextVal) => {
            return currVal + nextVal.count * nextVal.price;
        }, 0);
    };

    const {user, token} = isAuthenticated();

    const getToken = (user, token) => {
        if (user) {
            getBrainTreeClientToken(user._id, token).then((data) => {
                if (data.error) {
                    setData({
                        ...data,
                        error: data.error
                    });
                } else {
                    setData({clientToken: data.clientToken});
                }
            });
        }

    };
    useEffect(() => {
        getToken(user, token);
    }, []);
    let deliveryAddress = data.address;
    const buyProducts = () => {
        setData({
            ...data,
            loading: data.clientToken
        });
        let nonce;
        let getNonce = data
            .instance
            .requestPaymentMethod()
            .then(response => {
                nonce = response.nonce;
                // send nonce as card as to backend to as 'paymentMethodNonce' and also charge
                // total to be charged
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                processPayment(user._id, token, paymentData).then((response) => {
                    let createOrderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                        address: deliveryAddress
                    };
                    createOrder(user._id, token, createOrderData).then((response) => {
                        emptyCart(() => {
                            setRun(!run); // run useEffect in parent Cart
                            setData({loading: false, success: true});
                        });
                    }).catch((err) => {
                        setData({loading: false});
                    });

                    setData({
                        ...data,
                        success: response.success
                    });

                }).catch((err) => {
                    setData({
                        ...data,
                        error: err.message,
                        loading: false
                    });
                });
            })
            .catch(err => {
                setData({
                    ...data,
                    error: err.message
                });
            });
    };
    const handleAddress = event => {
        setData({
            ...data,
            address: event.target.value
        });
    };;
    const showDropIn = (success) => (
        <div onBlur= {()=>{setData({...data, error: ""})}}>
            {data.clientToken && products.length > 0
                ? (
                    <div>
                        <div className="gorm-group mb-3">
                            <label className="text-muted">Delivery address:</label>
                            <textarea
                                onChange={handleAddress}
                                className="form-control"
                                value={data.address}
                                placeholder="Type your delivery address here..."/>
                        </div>
                        <DropIn
                            options={{
                            authorization: data.clientToken
                        }}
                            onInstance
                            ={instance => data.instance = instance}/>

                        <button onClick={buyProducts} className="btn btn-primary btn-block">Make Payment</button>
                    </div>
                )
                : <Link to="/shop">
                    <button className="btn btn-success">Add items to Cart</button>
                </Link>}
        </div>
    );

    const showError = (error) => {
        if (error) {
            return (
                <div
                    className="alert alert-danger"
                    style={{
                    display: error
                        ? ''
                        : 'none'
                }}>{error}</div>
            );
        }
    };
    const showSuccess = (success) => {
        if (success) {
            return (
                <div
                    className="alert alert-info"
                    style={{
                    display: success
                        ? ''
                        : 'none'
                }}>"Thanks!! Your Payment was SuccessFul!!"</div>
            );
        }
    };

    const showCheckout = (success) => {
        return isAuthenticated()
            ? (
                <div>{showDropIn(success)}</div>
            )
            : (
                <Link to="/signin">
                    <button className="btn btn-primary">Signin to Checkout</button>
                </Link>
            );
    };
    const showLoading = (loading) => {
        if (loading) {
            return (
                <h2>Loading...</h2>
            );
        }
    };
    return (
        <div>
            <h2>Total : Rs {getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout(data.success)}

        </div>
    );
};

export default CheckOut;
