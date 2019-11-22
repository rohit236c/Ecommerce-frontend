import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getCategories} from '../admin/apiAdmin';
import Checkbox from './Checkbox';

const Shop = () => {

    const [Filters,
        setFilters] = useState({
        filters: {
            categories: [],
            price: []
        }
    });
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

    const handleFilters = (filters, filterBy) => {
        // console.log(filterBy, " ", filters);
        const newFilters = {
            ...Filters
        };
        newFilters.filters[filterBy] = filters;
        setFilters(newFilters);
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
                        <Checkbox
                            categories={categories}
                            handleFilters={filters => handleFilters(filters, 'categories')}/>
                    </ul>
                </div>
                <div className="col-8">
                   {JSON.stringify(Filters)}
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
