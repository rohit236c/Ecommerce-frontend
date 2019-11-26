import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts, getOneProduct} from '../core/coreApi';
import ProductCard from './ProductCard';
import {read} from 'fs';

const Product = (props) => {

    const [product,
        setProduct] = useState({});
    const [error,
        setError] = useState(false);

    const loadSingleProduct = productId => {
        getOneProduct(productId).then((response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setProduct(response);
            }
        }).catch((err) => {
            setError(err);
        });
    };
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, []);
    return (
        <Layout
            title={product && product.name}
            description={product && product.description &&product
            .description
            .substring(0, 100)}
            className="container-fluid">
            <h2 className="mb-4">Single Product</h2>
            <div className="row">
                {
                    product && product.description && (<ProductCard product={product} />)
                }
            </div>
        </Layout>
    );
};

export default Product
