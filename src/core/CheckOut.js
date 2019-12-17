import React, {useState, useEffect} from 'react';
import {getBrainTreeClientToken, processPayment} from './coreApi';
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth';
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({products}) => {
    const [data,
        setData] = useState({success: false, clientToken: null, error: '', instance: {}, address: ''});

    const getTotal = () => {
        return products.reduce((currVal, nextVal) => {
            return currVal + nextVal.count * nextVal.price;
        }, 0);
    };

    const {user, token} = isAuthenticated();

    const getToken = (user, token) => {
        if(user) {
            getBrainTreeClientToken(user._id, token).then((data) => {
                if (data.error) {
                    setData({
                        ...data,
                        error: data.error
                    });
                } else {
                    setData({
                        clientToken: data.clientToken
                    });
                }
            })
        }
        
    };
    useEffect(() => {
        getToken(user, token);
    }, []);

    const buyProducts = () => {
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
                    setData({
                        ...data,
                        success: response.success
                    });
                }).catch((err) => {
                    setData({
                        ...data,
                        error: err.message
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
    const showDropIn = (success) => (
        <div onBlur= {()=>{setData({...data, error: ""})}} style={{display: success? 'none':''}}>
            {data.clientToken && products.length > 0
                ? (
                    <div>
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
    return (
        <div>
            <h2>Total : Rs {getTotal()}</h2>
            {showError(data.error)}
            {showCheckout(data.success)}
            {showSuccess(data.success)}
        </div>
    );
};

export default CheckOut;
