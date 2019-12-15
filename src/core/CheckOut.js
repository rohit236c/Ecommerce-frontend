import React, {useState, useEffect} from 'react';
import {getBrainTreeClientToken} from './coreApi';
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
        getBrainTreeClientToken(user._id, token).then((data) => {
            if (data.error) {
                setData({
                    ...data,
                    error: data.error
                });
            } else {
                setData({
                    ...data,
                    clientToken: data.clientToken
                });
            }
        })
    };
    useEffect(() => {
        getToken(user, token);
    }, []);

    const buyProducts = () => {
        let nonce;

        let getNonce = data
            .instance
            .requestPaymentMethod()
            .then(data => {
                console.log(data);
                nonce = data.nonce;
                // send nonce as card as to backend to as 'paymentMethodNonce' and also charge
                // total to be charged
                console.log("noncee", nonce, getTotal());
            })
            .catch(err => {
                console.log(err);
                setData({
                    ...data,
                    error: err.message
                });
            })
    };
    const showDropIn = () => (
        <div onBlur= {()=>{setData({...data, error: ""})}}>
            {data.clientToken && products.length > 0
                ? (
                    <div>
                        <DropIn
                            options={{
                            authorization: data.clientToken
                        }}
                            onInstance
                            ={instance => data.instance = instance}/>
                        <button onClick={buyProducts} className="btn btn-primary">Make Payment</button>
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

    const showCheckout = () => {
        return isAuthenticated()
            ? (
                <div>{showDropIn()}</div>
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
            {showCheckout()}
        </div>
    );
};

export default CheckOut;
