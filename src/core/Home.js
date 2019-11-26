import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from '../core/coreApi';
import Card from './Card';
import Search from './Search';

const Home = () => {

    const [productsBySell,
        setProductsBySell] = useState([]);
    const [productsByArrival,
        setProductsByArrival] = useState([]);
    const [error,
        setError] = useState(false);
    const [loading,
        setLoading] = useState(true);

    const loadProductBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
                setLoading(false);
            }
        }).catch((err) => {
            setError('Server is Down!!');
            setLoading(false);
        });
    };
    const loadProductByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
                setLoading(false);
            }
        }).catch((err) => {
            setError('Server is Down!!');
            setLoading(false);
        });
    };
    useEffect(() => {
        loadProductBySell();
        loadProductByArrival();
    }, []);

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{
            display: error
                ? ''
                : 'none'
        }}>
            {error}
        </div>
    );

    const showLoading = () => ((loading && (
        <div className="alert alert-success">
            <h2>Loading...</h2>
        </div>
    )));

    return (
        <Layout
            title="Home Page"
            description="Node Ecommerce"
            className="container-fluid">
            <Search/> {showLoading()}
            {showError()}
            {!loading && !error && (
                <React.Fragment>
                    <h2 className="mb-4">Best Sellers</h2>
                    <div className="row">
                        {productsBySell.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product}/>
                            </div>
                        ))}
                    </div>

                    <h2 className="mb-4">New Products</h2>
                    <div className="row">
                        {productsByArrival.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product}/>
                            </div>
                        ))}
                    </div>

                </React.Fragment>
            )}
        </Layout>
    );
};

export default Home
