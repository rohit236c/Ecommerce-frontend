import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories} from '../admin/apiAdmin';
import Checkbox from './Checkbox';

const Shop = () => {

    const [categories,
        setCategories] = useState([]);
    const [error,
        setError] = useState(false);
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data.categories);
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <Layout
            title="Shop Page"
            description="Search Products"
            className="container-fluid">
            <div className="row">
                <div className="col-4">
                    <h4>Filter By Category</h4>
                    <ul>
                        <Checkbox categories={categories}/>
                    </ul>
                </div>
                <div className="col-8">
                    right
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
