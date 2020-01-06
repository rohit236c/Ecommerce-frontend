import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts, getOneProduct, getRelatedProducts} from '../core/coreApi';
import {read} from 'fs';
import Card from './Card';

const Product = (props) => {

    const [product,
        setProduct] = useState({});
    const [error,
        setError] = useState(false);
    const [relatedProducts,
        setRelatedProducts] = useState([]);

    const loadSingleProduct = productId => {
        getOneProduct(productId).then((response) => {
            if (response.error) {
                setError(response.error);
            } else {
                setProduct(response);
                getRelatedProducts(response._id).then((data) => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProducts(data);
                    }
                }).catch(err => setError(err));
            }
        }).catch((err) => {
            setError(err);
        });
    };
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);
    return (
        <Layout
            title={product && product.name}
            description={product && product.description && product
            .description
            .substring(0, 100)}
            className="container-fluid">
            <h2 className="mb-4">Single Product</h2>
            <div className="row">
                <div className="col-8">
                    {product && product.description && (<Card product={product} showViewCartButton={false}/>)}
                </div>
                <div className="col-4">
                    <h2>Related Products</h2>
                    {relatedProducts.map((r, i) => (
                        <div key={i} className="mb-3">
                            <Card product={r} />
                        </div>
                    ))}
                </div>

            </div>
        </Layout>
    );
};

export default Product
