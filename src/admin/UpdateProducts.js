import React, {useState, useEffect} from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin';
import Card from '../core/Card';

const UpdateProducts = () => {
    const {user, token} = isAuthenticated();
    const [products,
        setProducts] = useState([]);
    //-------------------------//
    const load = () => {
        getProducts().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    const delProduct = (productId) => {
        deleteProduct(user._id, productId, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                load();
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    useEffect(() => {
        load();
    }, []);
    const listProducts = (products) => (
        <div className="row">
            <div className="col-12">
                <h2 className="h3 text-center">Total products: {products.length}</h2>
                <hr/>
                <ul className="list-group">
                    {products.map((p, i) => (
                        <li
                            key={i}
                            className="list-group-item d-flex justify-content-between align-items-center">
                            <strong className="col-8">{p.name}</strong>
                            <Link to={`/admin/product/update/${p._id}`}>
                                <span className="badge badge-warning badge-pill">update</span>
                            </Link>
                            <span
                                className="badge badge-danger badge-pill"
                                onClick={() => {
                                delProduct(p._id)
                            }}>delete</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    return (
        <Layout
            title="Manage Products"
            description={`Perform CRUD on products!!!`}
            className="container-fluid">
            {listProducts(products)}
        </Layout>
    );
};

export default UpdateProducts;
