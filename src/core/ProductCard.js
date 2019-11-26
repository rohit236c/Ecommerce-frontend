import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';

const ProductCard = ({product}) => {

    const showQuantity = (productQuantity) => {
        return (productQuantity > 0
            ? <span className="badge badge-primary badge-pill">In Stock</span>
            : <span className="badge badge-primary badge-pill">Out of Stock</span>);
    };

    return (
        <div className="col-6 ml-3">
            <div className="card mb-5">
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
                    {showQuantity(product.quantity)}
                    <br/>
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

export default ProductCard;
