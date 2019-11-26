import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({
    product,
    showViewCartButton = true
}) => {
    const showViewCart = (productId) => {
        return (showViewCartButton && (
            <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                View product
            </button>
        ));
    };
    const showQuantity = (productQuantity) => {
        return (productQuantity > 0
            ? <span className="badge badge-primary badge-pill">In Stock</span>
            : <span className="badge badge-primary badge-pill">Out of Stock</span>);
    };
    const addToCart = () => (
        <button className="btn btn-outline-warning mt-2 mb-2">
            Add to Cart
        </button>
    );
    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                <ShowImage item={product} url="product"/>
                <p className="mt-2 lead">{product
                        .description
                        .substring(0, 20)}</p>
                <p className="black-10">{`Rs ${product.price}`}</p>
                <p className="black-9">
                    Category: {product.category && product.category.name}</p>
                <p className="black-8">
                    {`Added On ${moment(product.createdAt).fromNow()}`}
                </p>
                <Link to={`/product/${product._id}`}>
                    {showViewCart(showViewCartButton)}
                </Link>
                <Link to="/">
                    {addToCart()}
                </Link>
                <br/> {showQuantity(product.quantity)}

            </div>
        </div>
    );
};

export default Card
