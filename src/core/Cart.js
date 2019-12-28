import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {Link} from 'react-router-dom'
import {getCart} from './cartHelpers';
import Card from './Card';
import CheckOut from './CheckOut';

const Cart = () => {
    const [items,
        setItems] = useState([]);
    const [run,
        setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => (
        <div>
            <h2>Your cart has {`${items.length}`}</h2>
            <hr/> {items.map((product, i) => (<Card
                key={i}
                product={product}
                showAddToCart={false}
                cartUpdate={true}
                deleteFromCart={true}
                run={run}
                setRun={setRun}/>))}
        </div>
    );

    const noItemsMessage = () => (
        <h2>Your cart is empty.
            <br/>
            <Link to="/shop">Continue Shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your Cart"
            className="container-fluid">
            <div className="row">
                <div className="col-6">
                    {items.length > 0
                        ? showItems(items)
                        : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your Cart Summary</h2>
                    <hr/>
                    <CheckOut products={items} setRun={setRun} run={run}/>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
