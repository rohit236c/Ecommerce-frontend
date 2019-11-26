import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({product}) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    <ShowImage item={product} url="product" />
                    <p className="lead mt-2">{product.description.substring(0,20)}</p>
                    <p className="black-10">{`Rs ${product.price}`}</p>
                    <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                            View product
                        </button>
                    </Link>
                    <Link to="/">
                        <button className="btn btn-outline-warning mt-2 mb-2">
                            Add to Cart
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card
